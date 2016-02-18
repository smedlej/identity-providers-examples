'use strict';

var crypto = require('crypto'),
    express = require('express'),
    session = require('express-session'),
    http = require('http'),
    path = require('path'),
    querystring = require('querystring'),
    rs = require('connect-mongo')(session),
    extend = require('extend'),
    test = {
        status: 'new'
    },
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    configManager = new (require('./helpers/configManager.js'))(),
    userLookup = new (require('./helpers/userLookup.js'))();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect(configManager.getReplicationHosts(), configManager.getOptions());
app.use(session({
    cookie: {path: '/', httpOnly: true, secure: false, maxAge: 5000},
    store: new rs({mongoose_connection: mongoose.connection}),
    secret: 'Some Secret!!!'
}));

var options = {
    login_url: '/my/login',
    consent_url: '/user/consent',
    scopes: {
        foo: 'Access to foo special resource',
        bar: 'Access to bar special resource'
    },
//when this line is enabled, user email appears in tokens sub field. By default, id is used as sub.
    models: {
        user: {
            attributes: {
                sub: function () {
                    return this.id;
                }
            }
        }
    },
    app: app
};
var oidc = require('./openid-connect-provider.js').oidc(options);

app.set('port', process.env.PORT || 3042);
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('Some Secret!!!'));

app.get('/', function (req, res) {
    res.redirect('/my/login');
});

app.get('/my/login', function (req, res) {
    if (configManager.getIdentityProvider() === 'ameli') {
        res.render('ameli/login', {error: req.session.error});
    } else {
        res.render('impots/login', {error: req.session.error});
    }
});

var validateUser = function (req, next) {
    delete req.session.error;
    userLookup.validate(req, next);
};

var afterLogin = function (req, res) {
    res.redirect(req.param('return_url') || '/user');
};

var loginError = function (err, req, res) {
    req.session.error = err.message;
    res.redirect(req.originalUrl);
};

app.post('/my/login', oidc.login(validateUser), afterLogin, loginError);


app.all('/logout', oidc.removetokens(), function (req, res) {
    req.session.destroy();
    res.redirect('/my/login');
});

app.get('/user/authorize', oidc.auth());

app.post('/user/token', oidc.token());

app.get('/user/consent', function (req, res) {
    var head = '<head><title>Consent</title></head>';
    var lis = [];
    for (var i in req.session.scopes) {
        lis.push('<li><b>' + i + '</b>: ' + req.session.scopes[i].explain + '</li>');
    }
    var ul = '<ul>' + lis.join('') + '</ul>';
    var error = req.session.error ? '<div>' + req.session.error + '</div>' : '';
    var body = '<body><h1>Consent</h1><form method="POST">' + ul + '<input type="submit" name="accept" value="Accept"/><input type="submit" name="cancel" value="Cancel"/></form>' + error;
    res.send('<html>' + head + body + '</html>');
});

app.post('/user/consent', oidc.consent());

app.get('/user/create', function (req, res) {
    var head = '<head>    <script type="text/javascript" src="/js/jquery.min.js"></script><link href="/stylesheets/bootstrap.min.css" rel="stylesheet" type="text/css"><link href="/stylesheets/style.css" rel="stylesheet" type="text/css"><title>Création de compte utilisateur</title></head>';
    var inputs = '';
    var fields = {
        identifier: {
            label: 'Identifiant qui sera utilisé pour l\'authentification (exemple : 46413193479) :',
            type: 'text'
        },
        given_name: {
            label: 'Prénoms (exemple : Jean-Pierre Eric) :',
            type: 'text'
        },
        family_name: {
            label: 'Nom de famille (exemple : De Larue) :',
            type: 'text'
        },
        birthdate: {
            label: 'Date de naissance YYYY-MM-DD (exemple : 1976-01-22) :',
            type: 'text'
        },
        gender: {
            label: 'Sexe (male ou female) : ',
            type: 'text'
        },
        email: {
            label: 'Adresse électronique :',
            type: 'email'
        },
        birthcountry: {
            label: 'Code COG du pays de naissance (exemple : 99100 pour la France) :',
            type: 'text'
        },
        birthplace: {
            label: 'Code COG du lieu de naissance (exemple : 31555 pour Toulouse)',
            type: 'text'
        },
        password: {
            label: 'Mot de passe :',
            type: 'password'
        },
        passConfirm: {
            label: 'Confirmation du mot de passe :',
            type: 'password'
        }
    };
    for (var i in fields) {
        inputs += '<div class="form-group"><label for="' + i + '">' + fields[i].label + '</label><input class="form-control" required="true" type="' + fields[i].type + '" id="' + i + '"  name="' + i + '"/></div>';
    }
    var error = req.session.error ? '<div class="alert alert-warning">' + req.session.error + '</div>' : '';
    var body = '<body><h1>Création de compte utilisateur</h1>' + error + '<p>Tous les champs sont obligatoires. Les comptes seront disponibles dans les 2 bouchons de fournisseurs d\'identités Impots.gouv et Ameli.</p><form method="POST">' + inputs + '<input class="btn btn-default" type="submit"/></form>' + error;
    res.send('<html>' + head + body + '</html>');
});

app.post('/user/create', oidc.use({policies: {loggedIn: false}, models: 'user'}), function (req, res) {
    delete req.session.error;
    req.model.user.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            req.session.error = err;
        } else if (user) {
            req.session.error = 'Le compte existe déjà.';
        }
        if (req.session.error) {
            res.redirect(req.path);
        } else {
            req.body.name = req.body.given_name + ' ' + req.body.family_name;
            req.model.user.create(req.body, function (err, user) {
                if (err || !user) {
                    req.session.error = 'Erreur lors de la création du compte.';
                    res.redirect(req.path);
                } else {
                    req.session.user = user.id;
                    req.session.error = 'Compte créé avec succès.';
                    res.redirect('/user/create');
                }
            });
        }
    });
});

app.get('/user', oidc.check(), function (req, res) {
    res.send('<h1>User Page</h1><div><a href="/client">See registered clients of user</a></div>');
});

app.get('/api/user', oidc.userInfo());

app.get('/client/register', oidc.use('client'), function (req, res, next) {

    var mkId = function () {
        var key = crypto.createHash('md5').update(req.session.user + '-' + Math.random()).digest('hex');
        req.model.client.findOne({key: key}, function (err, client) {
            if (!err && !client) {
                var secret = crypto.createHash('md5').update(key + req.session.user + Math.random()).digest('hex');
                req.session.register_client = {};
                req.session.register_client.key = key;
                req.session.register_client.secret = secret;
                var head = '<head><title>Register Client</title></head>';
                var inputs = '';
                var fields = {
                    name: {
                        label: 'Client Name',
                        html: '<input type="text" id="name" name="name" placeholder="Client Name"/>'
                    },
                    redirect_uris: {
                        label: 'Redirect Uri',
                        html: '<input type="text" id="redirect_uris" name="redirect_uris" placeholder="Redirect Uri"/>'
                    },
                    key: {
                        label: 'Client Key',
                        html: '<span>' + key + '</span>'
                    },
                    secret: {
                        label: 'Client Secret',
                        html: '<span>' + secret + '</span>'
                    }
                };
                for (var i in fields) {
                    inputs += '<div><label for="' + i + '">' + fields[i].label + '</label> ' + fields[i].html + '</div>';
                }
                var error = req.session.error ? '<div>' + req.session.error + '</div>' : '';
                var body = '<body><h1>Register Client</h1><form method="POST">' + inputs + '<input type="submit"/></form>' + error;
                res.send('<html>' + head + body + '</html>');
            } else if (!err) {
                mkId();
            } else {
                next(err);
            }
        });
    };
    mkId();
});

app.post('/client/register', oidc.use('client'), function (req, res, next) {
    delete req.session.error;
    req.body.key = req.session.register_client.key;
    req.body.secret = req.session.register_client.secret;
    req.body.user = req.session.user;
    req.body.redirect_uris = req.body.redirect_uris.split(/[, ]+/);
    req.model.client.create(req.body, function (err, client) {
        if (!err && client) {
            res.redirect('/client/' + client.id);
        } else {
            next(err);
        }
    });
});

app.get('/client', oidc.use('client'), function (req, res) {
    var head = '<h1>Clients Page</h1><div><a href="/client/register"/>Register new client</a></div>';
    req.model.client.find({}, function (err, clients) {
        var body = ['<ul>'];
        clients.forEach(function (client) {
            body.push('<li><a href="/client/' + client.id + '">' + client.name + '</li>');
        });
        body.push('</ul>');
        res.send(head + body.join(''));
    });
});

app.get('/client/:id', oidc.use('client'), function (req, res, next) {
    req.model.client.findOne({user: req.session.user, id: req.params.id}, function (err, client) {
        if (err) {
            next(err);
        } else if (client) {
            var html = '<h1>Client ' + client.name + ' Page</h1><div><a href="/client">Go back</a></div><ul><li>Key: ' + client.key + '</li><li>Secret: ' + client.secret + '</li><li>Redirect Uris: <ul>';
            client.redirect_uris.forEach(function (uri) {
                html += '<li>' + uri + '</li>';
            });
            html += '</ul></li></ul>';
            res.send(html);
        } else {
            res.send('<h1>No Client Fount!</h1><div><a href="/client">Go back</a></div>');
        }
    });
});

app.get('/test/clear', function (req, res) {
    test = {status: 'new'};
    res.redirect('/test');
});

app.get('/test', oidc.use({policies: {loggedIn: false}, models: 'client'}), function (req, res) {
    var html = '<h1>Test Auth Flows</h1>';
    var resOps = {
        '/user/foo': "Restricted by foo scope",
        '/user/bar': "Restricted by bar scope",
        '/user/and': "Restricted by 'bar and foo' scopes",
        '/user/or': "Restricted by 'bar or foo' scopes",
        '/api/user': "User Info Endpoint"
    };
    var mkinputs = function (name, desc, type, value, options) {
        var inp = '';
        var i;
        switch (type) {
            case 'select':
                inp = '<select id="' + name + '" name="' + name + '">';
                for (i in options) {
                    inp += '<option value="' + i + '"' + (value && value === i ? ' selected' : '') + '>' + options[i] + '</option>';
                }
                inp += '</select>';
                inp = '<div><label for="' + name + '">' + (desc || name) + '</label>' + inp + '</div>';
                break;
            default:
                if (options) {
                    for (i in options) {
                        inp += '<div>' +
                            '<label for="' + name + '_' + i + '">' + options[i] + '</label>' +
                            '<input id="' + name + '_' + i + ' name="' + name + '" type="' + (type || 'radio') + '" value="' + i + '"' + (value && value === i ? ' checked' : '') + '>' +
                            '</div>';
                    }
                } else {
                    inp = '<input type="' + (type || 'text') + '" id="' + name + '"  name="' + name + '" value="' + (value || '') + '">';
                    if (type !== 'hidden') {
                        inp = '<div><label for="' + name + '">' + (desc || name) + '</label>' + inp + '</div>';
                    }
                }
        }
        return inp;
    };
    switch (test.status) {
        case 'new':
            req.model.client.find().populate('user').exec(function (err, clients) {
                var inputs = [];
                inputs.push(mkinputs('response_type', 'Auth Flow', 'select', null, {
                    code: 'Auth Code',
                    'id_token token': 'Implicit'
                }));
                var options = {};
                clients.forEach(function (client) {
                    options[client.key + ':' + client.secret] = client.user.id + ' ' + client.user.email + ' ' + client.key + ' (' + client.redirect_uris.join(', ') + ')';
                });
                inputs.push(mkinputs('client_id', 'Client Key', 'select', null, options));
                inputs.push(mkinputs('scope', 'Scopes', 'text'));
                inputs.push(mkinputs('nonce', 'Nonce', 'text', 'N-' + Math.random()));
                test.status = '1';
                res.send(html + '<form method="GET">' + inputs.join('') + '<input type="submit"/></form>');
            });
            break;
        case '1':
            req.query.redirect_uri = req.protocol + '://' + req.headers.host + req.path;
            extend(test, req.query);
            req.query.client_id = req.query.client_id.split(':')[0];
            test.status = '2';
            res.redirect('/user/authorize?' + querystring.stringify(req.query));
            break;
        case '2':
            extend(test, req.query);
            if (test.response_type === 'code') {
                test.status = '3';
                var inputs = [];
                //var c = test.client_id.split(':');
                inputs.push(mkinputs('code', 'Code', 'text', req.query.code));
                res.send(html + '<form method="GET">' + inputs.join('') + '<input type="submit" value="Get Token"/></form>');
            } else {
                test.status = '4';
                html += 'Got: <div id="data"></div>';
                var inputs = [];
                //var c = test.client_id.split(':');
                inputs.push(mkinputs('access_token', 'Access Token', 'text'));
                inputs.push(mkinputs('page', 'Resource to access', 'select', null, resOps));

                var after =
                    "<script>" +
                    "document.getElementById('data').innerHTML = window.location.hash; " +
                    "var h = window.location.hash.split('&'); " +
                    "for(var i = 0; i < h.length; i++) { " +
                    "var p = h[i].split('='); " +
                    "if(p[0]=='access_token') { " +
                    "document.getElementById('access_token').value = p[1]; " +
                    "break; " +
                    "} " +
                    "}" +
                    "</script>";
                res.send(html + '<form method="GET">' + inputs.join('') + '<input type="submit" value="Get Resource"/></form>' + after);
            }
            break;
        case '3':
            test.status = '4';
            test.code = req.query.code;
            var query = {
                grant_type: 'authorization_code',
                code: test.code,
                redirect_uri: test.redirect_uri
            };
            var post_data = querystring.stringify(query);
            var post_options = {
                port: app.get('port'),
                path: '/user/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': post_data.length,
                    'Authorization': 'Basic ' + Buffer(test.client_id, 'utf8').toString('base64'),
                    'Cookie': req.headers.cookie
                }
            };

            // Set up the request
            var post_req = http.request(post_options, function (pres) {
                pres.setEncoding('utf8');
                var data = '';
                pres.on('data', function (chunk) {
                    data += chunk;
                    console.log('Response: ' + chunk);
                });
                pres.on('end', function () {
                    console.log(data);
                    try {
                        data = JSON.parse(data);
                        html += "Got: <pre>" + JSON.stringify(data) + "</pre>";

                        var inputs = [];
                        inputs.push(mkinputs('access_token', 'Access Token', 'text', data.access_token));
                        inputs.push(mkinputs('page', 'Resource to access', 'select', null, resOps));
                        res.send(html + '<form method="GET">' + inputs.join('') + '<input type="submit" value="Get Resource"/></form>');
                    } catch (e) {
                        res.send('<div>' + data + '</div>');
                    }
                });
            });

            // post the data
            post_req.write(post_data);
            post_req.end();
            break;
        case '4':
            test = {status: 'new'};
            res.redirect(req.query.page + '?access_token=' + req.query.access_token);
    }
});

if ('development' == app.get('env')) {
    app.use(errorHandler());
}

var clearErrors = function (req, res, next) {
    delete req.session.error;
    next();
};

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
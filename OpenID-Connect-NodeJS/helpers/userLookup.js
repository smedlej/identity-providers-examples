var UserLookup = function(){};

//this function handles the "login" part where the user actually performs a login procedure, this function should tell if the info the user has provided is accurate
UserLookup.prototype.validate = function(req, next){

    // code to query user data should go there
    req.model.user.findOne({email: req.body.email}, function(err, user) {
        if(!err && user && user.samePassword(req.body.password)) {
            return next(null, user);
        } else {
            var error = new Error('Username or password incorrect.');
            return next(error);
        }
    });
};

//this function allows to format the user info to what the app needs and / or wants to send to the client
UserLookup.prototype.buildAndSendUserInfo = function(req, res, decryptedIdTokenObject){
    //code needed to build the user information to send back when the userInfo endpoint is called
    req.model.user.findOne({id: decryptedIdTokenObject.sub}, function (err, user) {
        if (req.check.scopes.indexOf('profile') != -1) {
            user.sub = user.id;
            delete user.id;
            delete user.password;
            delete user.openidProvider;
            res.json(user);
        } else {
            res.json({email: user.email});
        }
    });
};

module.exports = UserLookup;
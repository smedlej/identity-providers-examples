import config from './config.json';
module.exports.provider = {
  cookies: {
    long: { signed: true, maxAge: (1 * 24 * 60 * 60) * 1000 }, // 1 day in ms
    short: { signed: true },
    keys: ['some secret key', 'and also the old rotated away some time ago', 'and one more'],
  },
  claims: {
    address: ['address'],
    email: ['email'],
    phone: ['phone_number'],
    profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name','nickname', 'preferred_username', 'updated_at'],
  },
  features: {
    devInteractions: false,
    discovery: true,
    sessionManagement: true,
    backchannelLogout: true
  },
  routes: {
    authorization: '/authorize',
    end_session: '/session/end',
    revocation: '/token/revocation',
    token: '/token',
    userinfo: '/userinfo',
  },
  formats: {
    default: 'opaque',
    AccessToken: 'jwt',
  },
  prompts: [ 'login', 'consent'],
  interactionUrl: function interactionUrl(ctx, interaction) { // eslint-disable-line no-unused-vars
    return `/interaction/${ctx.oidc.uuid}`;
  },
  async logoutSource(ctx, form) {
    console.log(this.oidc.params)
    if (this.oidc.params.post_logout_redirect_uri) {
      this.body = `<!DOCTYPE html>
  <head>
    <title>Logout</title>
  </head>
  <body>
    ${form}
    <script>
      var form = document.forms[0];
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'logout';
      input.value = 'yes';

      form.appendChild(input);

      form.submit();
    </script>
  </body>
  </html>`;
    } else {
      this.body = `<!DOCTYPE html>
  <head>
    <title>Logout</title>
  </head>
  <body>
    ${form}
    Do you want to logout from the OP?
    <button type="submit" form="op.logoutForm" name="logout" value="yes">Yes</button>
    <button type="submit" form="op.logoutForm">Please don't!</button>
  </body>
  </html>`;
    }
  },
  clientCacheDuration: 1 * 24 * 60 * 60, // 1 day in seconds,
  ttl: {
    AccessToken: 1 * 60 * 60, // 1 hour in seconds
    AuthorizationCode: 10 * 60, // 10 minutes in seconds
    IdToken: 1 * 60 * 60, // 1 hour in seconds
    DeviceCode: 10 * 60, // 10 minutes in seconds
    RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
  },
};

module.exports.clients = [
  {
    client_id: config.client_id,
    client_secret: config.client_secret,
    grant_types: config.grant_types,
    response_types_supported: config.response_types_supported,
    redirect_uris: config.redirect_uris,
    token_endpoint_auth_method: config.token_endpoint_auth_method,
    post_logout_redirect_uris: config.post_logout_redirect_uris
  },
];

import config from './config.json';
module.exports.provider = {
  cookies: {
    long: { signed: true, maxAge: (1 * 24 * 60 * 60) * 1000 }, // 1 day in ms
    short: { signed: true },
    keys: ['some secret key', 'and also the old rotated away some time ago', 'and one more'],
  },
  claims: {
    address: ['address'],
    family_name: ['family_name'],
    email: ['email'],
    given_name: ['given_name'],
    preferred_username: ['preferred_username'],
    gender: ['gender'],
    birthdate: ['birthdate'],
    birthcountry: ['birthcountry'],
    birthdepartment: ['birthdepartment'],
    profile: ['family_name', 'gender', 'given_name', 'preferred_username', 'email', 'birthdate', 'birthcountry', 'birthplace', 'birthdepartment'],
  },
  grant_types_supported: ['authorization_code'],
  features: {
    devInteractions: false,
    discovery: true,
  },
  routes: {
    authorization: '/user/authorize',
    end_session: '/user/session/end',
    revocation: '/user/token/revocation',
    token: '/user/token',
    userinfo: '/api/user',
  },
  formats: {
    default: 'opaque',
  },
  interactionUrl: function interactionUrl(ctx, interaction) { // eslint-disable-line no-unused-vars
    return `/interaction/${ctx.oidc.uuid}`;
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

module.exports.clients = [{...config}];

const config = {};

config.jwtSecretConfig = {
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-11l9mafb.auth0.com/.well-known/jwks.json',
};

config.jwtCheckConfig = {
  audience: 'localhost:8003/',
  issuer: 'https://dev-11l9mafb.auth0.com/',
  algorithms: ['RS256'],
};

module.exports = config;

require('dotenv').config();

const { JWKSURI, AUDIENCE, ISSUER } = process.env;

const config = {};

config.jwtSecretConfig = {
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: JWKSURI,
};

config.jwtCheckConfig = {
  audience: AUDIENCE,
  issuer: ISSUER,
  algorithms: ['RS256'],
};

module.exports = config;

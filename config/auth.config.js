require('dotenv').config();
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: process.env.OKTA_CLIENT_ID,
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
});

module.exports.oktaJwtVerifier = oktaJwtVerifier;

const { oktaJwtVerifier } = require("../config");

const tokenVerifier = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error('Authorization header is required');

        const accessToken = req.headers.authorization.trim().split(' ')[1];
        await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
        next();
    } catch (error) {
        next(error.message);
    }
};

module.exports = { tokenVerifier };

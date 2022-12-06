const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 seconds in milliseconds
    max: 1000,
    message: 'You have exceeded the 1000 requests in 60 seconds limit!',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { rateLimiter };

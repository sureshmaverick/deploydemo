const logger = function (req, res, next) {
    console.log(`timeLog: ${Date.now()} endpoint: ${req?.url}`);
    next();
};

module.exports = { logger };

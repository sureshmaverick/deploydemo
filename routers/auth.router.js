const authRouter = require('express').Router();

const { logger } = require('../middlewares');
const { signUp, getUsers } = require('../controllers');

authRouter.use(logger);

authRouter.use('/users', getUsers);

authRouter.post('/signup', signUp);

module.exports = { authRouter };

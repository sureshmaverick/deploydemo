require('dotenv').config();

const moviesRouter = require('express').Router();

const { logger } = require('../middlewares');
const {
    getMovieById,
    getMoviesByType,
    createWatchParty,
    getMoviesByGenre,
    getPromotedMovie,
    searchMoviesByTitle,
} = require('../controllers');

moviesRouter.use(logger);

moviesRouter.get('/movie/:id', getMovieById);

moviesRouter.post('/watchParty', createWatchParty);

moviesRouter.get('/promotedMovie', getPromotedMovie);

moviesRouter.get('/movieList/:type', getMoviesByType);

moviesRouter.get('/movieList/genre/:genre', getMoviesByGenre);

moviesRouter.get('/movieList/search/:title', searchMoviesByTitle);

module.exports = { moviesRouter };

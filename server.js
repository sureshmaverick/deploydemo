const cors = require('cors');
const express = require('express');
const Sentry = require('@sentry/node');
const bodyParser = require('body-parser');

const { authRouter, moviesRouter } = require('./routers');
const { CONFIG, corsOptions, getSentryConfig } = require('./config');
const { errorHandler, rateLimiter, tokenVerifier } = require('./middlewares');

const app = express();
// const port = CONFIG.PORT;
const PORT=process.env.PORT || 3000

Sentry.init(getSentryConfig(app));

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

app.use(rateLimiter);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// healthcheck
app.get('/', (req, res) => {
    res.status(200).send('Server is running...');
});

app.use('/api/auth', authRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if (error.status === 404 || error.status === 500) {
            return true;
        }
        return false;
    },
}));

// checking for the valid headers
// app.use(tokenVerifier);

app.use('/api', moviesRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));

const Sentry = require('@sentry/node');
const { MongoClient } = require("mongodb");

const { CONFIG } = require("../config");

const connectionString = CONFIG.MONGO_URL;

const mongoClient = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function getCollection(collection) {
	try {
		await mongoClient.connect();
		const db = mongoClient.db(CONFIG.DB_NAME);
		return db.collection(collection);
	} catch (error) {
		Sentry.captureException(error);
		console.error(error);
	};
}

async function closeConnection() {
	try {
		await mongoClient.close();
	} catch (error) {
		Sentry.captureException(error);
		console.error(error);
	};
}

module.exports = {
	getCollection,
	closeConnection,
};

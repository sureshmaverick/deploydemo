require('dotenv').config();

const CONFIG = {
	DB_NAME: process.env.DB_NAME || 'xplay',
	PORT: process.env.PORT || 8080,
	MONGO_URL: process.env.MONGO_URL,
};

module.exports = { CONFIG };

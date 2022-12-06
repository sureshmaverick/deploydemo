const Sentry = require('@sentry/node');

const { getCollection } = require('../../db');
const { COLLECTIONS } = require('../constants');
const { createUserOnOkta } = require('./helpers');
const { sendError, sendSuccess } = require('../../utils');

/**
 * @function _getUsers a method to get list of users
 * @example http://localhost:8080/api/auth/users
 * @returns data on success, error on failure
 */
const _getUsers = async () => {
    try {
        const usersCollection = await getCollection(COLLECTIONS.USERS);
        const users = await usersCollection.find().toArray();
		return sendSuccess(users);
    } catch (error) {
        Sentry.captureException(error);
        return sendError(error);
    }
};

/**
 * @function _signUp a method to create a user on Okta
 * @param {Object} body an Object containing request body
 * @example http://localhost:8080/api/auth/signup
 * @returns data on success, error on failure
 */
const _signUp = async (body) => {
    try {
        const _createUserOnOkta = await createUserOnOkta(body);
        if (_createUserOnOkta?.statusCode === 200) {
            const { message, userProfile } = _createUserOnOkta;
            const { id: oktaUserId, profile } = userProfile;
            const user = {
                firstName: profile?.firstName,
                email: profile?.email,
                lastName: profile?.lastName,
                oktaUserId: oktaUserId
            };
            const usersCollection = await getCollection(COLLECTIONS.USERS);
            const insertUser = await usersCollection.insertOne(user);
            const resType = insertUser?.acknowledged ? sendSuccess : sendError;
            return resType({ message });
        } else {
            const { errorCode, errorSummary, statusCode } = _createUserOnOkta;
            return sendError({
                errorCode: errorCode,
                errorSummary: errorSummary,
                statusCode: statusCode
            })
        }
    } catch (error) {
        Sentry.captureException(error);
        return sendError(error);
    }
};

module.exports = {
    _signUp,
    _getUsers
};

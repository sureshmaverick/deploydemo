const { getOtp } = require('../movies.utils');
const { STATIC_VALUES } = require('../../constants');
const { getPastDateByDays } = require("../../../utils");

const getFilterByType = (type) => {
	if (type === 'featured') {
		return { "isFeatured": true };
	} else if (type === 'latest') {
		return {
			"publishedAt": {
				$gte: getPastDateByDays(STATIC_VALUES.PAST_INTERVAL_IN_DAYS)
			}
		};
	}
	return {};
};

const getWatchPartyObject = (body) => ({
	"endedAt": null,
	"movieId": body?.movieId,
	"name": body?.watchPartyName,
	"otp": getOtp(),
	"startedAt": Date.now(),
	"status": "ready"
});

const getWatchPartyUsersArray = (body, watchPartyId) => {
	const watchPartyUsers = [];

	body?.attendees?.forEach((attendee) => {
		watchPartyUsers.push({
			"isHost": attendee === body?.host,
			"isJoined": false,
			"watchPartyId": watchPartyId,
			"userId": attendee
		});
	});

	return watchPartyUsers;
}

module.exports = {
	getFilterByType,
	getWatchPartyObject,
	getWatchPartyUsersArray
};

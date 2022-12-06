function sendError(body) {
	return { error: true, data: body };
}

function sendSuccess(body) {
	return { error: false, data: body };
}

module.exports = { sendError, sendSuccess };

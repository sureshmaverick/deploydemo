const getPastDateByDays = (noOfDays) => {
	return new Date(
		(new Date().getTime() - (noOfDays * 24 * 60 * 60 * 1000))
	).getTime();
};

module.exports = {
	getPastDateByDays
};

const getPaginationIndices = (page, limit) => {
	if (!page || !limit)
		return { undefined, undefined };

	const endIndex = page * limit;
	const startIndex = (page - 1) * limit;
	return { endIndex, startIndex };
};

const paginate = (data, limit, page) => {
	let result = [];
	const { endIndex, startIndex } = getPaginationIndices(page, limit);
	result = data?.slice(startIndex || 0, endIndex || data?.length);
	return result;
};

module.exports = {
	getPaginationIndices,
	paginate
};

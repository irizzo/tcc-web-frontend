function formatDateString(dateString) {
	const splitDateTime = dateString.split(', ');
	const splitDate = splitDateTime[0].split('/');
	return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitDateTime[1]}`;
}

exports.treatUpdatedTaskData = (initialData, newData) => {
	const treatedData = {};
	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null;
	treatedData.description = (newData.description && initialData.description !== newData.description) ? newData.description : null;
	treatedData.categoryCode = (newData.categoryCode && initialData.categoryCode !== newData.categoryCode) ? newData.categoryCode : null;
	treatedData.priorityCode = (newData.priorityCode && initialData.priorityCode !== newData.priorityCode) ? newData.priorityCode : null;
	treatedData.statusCode = (newData.statusCode && initialData.statusCode !== newData.statusCode) ? newData.statusCode : null;
	treatedData.toDoDate = (newData.toDoDate && new Date(formatDateString(initialData.toDoDate)) !== new Date(newData.toDoDate)) ? newData.startDate : null;
	treatedData.dueDate = (newData.dueDate && new Date(formatDateString(initialData.dueDate)) !== new Date(newData.dueDate)) ? newData.dueDate : null;

	return treatedData;
};

exports.treatUpdatedCategoriesData = (initialData, newData) => {
	console.log('[treatUpdatedCategoriesData]');

	const treatedData = {};
	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null;
	treatedData.description = (newData.description && initialData.description !== newData.description) ? newData.description : null;

	return treatedData;
};

exports.treatUpdatedEventData = (initialData, newData) => {
	console.log('[treatUpdatedEventData]');

	const treatedData = {};
	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null;
	treatedData.description = (newData.description && initialData.description !== newData.description) ? newData.description : null;
	treatedData.categoryCode = (newData.categoryCode && initialData.categoryCode !== newData.categoryCode) ? newData.categoryCode : null;
	treatedData.startDate = (newData.startDate && new Date(formatDateString(initialData.startDate)) !== new Date(newData.startDate)) ? newData.startDate : null;
	treatedData.endDate = (newData.endDate && new Date(formatDateString(initialData.endDate)) !== new Date(newData.endDate)) ? newData.endDate : null;

	return treatedData;
};

exports.getCategoryTitle = (categoryCode, categoriesList) => {
	let categoryTitle = '';

	categoriesList.forEach((category) => {
		if (categoryTitle === '' && category.code === categoryCode) {
			categoryTitle = category.title;
			return;
		}
	});

	return categoryTitle;
};
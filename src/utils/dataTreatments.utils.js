exports.treatUpdatedTaskData = (initialData, newData) => {
	const treatedData = {
		title: null,
		description: null,
		toDoDate: null,
		dueDate: null,
		categoryCode: null,
		priorityCode: null
	};

	if(initialData.title !== newData.title) {
		treatedData.title = newData.title;
	}

	if (initialData.description !== newData.description) {
		treatedData.description = newData.description;
	}

	if (initialData.toDoDate !== newData.toDoDate) {
		treatedData.toDoDate = newData.toDoDate;
	}

	if (initialData.dueDate !== newData.dueDate) {
		treatedData.dueDate = newData.dueDate;
	}

	if (initialData.categoryCode !== newData.categoryCode) {
		treatedData.categoryCode = newData.categoryCode;
	}

	if (initialData.priorityCode !== newData.priorityCode) {
		treatedData.priorityCode = newData.priorityCode;
	}

	return treatedData;
};

exports.treatUpdatedCategoriesData = (initialData, newData) => {
	console.log('[treatUpdatedCategoriesData]');

	const treatedData = {
		title: null,
		description: null
	};

	if (initialData.title !== newData.title) {
		treatedData.title = newData.title;
	}

	if (initialData.description !== newData.description) {
		treatedData.description = newData.description;
	}

	console.log('[treatUpdatedCategoriesData] treatedData: ', treatedData);

	return treatedData;
};
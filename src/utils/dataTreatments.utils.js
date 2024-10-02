function formatDateString(dateString) {
	const splitDateTime = dateString.split(', ')
	const splitDate = splitDateTime[0].split('/')
	return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitDateTime[1]}`
}

exports.treatUpdatedTaskData = (initialData, newData) => {
	const treatedData = {}

	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null
	treatedData.description = (newData.description && initialData.description !== newData.description) ? newData.description : null
	treatedData.categoryCode = (newData.categoryCode && initialData.categoryCode !== newData.categoryCode) ? newData.categoryCode : null
	treatedData.priorityCode = (newData.priorityCode && initialData.priorityCode !== newData.priorityCode) ? newData.priorityCode : null
	treatedData.statusCode = (newData.statusCode && initialData.statusCode !== newData.statusCode) ? newData.statusCode : null
	treatedData.toDoDate = (newData.toDoDate && new Date(formatDateString(initialData.toDoDate)).getTime() !== new Date(newData.toDoDate).getTime()) ? newData.toDoDate : null
	treatedData.dueDate = (newData.dueDate && new Date(formatDateString(initialData.dueDate)).getTime() !== new Date(newData.dueDate).getTime()) ? newData.dueDate : null

	return treatedData
}

exports.treatUpdatedCategoriesData = (initialData, newData) => {
	console.log('[treatUpdatedCategoriesData]')

	const treatedData = {}
	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null
	treatedData.description = (newData.description && initialData.description !== newData.description) ? newData.description : null

	return treatedData
}

exports.treatUpdatedEventData = (initialData, newData) => {
	console.log('[treatUpdatedEventData]')

	const treatedData = {}
	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null
	treatedData.description = (newData.description && initialData.description !== newData.description) ? newData.description : null
	treatedData.categoryCode = (newData.categoryCode && initialData.categoryCode !== newData.categoryCode) ? newData.categoryCode : null
	treatedData.startDate = (newData.startDate && new Date(formatDateString(initialData.startDate)).getTime() !== new Date(newData.startDate).getTime()) ? newData.startDate : null
	treatedData.endDate = (newData.endDate && new Date(formatDateString(initialData.endDate)).getTime() !== new Date(newData.endDate).getTime()) ? newData.endDate : null

	return treatedData
}

exports.getCategoryTitle = (categoryCode, categoriesList) => {
	let categoryTitle = ''

	categoriesList.forEach((category) => {
		if (categoryTitle === '' && category.code === categoryCode) {
			categoryTitle = category.title
			return
		}
	})

	if (categoryTitle === '') return null

	return categoryTitle
}

exports.treatUpdatedNoteData = (initialData, newData) => {
	console.log('[treatUpdatedNoteData]')

	const treatedData = {}
	treatedData.title = (newData.title && initialData.title !== newData.title) ? newData.title : null
	treatedData.innerContent = (newData.innerContent && initialData.innerContent !== newData.innerContent) ? newData.innerContent : null
	treatedData.categoryCode = (newData.categoryCode && initialData.categoryCode !== newData.categoryCode) ? newData.categoryCode : null
	return treatedData
}
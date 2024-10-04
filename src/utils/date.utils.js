export function needsRevalidation(updatedAt) {
	console.log('[needsRevalidation]')

	const now = new Date()

	const maxDiff = 3600000
	const dateInTime = updatedAt.getTime()
	const nowInTime = now.getTime()

	if ((nowInTime - dateInTime) > maxDiff) return true

	return false
}

export function convertStampToDate(timestamp) {
	return new Date(timestamp._seconds * 1000).toLocaleString()
}

export function formatDateString(dateString) {
	const splitDateTime = dateString.split(', ')
	const splitDate = splitDateTime[0].split('/')
	return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitDateTime[1]}`
}

export function formatTaskDates(task) {
	if (task.toDoDate) { task.toDoDate = convertStampToDate(task.toDoDate) }

	if (task.dueDate) { task.dueDate = convertStampToDate(task.dueDate) }

	console.log('task w/ formatted dates: ', task)

	return task
}

export function formatTasksListDates (arr) {
	const formatted = arr.map((element) => {
		const aux = element

		if (element.toDoDate) { aux.toDoDate = convertStampToDate(element.toDoDate) }

		if (element.dueDate) { aux.dueDate = convertStampToDate(element.dueDate) }

		return aux
	})

	return formatted
}

export function formatEventDates(event) {
	if (event.startDate) { event.startDate = convertStampToDate(event.startDate) }

	if (event.endDate) { event.endDate = convertStampToDate(event.endDate) }

	console.log('event w/ formatted dates: ', event)

	return event
}

export function formatEventsListDates(events) {
	const formatted = events.map((event) => {
		const aux = event

		if (event.startDate) { aux.startDate = convertStampToDate(event.startDate) }

		if (event.endDate) { aux.endDate = convertStampToDate(event.endDate) }

		return aux
	})

	return formatted
}

export function needsRevalidation(updatedAt) {
	console.log('[needsRevalidation]')

	if (!updatedAt) return true

	const maxDiff = 3600000
	const dateInTime = updatedAt.getTime()
	const now = new Date().getTime()

	if ((now - dateInTime) > maxDiff) return true

	return false
}

export function convertStampToDate(timestamp) {
	console.log('[convertStampToDate]')
	return new Date(timestamp._seconds * 1000)
}

export function formatDateString(dateString) {
	console.log('[formatDateString]')

	const splitDateTime = dateString.split(', ')
	const splitDate = splitDateTime[0].split('/')
	return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}T${splitDateTime[1]}`
}

export function convertDateStringToReadable (dateString) {
	const [ date, time ] = dateString.split('T')
	const formattedDate = date.split('-').reverse().join('/')
	const formattedTime = time.split('.')[0].slice(0, 5)

	return `${formattedDate}, ${formattedTime}`
}

export function convertReadableToDateString(readable) {

}

// export function formatTaskDates(task) {
// 	console.log('[formatTaskDates]')

// 	if (task.toDoDate) { task.toDoDate = convertStampToDate(task.toDoDate).toLocaleString() }

// 	if (task.dueDate) { task.dueDate = convertStampToDate(task.dueDate).toLocaleString() }

// 	return task
// }

// export function formatTasksListDates (arr) {
// 	console.log('[formatTasksListDates]')

// 	const formatted = arr.map((element) => {
// 		const aux = element

// 		if (element.toDoDate) { aux.toDoDate = convertStampToDate(element.toDoDate).toLocaleString() }

// 		if (element.dueDate) { aux.dueDate = convertStampToDate(element.dueDate).toLocaleString() }

// 		return aux
// 	})

// 	return formatted
// }

// export function formatEventDates(event) {
// 	console.log('[formatEventDates]')

// 	if (event.startDate) { event.startDate = convertStampToDate(event.startDate).toLocaleString() }

// 	if (event.endDate) { event.endDate = convertStampToDate(event.endDate).toLocaleString() }

// 	return event
// }

// export function formatEventsListDates(events) {
// 	console.log('[formatEventsListDates]')

// 	// TODO: testar se não funciona chamar a função acima
// 	const formatted = events.map((event) => {
// 		const aux = event

// 		if (event.startDate) { aux.startDate = convertStampToDate(event.startDate).toLocaleString() }

// 		if (event.endDate) { aux.endDate = convertStampToDate(event.endDate).toLocaleString() }

// 		return aux
// 	})

// 	return formatted
// }

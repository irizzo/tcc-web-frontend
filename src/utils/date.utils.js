export function needsRevalidation(updatedAt) {
	if (!updatedAt) return true

	const maxDiff = 3600000
	const dateInTime = updatedAt.getTime()
	const now = new Date().getTime()

	if ((now - dateInTime) > maxDiff) return true

	return false
}

export function convertStampToDate(timestamp) {
	return new Date(timestamp._seconds * 1000)
}

export function formatDateString(dateString) {
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

export function formatTasksDates (tasks) {
	const formatted = tasks.map((task) => {
		const aux = task

		if (task.schedueledDate) { aux.schedueledDate = convertStampToDate(task.schedueledDate) }

		if (task.dueDate) { aux.dueDate = convertStampToDate(task.dueDate) }

		return aux
	})

	return formatted
}

export function formatEventsDates(events) {
	const formatted = events.map((event) => {
		const aux = event

		if (event.startDate) { aux.startDate = convertStampToDate(event.startDate) }

		if (event.endDate) { aux.endDate = convertStampToDate(event.endDate) }

		return aux
	})

	return formatted
}

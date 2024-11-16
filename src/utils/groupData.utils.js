/**
 * Group Events By Month
 * @param {Array<event>} eventsList
 * @param {number} selectedYear
 * @param {number} selectedMonth  // 0 = january, 11 = december
 * @returns
 */
export function groupEventsByMonth(eventsList, selectedYear = null, selectedMonth = null) {
	console.log('[groupEventsByMonth]')

	if (!selectedYear) selectedYear = new Date().getFullYear()
	if (!selectedMonth) selectedMonth = new Date().getMonth()
	const grouped = { selectedMonth: [], past: [], coming: [] }

	eventsList.length > 0 && eventsList.forEach((event) => {
		// console.log('[groupEventsByMonth] event: ', event)
		if (event.startDate.getTime() < new Date().getTime()) return

		if (event.startDate.getFullYear() > selectedYear || (event.startDate.getFullYear() === selectedYear && event.startDate.getMonth() > selectedMonth)) {
			grouped.coming.push(event)
			return
		}

		if (event.startDate.getFullYear() < selectedYear || (event.startDate.getFullYear() === selectedYear && event.startDate.getMonth() < selectedMonth)) {
			grouped.past.push(event)
			return
		}

		grouped.selectedMonth.push(event)
		return
	})

	return grouped
}

export function groupTasksByMonth(tasksList, selectedYear=null, selectedMonth=null) {
	console.log('[groupTasksByMonth]')

	if (!selectedYear) selectedYear = new Date().getFullYear()
	if (!selectedMonth) selectedMonth = new Date().getMonth()
	const grouped = { selectedMonth: [], past: [], coming: [] }

	tasksList.length > 0 && tasksList.forEach((task) => {
		console.log('[groupTasksByMonth] task: ', task)
		if (task.statusCode === 'DONE') return
		
		if (!task.dueDate) {
			console.log('[groupTasksByMonth] coming')

			grouped.coming.push(task)
			return
		}

		if (task.dueDate.getFullYear() > selectedYear || (task.dueDate.getFullYear() === selectedYear && task.dueDate.getMonth() > selectedMonth)) {
			console.log('[groupTasksByMonth] coming')
			grouped.coming.push(task)
			return
		}

		if (task.dueDate.getFullYear() < selectedYear || (task.dueDate.getFullYear() === selectedYear && task.dueDate.getMonth() < selectedMonth)) {
			grouped.past.push(task)
			console.log('[groupTasksByMonth] past')

			return
		}

		console.log('[groupTasksByMonth] selected')

		grouped.selectedMonth.push(task)
		return
	})

	return grouped
}

export function groupTasksByDate(tasksList) {
	console.log('[groupTasksByDate]')

	const todayDate = new Date()
	const withinAWeekRange = new Date()
	withinAWeekRange.setDate(todayDate.getDate() + 7)

	const today = []
	const withinAWeek = []
	const pastDue = []
	const other = []

	tasksList.forEach((task) => {
		// console.log('[groupTasksByDate] task: ', task)

		if (task.statusCode === 'DONE') {
			return
		}

		if (!task.dueDate || (!task.dueDate && !task.schedueledDate)) {
			other.push(task)
			return
		}

		if (task.dueDate.getTime() < todayDate.getTime()) {
			pastDue.push(task)
			return
		}

		if (
			(task.schedueledDate && task.schedueledDate.getFullYear() === todayDate.getFullYear() && task.schedueledDate.getMonth() === todayDate.getMonth() && task.schedueledDate.getDate() === todayDate.getDate()) ||
			(task.dueDate.getFullYear() === todayDate.getFullYear() && task.dueDate.getMonth() === todayDate.getMonth() && task.dueDate.getDate() === todayDate.getDate())
		) {
			today.push(task)
			withinAWeek.push(task)
			return
		}

		if (task.dueDate.getTime() > todayDate.getTime() && task.dueDate.getTime() <= withinAWeekRange.getTime()) {
			withinAWeek.push(task)
			return
		}

		other.push(task)
	})

	return {
		today,
		withinAWeek,
		pastDue,
		other
	}
}

export function groupEventsByDate(eventsList) {
	console.log('[groupEventsByDate]')

	const todayDate = new Date()
	const withinAWeekRange = new Date()
	withinAWeekRange.setDate(withinAWeekRange.getDate() + 7)

	const today = []
	const withinAWeek = []
	const other = []

	eventsList.forEach((event) => {
		// console.log('[groupEventsByDate] event: ', event)

		if (event.startDate.getTime() < todayDate.getTime()) {
			return
		}

		if (event.startDate.getFullYear() === todayDate.getFullYear() && event.startDate.getMonth() === todayDate.getMonth() && event.startDate.getDate() === todayDate.getDate()) {
			today.push(event)
			withinAWeek.push(event)
			return
		}

		if (event.startDate.getTime() > todayDate.getTime() && event.startDate.getTime() <= withinAWeekRange.getTime()) {
			withinAWeek.push(event)
			return
		}

		other.push(event)
	})

	return {
		today,
		withinAWeek,
		other
	}
}
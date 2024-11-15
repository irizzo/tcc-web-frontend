import { convertStampToDate } from '@/utils/date.utils'

export function groupTasksByDate(tasksList) {
	const todayDate = new Date()
	const withinAWeekRange = new Date()
	withinAWeekRange.setDate(todayDate.getDate() + 7)

	const today = []
	const withinAWeek = []
	const pastDue = []
	const other = []

	tasksList.forEach((task) => {
		if (task.statusCode === 'DONE') {
			return
		}

		if (new Date(task.dueDate).getTime() < todayDate.getTime()) {
			pastDue.push(task)
			return
		}

		if (new Date(task.schedueledDate).getTime() === todayDate.getTime() || new Date(task.dueDate).getTime() === todayDate.getTime()) {
			today.push(task)
			withinAWeek.push(task)
			return
		}

		if (new Date(task.dueDate).getTime() > todayDate.getTime() && new Date(task.dueDate).getTime() <= withinAWeekRange.getTime()) {
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
	const todayDate = new Date()
	const withinAWeekRange = new Date()
	withinAWeekRange.setDate(withinAWeekRange.getDate() + 7)

	const today = []
	const withinAWeek = []
	const other = []

	eventsList.forEach((event) => {
		const formattedStartDate = convertStampToDate(event.startDate)

		if (formattedStartDate.getTime() < todayDate.getTime()) {
			return
		}

		if (formattedStartDate.getTime() === todayDate.getTime()) {
			today.push(event)
			withinAWeek.push(event)
			return
		}

		if (formattedStartDate.getTime() > todayDate.getTime() && formattedStartDate.getTime() <= withinAWeekRange.getTime()) {
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
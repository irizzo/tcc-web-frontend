export function groupTasksByDate(tasksList) {
	const today = new Date()
	const withinAWeek = new Date()
	withinAWeek.setDate(today.getDate() + 7)

	console.log('withinAWeek: ', withinAWeek)

	const todaysTasks = []
	const withinAWeekTasks = []
	const otherTasks = []

	tasksList.forEach((task) => {
		if (new Date(task.schedueledDate).getDate() === today.getDate() || new Date(task.DueDate).getDate() === today.getDate()) {
			todaysTasks.push(task)
			return
		}

		if (
			new Date(task.schedueledDate).getDate() > today.getDate() && new Date(task.schedueledDate).getDate() <= withinAWeek.getDate()
			|| new Date(task.dueDate).getDate() > today.getDate() && new Date(task.dueDate).getDate() <= withinAWeek.getDate()
		) {
			withinAWeekTasks.push(task)
			return
		}

		otherTasks.push(task)
	})

	console.log('groupedTasks: ', { todaysTasks, withinAWeekTasks, otherTasks })

	return {
		todaysTasks,
		withinAWeekTasks,
		otherTasks
	}
}

export function groupEventsByDate(eventsList) {
	const today = new Date()
	const withinAWeek = new Date()
	withinAWeek.setDate(today.getDate() + 7)

	console.log('withinAWeek: ', withinAWeek)

	const todaysEvents = []
	const withinAWeekEvents = []
	const otherEvents = []

	eventsList.forEach((event) => {
		if (new Date(event.startDate).getDate() === today.getDate()) {
			todaysEvents.push(event)
			return
		}

		if (new Date(event.startDate).getDate() > today.getDate() && new Date(event.startDate).getDate() <= withinAWeek.getDate()) {
			withinAWeekEvents.push(event)
			return
		}

		otherEvents.push(event)
	})

	console.log('groupedEvents: ', { todaysEvents, withinAWeekEvents, otherEvents })

	return {
		todaysEvents,
		withinAWeekEvents,
		otherEvents
	}
}
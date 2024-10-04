'use client'

import { getAllEventsService } from '@/services/eventServices'
import { listAllTasksService } from '@/services/taskServices'
import { getAllCategoriesService } from '@/services/categoryServices'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserTasksContext, UserEventsContext } from '@/hooks'

import * as locale from '@/resources/locale'
import routesMap from '@/resources/routesMap'

import Loading from '@/components/Loading'
import { Board } from '@/components/Board'
import { EventCard, TaskCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'
import { groupTasksByDate, groupEventsByDate } from '@/utils/groupData.utils'

export default function Contents() {
	const [categories, setCategories] = useState({})
	const [today, setToday] = useState({ tasks: [], events: [] })
	const [withinAWeek, setWithinAWeek] = useState({ tasks: [], events: [] })
	const [otherTasks, setOtherTasks] = useState([])
	const [otherEvents, setOtherEvents] = useState([])

	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (userCategories.categoriesList === null || userTasks.tasksList === null || userEvents.eventsList === null) {
			setIsLoading(true)
			setTimeout(() => { }, 2000)
		}

		let aux = {}
		userCategories.categoriesList.forEach((category) => {
			aux[category.code] = category.title
		})
		setCategories(aux)

		const sortedTasks = groupTasksByDate(userTasks.tasksList)
		const sortedEvents = groupEventsByDate(userEvents.eventsList)

		setToday({ tasks: sortedTasks.todaysTasks, events: sortedEvents.todaysEvents })
		setWithinAWeek({ tasks: sortedTasks.withinAWeekTasks, events: sortedEvents.withinAWeekEvents })
		setOtherTasks([...sortedTasks.otherTasks])
		setOtherEvents([...sortedEvents.otherEvents])

		setIsLoading(false)
	}, [])

	if (isLoading) return <Loading />

	function TodayBoardContent() {
		return (
			<>
				{
					today.events && today.events.length > 0 ?
						today.events.map((event) => {
							return <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />
						})
						:
						null
				}
				{
					today.tasks && today.tasks.length > 0 ?
						today.tasks.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
						})
						:
						null
				}
			</>
		)
	}

	function ThisWeekBoardContent() {
		return (
			<>
				{
					withinAWeek.events && withinAWeek.events.length > 0 ?
						withinAWeek.events.map((event) => {
							return <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />
						})
						:
						null
				}
				{
					withinAWeek.tasks && withinAWeek.tasks.length > 0 ?
						withinAWeek.tasks.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
						})
						:
						null
				}
			</>
		)
	}

	return (
		<>
			{console.log('today: ', today)}
			{console.log('withinAWeek: ', withinAWeek)}

			<Board title={locale.groupDataByTitle.today} path={null}>
				{
					today.events && today.events.length > 0 || today.tasks && today.tasks.length > 0 ?
						<TodayBoardContent />
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.today} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.thisWeek} path={null}>
				{
					withinAWeek.events && withinAWeek.events.length > 0 || withinAWeek.tasks && withinAWeek.tasks.length > 0 ?
						<ThisWeekBoardContent />
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.thisWeek} />
				}
			</Board>

			<Board title={'Mais ' + locale.pagesTitles.tasks.all} path={routesMap.tasks.new}>
				{
					otherTasks && otherTasks.length > 0 ?
						otherTasks.map((task) => <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board title={'Mais ' + locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					otherEvents && otherEvents.length > 0 ?
						otherEvents.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>
		</>
	)
}


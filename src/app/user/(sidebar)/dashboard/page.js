'use client'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserTasksContext, UserEventsContext } from '@/hooks'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import Loading from '@/components/Loading'
import { Board } from '@/components/Board'
import { EventCard, TaskCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'
import { groupTasksByDate, groupEventsByDate } from '@/utils/groupData.utils'

export default function Dashboard() {
	console.log('[DASHBOARD]')
	const [categories, setCategories] = useState({})
	const [today, setToday] = useState({ tasks: [], events: [] })
	const [withinAWeek, setWithinAWeek] = useState({ tasks: [], events: [] })
	const [otherTasks, setOtherTasks] = useState([])
	const [otherEvents, setOtherEvents] = useState([])

	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
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
		}, 1000)

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
			<Board title={locale.groupDataByTitle.today} path={null}>
				{/* {console.log('categories: ', categories)}
				{console.log('userCategories: ', userCategories)}
				{console.log('userTasks: ', userTasks)}
				{console.log('userEvents: ', userEvents)} */}
				{
					today.events && today.events.length > 0 || today.tasks && today.tasks.length > 0 ?
						<TodayBoardContent />
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.today} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.withinAWeek} path={null}>
				{
					withinAWeek.events && withinAWeek.events.length > 0 || withinAWeek.tasks && withinAWeek.tasks.length > 0 ?
						<ThisWeekBoardContent />
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.withinAWeek} />
				}
			</Board>

			<Board title={'Mais ' + locale.pagesTitles.tasks.base} path={routesMap.tasks.new}>
				{
					otherTasks && otherTasks.length > 0 ?
						otherTasks.map((task) => <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board title={'Mais ' + locale.pagesTitles.events.base} path={routesMap.events.new}>
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


'use client'

import { useEffect, useState, useContext } from 'react'
import { UserInfoContext, UserCategoriesContext, UserTasksContext, UserEventsContext, UserNotesContext } from '@/hooks'

import { cache } from 'react'

import * as locale from '@/resources/locale'
import routesMap from '@/resources/routesMap'
import { getAllEventsService } from '@/services/eventServices'
import { listAllTasksService } from '@/services/taskServices'
import { getAllCategoriesService } from '@/services/categoryServices'

import Loading from '@/components/Loading'
import { Board } from '@/components/Board'
import { EventCard, TaskCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'

export default function Contents() {
	// const [ categories, setCategories ] = useState({})
	// const [ taskList, setTaskList ] = useState([])
	// const [ filteredTaskList, setFilteredTaskList ] = useState([])
	// const [ eventList, setEventList ] = useState([])
	// const [ filteredEventList, setFilteredEventList ] = useState([])
	// const { userInfo, setUserInfo } = useContext(UserInfoContext)
	// const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	// const { userTasks, setUserTasks } = useContext(UserTasksContext)
	// const { userEvents, setUserEvents } = useContext(UserEventsContext)
	// const { userNotes, setUserNotes } = useContext(UserNotesContext)

	const [ isLoading, setIsLoading ] = useState(false)

	// useEffect(() => {
	// 	const loadCategories = cache(async () => {
	// 		const res = await getAllCategoriesService()
	// 		if (!res.success) {
	// 			throw new Error(res.message)
	// 		}

	// 		const categoriesList = [ ...res.result ]
	// 		let aux = {}

	// 		categoriesList.forEach((category) => {
	// 			aux[category.code] = category.title
	// 		})

	// 		setCategories(aux)
	// 	})

	// 	async function loadTasks() {
	// 		setIsLoading(true)
	// 		const res = await listAllTasksService()

	// 		if (!res.success) {
	// 			throw new Error(res.message)
	// 		}

	// 		setTaskList([ ...res.result ])
	// 		setIsLoading(false)
	// 	}

	// 	async function loadEvents() {
	// 		setIsLoading(true)
	// 		const res = await getAllEventsService()

	// 		if (!res.success) {
	// 			throw new Error(res.message)
	// 		}

	// 		setEventList([ ...res.result ])
	// 		setIsLoading(false)
	// 	}
	// 	try {
	// 		loadCategories()
	// 		loadTasks()
	// 		loadEvents()
	// 	} catch (error) {
	// 		console.log('error useEffect: ', error)
	// 		alert(error)
	// 	}
	// }, [])

	if (isLoading) return <Loading />

	return (
		<>
			<h1>dashboard</h1>
			{/* <Board title={locale.pagesTitles.tasks.all} path={routesMap.tasks.new}>
				{
					taskList && taskList.length > 0 ?
						taskList.map((task) => <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>
			<Board title={locale.pagesTitles.tasks.all} path={routesMap.tasks.new}>
				{
					taskList && taskList.length > 0 ?
						taskList.map((task) => <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					eventList.length > 0 ?
						eventList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]}/>)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>
			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					eventList.length > 0 ?
						eventList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board> */}
		</>
	)
}


'use client'

import { useEffect, useState } from 'react'
// import { unstable_cache } from 'next/cache'
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
	const [ categoriesList, setCategoriesList ] = useState([])
	const [ taskList, setTaskList ] = useState([])
	const [ eventList, setEventList ] = useState([])
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		const loadCategories = cache(async () => {
			const res = await getAllCategoriesService()
			if (!res.success) {
				throw new Error(res.message)
			}
			setCategoriesList([ ...res.result ])
		})

		async function loadTasks() {
			setIsLoading(true)
			const res = await listAllTasksService()

			if (!res.success) {
				throw new Error(res.message)
			}

			setTaskList([ ...res.result ])
			setIsLoading(false)
		}

		async function loadEvents() {
			setIsLoading(true)
			const res = await getAllEventsService()

			if (!res.success) {
				throw new Error(res.message)
			}

			setEventList([ ...res.result ])
			setIsLoading(false)
		}
		try {
			loadCategories()
			loadTasks()
			loadEvents()
		} catch (error) {
			console.log('error useEffect: ', error)
			alert(error)
		}
	}, [])

	if (isLoading) return <Loading />

	return (
		<>
			{/* <h1>{locale.pagesTitles.dashboard}</h1> */}

			<Board title={locale.pagesTitles.tasks.all} path={routesMap.tasks.new}>
				{
					taskList && taskList.length > 0 ?
						taskList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					eventList.length > 0 ?
						eventList.map((event) => {
							return <EventCard key={event.id} eventInfo={event} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

		</>
	)
}


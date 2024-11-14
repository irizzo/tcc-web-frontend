'use client'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserTasksContext } from '@/hooks'

import { Board } from '@/components/Board'
import { TaskCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'
import Loading from '@/components/Loading'

export default function AllTasksPage() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)

	const [ categories, setCategories ] = useState({})
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		if (userCategories.categoriesList === null || userTasks.tasksList === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}

		let aux = {}
		userCategories.categoriesList.forEach((category) => {
			aux[category.code] = category.title
		})
		setCategories(aux)

	}, [ userCategories.categoriesList, userTasks.tasksList ])

	if (isLoading) return <Loading />

	return (
		<>
			<Board title={locale.groupDataByTitle.all} path={routesMap.tasks.new}>
				{
					userTasks.tasksList !== null && userTasks.tasksList.length > 0 ?
						userTasks.tasksList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.dueSoon} path={routesMap.tasks.new}>
				{
					userTasks.tasksList !== null && userTasks.tasksList.length > 0 ?
						userTasks.tasksList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board path={routesMap.tasks.new} title={locale.groupDataByTitle.pastDue}>
				{
					userTasks.tasksList !== null && userTasks.tasksList.length > 0 ?
						userTasks.tasksList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>

			<Board path={routesMap.tasks.new} title={locale.groupDataByTitle.all}>
				{
					userTasks.tasksList !== null && userTasks.tasksList.length > 0 ?
						userTasks.tasksList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>
		</>
	)
}

'use client'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserTasksContext } from '@/hooks'

import { Board } from '@/components/Board'
import { TaskCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'
import Loading from '@/components/Loading'
import { groupTasksByMonth } from '@/utils/groupData.utils'
import Calendar from '@/components/Calendar'

export default function AllTasksPage() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)

	const [ categories, setCategories ] = useState({})
	const [ isLoading, setIsLoading ] = useState(false)
	const [ sortedTasks, setSortedTasks ] = useState({})
	const [ selectedDate, setSelectedDate ] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() })

	useEffect(() => {
		if (userCategories.categoriesList === null || userTasks.tasksList === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		}

		let aux = {}
		userCategories.categoriesList.forEach((category) => {
			aux[category.code] = category.title
		})
		setCategories(aux)

		const sorted = groupTasksByMonth(userTasks.tasksList)
		setSortedTasks(sorted)

	}, [ userCategories.categoriesList, userTasks.tasksList ])

	if (isLoading) return <Loading />

	function OtherTasksBoard() {
		return(
			<>
				{
					sortedTasks.coming && sortedTasks.coming.length > 0 ?
						sortedTasks.coming.map((task) => {
							return <TaskCard key = { task.id } taskInfo = { task } categoryTitle = { categories[task.categoryCode]} />
						})
						:
						null
				}
				{
					sortedTasks.past && sortedTasks.past.length > 0 ?
						(
							sortedTasks.past.map((task) => {
								return <TaskCard pastDate key={task.id} taskInfo={task} categoryTitle={categories[task.categoryCode]} />
							}))
						:
						null
				}
			</>
		)
	}

	return (
		<>
			<Calendar events={null} tasks={sortedTasks.selectedMonth} />
			<Board path={routesMap.tasks.new} title={locale.groupDataByTitle.other}>
				{
					sortedTasks.coming && sortedTasks.coming.length > 0 || sortedTasks.past && sortedTasks.past.length > 0 ?
						<OtherTasksBoard />
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
				}
			</Board>
		</>
	)
}

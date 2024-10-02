'use client'

import { useState, useContext, useEffect } from 'react'
import { UserInfoContext, UserCategoriesContext, UserTasksContext, UserEventsContext, UserNotesContext } from '@/hooks'

import { needsRevalidation } from '@/utils/date.utils'
import { getUserInfo } from '@/services/userServices'
import { getAllCategoriesService } from '@/services/categoryServices'
import { listAllTasksService } from '@/services/taskServices'
import { getAllEventsService } from '@/services/eventServices'
import { getAllNotesService } from '@/services/notesService'

import Loading from '@/components/Loading'
import SideBar from '@/components/SideBar'
import { DashboardPageContainer } from '@/components/PageContainer'
import './userPages.scss'

export default function UserPagesLayout({ children }) {
	const { userInfo, setUserInfo } = useContext(UserInfoContext)
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)
	const { userNotes, setUserNotes } = useContext(UserNotesContext)

	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		async function loadUserInfo() {
			if (!userInfo.data || needsRevalidation(userInfo.updatedAt)) {
				console.log('revalidate userInfo')
				const res = await getUserInfo()

				setUserInfo({ data: res.result, updatedAt: new Date() })
			}
		}

		async function loadCategories() {
			if (!userCategories.categoriesList || needsRevalidation(userCategories.updatedAt)) {
				console.log('revalidate userCategories')
				const res = await getAllCategoriesService()

				setUserCategories({ categoriesList: res.result, updatedAt: new Date() })
			}
		}

		async function loadTasks() {
			if (!userTasks.tasksList || needsRevalidation(userTasks.updatedAt)) {
				console.log('revalidate userTasks')
				const res = await listAllTasksService()

				setUserTasks({ taskList: res.result, updatedAt: new Date() })
			}
		}

		async function loadEvents() {
			if (!userEvents.eventsList || needsRevalidation(userEvents.updatedAt)) {
				console.log('revalidate userEvents')
				const res = await getAllEventsService()

				setUserEvents({ eventsList: res.result, updatedAt: new Date() })
			}
		}

		async function loadNotes() {
			if (!userNotes.notesList || needsRevalidation(userNotes.updatedAt)) {
				console.log('revalidate userNotes')
				const res = await getAllNotesService()

				setUserNotes({ notesList: res.result, updatedAt: new Date() })
			}
		}

		try {
			console.log('load resources')
			setIsLoading(true)
			loadUserInfo()
			loadCategories()
			loadTasks()
			loadEvents()
			loadNotes()
			setIsLoading(false)
		} catch (error) {
			alert(error)
		}

	}, [ ])

	if (isLoading) return <Loading />

	return (
		<DashboardPageContainer>
			<SideBar />
			<main className='flex flex--row user-pages__main'>
				{children}
			</main>
		</DashboardPageContainer>
	)
}

'use client'

import { useContext, useEffect, Suspense } from 'react'
import { UserInfoContext, UserCategoriesContext, UserTasksContext, UserEventsContext, UserNotesContext, UserAccessStateContext } from '@/hooks'

import { formatEventsDates, formatTasksDates, needsRevalidation } from '@/utils/date.utils'
import { getUserInfo } from '@/services/userServices'
import { getAllCategoriesService } from '@/services/categoryServices'
import { listAllTasksService } from '@/services/taskServices'
import { getAllEventsService } from '@/services/eventServices'
import { getAllNotesService } from '@/services/notesService'

import './userPages.scss'

export default function UserPagesLayout({ children }) {
	const { userInfo, setUserInfo } = useContext(UserInfoContext)
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)
	const { userNotes, setUserNotes } = useContext(UserNotesContext)
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext)

	useEffect(() => {
		async function loadUserInfo() {
			if (!userInfo.data || needsRevalidation(userInfo.updatedAt)) {
				const res = await getUserInfo()
				setUserInfo({ data: { email: res.result.email, firstName: res.result.firstName, lastName: res.result.lastName }, updatedAt: new Date() })
			}
		}

		async function loadCategories() {
			if (!userCategories?.categoriesList || needsRevalidation(userCategories.updatedAt)) {
				const res = await getAllCategoriesService()

				setUserCategories({ categoriesList: res.result, updatedAt: new Date() })
			}
		}

		async function loadTasks() {
			if (!userTasks.tasksList || needsRevalidation(userTasks.updatedAt)) {
				const res = await listAllTasksService()

				setUserTasks({ tasksList: formatTasksDates(res.result), updatedAt: new Date() })
			}
		}

		async function loadEvents() {
			if (!userEvents.eventsList || needsRevalidation(userEvents.updatedAt)) {
				const res = await getAllEventsService()

				setUserEvents({ eventsList: formatEventsDates(res.result), updatedAt: new Date() })
			}
		}

		async function loadNotes() {
			if (!userNotes.notesList || needsRevalidation(userNotes.updatedAt)) {
				const res = await getAllNotesService()

				setUserNotes({ notesList: res.result, updatedAt: new Date() })
			}
		}

		console.debug('load resources')
		loadUserInfo()
		loadCategories()
		loadTasks()
		loadEvents()
		loadNotes()
		setUserAccessState({ loggedIn: true, updatedAt: new Date() })

	}, [])


	return (
		<>
			{children}
		</>
	)
}

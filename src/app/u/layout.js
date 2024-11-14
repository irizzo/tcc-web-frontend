'use client'

// import { useState, useContext, useEffect } from 'react'
// import { UserInfoContext, UserCategoriesContext, UserTasksContext, UserEventsContext, UserNotesContext, UserAccessStateContext } from '@/hooks'

// import { needsRevalidation } from '@/utils/date.utils'
// import { getUserInfo } from '@/services/userServices'
// import { getAllCategoriesService } from '@/services/categoryServices'
// import { listAllTasksService } from '@/services/taskServices'
// import { getAllEventsService } from '@/services/eventServices'
// import { getAllNotesService } from '@/services/notesService'

import Loading from '@/components/Loading'

export default function UPagesLayout({ children }) {
	// const { userInfo, setUserInfo } = useContext(UserInfoContext)
	// const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	// const { userTasks, setUserTasks } = useContext(UserTasksContext)
	// const { userEvents, setUserEvents } = useContext(UserEventsContext)
	// const { userNotes, setUserNotes } = useContext(UserNotesContext)
	// const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext)

	const [isLoading, setIsLoading] = useState(true)

	// useEffect(() => {
	// 	async function loadUserInfo() {
	// 		if (!userInfo.data || needsRevalidation(userInfo.updatedAt)) {
	// 			console.log('revalidate userInfo')
	// 			const res = await getUserInfo()
	// 			setUserInfo({ data: { email: res.result.email, firstName: res.result.firstName, lastName: res.result.lastName }, updatedAt: new Date() })
	// 		}
	// 	}

	// 	async function loadCategories() {
	// 		if (!userCategories?.categoriesList || needsRevalidation(userCategories.updatedAt)) {
	// 			console.log('revalidate userCategories')
	// 			const res = await getAllCategoriesService()

	// 			setUserCategories({ categoriesList: res.result, updatedAt: new Date() })
	// 		}
	// 	}

	// 	async function loadTasks() {
	// 		if (!userTasks.tasksList || needsRevalidation(userTasks.updatedAt)) {
	// 			console.log('revalidate userTasks')
	// 			const res = await listAllTasksService()

	// 			setUserTasks({ tasksList: res.result, updatedAt: new Date() })
	// 		}
	// 	}

	// 	async function loadEvents() {
	// 		if (!userEvents.eventsList || needsRevalidation(userEvents.updatedAt)) {
	// 			console.log('revalidate userEvents')
	// 			const res = await getAllEventsService()

	// 			setUserEvents({ eventsList: res.result, updatedAt: new Date() })
	// 		}
	// 	}

	// 	async function loadNotes() {
	// 		if (!userNotes.notesList || needsRevalidation(userNotes.updatedAt)) {
	// 			console.log('revalidate userNotes')
	// 			const res = await getAllNotesService()

	// 			setUserNotes({ notesList: res.result, updatedAt: new Date() })
	// 		}
	// 	}

	// 	try {
	// 		console.log('load resources')
	// 		loadUserInfo()
	// 		loadCategories()
	// 		loadTasks()
	// 		loadEvents()
	// 		loadNotes()
	// 		setUserAccessState({ loggedIn: true, updatedAt: new Date() })

	// 		setTimeout(() => {
	// 			setIsLoading(false)
	// 		}, 2000)

	// 	} catch (error) {
	// 		console.log('[USER/LAYOUT] error: ', error)
	// 		alert(error)
	// 	}

	// }, [])

	// if (isLoading) return <Loading />

	return (
		<>
			{children}
		</>
	)
}

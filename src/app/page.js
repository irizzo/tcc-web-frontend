'use client'

import { useContext, useState, useEffect } from 'react'
import { UserInfoContext, UserAccessStateContext, UserNotesContext, UserTasksContext, UserEventsContext, UserTimersContext, UserCategoriesContext } from '@/hooks'

import Loading from '@/components/Loading'
import { LinkButton } from '@/components/Buttons'
import Menu from '@/components/Menu'

import { appInfo, actionsTitles } from '@/resources/locale'
import routesMap from '@/resources/routesMap'
import { clearTokenCookie } from '@/utils'

import './home.scss'

export default function Home() {
	const { userInfo, setUserInfo } = useContext(UserInfoContext)
	const { UserAccessState, setUserAccessState } = useContext(UserAccessStateContext)
	const { userNotes, setUserNotes } = useContext(UserNotesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)
	const { userTimers, setUserTimers } = useContext(UserTimersContext)
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)

	const [ isLoading, setIsLoading ] = useState(true)

	async function reset() {
		await clearTokenCookie()
		setUserInfo(null) // TODO: reset com os valores certos
		setUserAccessState(null)
		setUserNotes(null)
		setUserTasks(null)
		setUserEvents(null)
		setUserTimers(null)
		setUserCategories(null)
		setIsLoading(false)
	}

	useEffect(() => {
		reset()
	}, [])

	if (isLoading) return <Loading />

	return (
		<div className='flex home__container'>
			{console.log('userInfo: ', userInfo)}
			{console.log('UserAccessState: ', UserAccessState)}
			{console.log('userNotes: ', userNotes)}
			{console.log('userTasks: ', userTasks)}
			{console.log('userEvents: ', userEvents)}
			{console.log('userTimers: ', userTimers)}
			{console.log('userCategories: ', userCategories)}

			<Menu buttonsShown />
			<main className='home__main'>
				<h1 className='home__main__title'>{appInfo.name}</h1>
				<p className='home__main__subtitle'>{appInfo.description}</p>

				<LinkButton path={routesMap.contents} title={actionsTitles.start} variant="filled"/>
			</main>
		</div>
	)
}

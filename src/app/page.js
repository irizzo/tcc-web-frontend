'use client'

import { useContext, useState, useEffect } from 'react'
import { UserInfoContext, UserAccessStateContext, UserNotesContext, UserTasksContext, UserEventsContext, UserTimersContext, UserCategoriesContext } from '@/hooks'

import Image from 'next/image'
import Loading from '@/components/Loading'
import { LinkButton } from '@/components/Buttons'
import Menu from '@/components/Menu'
import { DefaultPageContainer } from '@/components/PageContainer'

import { appInfo, actionsTitles } from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'
import defaultContextData from '@/resources/defaultContextData'
import { clearTokenCookie } from '@/utils'

import './home.scss'
import { FaSync } from 'react-icons/fa'

export default function Home() {
	const { userInfo, setUserInfo } = useContext(UserInfoContext)
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext)
	const { userNotes, setUserNotes } = useContext(UserNotesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)
	const { userTimers, setUserTimers } = useContext(UserTimersContext)
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)

	const [ isLoading, setIsLoading ] = useState(true)

	async function reset() {
		await clearTokenCookie()
		setUserInfo(defaultContextData.userInfo)
		setUserAccessState(defaultContextData.userAccess)
		setUserNotes(defaultContextData.userNotes)
		setUserTasks(defaultContextData.userTasks)
		setUserEvents(defaultContextData.userEvents)
		setUserTimers(defaultContextData.userTimers)
		setUserCategories(defaultContextData.userCategories)
		setIsLoading(false)
	}

	useEffect(() => {
		reset()
	}, [])

	if (isLoading) return <Loading />

	return (
		<DefaultPageContainer>
			<Menu />
			<main className='flex flex--row home__main'>
				<Image
					className='home__image'
					alt='ilustração escrevendo um artigo'
					src='writing-a-blog.svg'
					height={600}
					width={700}
				/>
				<div className='flex home__content'>
					<h1 className='home__content__title'>{appInfo.name}</h1>
					<p className='home__content__subtitle'>{appInfo.description}</p>
					<LinkButton path={routesMap.about.base} title={actionsTitles.start} variant='filled' />
				</div>
			</main>
		</DefaultPageContainer>
	)
}

'use client'

import { useContext } from 'react'
import { UserAccessStateContext } from '@/hooks'

import SideBar from '@/components/SideBar'
import Menu from '@/components/Menu'
import { DashboardPageContainer, DefaultPageContainer } from '@/components/PageContainer'

import './publicPages.scss'

export default function PublicPagesLayout({ children }) {
	const { userAccessState } = useContext(UserAccessStateContext)
	console.log('userAccessState.loggedIn: ', userAccessState.loggedIn)
	

	// if (userAccessState.loggedIn) {
	// 	return (
	// 		<DashboardPageContainer>
	// 			<SideBar />
	// 			{console.debug('loggedIn')}
	// 			<main className='flex user-pages__main'>
	// 				{children}
	// 			</main>
	// 		</DashboardPageContainer>
	// 	)
	// } else {
		return (
			<DefaultPageContainer>
				{!userAccessState.loggedIn && <Menu buttonsShown />}
				<main className='flex flex--center public-pages__main'>
					{children}
				</main>
			</DefaultPageContainer>
		)
	// }
}

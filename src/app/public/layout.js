'use client'

import { useContext } from 'react'
import { UserAccessStateContext } from '@/hooks'

import SideBar from '@/components/SideBar'
import Menu from '@/components/Menu'
import { DashboardPageContainer, DefaultPageContainer } from '@/components/PageContainer'

import './publicPages.scss'

export default function GeneralPagesLayout({ children }) {
	const { userAccessState } = useContext(UserAccessStateContext)

	if (userAccessState.loggedIn) {
		return (
			<DashboardPageContainer>
				<SideBar />
				<main className='flex flex--row user-pages__main'>
					{children}
				</main>
			</DashboardPageContainer>
		)
	} else {
		return (
			<DefaultPageContainer>
				<Menu buttonsShown />
				<main className='flex flex--center gen-pages__main'>
					{children}
				</main>
			</DefaultPageContainer>
		)
	}
}

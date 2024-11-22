'use client'
import { useContext } from 'react'
import { UserAccessStateContext } from '@/hooks'
import { Menu } from '@/components/Menu'
import { DefaultPageContainer } from '@/components/PageContainer'

import './publicPages.scss'

export default function PublicPagesLayout({ children }) {
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext)
		return (
			<DefaultPageContainer>
				{!userAccessState.loggedIn && <Menu />}
				<main className='flex flex--center public-pages__main'>
					{children}
				</main>
			</DefaultPageContainer>
		)
}

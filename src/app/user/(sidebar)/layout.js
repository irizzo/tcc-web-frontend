'use client'
import SideBar from '@/components/SideBar'
import { DashboardPageContainer } from '@/components/PageContainer'

import '../userPages.scss'

export default function sidebarPagesLayout({ children }) {
	return (
		<DashboardPageContainer>
			<SideBar />
			<main className='flex flex--row user-pages__main'>
				{children}
			</main>
		</DashboardPageContainer>
	)
}

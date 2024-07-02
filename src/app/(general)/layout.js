'use client';

import verifyUserAuth from '@/utils/verifyUserAuth';

import { useContext, useCallback, useEffect } from 'react';
import { UserAccessStateContext } from '@/hooks';

import './generalPages.scss';

import SideBar from '@/components/SideBar';
import Menu from '@/components/Menu';
import { DashboardPageContainer, DefaultPageContainer } from '@/components/PageContainer';

export default function GeneralPagesLayout({ children }) {
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	const isUserLogged = useCallback(
		async () => { verifyUserAuth(userAccessState, setUserAccessState); },
		[ setUserAccessState, userAccessState ]
	);

	useEffect(() => {
		isUserLogged();
	}, [ isUserLogged ]);

	if (userAccessState) {
		return (
			<DashboardPageContainer>
				<SideBar />
				<main className='flex flex--row user-pages__main'>
					{children}
				</main>
			</DashboardPageContainer>
		);
	} else {
		return (
			<DefaultPageContainer>
				<Menu buttonsShown />
				<main className='flex flex--center gen-pages__main'>
					{children}
				</main>
			</DefaultPageContainer>
		);
	}
}

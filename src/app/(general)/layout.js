'use client';

import { useContext, useCallback, useEffect } from 'react';
import { UserAccessStateContext } from '@/hooks';

import SideBar from '@/components/SideBar';
import Menu from '@/components/Menu';
import { DashboardPageContainer } from '@/components/PageContainer';

import verifyUserAuth from '@/utils/verifyUserAuth';

export default function GeneralPagesLayout({ children }) {
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	const isUserLogged = useCallback(
		async () => { verifyUserAuth(userAccessState, setUserAccessState); },
		[ setUserAccessState, userAccessState ]
	);

	useEffect(() => {
		isUserLogged();
	}, [ isUserLogged ]);

	return (
		<DashboardPageContainer>
			{userAccessState && <SideBar />}
			{!userAccessState && <Menu buttonsShown />}
			{children}
		</DashboardPageContainer>
	);
}

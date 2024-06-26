// 'use client';

import { verifyUserAuthService } from '@/services/userAccessServices';
import { navigateTo } from '@/services/general';

export default async function _verifyUserAuth(userAuthState, setUserAuthState) {
	if (userAuthState) {
		console.log(`[verifyUserAuth] userAuthState = ${userAuthState}`);

		const isUserAuthorized = await verifyUserAuthService();
		if (isUserAuthorized.success) {
			console.log('[verifyUserAuth] logged in (AUTHORIZED)');
			navigateTo({ path: '/dashboard' });
		} else {
			console.log('[verifyUserAuth] NOT logged in (UNAUTHORIZED)');
			setUserAuthState(false);
			return;
		}
	}
}
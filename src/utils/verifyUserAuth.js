import { verifyUserAuthService } from '@/services/userAccessServices';
import { getTokenCookie, navigateTo } from '@/services/general';

export default async function _verifyUserAuth(userAuthState, setUserAuthState) {
	const tokenCookie = await getTokenCookie();

	if (userAuthState || (tokenCookie && tokenCookie.value)) {
		console.log(`[verifyUserAuth] userAuthState = ${userAuthState}`);

		const isUserAuthorized = await verifyUserAuthService();
		if (isUserAuthorized.success) {
			console.log('[verifyUserAuth] logged in (AUTHORIZED)');
			setUserAuthState(true);
			navigateTo({ path: '/dashboard' });
		} else {
			console.log('[verifyUserAuth] NOT logged in (UNAUTHORIZED)');
			setUserAuthState(false);
			return;
		}
	}
}
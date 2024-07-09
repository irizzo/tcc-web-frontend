import { getTokenCookie, navigateTo } from '@/utils';
import { verifyUserAuthService } from '@/services/userAccessServices';

import routesMap from '@/resources/routesMap';

export default async function verifyUserAuth(userAuthState, setUserAuthState) {
	const tokenCookie = await getTokenCookie();

	// if (tokenCookie && tokenCookie.value) {
	// 	console.log(`[verifyUserAuth] userAuthState = ${userAuthState}`);

	// 	const isUserAuthorized = await verifyUserAuthService();

	// 	if (isUserAuthorized.success) {
	// 		console.log('[verifyUserAuth] logged in (AUTHORIZED)');

	// 		setUserAuthState(true);
	// 		// navigateTo({ path: routesMap.dashboard });
	// 		alert('logado'); // TODO: colocar contexto da página em que se está
	// 	} else {
	// 		console.log('[verifyUserAuth] NOT logged in (UNAUTHORIZED)');

	// 		setUserAuthState(false);
	// 		navigateTo({ path: routesMap.login });
	// 	}
	// }
}
'use server';

/* User Access Services
	* sign up
	* login
	* logout
	* verify user access
*/

import { cookies } from 'next/headers';

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const baseAccessPath = '/user-access';

export async function verifyUserAccessService() {
	console.log('[verifyUserAccessService]');

	const cookieStore = cookies();
	const tokenCookie = cookieStore.get('token');
	console.log(`[verifyUserAccessService] tokenCookie = ${JSON.stringify(tokenCookie)}`);

	const fetchUserAccessRes = await httpClient.get({ path: `${baseAccessPath}/`});

	const verifyUserAccessRes = {
		success: fetchUserAccessRes.success,
		result: fetchUserAccessRes?.result,
		message: messagesDictionary[fetchUserAccessRes.code] ? messagesDictionary[fetchUserAccessRes.code] : (
			fetchUserAccessRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	return verifyUserAccessRes;
}

export async function verifyUserAuthService() {
	console.log('[verifyUserAuthService]');

	const cookieStore = cookies();
	const tokenCookie = cookieStore.get('token');
	console.log(`[verifyUserAuthService] path = ${baseAccessPath}/${tokenCookie.value}`);

	const fetchUserAuthRes = await httpClient.get({ path: `${baseAccessPath}/${tokenCookie.value}` });

	const verifyUserAuthRes = {
		success: fetchUserAuthRes.success,
		result: fetchUserAuthRes?.result,
		message: messagesDictionary[fetchUserAuthRes.code] ? messagesDictionary[fetchUserAuthRes.code] : (
			fetchUserAuthRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	return verifyUserAuthRes;
}


/** Sign Up Service
 *
 * @param {{ firstName: String, lastName: String, email: String, password: String }} userSignUpData
 * @returns
 */
export async function signUpService(userSignUpData) {
	console.log('[signUpService]');

	const singUpFetchRes = await httpClient.post({
		path: `${baseAccessPath}/signUp`,
		payload: userSignUpData
	});

	const signUpServiceRes = {
		success: singUpFetchRes.success,
		result: singUpFetchRes?.result,
		message: messagesDictionary[singUpFetchRes.code] ? messagesDictionary[singUpFetchRes.code] : (
			singUpFetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	if(signUpServiceRes.success) {
		console.log('[signUpService] sucesso - setar cookie');

		cookies().set({
			name: signUpServiceRes.result.tokenCookieData.name,
			value: signUpServiceRes.result.tokenCookieData.value,
			...signUpServiceRes.result.tokenCookieData.options
		});
	}

	return signUpServiceRes;
}

/** Login Service
 *
 * @param {{email: String, password: String}} userLoginData
 */
export async function loginService(userLoginData) {
	console.log('[loginService]');

}


export async function logoutService() {

}
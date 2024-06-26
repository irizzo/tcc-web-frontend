'use server';

import { clearTokenCookie, getTokenCookie, setCookieData } from '@/utils';

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const baseAccessPath = '/user-access';

export async function verifyUserAuthService() {
	console.log('[verifyUserAuthService]');

	const tokenCookie = await getTokenCookie();

	const fetchRes = await httpClient.get({ path: `${baseAccessPath}/verify`, customHeaders: {
		'Authorization': tokenCookie.value
	}});

	const verifyUserAuthRes = {
		success: fetchRes.success,
		result: fetchRes?.result,
		message: messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
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

	const res = await httpClient.post({
		path: `${baseAccessPath}/signUp`,
		payload: userSignUpData
	});

	const signUpServiceRes = {
		success: res.success,
		result: res?.result,
		message: messagesDictionary[res.code] ? messagesDictionary[res.code] : (
			res.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	if(signUpServiceRes.success) { setCookieData(signUpServiceRes.result.tokenCookieData); }

	return signUpServiceRes;
}

/** Login Service
 *
 * @param {{email: String, password: String}} userLoginData
 */
export async function loginService(userLoginData) {
	console.log('[loginService]');

	const res = await httpClient.post({
		path: `${baseAccessPath}/login`,
		payload: userLoginData
	});

	const loginServiceRes = {
		success: res.success,
		result: res?.result,
		message: messagesDictionary[res.code] ? messagesDictionary[res.code] : (
			res.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	if(loginServiceRes.success) { setCookieData(loginServiceRes.result.tokenCookieData); }

	return loginServiceRes;
}

export async function logoutService() {
	clearTokenCookie();
}
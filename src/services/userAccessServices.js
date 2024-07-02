'use server';

import { clearTokenCookie, getTokenCookie, setCookieData } from '@/utils';

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const baseAccessPath = '/user-access';

export async function verifyUserAuthService() {
	console.log('[verifyUserAuthService]');

	const tokenCookie = await getTokenCookie();

	const res = await httpClient.get({ path: `${baseAccessPath}/verify`, customHeaders: {
		'Authorization': tokenCookie.value
	}});

	const serviceRes = {
		success: res.success,
		result: res?.result,
		tokenCookieData: res?.tokenCookieData,
		message: messagesDictionary[res.code] ? messagesDictionary[res.code] : (
			res.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	serviceRes.tokenCookieData && await setCookieData(serviceRes.tokenCookieData);

	return serviceRes;
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

	const serviceRes = {
		success: res.success,
		result: res?.result,
		tokenCookieData: res?.tokenCookieData,
		message: messagesDictionary[res.code] ? messagesDictionary[res.code] : (
			res.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	serviceRes.tokenCookieData && await setCookieData(serviceRes.tokenCookieData);

	return serviceRes;
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

	const serviceRes = {
		success: res.success,
		result: res?.result,
		tokenCookieData: res?.tokenCookieData,
		message: messagesDictionary[res.code] ? messagesDictionary[res.code] : (
			res.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	serviceRes.tokenCookieData && await setCookieData(serviceRes.tokenCookieData);

	console.log(`[loginService] res.result = ${JSON.stringify(res.result)}`);

	return serviceRes;
}

export async function logoutService() {
	await clearTokenCookie();
}
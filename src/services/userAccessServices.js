'use server';

import { clearTokenCookie, getTokenCookie, setCookieData } from '@/utils';

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const baseAccessPath = '/user-access';

export async function verifyUserAuthService() {
	console.log('[verifyUserAuthService]');
	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseAccessPath}/verify`,
			customHeaders: {
			'Authorization': tokenCookie.value
		}});

		console.log('[verifyUserAuthService] fetchRes: ', fetchRes);

		// fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData);

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL);

		if (!fetchRes.success) {
			throw new Error(message);
		};

		return {
			tokenCookieData: fetchRes.tokenCookieData,
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		};

	} catch (error) {
		console.log('[verifyUserAuthService] error: ', error);
		throw error;
	}
}

/** Sign Up Service
 *
 * @param {{ firstName: String, lastName: String, email: String, password: String }} userSignUpData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function signUpService(userSignUpData) {
	console.log('[signUpService]');

	try {
		const fetchRes = await httpClient.post({
			path: `${baseAccessPath}/signUp`,
			payload: userSignUpData
		});

		console.log('[signUpService] fetchRes: ', fetchRes);

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData);

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL);

		if (!fetchRes.success) {
			throw new Error(message);
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		};

	} catch (error) {
		console.log('[signUpService] error: ', error);
		throw error;
	}
}

/** Login Service
 *
 * @param {{ email: String, password: String }} userLoginData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function loginService(userLoginData) {
	try {
		console.log('[loginService]');

		const fetchRes = await httpClient.post({
			path: `${baseAccessPath}/login`,
			payload: userLoginData
		});

		console.log('[loginService] fetchRes: ', fetchRes);

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData);


		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL);

		if (!fetchRes.success) {
			throw new Error(message);
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		};

	} catch (error) {
		console.log('[loginService] error: ', error);
		throw error;
	}
}

export async function logoutService() {
	await clearTokenCookie();
}
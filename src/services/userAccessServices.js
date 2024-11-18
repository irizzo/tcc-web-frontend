'use server'

import { getTokenCookie, setCookieData } from '@/utils'
import messagesDictionary from '@/resources/messages'

const API_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL
const baseAccessPath = '/user-access'

export async function verifyUserAuthService() {
	console.debug('[verifyUserAuthService]')
	try {
		const tokenCookie = await getTokenCookie()
		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseAccessPath}/verify`, {
			method: 'GET',
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)

		if (!fetchRes.success) {
			throw new Error(message)
		};

		return {
			tokenCookieData: fetchRes.tokenCookieData,
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[verifyUserAuthService] error: ', error)
		throw error
	}
}

/** Sign Up Service
 *
 * @param {{ firstName: String, lastName: String, email: String, password: String }} userSignUpData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function signUpService(userSignUpData) {
	console.debug('[signUpService]')

	try {
		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8'
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseAccessPath}/signUp`, {
			method: 'POST',
			body: JSON.stringify(userSignUpData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData)

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL)

		if (!fetchRes.success) {
			throw new Error(message)
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[signUpService] error: ', error)
		throw error
	}
}

/** Login Service
 *
 * @param {{ email: String, password: String }} userLoginData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function loginService(userLoginData) {
	try {
		console.debug('[loginService]')

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8'
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseAccessPath}/login`, {
			method: 'POST',
			body: JSON.stringify(userLoginData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData)

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)

		if (!fetchRes.success) {
			throw new Error(message)
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[loginService] error: ', error)
		throw error
	}
}

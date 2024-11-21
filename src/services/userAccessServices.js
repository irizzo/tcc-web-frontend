'use server'

import { getTokenCookie, setCookieData } from '@/utils'
import messagesDictionary from '@/resources/messages'
import { routesMap } from '@/resources/routesMap'
import { redirect } from 'next/navigation'

const API_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL
const baseAccessPath = '/user-access'


/** Sign Up Service
 *
 * @param {{ firstName: String, lastName: String, email: String, password: String }} userSignUpData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function signUpService(userSignUpData) {
	console.debug('[signUpService]')

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

}

/** Login Service
 *
 * @param {{ email: String, password: String }} formData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function loginService(prevState, formData) {
	console.debug('[loginService]')
	const rawFormData = {
		email: formData.get('email'), password: formData.get('password')
	}

	if (!rawFormData.email || !rawFormData.password) {
		return { message: messagesDictionary.EMPTY_FIELD }
	}

	// TODO: sanitize
	const cleanData = {
		email: rawFormData.email,
		password: rawFormData.password
	}

	const customHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8'
	})

	const fetchRes = await fetch(`${API_BASEURL}${baseAccessPath}/login`, {
		method: 'POST',
		body: JSON.stringify(cleanData),
		headers: customHeaders
	})
	const json = await fetchRes.json()

	console.log('json: ', json)

	const mssg = messagesDictionary[json.code] ? messagesDictionary[json.code] : (
		json.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
	)

	console.log('mssg: ', mssg)

	if (!fetchRes.ok || !json.success) {
		return { message: mssg }
	}

	json.tokenCookieData && await setCookieData(json.tokenCookieData)
	redirect(routesMap.dashboard.base)
}

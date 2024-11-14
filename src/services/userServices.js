import { getTokenCookie, setCookieData } from '@/utils'
import httpClient from './http/client'
import messagesDictionary from '@/resources/messages'

const API_BASEURL = process.env.CURRENT_EVN === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL
const baseUserPath = '/user'

export async function getUserInfo() {
	console.log('[getUserInfo]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.get({
			path: `${baseUserPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		})

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData)

		if (!fetchRes.success) {
			throw new Error(fetchRes.message)
		}

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.log('[getUserInfo] error: ', error)
		throw error
	}
};

export async function updateUserService(updatedData) {
	console.log('[updateUserService]')

	try {
		const tokenCookie = await getTokenCookie()
		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseUserPath}`, {
			method: 'PUT',
			body: JSON.stringify(updatedData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		console.log('[updateUserService] fetchRes: ', fetchRes)

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData)

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)

		if (!fetchRes.success) {
			throw new Error(message)
		}

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}
	} catch (error) {
		console.log('[updateUserService] error: ', error)
		throw error
	}
}

export async function deleteUserService() {
	console.log('[deleteUserService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseUserPath}`, {
			method: 'DELETE',
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		console.log('[deleteUserService] fetchRes: ', fetchRes)

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData)

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)

		if (!fetchRes.success) {
			throw new Error(message)
		}

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.log('[deleteUserService] error: ', error)
		throw error
	}
}
'use server'

import { getTokenCookie, setCookieData } from '@/utils'
import messagesDictionary from '@/resources/messages'

const API_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL
const baseUserPath = '/user'

export async function getUserInfo() {
	console.debug('[getUserInfo]')

	try {
		const tokenCookie = await getTokenCookie()
		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseUserPath}`, {
			method: 'GET',
			headers: customHeaders
		}).then((res) => {
			return res.json()
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
		console.debug('[getUserInfo] error: ', error)
		throw error
	}
};

export async function updateUserService(updatedData) {
	console.debug('[updateUserService]')

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
		console.debug('[updateUserService] error: ', error)
		throw error
	}
}

export async function deleteUserService() {
	console.debug('[deleteUserService]')

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
		console.debug('[deleteUserService] error: ', error)
		throw error
	}
}
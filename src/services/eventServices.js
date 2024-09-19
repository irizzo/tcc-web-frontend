import { getTokenCookie, setCookieData } from '@/utils'
import httpClient from './http/client'

import messagesDictionary from '@/resources/messages'

const BASEURL = 'http://localhost:8080'
const baseEventsPath = '/events'

export async function createEventService(eventData) {
	console.log('[createEventService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${BASEURL}${baseEventsPath}`, {
			method: 'POST',
			body: JSON.stringify(eventData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		// console.log('[createEventService] fetchRes: ', fetchRes);

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
		console.log('[createEventService] error: ', error)
		throw error
	}
}

export async function getAllEventsService() {
	console.log('[getAllEventsService]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.get({
			path: `${baseEventsPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		})

		// console.log('[getAllEventsService] fetchRes: ', fetchRes);

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
		console.log('[getAllEventsService] error: ', error)
		throw error
	}
}

export async function getEventDetailsService(eventId) {
	console.log('[getEventDetailsService]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.get({
			path: `${baseEventsPath}/${eventId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		})

		// console.log('[getEventDetailsService] fetchRes: ', fetchRes);

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
		console.log('[getEventDetailsService] error: ', error)
		throw error
	}
}

export async function updateEventService(eventId, updatedData) {
	console.log('[updateEventService]')

	try {
		const tokenCookie = await getTokenCookie()

		console.log('[updateEventService] updatedData: ', updatedData)

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${BASEURL}${baseEventsPath}/${eventId}`, {
			method: 'PUT',
			body: JSON.stringify(updatedData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		// console.log('[updateEventService] fetchRes: ', fetchRes);

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
		console.log('[updateEventService] error: ', error)
		throw error
	}
}

export async function deleteEventService(eventId) {
	console.log('[deleteEventService]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.delete({
			path: `${baseEventsPath}/${eventId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
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
		console.log('[deleteEventService] error: ', error)
		throw error
	}
}
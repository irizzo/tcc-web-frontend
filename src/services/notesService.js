import { getTokenCookie, setCookieData } from '@/utils'
import httpClient from './http/client'

import messagesDictionary from '@/resources/messages'

const BASEURL = 'http://localhost:8080'
const baseNotesPath = '/notes'

export async function createNoteService(noteData) {
	console.log('[createNoteService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${BASEURL}${baseNotesPath}`, {
			method: 'POST',
			body: JSON.stringify(noteData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		// console.log('[createNoteService] fetchRes: ', fetchRes);

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
		console.log('[createNoteService] error: ', error)
		throw error
	}
}

export async function getAllNotesService() {
	console.log('[getAllNotesService]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.get({
			path: `${baseNotesPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		})

		console.log('[getAllNotesService] fetchRes: ', fetchRes)

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
		console.log('[getAllNotesService] error: ', error)
		throw error
	}
}

export async function updateNoteService(noteId, updatedData) {
	console.log('[updateNoteService]')

	try {
		const tokenCookie = await getTokenCookie()

		console.log('[updateNoteService] updatedData: ', updatedData)

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${BASEURL}${baseNotesPath}/${noteId}`, {
			method: 'PUT',
			body: JSON.stringify(updatedData),
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		console.log('[updateNoteService] fetchRes: ', fetchRes)

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
		console.log('[updateNoteService] error: ', error)
		throw error
	}
}

export async function deleteNoteService(noteId) {
	console.log('[deleteNoteService]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.delete({
			path: `${baseNotesPath}/${noteId}`,
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
		console.log('[deleteNoteService] error: ', error)
		throw error
	}
}

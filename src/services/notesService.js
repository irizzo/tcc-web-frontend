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
		console.log('[createNoteService] error: ', error)
		throw error
	}
}
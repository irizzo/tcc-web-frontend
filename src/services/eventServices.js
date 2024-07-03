/* Event Services
	* create event
	* alter event info
	* delete event
	* list all events
*/

import { getTokenCookie, setCookieData } from '@/utils';
import httpClient from './http/client';

import messagesDictionary from '@/resources/messages';

const baseEventsPath = '/events';

export async function createEventService(eventData) {
	console.log('[createEventService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.post({
			path: `${baseEventsPath}`,
			payload: eventData,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[createEventService] fetchRes: ', fetchRes);

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
		console.log('[createEventService] error: ', error);
		throw (error);
	}
}

export async function getEventsListService() {
	console.log('[getEventsListService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseEventsPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[getEventsListService] fetchRes: ', fetchRes);

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
		console.log('[getEventsListService] error: ', error);
		throw (error);
	}
}

export async function getEventDetailsService(eventId) {
	console.log('[getEventDetailsService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseEventsPath}/${eventId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[getEventDetailsService] fetchRes: ', fetchRes);

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
		console.log('[getEventDetailsService] error: ', error);
		throw (error);
	}
}

export async function updateEventService(updatedData, eventId) {
	console.log('[updateEventService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.put({
			path: `${baseEventsPath}/${eventId}`,
			payload: updatedData,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[updateEventService] fetchRes: ', fetchRes);

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
		console.log('[updateEventService] error: ', error);
		throw (error);
	}
}

export async function deleteEventService(eventId) {
	console.log('[deleteEventService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.delete({
			path: `${baseEventsPath}/${eventId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[deleteEventService] fetchRes: ', fetchRes);

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
		console.log('[deleteEventService] error: ', error);
		throw (error);
	}
}
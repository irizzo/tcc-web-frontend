'use server';

import { getTokenCookie, setCookieData } from '@/utils';

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const baseAccessPath = '/tasks';

export async function listAllTasksService() {
	console.log('[listAllTasksService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseAccessPath}`, customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData);

		if (!fetchRes.success) {
			throw new Error(fetchRes.message);
		}

		console.log(`[listAllTasksService] fetchRes.result = ${JSON.stringify(fetchRes.result)}`);

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message: messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
				fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
			)
		};
	} catch (error) {
		throw error;
	}
};

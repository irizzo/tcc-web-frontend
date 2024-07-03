'use server';

import { getTokenCookie, setCookieData } from '@/utils';

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const BASEURL = process.env.currentEnv === 'production' ? process.env.prodBaseURL : process.env.devBaseURL;
const baseTasksPath = '/tasks';

export async function listAllTasksService() {
	console.log('[listAllTasksService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseTasksPath}`, customHeaders: {
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
		console.log('[listAllTasksService] error: ', error);
		throw error;
	}
};

/**
 * 
 * @param {{ title: String,	description: String, dueDate: String | null, categoryCode: String | null, priorityCode: String | null, toDoDate: String | null }} taskData
 *  @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function __createTaskService(taskData) {
	console.log('[createTaskService]');

	try {
		const tokenCookie = await getTokenCookie();

		console.log('[createTaskService] taskData: ', taskData);

		const fetchRes = await httpClient.post({
			path: `${baseTasksPath}`,
			payload: taskData,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[createTaskService] fetchRes: ', fetchRes);

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
		throw error;
	}
}

export async function createTaskService(taskData) {
	console.log('[createTaskService]');

	try {
		console.log('[createTaskService] taskData: ', taskData);

		const tokenCookie = await getTokenCookie();
		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		});

		const fetchRes = await fetch(`${BASEURL}${baseTasksPath}`, {
			method: 'POST',
			body: JSON.stringify(taskData),
			headers: customHeaders
		}).then((res) => {
			return res.json();
		});

		console.log('[createTaskService] fetchRes: ', fetchRes);

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
		throw error;
	}
}
'use server';

import { getTokenCookie, setCookieData } from '@/utils';
import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

// const BASEURL = process.env.currentEnv === 'production' ? process.env.prodWebBaseURL : process.env.devWebBaseURL;
const BASEURL = 'http://localhost:8080';

const baseTasksPath = '/tasks';

export async function listAllTasksService() {
	console.log('[listAllTasksService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseTasksPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData);

		if (!fetchRes.success) {
			throw new Error(fetchRes.message);
		}

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		);

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		};
	} catch (error) {
		console.log('[listAllTasksService] error: ', error);
		throw error;
	}
};

/** Create Task
 *
 * @param {{ title: String,	description: String, dueDate: String | null, categoryCode: String | null, priorityCode: String | null, toDoDate: String | null }} taskData
 *  @returns {{ success: Boolean, result: any | null, message: String }}
 */
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
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		);

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

export async function updateTaskService(taskId, updatedData) {
	console.log('[updateTaskService]');

	try {
		const tokenCookie = await getTokenCookie();

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		});

		const fetchRes = await fetch(`${BASEURL}${baseTasksPath}/${taskId}`, {
			method: 'PUT',
			body: JSON.stringify(updatedData),
			headers: customHeaders
		}).then((res) => {
			return res.json();
		});

		console.log('[updateTaskService] fetchRes: ', fetchRes);

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

export async function deleteTaskService(taskId) {
	console.log('[deleteTaskService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.delete({
			path: `${baseTasksPath}/${taskId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData);

		if (!fetchRes.success) {
			throw new Error(fetchRes.message);
		}

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		);

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		};
	} catch (error) {
		throw error;
	}
}
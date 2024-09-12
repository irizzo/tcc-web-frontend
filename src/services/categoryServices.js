import { getTokenCookie, setCookieData } from '@/utils';
import httpClient from './http/client';

import messagesDictionary from '@/resources/messages';

// const BASEURL = process.env.currentEnv === 'production' ? process.env.prodWebBaseURL : process.env.devWebBaseURL;
const BASEURL = 'http://localhost:8080';
const baseCategoriesPath = '/categories';

/** Create Category
 * @param {{ title: String, description: String | null }} categoryData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function createCategoryService(categoryData) {
	console.log('[createCategoryService]');

	try {
		const tokenCookie = await getTokenCookie();

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		});

		const fetchRes = await fetch(`${BASEURL}${baseCategoriesPath}`, {
			method: 'POST',
			body: JSON.stringify(categoryData),
			headers: customHeaders
		}).then((res) => {
			return res.json();
		});

		// console.log('[createCategoryService] fetchRes: ', fetchRes);

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
		console.log('[createCategoryService] error: ', error);
		throw (error);
	}
}

/** Get All Categories
 *
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function getAllCategoriesService() {
	console.log('[getAllCategoriesService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseCategoriesPath}`,
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
		console.log('[getAllCategoriesService] error: ', error);
		throw (error);
	}
}

/** Get Category Details By Id
 *
 * @param {String} categoryId
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function getCategoryDetailsService(categoryId) {
	console.log('[getCategoryDetailsService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseCategoriesPath}/${categoryId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[getCategoryDetailsService] fetchRes: ', fetchRes);

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
		console.log('[getCategoryDetailsService] error: ', error);
		throw (error);
	}
}

export async function getCategoryByCode(categoryCode) {
	console.log('[getCategoryByCode]');
	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseCategoriesPath}/${categoryCode}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[getCategoryDetailsService] fetchRes: ', fetchRes);

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
		console.log('[getCategoryDetailsService] error: ', error);
		throw (error);
	}
}

/** Update Category
 * @param {String} categoryId
 * @param {{ title: String | null, description: String | null }} updatedData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function updateCategoryService(categoryId, updatedData) {
	console.log('[updateCategoryService]');

	try {
		const tokenCookie = await getTokenCookie();

		console.log('categoryId = ', categoryId);

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		});

		const fetchRes = await fetch(`${BASEURL}${baseCategoriesPath}/${categoryId}`, {
			method: 'PUT',
			body: JSON.stringify(updatedData),
			headers: customHeaders
		}).then((res) => {
			return res.json();
		});

		console.log('[updateCategoryService] fetchRes: ', fetchRes);

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
		console.log('[updateCategoryService] error: ', error);
		throw (error);
	}
}

/** Delete Category
 * @param {String} categoryId
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function deleteCategoryService(categoryId) {
	console.log('[deleteCategoryService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.delete({
			path: `${baseCategoriesPath}/${categoryId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[deleteCategoryService] fetchRes: ', fetchRes);

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
		console.log('[deleteCategoryService] error: ', error);
		throw (error);
	}
}

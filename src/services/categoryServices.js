import { getTokenCookie, setCookieData } from '@/utils';
import httpClient from './http/client';

import messagesDictionary from '@/resources/messages';

const baseCategoriesPath = '/categories';

/** Create Category
 * @param {{ name: String, description: String | null }} categoryData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function createCategoryService(categoryData) {
	console.log('[createCategoryService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.post({
			path: `${baseCategoriesPath}`,
			payload: categoryData,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		// console.log('[createCategoryService] fetchRes: ', fetchRes);

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
		console.log('[createCategoryService] error: ', error);
		throw (error);
	}
}

/** Get Categories List
 *
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function getCategoriesListService() {
	console.log('[getCategoriesListService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.get({
			path: `${baseCategoriesPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

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
		console.log('[getCategoriesListService] error: ', error);
		throw (error);
	}
}

/** Get Category Details
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

/** Update Category
 * @param {{ title: String | null, description: String | null }} updatedData
 * @param {String} categoryId
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function updateCategoryService(updatedData, categoryId) {
	console.log('[updateCategoryService]');

	try {
		const tokenCookie = await getTokenCookie();

		const fetchRes = await httpClient.put({
			path: `${baseCategoriesPath}/${categoryId}`,
			payload: updatedData,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[updateCategoryService] fetchRes: ', fetchRes);

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
		console.log('[deleteCategoryService] error: ', error);
		throw (error);
	}
}

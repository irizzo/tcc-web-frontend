'use server'

import { getTokenCookie, setCookieData } from '@/utils'
import messagesDictionary from '@/resources/messages'

const API_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL
const baseCategoriesPath = '/categories'

/** Create Category
 * @param {{ title: String, description: String | null }} categoryData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function createCategoryService(categoryData) {
	console.debug('[createCategoryService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseCategoriesPath}`, {
			method: 'POST',
			body: JSON.stringify(categoryData),
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
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[createCategoryService] error: ', error)
		throw (error)
	}
}

/** Get All Categories
 *
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function getAllCategoriesService() {
	console.debug('[getAllCategoriesService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseCategoriesPath}`, {
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
		console.debug('[getAllCategoriesService] error: ', error)
		throw (error)
	}
}

/** Get Category Details By Id
 *
 * @param {String} categoryId
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function getCategoryDetailsService(categoryId) {
	console.debug('[getCategoryDetailsService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseCategoriesPath}/${categoryId}`, {
			method: 'GET',
			headers: customHeaders
		}).then((res) => {
			return res.json()
		})

		fetchRes.tokenCookieData && await setCookieData(fetchRes.tokenCookieData)

		const message = messagesDictionary[fetchRes.code] ? messagesDictionary[fetchRes.code] : (
			fetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL)

		if (!fetchRes.success) {
			throw new Error(message)
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[getCategoryDetailsService] error: ', error)
		throw (error)
	}
}

export async function getCategoryByCode(categoryCode) {
	console.debug('[getCategoryByCode]')
	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseCategoriesPath}/${categoryCode}`, {
			method: 'GET',
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
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[getCategoryDetailsService] error: ', error)
		throw (error)
	}
}

/** Update Category
 * @param {String} categoryId
 * @param {{ title: String | null, description: String | null }} updatedData
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function updateCategoryService(categoryId, updatedData) {
	console.debug('[updateCategoryService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseCategoriesPath}/${categoryId}`, {
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
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[updateCategoryService] error: ', error)
		throw (error)
	}
}

/** Delete Category
 * @param {String} categoryId
 * @returns {{ success: Boolean, result: any | null, message: String }}
 */
export async function deleteCategoryService(categoryId) {
	console.debug('[deleteCategoryService]')

	try {
		const tokenCookie = await getTokenCookie()

		const customHeaders = new Headers({
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': tokenCookie.value
		})

		const fetchRes = await fetch(`${API_BASEURL}${baseCategoriesPath}/${categoryId}`, {
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
		};

		return {
			success: fetchRes.success,
			result: fetchRes?.result,
			message
		}

	} catch (error) {
		console.debug('[deleteCategoryService] error: ', error)
		throw (error)
	}
}

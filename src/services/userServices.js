import { getTokenCookie, setCookieData } from '@/utils'
import httpClient from './http/client'
import messagesDictionary from '@/resources/messages'
import { decodeToken } from '@/utils/jwt.utils'

const baseUserPath = '/user'

export async function getUserInfo() {
	console.log('[getUserInfo]')

	try {
		const tokenCookie = await getTokenCookie()

		const fetchRes = await httpClient.get({
			path: `${baseUserPath}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
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
		console.log('[getUserInfo] error: ', error)
		throw error
	}
};

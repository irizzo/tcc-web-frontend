/* User Services
	* list user info
	* delete user
	* alter user info
*/

import { getTokenCookie, setCookieData } from '@/utils';
import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';
import { decodeToken } from '@/utils/jwt.utils';

const baseUserPath = '/user';

export async function listUserInfo() {
	console.log('[listUserInfo]');

	try {
		const tokenCookie = await getTokenCookie();
		const userId = decodeToken(tokenCookie.value).data.userId;

		const fetchRes = await httpClient.get({
			path: `${baseUserPath}/${userId}`,
			customHeaders: {
				'Authorization': tokenCookie.value
			}
		});

		console.log('[listUserInfo] fetchRes: ', fetchRes);

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
		console.log('[listUserInfo] error: ', error);
		throw error;
	}
};

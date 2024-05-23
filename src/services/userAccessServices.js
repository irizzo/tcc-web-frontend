/* User Access Services
	* sign up
	* login
	* logout
	* verify user access
*/

import httpClient from './http/client';
import messagesDictionary from '@/resources/messages';

const baseAccessPath = '/user-access';

export async function verifyUserAccessService() {
	console.log('[verifyUserAccessService]');

	const fetchUserAccessRes = await httpClient.get({ path: `${baseAccessPath}/`});

	const verifyUserAccessRes = {
		success: fetchUserAccessRes.success,
		result: fetchUserAccessRes?.result,
		message: messagesDictionary[fetchUserAccessRes.code] ? messagesDictionary[fetchUserAccessRes.code] : (
			fetchUserAccessRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	return verifyUserAccessRes;
}

/** Sign Up Service
 *
 * @param {{ firstName: String, lastName: String, email: String, password: String }} userSignUpData
 * @returns
 */
export async function signUpService(userSignUpData) {
	console.log('[signUpService]');

	const singUpFetchRes = await httpClient.post({
		path: `${baseAccessPath}/signUp`,
		payload: userSignUpData
	});

	const signUpServiceRes = {
		success: singUpFetchRes.success,
		result: singUpFetchRes?.result,
		message: messagesDictionary[singUpFetchRes.code] ? messagesDictionary[singUpFetchRes.code] : (
			singUpFetchRes.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
		)
	};

	return signUpServiceRes;
}

/** Login Service
 *
 * @param {{email: String, password: String}} userLoginData
 */
export async function loginService(userLoginData) {

}


export async function logoutService() {

}
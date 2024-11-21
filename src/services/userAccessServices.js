'use server'

import { getTokenCookie, setCookieData } from '@/utils'
import messagesDictionary from '@/resources/messages'
import { routesMap } from '@/resources/routesMap'
import { redirect } from 'next/navigation'

const API_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL
const baseAccessPath = '/user-access'


export async function signUpService(prevState, formData) {
	console.debug('[signUpService]')

	const userSignUpData = {
		firstName: formData.get('firstName'),
		lastName: formData.get('lastName'),
		email: formData.get('email'),
		password: formData.get('password')
	}

	// TODO: sanitize data
	if (!userSignUpData.firstName || !userSignUpData.lastName || !userSignUpData.email || !userSignUpData.password) {
		return { message: messagesDictionary.EMPTY_FIELD }
	}
	
	console.log('userSignUpData: ', userSignUpData)

	const fetchRes = await fetch(`${API_BASEURL}${baseAccessPath}/signUp`, {
		method: 'POST',
		body: JSON.stringify(userSignUpData),
		headers: new Headers({
			'Content-type': 'application/json; charset=UTF-8'
		})
	})

	const json = await fetchRes.json()

	const mssg = messagesDictionary[json.code] ? messagesDictionary[json.code] : (
		json.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
	)

	if (!fetchRes.ok || !json.success) {
		return { message: mssg }
	}

	json.tokenCookieData && await setCookieData(json.tokenCookieData)
	redirect(routesMap.dashboard.base)
}

export async function loginService(prevState, formData) {
	console.debug('[loginService]')
	const userLoginData = {
		email: formData.get('email'), password: formData.get('password')
	}

	if (!userLoginData.email || !userLoginData.password) {
		return { message: messagesDictionary.EMPTY_FIELD }
	}

	const fetchRes = await fetch(`${API_BASEURL}${baseAccessPath}/login`, {
		method: 'POST',
		body: JSON.stringify(userLoginData),
		headers: new Headers({
			'Content-type': 'application/json; charset=UTF-8'
		})
	})
	const json = await fetchRes.json()

	const mssg = messagesDictionary[json.code] ? messagesDictionary[json.code] : (
		json.success ? messagesDictionary.DEFAULT_SUCCESS : messagesDictionary.DEFAULT_FAIL
	)

	console.log('mssg: ', mssg)

	if (!fetchRes.ok || !json.success) {
		return { message: mssg }
	}

	json.tokenCookieData && await setCookieData(json.tokenCookieData)
	redirect(routesMap.dashboard.base)
}

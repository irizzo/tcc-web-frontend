'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function navigateTo({ path }) {
	console.debug('[navigateTo]')
	return redirect(path)
}

export async function getTokenCookie() {
	console.debug('[getTokenCookie]')
	return cookies().get('token')
}

export async function clearTokenCookie() {
	console.debug('[clearTokenCookie]')
	cookies().delete('token')
}

export async function setCookieData(cookieData) {
	console.debug('[setCookieData]')
	cookies().set({
		name: cookieData.name,
		value: cookieData.value,
		...cookieData.options,
		sameSite: 'none'
	})
}

export async function isObjectEmpty(obj) {
	return (
		obj &&
		Object.keys(obj).length === 0 &&
		obj.constructor === Object
	)
}
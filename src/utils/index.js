'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function navigateTo({ path }) {
	console.log('[navigateTo]');
	return redirect(path);
}

export async function getTokenCookie() {
	console.log('[getTokenCookie]');
	return cookies().get('token');
}

export async function clearTokenCookie() {
	console.log('[clearTokenCookie]');
	cookies().delete('token');
}

export async function setCookieData(cookieData) {
	console.log('[setCookieData]');
	cookies().set({
		name: cookieData.name,
		value: cookieData.value,
		...cookieData.options
	});
}
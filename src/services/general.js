'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function navigateTo({ path }) {
	return redirect(path);
}

export async function getTokenCookie() {
	return cookies().get('token');
}
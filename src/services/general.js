'use server';

import { redirect } from 'next/navigation';
export async function navigateTo({ path }) {
	return redirect(path);
}
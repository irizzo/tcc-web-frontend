'use server';

import { NextRequest, NextResponse } from 'next/server';

import routesMap from '@/resources/routesMap';
import { verifyUserAuthService } from '@/services/userAccessServices';

// const BASEURL = process.env.currentEnv === 'production' ? process.env.prodWebBaseURL : process.env.devWebBaseURL;
const BASEURL = 'http://localhost:3000';

/**
 * authMiddleware
 * @param { NextRequest } req
 * @returns
 */
export default async function authMiddleware(req) {
	console.log('[authMiddleware]');

	let isUserLogged = false;
	const tokenCookie = req.cookies.get('token');

	const { pathname } = req.nextUrl;
	const userBasePath = '/user';

	if (tokenCookie) {
		const userAuthRes = await verifyUserAuthService();
		isUserLogged = userAuthRes.success;
		req.cookies.set(userAuthRes.tokenCookieData.name, userAuthRes.tokenCookieData.value);
	}

	if (pathname.includes(userBasePath)) {
		return isUserLogged ? NextResponse.next() : NextResponse.redirect(`${BASEURL}/login`, req.url);
	};

	if (pathname === routesMap.login || pathname === routesMap.signUp) {
		return isUserLogged ? NextResponse.redirect(`${BASEURL}/user/dashboard`, req.url) : NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [ '/user/:path*', '/login/:path', '/sign-up/:path' ]
};
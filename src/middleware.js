'use server'

import { NextRequest, NextResponse } from 'next/server'

import { routesMap } from '@/resources/routesMap'
import { verifyUserAuthService } from '@/services/userAccessServices'

const APP_BASEURL = process.env.CURRENT_EVN === 'production' ? process.env.APP_PROD_BASEURL : process.env.APP_DEV_BASEURL
console.log('[middleware] APP_BASEURL: ', APP_BASEURL)

/**
 * authMiddleware
 * @param { NextRequest } req
 * @returns
 */
export default async function authMiddleware(req) {
	console.log('[authMiddleware]')

	let isUserLogged = false
	const tokenCookie = req.cookies.get('token')

	const { pathname } = req.nextUrl

	if (pathname === '/') return NextResponse.next()
	const userBasePath = '/user'

	if (tokenCookie) {
		const userAuthRes = await verifyUserAuthService()
		isUserLogged = userAuthRes.success
		req.cookies.set(userAuthRes.tokenCookieData.name, userAuthRes.tokenCookieData.value)
	}

	if (pathname.includes(userBasePath)) {
		return isUserLogged ? NextResponse.next() : NextResponse.redirect(`${APP_BASEURL}${routesMap.login}`, req.url)
	}

	if (pathname === routesMap.login || pathname === routesMap.signUp) {
		return isUserLogged ? NextResponse.redirect(`${APP_BASEURL}${routesMap.dashboard.base}`, req.url) : NextResponse.next()
	}

	return NextResponse.next()
}

export const config = {
	matcher: [ '/', '/public/:path*', '/user/:path*', '/login', '/sign-up' ]
}
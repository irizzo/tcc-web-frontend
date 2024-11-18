'use server'
import { NextRequest, NextResponse } from 'next/server'

import { routesMap } from '@/resources/routesMap'
import { verifyUserAuthService } from '@/services/userAccessServices'

let APP_BASEURL = process.env.CURRENT_EVN === 'production' ? process.env.APP_PROD_BASEURL : process.env.APP_DEV_BASEURL
console.log('[middleware] CURRENT_ENV: ', process.env.CURRENT_ENV)
console.log('[middleware] APP_PROD_BASEURL: ', process.env.APP_PROD_BASEURL)
console.log('[middleware] APP_DEV_BASEURL: ', process.env.APP_DEV_BASEURL)
console.log('[middleware] API_PROD_BASEURL: ', process.env.API_PROD_BASEURL)

if (!APP_BASEURL) {
	console.log('no baseurl')
	APP_BASEURL = 'https://lifesync-ir.vercel.app/'
}

console.log('customKey: ', process.env.customKey)

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
	const userBasePath = '/user'

	if (pathname === '/') return NextResponse.next()

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
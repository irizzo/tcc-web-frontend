'use server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers.js'

import { routesMap } from '@/resources/routesMap'
import { verifyUserAuthService } from '@/services/userAccessServices'

let APP_BASEURL = process.env.CURRENT_EVN === 'production' ? process.env.APP_PROD_BASEURL : process.env.APP_DEV_BASEURL
console.debug('[middleware] CURRENT_ENV: ', process.env.CURRENT_ENV)
console.debug('[middleware] APP_PROD_BASEURL: ', process.env.APP_PROD_BASEURL)
console.debug('[middleware] APP_DEV_BASEURL: ', process.env.APP_DEV_BASEURL)
console.debug('[middleware] API_PROD_BASEURL: ', process.env.API_PROD_BASEURL)
console.debug('[authMiddleware] 1st APP_BASEURL: ', APP_BASEURL)


if (!APP_BASEURL) {
	console.debug('no baseurl')
	APP_BASEURL = 'https://lifesync-ir.vercel.app/'
}

/**
 * authMiddleware
 * @param { NextRequest } req
 * @returns
 */
export default async function authMiddleware(req) {
	console.debug('[authMiddleware]')

	const headersList = headers()
	const currentHost = headersList.get('host')
	const currentAPPHost = APP_BASEURL.split('/')
	console.debug('[authMiddleware] currentAPPHost: ', currentAPPHost)

	if (currentAPPHost[2] !== currentHost) {
		console.debug('[authMiddleware] diferente')
		APP_BASEURL = `${currentAPPHost[0]}://${currentHost}`
		console.debug('[authMiddleware] new APP_BASEURL: ', APP_BASEURL)
	}

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
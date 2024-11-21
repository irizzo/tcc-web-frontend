'use server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers.js'

import { routesMap } from '@/resources/routesMap'
import { verifyUserAuthService } from '@/services/userAccessServices'

let APP_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.APP_PROD_BASEURL : process.env.APP_DEV_BASEURL

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

	if (currentAPPHost[2] !== currentHost) {
		APP_BASEURL = `${currentAPPHost[0]}//${currentHost}`
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
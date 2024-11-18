'use server'
import { NextRequest, NextResponse } from 'next/server'

import { routesMap } from '@/resources/routesMap'
import { verifyUserAuthService } from '@/services/userAccessServices'

let APP_BASEURL = process.env.CURRENT_EVN === 'production' ? process.env.APP_PROD_BASEURL : process.env.APP_DEV_BASEURL
console.debug('[middleware] CURRENT_ENV: ', process.env.CURRENT_ENV)
console.debug('[middleware] APP_PROD_BASEURL: ', process.env.APP_PROD_BASEURL)
console.debug('[middleware] APP_DEV_BASEURL: ', process.env.APP_DEV_BASEURL)
console.debug('[middleware] API_PROD_BASEURL: ', process.env.API_PROD_BASEURL)
console.debug('[middleware] window.location.href: ', window.location.href)

if (!APP_BASEURL) {
	console.debug('no baseurl')
	APP_BASEURL = 'https://lifesync-ir.vercel.app/'
}
if (APP_BASEURL !== window.location.href) {
	const splitURL = window.location.href.slice(8).split('/')
	console.debug('[middleware] `https://${splitURL[0]}`: ', `https://${splitURL[0]}`)
	APP_BASEURL = `https://${splitURL[0]}`
}
console.debug('[middleware] APP_BASEURL: ', APP_BASEURL)


/**
 * authMiddleware
 * @param { NextRequest } req
 * @returns
 */
export default async function authMiddleware(req) {
	console.debug('[authMiddleware]')

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
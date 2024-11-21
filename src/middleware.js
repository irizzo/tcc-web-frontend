'use server'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers.js'
import { routesMap } from '@/resources/routesMap'
import { decodeToken, validateToken } from './utils/jwt.utils'

let APP_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.APP_PROD_BASEURL : process.env.APP_DEV_BASEURL
const API_BASEURL = process.env.CURRENT_ENV === 'production' ? process.env.API_PROD_BASEURL : process.env.API_DEV_BASEURL

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

	// if (pathname === '/') return NextResponse.next()

	if (tokenCookie) {
		if (decodeToken(tokenCookie.value)) {
			console.log('token validado')
			isUserLogged = true
			return
		}

		console.log('token não validado')

		const userAuthRes = await fetch(`${API_BASEURL}/user-access/verify`, {
			method: 'GET',
			headers: new Headers({
				'Content-type': 'application/json; charset=UTF-8',
				'Authorization': tokenCookie.value
			})
		}).then((res) => {
			return res.json()
		})

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
	matcher: ['/public/:path*', '/user/:path*', '/login', '/sign-up']
}
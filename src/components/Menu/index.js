'use client'
import { appInfo, pagesTitles} from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LinkButton } from '@/components/Buttons'
import { FaArrowLeft } from 'react-icons/fa6'

import './menu.scss'

export function Menu() {
	return (
		<nav className='flex flex--row menu'>
			<Link href={routesMap.home} className='menu__title'>
				<h2>{appInfo.name}</h2>
			</Link>

			<div className='flex flex--row menu__buttons'>
				<LinkButton path={routesMap.login} title={pagesTitles.login} variant='filled' small />
				<LinkButton path={routesMap.signUp} title={pagesTitles.signUp} variant='outlined' small />
			</div>
		</nav>
	)
}

export function PublicPageTitle ({ pageTitle }) {
	const router = useRouter()
	return (
		<div className='flex flex--row public-page__title'>
			<FaArrowLeft className='icon' onClick={() => { router.back() }} />
			<h1>{pageTitle}</h1>
		</div>
	)
}
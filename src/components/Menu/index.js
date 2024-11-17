import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import Link from 'next/link'
import { LinkButton } from '@/components/Buttons'

import './menu.scss'

export default function Menu() {
	return (
		<nav className='menu'>
			<Link href={routesMap.home} className='menu__title'>
				<h2>{locale.appInfo.name}</h2>
			</Link>

			<div className='flex flex--row menu__buttons'>
				<LinkButton path={routesMap.login} title={locale.pagesTitles.login} variant='filled' small />
				<LinkButton path={routesMap.signUp} title={locale.pagesTitles.signUp} variant='outlined' small />
			</div>
		</nav>
	)
}
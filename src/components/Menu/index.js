import './menu.scss';

import { LinkButton } from '@/components/Buttons';

import * as locale from '@/resources/locale';
import routesMap from '@/resources/routesMap';
import Link from 'next/link';

export default function Menu({ buttonsShown=false }) {
	return (
		<nav className='menu'>
			<Link href={routesMap.home} className='menu__title'>
				<h2>{locale.appInfo.name}</h2>
			</Link>

			{
				buttonsShown ?
					(<div className='flex flex--row menu__buttons'>
						<LinkButton path={routesMap.login} title={locale.pageTitles.user.login} variant='filled' small />
						<LinkButton path={routesMap.signUp} title={locale.pageTitles.user.signUp} variant='outlined' small />
					</div>)
				:
				null
			}

		</nav>
	);
}
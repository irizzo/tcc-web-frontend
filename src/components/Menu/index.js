import './menu.scss';

import { LinkButton } from '@/components/Buttons';

import * as locale from '@/resources/locale';
import routesMap from '@/resources/routesMap';

export default function Menu({ buttonsShown=false }) {
	return (
		<nav className='menu'>
			<h2 className='menu__title'>{locale.appInfo.name}</h2> {/*  TODO: Link to home */}

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
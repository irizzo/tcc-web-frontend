import './menu.scss';

import { LinkButton } from '@/components/Buttons';

import * as locale from '@/resources/locale';

export default function Menu({ buttonsShown=false }) {
	return (
		<nav className='menu'>
			<h2 className='menu__title'>{locale.appInfo.name}</h2> {/*  TODO: Link to home */}

			{
				buttonsShown ?
					(<div className='flex flex--row menu__buttons'>
						<LinkButton path='/user/login' title={locale.pageTitles.user.login} variant='filled' small />
						<LinkButton path='/user/sign-up' title={locale.pageTitles.user.signUp} variant='outlined' small />
					</div>)
				:
				null
			}

		</nav>
	);
}
import { FaArrowRight, FaGear, FaCircleInfo, FaBook } from 'react-icons/fa6';

import './sideBar.scss';
import * as locale from '@/resources/locale';
import Link from 'next/link';

export default function SideBar() {
	const currentDate = new Date();
	const weekday = currentDate.getDay();
	const today = `${locale.weekdays[weekday]}, ${currentDate.toLocaleDateString()}`;

	return (
		<aside>
			<header className='sidebar__header'>
				<h1 className='header__title'>{'Isabelle Rizzo'}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			{/* TODO: colocar as rotas para as páginas */}
			{/* TODO: colocar div com as opções da página atual */}
			<nav className='sidebar__nav'>
				<ul className='nav__list'>
					<NavListItem path='/events'>{locale.pageTitles.event.all}</NavListItem>
					<NavListItem path='/tasks'>{locale.pageTitles.tasks.all}</NavListItem>
					<NavListItem path='/habits'>{locale.pageTitles.habits.all}</NavListItem>
				</ul>

				<ul className='nav__list'>
					<NavListItem path='/settings' customIcon={<FaGear className='nav__item__icon' />} >{locale.pageTitles.settings}</NavListItem>
					<NavListItem path='/contents' customIcon={<FaBook className='nav__item__icon' />} >{locale.pageTitles.contents}</NavListItem>
					<NavListItem path='/about' customIcon={<FaCircleInfo className='nav__item__icon' />} >{locale.pageTitles.about}</NavListItem>
				</ul>
			</nav>
		</aside>
	);
}

function NavListItem({children, path='/', customIcon=null}) {
	return (
		<Link className='flex flex--row flex--row nav__item' href={path}>
			{customIcon ?
				customIcon :
				<FaArrowRight className='nav__item__icon' />
			}
			<li>{children}</li>
		</Link>
	);
}
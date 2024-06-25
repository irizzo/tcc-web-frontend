import Link from 'next/link';

import { FaArrowRight, FaGear, FaCircleInfo, FaBook, FaPlus } from 'react-icons/fa6';

import './sideBar.scss';
import * as locale from '@/resources/locale';

export default function SideBar() {
	const currentDate = new Date();
	const weekday = currentDate.getDay();
	const today = `${locale.weekdaysMap[weekday]}, ${currentDate.toLocaleDateString()}`;

	return (
		<aside>
			<header className='sidebar__header'>
				<h1 className='header__title'>{'Isabelle Rizzo'}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			{/* TODO: colocar as rotas para as páginas */}
			<nav className='sidebar__nav'>
				<ul className='nav__list'>
					<NavListItem path='/dashboard'>{locale.pageTitles.dashboard}</NavListItem>
					<NavListItem path='/categories'>{locale.pageTitles.categories.all}</NavListItem>
					<NavListItem path='/events'>{locale.pageTitles.events.all}</NavListItem>
					<NavListItem path='/tasks'>{locale.pageTitles.tasks.all}</NavListItem>
					<NavListItem path='/habits'>{locale.pageTitles.habits.all}</NavListItem>
				</ul>

				<ul className='nav__list'>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path='/categories/new'>{locale.pageTitles.categories.new}</NavListItem>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path='/events/new'>{locale.pageTitles.events.new}</NavListItem>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path='/tasks/new'>{locale.pageTitles.tasks.new}</NavListItem>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path='/habits/new'>{locale.pageTitles.habits.new}</NavListItem>
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
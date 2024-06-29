'use client';

import Link from 'next/link';

import { useContext, useCallback, useEffect } from 'react';
import { UserAccessStateContext } from '@/hooks';

import { FaArrowRight, FaGear, FaCircleInfo, FaBook, FaPlus, FaArrowRightFromBracket } from 'react-icons/fa6';

import './sideBar.scss';
import * as locale from '@/resources/locale';

import { clearTokenCookie, navigateTo } from '@/utils';
import verifyUserAuth from '@/utils/verifyUserAuth';
import { DefaultButton } from '../Buttons';
import routesMap from '@/resources/routesMap';

export default function SideBar() {
	const currentDate = new Date();
	const weekday = currentDate.getDay();
	const today = `${locale.weekdaysMap[weekday]}, ${currentDate.toLocaleDateString()}`;

	// const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	// const isUserLogged = useCallback(
	// 	async () => { verifyUserAuth(userAccessState, setUserAccessState); },
	// 	[ userAccessState, setUserAccessState ]
	// );

	// useEffect(() => {
	// 	isUserLogged();
	// }, [ isUserLogged ]);

	return (
		<aside>
			<header className='sidebar__header'>
				<h1 className='header__title'>{'Isabelle Rizzo'}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			<nav className='sidebar__nav'>
				<ul className='nav__list'>
					<NavListItem path={routesMap.dashboard}>{locale.pageTitles.dashboard}</NavListItem>
					<NavListItem path={routesMap.categories.base}>{locale.pageTitles.categories.all}</NavListItem>
					<NavListItem path={routesMap.events.base}>{locale.pageTitles.events.all}</NavListItem>
					<NavListItem path={routesMap.tasks.base}>{locale.pageTitles.tasks.all}</NavListItem>
					<NavListItem path={routesMap.habits.base}>{locale.pageTitles.habits.all}</NavListItem>
				</ul>

				<ul className='nav__list'>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.categories.new}>{locale.pageTitles.categories.new}</NavListItem>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.events.new}>{locale.pageTitles.events.new}</NavListItem>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.tasks.new}>{locale.pageTitles.tasks.new}</NavListItem>
					<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.habits.new}>{locale.pageTitles.habits.new}</NavListItem>
				</ul>

				<ul className='nav__list'>
					<NavListItem path={routesMap.settings} customIcon={<FaGear className='nav__item__icon' />} >{locale.pageTitles.settings}</NavListItem>
					<NavListItem path={routesMap.contents} customIcon={<FaBook className='nav__item__icon' />} >{locale.pageTitles.contents}</NavListItem>
					<NavListItem path={routesMap.about} customIcon={<FaCircleInfo className='nav__item__icon' />} >{locale.pageTitles.about}</NavListItem>

					<DefaultButton
						title={locale.actionsTitles.logout}
						variant='outlined'
						small
						onClickFunction={() => handleLogOut(setUserAccessState)}
					/>
				</ul>
			</nav>
		</aside>
	);
}

function NavListItem({children, path='/', customIcon=null, onClickFunction=null}) {
	return (
		<Link onClick={onClickFunction} className='flex flex--row flex--row nav__item' href={path}>
			{customIcon ?
				customIcon :
				<FaArrowRight className='nav__item__icon' />
			}
			<li>{children}</li>
		</Link>
	);
}

async function handleLogOut(setUserAuth) {
	await clearTokenCookie();
	setUserAuth(false);
	navigateTo({ path: routesMap.login });
}
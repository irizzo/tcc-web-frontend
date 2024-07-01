'use client';

import './sideBar.scss';

import { useContext, useCallback, useEffect } from 'react';
import { UserAccessStateContext } from '@/hooks';
import Link from 'next/link';

import { FaArrowRight, FaGear, FaCircleInfo, FaBook, FaPlus, FaArrowRightFromBracket, FaHouse, FaRegFile, FaRegCalendar, FaHashtag, FaSquareCheck } from 'react-icons/fa6';

import verifyUserAuth from '@/utils/verifyUserAuth';
import { clearTokenCookie, navigateTo } from '@/utils';

import routesMap from '@/resources/routesMap';
import * as locale from '@/resources/locale';

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
		<nav className='flex'>
			<header className='sidebar__header'>
				<h1 className='header__title'>{'Isabelle Rizzo'}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			<ul className='flex nav__list'>
				<h3 className='nav__list__title'>{locale.pageTitles.sideBar.pages}</h3>
				<NavListItem customIcon={<FaHouse className='nav__item__icon' />} path={routesMap.dashboard}>{locale.pageTitles.dashboard}</NavListItem>
				<NavListItem customIcon={<FaHashtag className='nav__item__icon' />} path={routesMap.categories.base}>{locale.pageTitles.categories.all}</NavListItem>
				<NavListItem customIcon={<FaRegCalendar className='nav__item__icon' />} path={routesMap.events.base}>{locale.pageTitles.events.all}</NavListItem>
				<NavListItem customIcon={<FaSquareCheck className='nav__item__icon' />} path={routesMap.tasks.base}>{locale.pageTitles.tasks.all}</NavListItem>
				<NavListItem customIcon={<FaRegFile className='nav__item__icon' />} path={routesMap.notes.base}>{locale.pageTitles.notes.all}</NavListItem>

				<h3 className='nav__list__title'>{locale.pageTitles.sideBar.actions}</h3>
				<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.categories.new}>{locale.pageTitles.categories.new}</NavListItem>
				<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.events.new}>{locale.pageTitles.events.new}</NavListItem>
				<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.tasks.new}>{locale.pageTitles.tasks.new}</NavListItem>
				<NavListItem customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.notes.new}>{locale.pageTitles.notes.new}</NavListItem>

				<h3 className='nav__list__title'>{locale.pageTitles.sideBar.options}</h3>
				<NavListItem path={routesMap.settings} customIcon={<FaGear className='nav__item__icon' />} >{locale.pageTitles.settings}</NavListItem>
				<NavListItem path={routesMap.contents} customIcon={<FaBook className='nav__item__icon' />} >{locale.pageTitles.contents}</NavListItem>
				<NavListItem path={routesMap.about} customIcon={<FaCircleInfo className='nav__item__icon' />} >{locale.pageTitles.about}</NavListItem>
				<NavListButton onClickFunction={handleLogOut} customIcon={<FaArrowRightFromBracket className='nav__item__icon' />}>{locale.actionsTitles.logout}</NavListButton>
			</ul>
		</nav>
	);
};

function NavListItem({ children, path = '/', customIcon = null }) {
	return (
		<li className='flex flex--row nav__item'>
			<Link className='flex flex--row nav__item__link' href={path}>
				{customIcon ?
					customIcon :
					<FaArrowRight className='nav__item__icon' />
				}
				{children}
			</Link>
		</li>
	);
};

function NavListButton({ children, onClickFunction, customIcon }) {
	return (
		<li onClick={onClickFunction} className='flex flex--row nav__item'>
			<div className='flex flex--row nav__item__link'>
				{customIcon ?
					customIcon :
					<FaArrowRight className='nav__item__icon' />
				}
				{children}
			</div>
		</li>
	);
};

async function handleLogOut(setUserAuth) {
	await clearTokenCookie();
	setUserAuth(false);
	navigateTo({ path: routesMap.login });
};
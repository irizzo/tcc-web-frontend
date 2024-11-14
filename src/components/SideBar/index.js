'use client'

import { useContext } from 'react'
import Link from 'next/link'

import { FaArrowRight, FaGear, FaCircleInfo, FaBook, FaPlus, FaArrowRightFromBracket, FaHouse, FaRegFile, FaRegCalendar, FaHashtag, FaCircleCheck, FaClock, FaRegClock } from 'react-icons/fa6'

import { UserInfoContext } from '@/hooks'

import { clearTokenCookie, navigateTo } from '@/utils'
import routesMap from '@/resources/routesMap'
import { weekdaysMap, pagesTitles, actionsTitles, pagesKeys } from '@/resources/locale'

import './sideBar.scss'

export default function SideBar() {
	const currentDate = new Date()
	const weekday = currentDate.getDay()
	const today = `${weekdaysMap[weekday]}, ${currentDate.toLocaleDateString()}`

	const { userInfo } = useContext(UserInfoContext)

	async function handleLogOut() {
		await clearTokenCookie()
		navigateTo({ path: routesMap.home })
	}

	return (
		<nav className='flex'>
			<header className='sidebar__header'>
				<h1 className='header__title'>{userInfo?.data ? `${userInfo.data.firstName} ${userInfo.data.lastName}` : pagesTitles.loading + '...'}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			<ul className='flex nav__list'>
				<h3 className='nav__list__title'>{pagesTitles.sideBar.pages}</h3>
				<NavListItem itemId={pagesKeys.dashboard} customIcon={<FaHouse className='nav__item__icon' />} path={routesMap.dashboard.base}>{pagesTitles.dashboard}</NavListItem>
				<NavListItem itemId={pagesKeys.categories.base} customIcon={<FaHashtag className='nav__item__icon' />} path={routesMap.categories.base}>{pagesTitles.categories.base}</NavListItem>
				<NavListItem itemId={pagesKeys.events.base} customIcon={<FaRegCalendar className='nav__item__icon' />} path={routesMap.events.base}>{pagesTitles.events.base}</NavListItem>
				<NavListItem itemId={pagesKeys.tasks.base} customIcon={<FaCircleCheck className='nav__item__icon' />} path={routesMap.tasks.base}>{pagesTitles.tasks.base}</NavListItem>
				<NavListItem itemId={pagesKeys.notes.base} customIcon={<FaRegFile className='nav__item__icon' />} path={routesMap.notes.base}>{pagesTitles.notes.base}</NavListItem>
				<NavListItem itemId={pagesKeys.focus.base} customIcon={<FaRegClock className='nav__item__icon' />} path={routesMap.focus.base}>{pagesTitles.focus.base}</NavListItem>

				<h3 className='nav__list__title'>{pagesTitles.sideBar.shortcuts}</h3>
				<NavListItem itemId={pagesKeys.categories.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.categories.new}>{pagesTitles.categories.new}</NavListItem>
				<NavListItem itemId={pagesKeys.events.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.events.new}>{pagesTitles.events.new}</NavListItem>
				<NavListItem itemId={pagesKeys.tasks.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.tasks.new}>{pagesTitles.tasks.new}</NavListItem>
				<NavListItem itemId={pagesKeys.notes.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.notes.new}>{pagesTitles.notes.new}</NavListItem>

				<h3 className='nav__list__title'>{pagesTitles.sideBar.options}</h3>
				<NavListItem itemId={pagesKeys.settings.base} path={routesMap.settings.base} customIcon={<FaGear className='nav__item__icon' />} >{pagesTitles.settings.base}</NavListItem>
				{/* <NavListItem itemId={pagesKeys.contents} path={routesMap.contents} customIcon={<FaBook className='nav__item__icon' />} >{pagesTitles.contents}</NavListItem> */}
				{/* <NavListItem itemId={pagesKeys.about} path={routesMap.about} customIcon={<FaCircleInfo className='nav__item__icon' />} >{pagesTitles.about}</NavListItem> */}
				<NavListButton onClickFunction={handleLogOut} customIcon={<FaArrowRightFromBracket className='nav__item__icon' />}>{actionsTitles.logout}</NavListButton>
			</ul>
		</nav>
	)
};

function NavListItem({ children, path = '/', customIcon = null, itemId }) {
	return (
		<li key={itemId} id={itemId} className='flex flex--row nav__item'>
			<Link className='flex flex--row nav__item__link' href={path}>
				{customIcon ? customIcon : <FaArrowRight className='nav__item__icon' />}
				{children}
			</Link>
		</li>
	)
}

function NavListButton({ children, onClickFunction, customIcon }) {
	return (
		<li onClick={onClickFunction} className='flex flex--row nav__item'>
			<div className='flex flex--row nav__item__link'>
				{customIcon ? customIcon : <FaArrowRight className='nav__item__icon' />}
				{children}
			</div>
		</li>
	)
}
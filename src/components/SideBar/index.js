'use client'

import { useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaArrowRight, FaGear, FaCircleInfo, FaBook, FaPlus, FaArrowRightFromBracket, FaHouse, FaRegFile, FaRegCalendar, FaHashtag, FaCircleCheck, FaClock, FaRegClock } from 'react-icons/fa6'
import { UserInfoContext } from '@/hooks'

import { clearTokenCookie, navigateTo } from '@/utils'
import { routesMap } from '@/resources/routesMap'
import { weekdaysMap, pagesTitles, actionsTitles, pagesKeys } from '@/resources/locale'

import './sideBar.scss'

export default function SideBar() {
	const currentDate = new Date()
	const weekday = currentDate.getDay()
	const today = `${weekdaysMap[weekday]}, ${currentDate.toLocaleDateString()}`

	const [ currentPage, setCurrentPage ] = useState('DASHBOARD')
	const { userInfo } = useContext(UserInfoContext)

	const pathname = usePathname()

	useEffect(() => {
		if (!pathname.includes(currentPage.toLowerCase())) {
			const splitPathname = pathname.split('/', 10)

			if (pathname.includes('/new')) {
				const currentPageKey = pagesKeys[splitPathname[splitPathname.length - 2]].new
				setCurrentPage(currentPageKey)
				return
			}

			const currentPageKey = pagesKeys[splitPathname[splitPathname.length - 1]].base
			setCurrentPage(currentPageKey)
		}
	}, [])

	// TODO: passar pra server actions
	async function handleLogOut() {
		await clearTokenCookie()
		navigateTo({ path: routesMap.home })
	}

	function NavListItem({ children, path = '/', customIcon = null, itemId, selected }) {
		return (
			<li key={itemId} id={itemId} className={`flex flex--row nav__item ${selected ? 'selected' : ''}`} onClick={() => { setCurrentPage(itemId) }}>
				<Link className='flex flex--row nav__item__link' href={{ pathname: path, query: null }}>
					{customIcon ? customIcon : <FaArrowRight className='nav__item__icon' />}
					{children}
				</Link>
			</li>
		)
	}

	return (
		<nav className='flex'>
			<header className='sidebar__header'>
				<h1 className='header__title'>{userInfo?.data ? `${userInfo.data.firstName} ${userInfo.data.lastName}` : pagesTitles.loading + '...'}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			<ul className='flex nav__list'>
				<h3 className='nav__list__title'>{pagesTitles.sideBar.pages}</h3>
				<NavListItem selected={currentPage === pagesKeys.dashboard.base ? true : false} itemId={pagesKeys.dashboard.base} customIcon={<FaHouse className='nav__item__icon' />} path={routesMap.dashboard.base}>{pagesTitles.dashboard.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.categories.base ? true : false} itemId={pagesKeys.categories.base} customIcon={<FaHashtag className='nav__item__icon' />} path={routesMap.categories.base}>{pagesTitles.categories.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.events.base ? true : false} itemId={pagesKeys.events.base} customIcon={<FaRegCalendar className='nav__item__icon' />} path={routesMap.events.base}>{pagesTitles.events.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.tasks.base ? true : false} itemId={pagesKeys.tasks.base} customIcon={<FaCircleCheck className='nav__item__icon' />} path={routesMap.tasks.base}>{pagesTitles.tasks.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.notes.base ? true : false} itemId={pagesKeys.notes.base} customIcon={<FaRegFile className='nav__item__icon' />} path={routesMap.notes.base}>{pagesTitles.notes.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.focus.base ? true : false} itemId={pagesKeys.focus.base} customIcon={<FaRegClock className='nav__item__icon' />} path={routesMap.focus.base}>{pagesTitles.focus.base}</NavListItem>

				<h3 className='nav__list__title'>{pagesTitles.sideBar.shortcuts}</h3>
				<NavListItem selected={currentPage === pagesKeys.categories.new ? true : false} itemId={pagesKeys.categories.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.categories.new}>{pagesTitles.categories.new}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.events.new ? true : false} itemId={pagesKeys.events.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.events.new}>{pagesTitles.events.new}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.tasks.new ? true : false} itemId={pagesKeys.tasks.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.tasks.new}>{pagesTitles.tasks.new}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.notes.new ? true : false} itemId={pagesKeys.notes.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.notes.new}>{pagesTitles.notes.new}</NavListItem>

				<h3 className='nav__list__title'>{pagesTitles.sideBar.options}</h3>
				<NavListItem selected={currentPage === pagesKeys.settings.base ? true : false} itemId={pagesKeys.settings.base} path={routesMap.settings.base} customIcon={<FaGear className='nav__item__icon' />} >{pagesTitles.settings.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.contents.base ? true : false} itemId={pagesKeys.contents.base} path={routesMap.contents.base} customIcon={<FaBook className='nav__item__icon' />} >{pagesTitles.contents.base}</NavListItem>
				<NavListItem selected={currentPage === pagesKeys.about.base ? true : false} itemId={pagesKeys.about.base} path={routesMap.about.base} customIcon={<FaCircleInfo className='nav__item__icon' />} >{pagesTitles.about.base}</NavListItem>
				<NavListButton onClickFunction={handleLogOut} customIcon={<FaArrowRightFromBracket className='nav__item__icon' />}>{actionsTitles.logout}</NavListButton>
			</ul>
		</nav>
	)
};

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
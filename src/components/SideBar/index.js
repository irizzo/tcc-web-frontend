'use client'

import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'

import { FaArrowRight, FaGear, FaCircleInfo, FaBook, FaPlus, FaArrowRightFromBracket, FaHouse, FaRegFile, FaRegCalendar, FaHashtag, FaCircleCheck } from 'react-icons/fa6'

import { UserInfoContext } from '@/hooks'

import { clearTokenCookie, navigateTo } from '@/utils'
import routesMap from '@/resources/routesMap'
import { weekdaysMap, pagesTitles, actionsTitles, pagesKeys } from '@/resources/locale'
import { getUserInfo } from '@/services/userServices'

import Loading from '@/components/Loading'
import './sideBar.scss'

export default function SideBar() {
	const currentDate = new Date()
	const weekday = currentDate.getDay()
	const today = `${weekdaysMap[weekday]}, ${currentDate.toLocaleDateString()}`

	const { userInfo } = useContext(UserInfoContext)

	const [ isLoading, setIsLoading ] = useState(false)

	return (
		<nav className='flex'>
			{
				isLoading ?
					<Loading />
					:
					(<>
						<header className='sidebar__header'>
							<h1 className='header__title'>{`${userInfo.data.firstName} ${userInfo.data.lastName}`}</h1>
							<p className='header__subtitle'>{today}</p>
						</header>

						<ul className='flex nav__list'>
							<h3 className='nav__list__title'>{pagesTitles.sideBar.pages}</h3>
							<NavListItem itemId={pagesKeys.dashboard} customIcon={<FaHouse className='nav__item__icon' />} path={routesMap.dashboard}>{pagesTitles.dashboard}</NavListItem>
							<NavListItem itemId={pagesKeys.categories.all} customIcon={<FaHashtag className='nav__item__icon' />} path={routesMap.categories.base}>{pagesTitles.categories.all}</NavListItem>
							<NavListItem itemId={pagesKeys.events.all} customIcon={<FaRegCalendar className='nav__item__icon' />} path={routesMap.events.base}>{pagesTitles.events.all}</NavListItem>
							<NavListItem itemId={pagesKeys.tasks.all} customIcon={<FaCircleCheck className='nav__item__icon' />} path={routesMap.tasks.base}>{pagesTitles.tasks.all}</NavListItem>
							<NavListItem itemId={pagesKeys.notes.all} customIcon={<FaRegFile className='nav__item__icon' />} path={routesMap.notes.base}>{pagesTitles.notes.all}</NavListItem>

							<h3 className='nav__list__title'>{pagesTitles.sideBar.actions}</h3>
							<NavListItem itemId={pagesKeys.categories.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.categories.new}>{pagesTitles.categories.new}</NavListItem>
							<NavListItem itemId={pagesKeys.events.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.events.new}>{pagesTitles.events.new}</NavListItem>
							<NavListItem itemId={pagesKeys.tasks.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.tasks.new}>{pagesTitles.tasks.new}</NavListItem>
							<NavListItem itemId={pagesKeys.notes.new} customIcon={<FaPlus className='nav__item__icon' />} path={routesMap.notes.new}>{pagesTitles.notes.new}</NavListItem>

							<h3 className='nav__list__title'>{pagesTitles.sideBar.options}</h3>
							{/* <NavListItem itemId={pagesKeys.settings} path={routesMap.settings} customIcon={<FaGear className='nav__item__icon' />} >{pagesTitles.settings}</NavListItem> */}
							{/* <NavListItem itemId={pagesKeys.contents} path={routesMap.contents} customIcon={<FaBook className='nav__item__icon' />} >{pagesTitles.contents}</NavListItem> */}
							{/* <NavListItem itemId={pagesKeys.about} path={routesMap.about} customIcon={<FaCircleInfo className='nav__item__icon' />} >{pagesTitles.about}</NavListItem> */}
							<NavListButton onClickFunction={handleLogOut} customIcon={<FaArrowRightFromBracket className='nav__item__icon' />}>{actionsTitles.logout}</NavListButton>
						</ul>
					</>)
			}
		</nav>
	)
};

function NavListItem({ children, path = '/', customIcon = null, selected = false, itemId }) {
	const selectedClass = selected ? 'selected' : ''
	return (
		<li key={itemId} id={itemId} className={`flex flex--row nav__item ${selectedClass}`}>
			<Link className='flex flex--row nav__item__link' href={path}>
				{customIcon ? customIcon : <FaArrowRight className='nav__item__icon' />}
				{children}
			</Link>
		</li>
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
};

async function handleLogOut() {
	await clearTokenCookie()
	navigateTo({ path: routesMap.login })
};
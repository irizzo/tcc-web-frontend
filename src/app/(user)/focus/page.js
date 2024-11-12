'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'

import { FocusContext } from '@/hooks'
import Loading from '@/components/Loading'

import { pagesTitles, entitiesProperties } from '@/resources/locale'
import routesMap from '@/resources/routesMap'
import { FaArrowLeft, FaGear } from 'react-icons/fa6'

import './focus.scss'

export default function Focus() {
	const { focus, setFocus } = useContext(FocusContext)
	const { editing, setEditing } = useState(false)
	const { isLoading, setIsLoading } = useState(false)

	const router = useRouter()

	if (isLoading) return <Loading />

	return (
		<main className='flex focus__main'>
			<nav className='flex flex--row focus__nav' >
				<FaArrowLeft className='focus__nav__icon'  onClick={() => { router.back() }} />
				<FaGear className='focus__nav__icon' onClick={() => { console.log('config') }} />
			</nav>

			<section className='focus__timer'>
				<h1>Timer</h1>
			</section>

			<aside className='focus__config'>
				<h2>Config</h2>
			</aside>
		</main>
	)
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTimer } from 'react-timer-hook'

import { FaArrowLeft, FaClockRotateLeft, FaGear, FaRegClock, FaPlay } from 'react-icons/fa6'
import { DefaultButton } from '@/components/Buttons'
import Loading from '@/components/Loading'

import { pagesTitles, entitiesProperties } from '@/resources/locale'
import routesMap from '@/resources/routesMap'

import './focus.scss'

export default function Focus() {
	const router = useRouter()

	function Timer({ expiryTimestamp, autoStart }) {
		const {
			totalSeconds,
			seconds,
			minutes,
			hours,
			days,
			isRunning,
			start,
			pause,
			resume,
			restart
		} = useTimer({ expiryTimestamp, autoStart, onExpire: () => console.warn('onExpire called') })

		return (
			<div style={{ textAlign: 'center' }}>
				<div style={{ fontSize: '100px' }}>
					<span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
				</div>
				<p>{isRunning ? 'Running' : 'Not running'}</p>
				<button onClick={start}>Start</button>
				<button onClick={pause}>Pause</button>
				<button onClick={resume}>Resume</button>
				<button onClick={() => {
					// Restarts to 5 minutes timer
					const time = new Date();
					time.setSeconds(time.getSeconds() + 300);
					restart(time)
				}}>Restart</button>
			</div>
		)
	}


	const [ timers, setTimers ] = useState({ focus: 25, shortBreak: 5, longBreak: 15 })
	const [ currentTimer, setCurrentTimer ] = useState('focus')


	const { editing, setEditing } = useState(false)
	const { isLoading, setIsLoading } = useState(false)

	const deadline = new Date().getTime() + (timers[currentTimer]) * 60000

	return (
		<div>
			<Timer expiryTimestamp={deadline} autoStart={false} />
		</div>
	)


	// if (isLoading) return <Loading />

	// return (
	// 	<main className='flex focus__main'>
	// 		<nav className='flex flex--row focus__nav' >
	// 			<FaArrowLeft className='focus__nav__icon' onClick={() => { router.back() }} />
	// 			<h1>{pagesTitles.focus.base}</h1>
	// 			<FaGear className='focus__nav__icon' onClick={() => { alert('config') }} />
	// 		</nav>

	// 		<div className='flex flex--row content__container'>
	// 			<section className='focus__timer'>
	// 				<div className='clock__container'>
	// 					<h2 className='clock__text'>
	// 						{`${clock.minutes < 10 ? '0' : ''}` + `${clock.minutes}`}
	// 						:
	// 						{`${clock.seconds < 10 ? '0' : ''}` + `${clock.seconds}`}
	// 					</h2>
	// 				</div>
	// 				<span><FaRegPlayCircle className='focus__nav__icon' /> Start</span>
	// 				<span><FaClockRotateLeft className='focus__nav__icon' /> Reset</span>
	// 				<span><FaRegClock className='focus__nav__icon' /> Focus</span>
	// 				<span><FaRegClock className='focus__nav__icon' /> Short Break</span>
	// 				<span><FaRegClock className='focus__nav__icon' /> Long Break</span>
	// 			</section>

	// 			<aside className='focus__config'>
	// 				<h2>Config</h2>
	// 			</aside>
	// 		</div>

	// 	</main>
	// )
}
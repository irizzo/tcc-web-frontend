'use client'

import { useState, useContext } from 'react'
import { UserTimersContext } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useTimer } from 'react-timer-hook'

import { FaArrowLeft, FaClockRotateLeft, FaGear, FaRegClock, FaPlay, FaPause, FaBook } from 'react-icons/fa6'
import { DefaultButton, IconButton } from '@/components/Buttons'
import Loading from '@/components/Loading'

import { pagesTitles, entitiesProperties } from '@/resources/locale'
import routesMap from '@/resources/routesMap'

import './focus.scss'
import { FormContainer, FormInfo, FormSection } from '@/components/Form'
import { navigateTo } from '@/utils'

export default function Focus() {
	const router = useRouter()

	const { userTimers, setUserTimers } = useContext(UserTimersContext)

	const [ editTimers, setEditTimers ] = useState({ focus: userTimers['focus'], shortBreak: userTimers['shortBreak'], longBreak: userTimers['longBreak'] })
	const [ currentTimer, setCurrentTimer ] = useState('focus')
	const [ deadline, setDeadline ] = useState(new Date().getTime() + (userTimers[currentTimer]) * 60000)
	const [editing, setEditing] = useState(false)

	const _handleEdit = {
		handleState: () => {
			if (editing) setEditTimers({ focus: userTimers['focus'], shortBreak: userTimers['shortBreak'], longBreak: userTimers['longBreak'] })
			setEditing(!editing)
		},

		submit: (e) => {
			e.preventDefault()
			console.log('submit config')
			setUserTimers({...editTimers})
		},

		reset: () => {
			console.log('reset')
			setEditTimers({ focus: 25, shortBreak: 5, longBreak: 15 })
		}
	}

	function Timer({ timespan }) {
		function getDeadline(srcTimespan) {
			return new Date().getTime() + (srcTimespan) * 1000
		}

		function handleChangeCurrentTimer(updateTimer) {
			setCurrentTimer(updateTimer)
			setDeadline(new Date().getTime() + (userTimers[updateTimer]) * 60000)
			restart(getDeadline(userTimers[currentTimer] * 60))
		}

		const deadline = currentTimer ? getDeadline(timespan) : 0

		const {
			seconds,
			minutes,
			isRunning,
			start,
			pause,
			restart
		} = useTimer({ expiryTimestamp: deadline, autoStart: false, onExpire: () => alert('Timer expirado') })

		return (
			<section className='flex focus__timer'>
				<h2 className='clock__text'>
					{`${minutes < 10 ? '0' : ''}` + minutes + ':' + `${seconds < 10 ? '0' : ''}` + seconds}
				</h2>

				<section className='flex'>
					<div className='flex flex--row'>
						<IconButton
							title='Iniciar'
							icon={<FaPlay className='button__icon' />}
							variant='outlined'
							small
							isDisabled={isRunning}
							onClickFunction={start}>
						</IconButton>
						<IconButton
							title='Pausar'
							icon={<FaPause className='button__icon' />}
							variant='outlined'
							small
							isDisabled={!isRunning}
							onClickFunction={pause}>
						</IconButton>
						<IconButton
							title='Reiniciar'
							icon={<FaClockRotateLeft className='button__icon' />}
							variant='outlined'
							small
							onClickFunction={() => {
								restart(getDeadline(timespan))
							}}>
						</IconButton>
					</div>

					<div className='flex flex--row flex--wrap'>
						<IconButton
							title='Timer Foco'
							icon={<FaRegClock className='button__icon' />}
							variant='outlined'
							isDisabled={currentTimer === 'focus'}
							onClickFunction={() => { handleChangeCurrentTimer('focus') }}>
						</IconButton>
						<IconButton
							title='Timer Descanso Curto'
							icon={<FaRegClock className='button__icon' />}
							variant='outlined'
							isDisabled={currentTimer === 'shortBreak'}
							onClickFunction={() => { handleChangeCurrentTimer('shortBreak') }}>
						</IconButton>
						<IconButton
							title='Timer Descanso Longo'
							icon={<FaRegClock className='button__icon' />}
							variant='outlined'
							isDisabled={currentTimer === 'longBreak'}
							onClickFunction={() => { handleChangeCurrentTimer('longBreak') }}>
						</IconButton>
					</div>
				</section >
			</section>
		)
	}

	return (
		<main className='flex focus__main'>
			{console.log('userTimers: ', userTimers)}
			<nav className='flex flex--row focus__nav' >
				<FaArrowLeft className='focus__nav__icon' onClick={() => { router.back() }} />
				<h1>{pagesTitles.focus.base}</h1>
				<FaGear className='focus__nav__icon' onClick={() => { _handleEdit.handleState() }} />
			</nav>

			<div className='flex flex--row content__container'>
				<Timer timespan={userTimers[currentTimer] * 60} expiryTimestamp={deadline} />
				<aside className={`flex focus__config ${editing ? '' : 'hidden'}`}>
					<FormContainer
						variantClasses='form__container--fullW' title='Configurar Timers'
					>
						<FormInfo>
							Para saber mais, leia sobre a <b>Técnica Pomodoro</b> na aba 
							<span className='link' onClick={() => navigateTo({ path: routesMap.contents.pomo })}> <FaBook className='button__icon' /> Conteúdos</span></FormInfo>
						<FormSection labelFor='focus' sectionTitle='Duração Timer Foco'>
							<input
								name='focus' type='number' min={1} max={90} value={editTimers.focus} readOnly={!editing}
								onChange={(e) => { setEditTimers({ ...editTimers, focus: parseInt(e.target.value) }) }}
							/>
						</FormSection>
						<FormSection labelFor='shortBreak' sectionTitle='Duração Timer Descanso'>
							<input
								name='shortBreak' type='number' min={1} max={90} value={editTimers.shortBreak} readOnly={!editing}
								onChange={(e) => { setEditTimers({ ...editTimers, shortBreak: parseInt(e.target.value) }) }}
							/>
						</FormSection>
						<FormSection labelFor='longBreak' sectionTitle='Duração Timer Descanso Longo'>
							<input
								name='longBreak' type='number' min={1} max={90} value={editTimers.longBreak} readOnly={!editing}
								onChange={(e) => { setEditTimers({ ...editTimers, longBreak: parseInt(e.target.value) }) }}
							/>
						</FormSection>

						<section className='flex flex--row flex--wrap'>
							<DefaultButton
								small variant='outlined' type='button' title='Reset'
								onClickFunction={() => { _handleEdit.reset() }}
							/>
							<DefaultButton
								small variant='outlined' type='button' title='Cancelar'
								onClickFunction={() => { _handleEdit.handleState() }}
							/>
							<DefaultButton
								small variant='filled' type='submit' title='Salvar'
								onClickFunction={(e) => { _handleEdit.submit(e) }}
							/>
						</section>
					</FormContainer>
				</aside>
			</div>

		</main >
	)
}
'use client'

import { useState, useContext } from 'react'
import { UserTimersContext } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useTimer } from 'react-timer-hook'

import { FaArrowLeft, FaClockRotateLeft, FaGear, FaRegClock, FaPlay, FaPause, FaBook } from 'react-icons/fa6'
import { DefaultButton, IconButton } from '@/components/Buttons'
import { FormContainer, FormInfo, FormSection } from '@/components/Form'
import { DefaultPageContainer } from '@/components/PageContainer'

import { pagesTitles, timerTitles } from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'
import { navigateTo } from '@/utils'

import '@/styles/global.scss'
import './focus.scss'

export default function Focus() {
	const router = useRouter()

	const { userTimers, setUserTimers } = useContext(UserTimersContext)

	const [editTimers, setEditTimers] = useState({ focus: userTimers['focus'], shortBreak: userTimers['shortBreak'], longBreak: userTimers['longBreak'] })
	const [currentTimer, setCurrentTimer] = useState('focus')
	const [deadline, setDeadline] = useState(new Date().getTime() + (userTimers[currentTimer]) * 60000)
	const [editing, setEditing] = useState(false)

	const _handleEdit = {
		handleState: () => {
			if (editing) setEditTimers({ focus: userTimers['focus'], shortBreak: userTimers['shortBreak'], longBreak: userTimers['longBreak'] })
			setEditing(!editing)
		},

		submit: (e) => {
			e.preventDefault()
			setUserTimers({ ...editTimers })
			setEditing(false)
		},

		reset: () => {
			console.debug('reset')
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
				<div className='flex'>
					<h2 className='clock'>
						{`${minutes < 10 ? '0' : ''}` + minutes + ':' + `${seconds < 10 ? '0' : ''}` + seconds}
					</h2>
					<span className='clock__text'>Timer Atual: {timerTitles[currentTimer]}</span>
				</div>

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
		<DefaultPageContainer>
			<main className='flex focus__main'>
				{console.debug('userTimers: ', userTimers)}
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
								Para saber mais, leia sobre a Técnica Pomodoro na aba
								<span className='link' onClick={() => navigateTo({ path: routesMap.contents.pomo })}> Conteúdos <FaBook className='button__icon' /></span></FormInfo>
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
		</DefaultPageContainer>
	)
}
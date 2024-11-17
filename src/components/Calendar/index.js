import Link from 'next/link'
import { FaCircleCheck, FaRegCalendar } from 'react-icons/fa6'
import { routesMap } from '@/resources/routesMap'

import './calendar.scss'

const Calendar = ({ events, tasks }) => {
	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth() // 0 = Janeiro, 11 = Dezembro
	const firstDayOfMonth = new Date(year, month, 1)
	const lastDayOfMonth = new Date(year, month + 1, 0)
	const daysInMonth = lastDayOfMonth.getDate()

	// Gerar os dias do calendário com preenchimento inicial (dias da semana antes do dia 1)
	const firstWeekDay = firstDayOfMonth.getDay() // 0 = Domingo, 6 = Sábado
	const calendarDays = []

	// Preencher os dias vazios antes do início do mês
	for (let i = 0; i < firstWeekDay; i++) {
		calendarDays.push(null)
	}

	// Preencher os dias do mês
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push(day)
	}

	let appointmentsByDate = {}

	events && Object.keys(events).forEach(function (key, index) {
		if (events[key].startDate.getFullYear() === year && events[key].startDate.getMonth() === month) {
			const day = events[key].startDate.getDate()
			if (!appointmentsByDate[day]) {
				appointmentsByDate[day] = []
			}
			const appointment = events[key]
			appointment.type = 'event'
			appointmentsByDate[day].push(appointment)
		}
	})

	tasks && Object.keys(tasks).forEach(function (key, index) {
		if (tasks[key].dueDate.getFullYear() === year && tasks[key].dueDate.getMonth() === month) {
			const day = tasks[key].dueDate.getDate()
			if (!appointmentsByDate[day]) {
				appointmentsByDate[day] = []
			}

			const appointment = tasks[key]
			appointment.type = 'task'
			appointmentsByDate[day].push(appointment)
		}
	})

	return (
		<div className='flex calendar__container'>
			<h1>{today.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h1>
			<div className='calendar__titles'>
				{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
					<span key={day}>{day}</span>
				))}
			</div>

			<div className='calendar'>
				{calendarDays.map((day, index) => (
					<div key={index} className='flex flex--sp-between calendar__day'>
						<span className='day__title'>{day}</span>
						{day && appointmentsByDate[day] && (
							<ul className='flex appointments__container'>
								{
									appointmentsByDate[day].map((appointment, idx) => {
										const _query = {...appointment}
										if (appointment.type === 'task') {
											appointment.dueDate && (_query.dueDate = appointment.dueDate.toLocaleString())
											appointment.schedueledDate && (_query.schedueledDate = appointment.schedueledDate.toLocaleString())
										}
										if (appointment.type === 'event') {
											appointment.startDate && (_query.startDate = appointment.startDate.toLocaleString())
											appointment.endDate && (_query.endDate = appointment.endDate.toLocaleString())
										}
										return (
											<li className='appointment' key={idx}>
												<Link title={appointment.title} className='appointment__link' href={{ pathname: `${appointment.type === 'task' ? routesMap.tasks.base : routesMap.events.base}/${appointment.id}` , query: _query}}>
													{appointment.type === 'task' ? <FaCircleCheck className='icon' /> : <FaRegCalendar className='icon' />}
													{' '}
													{appointment.title.length > 25 ? `${appointment.title.slice(0, 25)}...` : appointment.title}
												</Link>
											</li>
										)
									})
								}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Calendar
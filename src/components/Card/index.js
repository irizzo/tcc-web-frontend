import { FaRegCalendar, FaCircleCheck } from 'react-icons/fa6'
import Link from 'next/link'

import { CategoryTag, DueDateTag, PriorityTag, ProgressTag } from './CardTags'

import { routesMap } from '@/resources/routesMap'
import { statusInfo, prioritiesInfo } from '@/resources/locale'

import './card.scss'

export function GeneralCardContainer({ children, path = '', title, _query = null }) {
	return (
		<div className='flex card__container'>
			<Link className='card__title' href={{ pathname: path, query: _query }} >
				<h3>{title}</h3>
			</Link>
			{children}
		</div>
	)
}

export function _GeneralCard({ noteInfo, categoryTitle }) {
	const notePath = `${routesMap.notes.base}/${noteInfo.id}`
	const titleAbstract = noteInfo.title.length > 50 ? noteInfo.title.slice(0, 50) + '...' : noteInfo.title
	const contentAbstract = noteInfo.innerContent.length > 150 ? noteInfo.innerContent.slice(0, 150) + '...' : noteInfo.innerContent
	return (
		<Link className='flex note-container' href={{ pathname: notePath, query: noteInfo }}>
			<h3 className='note__title'>{noteInfo.title.length > 0 ? titleAbstract : 'Nota Sem Título'}</h3>
			<p className='note__abstract'>{contentAbstract}</p>
			{noteInfo.categoryCode && <CategoryTag categoryTitle={categoryTitle} />}
		</Link>
	)
}

export function FeedCard({ contentInfo }) {
	const contentPath = `${routesMap.contents.base}/${contentInfo.id}`
	const abstract = contentInfo.content.slice(0, 200) + '...'

	return (
		<GeneralCardContainer path={contentPath} title={contentInfo.title} _query={contentInfo}>
			<p>{abstract}</p>
		</GeneralCardContainer>
	)
}

export function CategoryCard({ categoryInfo }) {
	const categoryPath = `${routesMap.categories.base}/${categoryInfo.id}`
	return (
		<GeneralCardContainer path={categoryPath} title={categoryInfo.title} _query={categoryInfo}>
			{categoryInfo.description && <p>{categoryInfo.description.length > 55 ? categoryInfo.description.slice(0, 55) + '...' : categoryInfo.description}</p>}
		</GeneralCardContainer>
	)
}

export function TaskCard({ taskInfo, categoryTitle, pastDue = false }) {
	const taskPath = `${routesMap.tasks.base}/${taskInfo.id}`
	const showTagsContainer = (taskInfo.categoryCode || taskInfo.dueDate || taskInfo.priorityCode || taskInfo.statusCode) ? true : false

	return (
		<div className='flex card__container'>
			<Link className='flex flex--row card__title' href={{ pathname: taskPath, query: taskInfo }} >
				<FaCircleCheck className='card__title__icon' />
				<h4>{taskInfo.title}</h4>
			</Link>

			{showTagsContainer && <div className='flex flex--row flex--sp-between tags__container'>
				{taskInfo.priorityCode && <PriorityTag priorityCode={taskInfo.priorityCode} />}
				{taskInfo.statusCode && <ProgressTag statusCode={taskInfo.statusCode} />}
				{taskInfo.dueDate && <DueDateTag pastDue={pastDue} dueDate={taskInfo.dueDate} />}
				{taskInfo.categoryCode && <CategoryTag categoryTitle={categoryTitle} categoryCode={taskInfo.categoryCode} />}
			</div>}
		</div>
	)
}

export function EventCard({ eventInfo, categoryTitle }) {
	const eventPath = `${routesMap.events.base}/${eventInfo.id}`
	return (
		<div className='flex card__container'>
			<Link className='flex flex--row card__title' href={{ pathname: eventPath, query: eventInfo }} >
				<FaRegCalendar className='card__title__icon' />
				<h4>{eventInfo.title}</h4>
			</Link>

			<div className='flex flex--row flex--sp-between tags__container'>
				<DueDateTag dueDate={eventInfo.startDate} />
				{eventInfo.categoryCode && <CategoryTag categoryTitle={categoryTitle} />}
			</div>
		</div>
	)
}

export function NoteCard({ noteInfo, categoryTitle }) {
	const notePath = `${routesMap.notes.base}/${noteInfo.id}`
	const titleAbstract = noteInfo.title.length > 50 ? noteInfo.title.slice(0, 50) + '...' : noteInfo.title
	const contentAbstract = noteInfo.innerContent.length > 150 ? noteInfo.innerContent.slice(0, 150) + '...' : noteInfo.innerContent
	return (
		<Link className='flex note-container' href={{ pathname: notePath, query: noteInfo }}>
			<h3 className='note__title'>{noteInfo.title.length > 0 ? titleAbstract : 'Nota Sem Título'}</h3>
			<p className='note__abstract'>{contentAbstract}</p>
			{noteInfo.categoryCode && <CategoryTag categoryTitle={categoryTitle} />}
		</Link>
	)
}
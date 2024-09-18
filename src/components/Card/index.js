import { FaRegCalendar, FaHashtag, FaCircleCheck, FaRegCalendarCheck, FaArrowUp19, FaChartSimple } from 'react-icons/fa6'
import Link from 'next/link'

import routesMap from '@/resources/routesMap'
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

export function FeedCard({ contentInfo }) {
	const contentPath = `${routesMap.contents}/${contentInfo.id}`
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

export function NoteCard({ noteInfo }) {
	const notePath = `${routesMap.notes}/${noteInfo.id}`
	const abstract = noteInfo.content.length > 100 ? noteInfo.content.slice(0, 100) + '...' : noteInfo.content

	return (
		<GeneralCardContainer path={notePath} title={noteInfo.title} _query={noteInfo}>
			<p>{abstract}</p>
		</GeneralCardContainer>
	)
}

export function TaskCard({ taskInfo, categoryTitle }) {
	console.log('categoryTitle: ', categoryTitle)

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
				{taskInfo.dueDate && <DueDateTag dueDate={taskInfo.dueDate} />}
				{taskInfo.categoryCode && <CategoryTag categoryTitle={categoryTitle} categoryCode={taskInfo.categoryCode} />}
			</div>}
		</div>
	)
}

export function EventCard({ eventInfo, categoryTitle }) {
	console.log('categoryTitle: ', categoryTitle)

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

/* Tags */
function TagContainer({ content, children }) {
	return (
		<div className='flex flex--row flex--center tag__container'>
			{children}
			<p className='tag__content'>{content}</p>
		</div>
	)
}

export function DueDateTag({ dueDate }) {
	const formatted = dueDate.slice(0, (dueDate.length - 3))
	return (
		<TagContainer content={formatted}	>
			<FaRegCalendarCheck className='tag__icon' />
		</TagContainer>
	)
}

export function CategoryTag({ categoryTitle }) {
	return (
		<TagContainer content={categoryTitle}	>
			<FaHashtag className='tag__icon' />
		</TagContainer>
	)
}

export function ProgressTag({ statusCode }) {
	const tagContent = statusInfo[statusCode].title
	return (
		<TagContainer content={tagContent}	>
			<FaChartSimple className='tag__icon' />
		</TagContainer>
	)
}

export function PriorityTag({ priorityCode }) {
	const tagContent = `${prioritiesInfo[priorityCode].title} (${prioritiesInfo[priorityCode].priorityLevel})`
	return (
		<TagContainer content={tagContent}>
			<FaArrowUp19 className='tag__icon' />
		</TagContainer>
	)
}
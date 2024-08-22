import { FaAsterisk, FaRegCalendar, FaHashtag, FaSquareCheck, FaRegCalendarDays, FaRegCalendarCheck, FaChartSimple } from 'react-icons/fa6';

import Link from 'next/link';
import routesMap from '@/resources/routesMap';

import { entitiesProperties } from '@/resources/locale'; 

import './card.scss';

export function GeneralCardContainer({ children, path = '', title, _query = null }) {
	return (
		<div className='flex card__container'>
			<Link className='card__title' href={{ pathname: path, query: _query }} >
				<h3>{title}</h3>
			</Link>
			{children}
		</div>
	);
}

export function FeedCard({ contentInfo }) {
	const contentPath = `${routesMap.contents}/${contentInfo.id}`;
	const abstract = contentInfo.content.slice(0, 200) + '...';

	return (
		<GeneralCardContainer path={contentPath} title={contentInfo.title} _query={contentInfo}>
			<p>{abstract}</p>
		</GeneralCardContainer>
	);
}

export function CategoryCard({ categoryInfo }) {
	const categoryPath = `${routesMap.categories.base}/${categoryInfo.id}`;
	return (
		<GeneralCardContainer path={categoryPath} title={categoryInfo.title} _query={categoryInfo}>
			{categoryInfo.description && <p>{categoryInfo.description.length > 55 ? categoryInfo.description.slice(0, 55) + '...' : categoryInfo.description}</p>}
		</GeneralCardContainer>
	);
}

export function NoteCard({ noteInfo }) {
	const notePath = `${routesMap.notes}/${noteInfo.id}`;
	const abstract = noteInfo.content.length > 100 ? noteInfo.content.slice(0, 100) + '...' : noteInfo.content;

	return (
		<GeneralCardContainer path={notePath} title={noteInfo.title} _query={noteInfo}>
			<p>{abstract}</p>
		</GeneralCardContainer>
	);
}

/* User Specifc Cards */
export function UserCardContainer({ path = '', _query = null, title, dueDate, categoryCode, icon = null }) {
	const showTagsContainer = (categoryCode || dueDate) ? true : false;

	return (
		<div className='flex card__container'>
			<Link className='flex flex--row card__title' href={{ pathname: path, query: _query }} >
				{icon ? icon : <FaAsterisk className='card__title__icon' />}
				<h4>{title}</h4>
			</Link>

			{showTagsContainer && <div className='flex flex--row flex--sp-between tags__container'>
				{dueDate && <ScheduleTag scheduledDate={dueDate} />}
				{categoryCode && <CategoryTag categoryCode={categoryCode} />}
			</div>}
		</div>
	);
}

// TODO: Implementar botão para marcar tarefa como feita
export function TaskCard({ taskInfo }) {
	const taskPath = `${routesMap.tasks.base}/${taskInfo.id}`;

	console.log('taskInfo: ', taskInfo)
	return (
		<UserCardContainer
			path={taskPath}
			_query={taskInfo}
			title={taskInfo.title}
			dueDate={taskInfo.dueDate}
			categoryCode={taskInfo.categoryCode}
			icon={<FaSquareCheck className='card__title__icon' />}
		/>
	);
}

export function EventCard({ eventInfo }) {
	const eventPath = `${routesMap.events.base}/${eventInfo.id}`;
	return (
		<div className='flex card__container'>
			<Link className='flex flex--row card__title' href={{ pathname: eventPath, query: eventInfo }} >
				<FaRegCalendar className='card__title__icon' />
				<h4>{eventInfo.title}</h4>
			</Link>

			<div className='flex flex--row flex--sp-between tags__container'>
				<ScheduleTag scheduledDate={eventInfo.startDate} />
				{eventInfo.categoryCode && <CategoryTag categoryCode={eventInfo.categoryCode} />}
			</div>
		</div>
	);
}

export function HabitCard({ habitInfo }) {
	const habitPath = `${routesMap.habits.base}/${habitInfo.id}`;
	return (
		<UserCardContainer
			path={habitPath}
			_query={habitInfo}
			title={habitInfo.title}
			dueDate={habitInfo.dueDate}
			categoryCode={habitInfo.categoryCode}
			icon={<FaRegCalendarCheck className='card__title__icon' />}
		/>
	);
}

/* Tags */
function TagContainer({ content, children }) {
	return (
		<div className='flex flex--row flex--center tag__container'>
			{children}
			<p className='tag__content'>{content}</p>
		</div>
	);
}

export function ScheduleTag({ scheduledDate }) {
	const formatted = scheduledDate.slice(0, (scheduledDate.length - 3));

	return (
		<TagContainer content={formatted}	>
			<FaRegCalendarDays className='tag__icon' />
		</TagContainer>
	);
}

export function CategoryTag({ categoryCode }) {
	// TODO: get the category info from backend
	const categoryInfo = { code: 'ACADEMIC', title: 'Acadêmico', description: '' };

	return (
		<TagContainer content={categoryInfo.title}	>
			<FaHashtag className='tag__icon' />
		</TagContainer>
	);
}

export function ProgressTag({ statusCode }) {
	const tagContent = statusInfo[statusCode].title;

	return (
		<TagContainer content={tagContent}	>
			<FaChartSimple className='tag__icon' />
		</TagContainer>
	);
}

export function PriorityTag({ priorityCode }) {
	const tagContent = `${prioritiesInfo[priorityCode].title} (${prioritiesInfo[priorityCode].priorityLevel})`;

	return (
		<TagContainer content={tagContent}>
			<FaChartSimple className='tag__icon' />
		</TagContainer>
	);
}
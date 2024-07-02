import { FaAsterisk, FaRegCalendar, FaHashtag, FaSquareCheck, FaRegCalendarDays, FaRegCalendarCheck } from 'react-icons/fa6';

import Link from 'next/link';
import routesMap from '@/resources/routesMap';

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
	)
}

/* User Specifc Cards */
export function UserCardContainer({ path = '', _query = null, title, dueDate, categoryCode, icon = null }) {
	const showTagsContainer = (categoryCode || dueDate) ? true : false;

	return (
		<div className='flex card__container'>
			<Link className='flex flex--row card__title' href={{ pathname: path, query: _query }} >
				{icon ? icon : <FaAsterisk className='card__title__icon' />}
				<h3>{title}</h3>
			</Link>

			{showTagsContainer && <div className='flex flex--row flex--sp-between tags__container'>
				{dueDate && <ScheduleTag scheduledDate={dueDate} />}
				{categoryCode && <CategoryTag categoryCode={categoryCode} />}
			</div>}
		</div>
	);
}

export function TaskCard({ taskInfo }) {
	// TODO: tratar datas
	const taskPath = `${routesMap.tasks.base}/${taskInfo.id}`;

	// console.log('taskInfo.dueDate = ', taskInfo.dueDate)
	// console.log(' new Date(taskInfo.dueDate) = ', new Date(taskInfo.dueDate))

	// const testDueDate = '2024-07-18T10:00';

	// console.log('testDueDate = ', testDueDate)
	// console.log(' new Date(testDueDate) = ', new Date(testDueDate))
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
		<UserCardContainer
			path={eventPath}
			_query={eventInfo}
			title={eventInfo.title}
			dueDate={eventInfo.dueDate}
			categoryCode={eventInfo.categoryCode}
			icon={<FaRegCalendar className='card__title__icon' />}
		/>
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
	// TODO: treat dates

	return (
		// <TagContainer	content={scheduledDate}	>
		<TagContainer content={'10/06/2024'}	>
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


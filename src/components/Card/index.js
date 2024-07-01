'use client';

import './card.scss';
import Link from 'next/link';
import { FaRegCalendar, FaHashtag } from 'react-icons/fa6';
import routesMap from '@/resources/routesMap';

export function CardContainer({ children, path = '', title, _query = null }) {
	return (
		<div className='flex card__container'>
			<Link className='card__title' href={{ pathname: path, query: _query }} >
				<h3>{title}</h3>
			</Link>

			{children}
		</div>
	);
}

export function TaskCard({ taskInfo }) {
	// TODO: tratar datas
	const taskPath = `${routesMap.tasks.base}/${taskInfo.id}`;
	const showTagsContainer = (taskInfo.description || taskInfo.dueDate) ? true : false;

	// console.log('taskInfo.dueDate = ', taskInfo.dueDate)
	// console.log(' new Date(taskInfo.dueDate) = ', new Date(taskInfo.dueDate))

	// const testDueDate = '2024-07-18T10:00';

	// console.log('testDueDate = ', testDueDate)
	// console.log(' new Date(testDueDate) = ', new Date(testDueDate))
	return (
		<CardContainer path={taskPath} title={taskInfo.title} _query={taskInfo}>
			{taskInfo.description && <p>{taskInfo.description.length > 55 ? taskInfo.description.slice(0, 55) + '...' : taskInfo.description}</p>}

			{
				showTagsContainer && <TagsContainer>
					{/* {taskInfo.dueDate && <ScheduleTag scheduledDate={JSON.stringify(taskInfo.dueDate)} />} // todo: tratar data!!!*/} 
					{taskInfo.categoryCode && <CategoryTag categoryCode={taskInfo.categoryCode} />}
				</TagsContainer>
			}

		</CardContainer>
	);
}

export function FeedCard({ contentInfo }) {
	const contentPath = `${routesMap.contents}/${contentInfo.id}`;
	const abstract = contentInfo.content.slice(0, 200) + '...';

	return (
		<CardContainer path={contentPath} title={contentInfo.title} _query={contentInfo}>
			<p>{abstract}</p>
		</CardContainer>
	);
}

export function CategoryCard({ categoryInfo  }) {
	const categoryPath = `${routesMap.categories.base}/${categoryInfo.id}`;

	return (
		<CardContainer path={categoryPath} title={categoryInfo.title} _query={categoryInfo}>
			{categoryInfo.description && <p>{categoryInfo.description}</p>}
		</CardContainer>
	);
}

export function ScheduleTag({ scheduledDate }) {
	return (
		<TagContainer	content={scheduledDate}	>
			<FaRegCalendar className='tag__icon' />
		</TagContainer>
	);
}

export function CategoryTag({ categoryCode }) {
	// TODO: get the category info from backend

	const categoryInfo = { code: 'ACADEMIC', title: 'Acadêmico', description: '' };

	return (
		<div className='flex flex--row flex--center tag__container'>
			<FaHashtag className='tag__icon' />
			<p className='tag__content'>{categoryInfo.title}</p>
		</div>
	);
}

function TagsContainer({ children }) {
	return (
		<div className='flex flex--row flex--sp-between tags__container'>
			{children}
		</div>
	);
}

function TagContainer({ content, children }) {
	return (
		<div className='flex flex--row flex--center tag__container'>
			{children}
			<p className='tag__content'>{content}</p>
		</div>
	);
}
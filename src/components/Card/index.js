import './card.scss';

import Link from 'next/link';
import { FaEllipsisVertical, FaTag, FaRegCalendar } from 'react-icons/fa6';

import routesMap from '@/resources/routesMap';

export function ListBoard({ title, children }) {
	return (
		<div className='listBoard'>
			<header className='flex flex--row flex--space-between listBoard__header'>
				<h2 className='header__title'>{title}</h2>
				<FaEllipsisVertical className='header__icon' />
			</header>

			<div className='listBoard__content'>
					{children}
			</div>
		</div>
	);
}

export function CardContainer({ children, path = '', title, _query=null }) {
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
	// TODO: treat dates
	const taskPath = `${routesMap.tasks.base}/${taskInfo.id}`;

	return (
		<CardContainer path={taskPath} title={taskInfo.title} _query={taskInfo}>
			{taskInfo.dueDate && <p>{taskInfo.dueDate.toString()}</p>}
			{taskInfo.categoryCode && <CategoryTag categoryCode={taskInfo.categoryCode} />}
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

export function CategoryCard ({ categoryInfo }) {
	const categoryPath = `${routesMap.categories.base}/${categoryInfo.id}`;

	return (
		<CardContainer path={categoryPath} title={categoryInfo.title} _query={categoryInfo}>
			{categoryInfo.description && <p>{categoryInfo.description}</p>}
		</CardContainer>
	);
}

export function ScheduleTag({ scheduledDate }) {
	return (
		<div className='tag__container'>
			<FaRegCalendar className='tag__icon' />
			<p className='tag__title'>{categoryInfo.title}</p>
		</div>
	);
}

export function CategoryTag({ categoryCode }) {
	// TODO: get the category info from backend

	const categoryInfo = { code: 'ACADEMIC', title: 'Acadêmico', description: '' };

	return (
		<div className='tag__container'>
			<FaTag className='tag__icon' />
			<p className='tag__title'>{categoryInfo.title}</p>
		</div>
	);
}
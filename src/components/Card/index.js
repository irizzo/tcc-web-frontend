import './card.scss';
import Link from 'next/link';

import { FaEllipsisVertical, FaTag, FaRegCalendar } from 'react-icons/fa6';
import { TitleLink } from '../Link';

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

export function CardContainer({ children, path, title }) {
	return (
		<div className='flex card__container'>
			<h2 className='card__title'>{title}</h2>
			{/* <TitleLink path={path} title={title}/> */}
			{children}
		</div>
	);
}

export function TaskCard({ path, taskInfo }) {
	// TODO: treat dates

	return (
		<CardContainer path={path} title={taskInfo.title}>
			{taskInfo.dueDate && <p>{taskInfo.dueDate.toString()}</p>}
			{taskInfo.categoryCode && <CategoryTag categoryCode={taskInfo.categoryCode} />}
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
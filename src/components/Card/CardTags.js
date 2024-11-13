import { FaHashtag, FaRegCalendarCheck, FaArrowUp19, FaChartSimple } from 'react-icons/fa6'
import { statusInfo, prioritiesInfo } from '@/resources/locale'
import { convertStampToDate } from '@/utils/date.utils'
import './card.scss'

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
	let formatted = ''

	if (typeof dueDate !== typeof '') {
		formatted = convertStampToDate(dueDate)
		formatted = formatted.slice(0, formatted.length - 3)
	} else {
		const [ date, time ] = dueDate.split('T')
		const formattedDate = date.split('-').reverse().join('/')
		const formattedTime = time.split('.')[0].slice(0, 5)

		formatted = formattedDate + ', ' + formattedTime
	}

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
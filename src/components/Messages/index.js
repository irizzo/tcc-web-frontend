'use client';
import './messages.scss';

import * as locale from '@/resources/locale';

import { FaCircleInfo, FaTriangleExclamation, FaCircleExclamation } from 'react-icons/fa6';

function MessagesContainer({ title, content, variant }) {
	const variantClass = `message__container--${variant}`;

	return (
		<div className={`flex flex--row flex--center message__container ${variantClass}`}>
			<p className="message__content">
				<b className='message__title'>{title}</b>
				{content}
			</p>
		</div>
	);
}

export function GeneralInfo({ infoContent }) {
	return (
		<MessagesContainer
			title={<FaCircleInfo />}
			content={infoContent}
			variant='info'
		/>
	);
}

export function GeneralWarn({ warnContent }) {
	return (
		<MessagesContainer
			title={<FaTriangleExclamation />}
			content={warnContent}
			variant='warn'
		/>
	);
}

export function GeneralError({ errorContent }) {
	return (
		<MessagesContainer
			title={<FaCircleExclamation />}
			content={errorContent}
			variant='error'
		/>
	);
}

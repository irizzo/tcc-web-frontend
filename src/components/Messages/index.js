'use client';
import './messages.scss';

import * as locale from '@/resources/locale';

function MessagesContainer({ children, title, content, variant }) {
	const variantClass = `message__container--${variant}`;

	return (
		<div className={`flex flex--center message__container ${variantClass}`}>
			{/* <p className='message__title'>{title}</p> */}
			<p className="message__content">
				<b>{title}</b>
				{': '}
				{content}
			</p>
			{/* {children} */}
		</div>
	)
}

export function GeneralInfo({ infoContent, children }) {
	return (
		<MessagesContainer title={locale.messagesTitles.infoTitle} content={infoContent} variant='info'>
			{/* {children} */}
		</MessagesContainer>
	);
}

export function GeneralWarn({ warnContent, children }) {
	return (
		<MessagesContainer title={locale.messagesTitles.warnTitle} content={warnContent} variant='warn'>
			{/* {children} */}
		</MessagesContainer>
	);
}

export function GeneralError({ errorContent, children }) {
	return (
		<MessagesContainer
			title={locale.messagesTitles.errorTitle}
			content={errorContent}
			variant='error'
		>
			{/* {children} */}
		</MessagesContainer>
	);
}

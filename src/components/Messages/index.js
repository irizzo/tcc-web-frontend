'use client';
import './messages.scss';

import * as locale from '@/resources/locale';

function MessagesContainer({ children, title, content, variant }) {
	const variantClass = `message__container--${variant}`;

	return (
		<div className={`flex flex--center message__container ${variantClass}`}>
			<p className="message__content">
				<b>{title}</b>
				{': '}
				{content}
			</p>
		</div>
	)
}

export function GeneralInfo({ infoContent, children }) {
	return (
		<MessagesContainer title={locale.messagesTitles.infoTitle} content={infoContent} variant='info'>
		</MessagesContainer>
	);
}

export function GeneralWarn({ warnContent, children }) {
	return (
		<MessagesContainer title={locale.messagesTitles.warnTitle} content={warnContent} variant='warn'>
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
		</MessagesContainer>
	);
}

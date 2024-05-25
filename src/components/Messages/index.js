import './messages.scss';

export async function GeneralMessage({ content }) {
	return (
		<div className="flex flex--center message__container">
			<p className="message__content">{content}</p>
		</div>
	);
}
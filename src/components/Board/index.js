import './board.scss';

export function Board({ title, children }) {
	return (
		<div className='flex board__container'>
			<header className="flex board__header">
				<h2>{title}</h2>
			</header>

			<div className='board__list'>
				{children}
			</div>
		</div>
	);
}
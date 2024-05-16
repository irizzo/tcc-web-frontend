import '@/styles/global.scss';
import './card.scss';

// TODO: card item
export default function Card({ title, itemsList, height="default" }) {
	return(
		<div className={`card card--${height}--height`}>
			<h2 className='card__title'>{title}</h2>
			<div className='card__content'>
				<ul className='card__list'>
					{itemsList.map((item) => {
						return <li className='card__list__item' key={item.id} content={item}>{item.title}</li>
					})}
				</ul>
			</div>
		</div>
	)
}
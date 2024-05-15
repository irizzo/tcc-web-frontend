import '@/styles/global.scss';
import './card.scss';

export default function Card({ title, itemsList, height="default" }) {

	console.log(`height = ${height}`);
	console.log(`card--${height}--height`);
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
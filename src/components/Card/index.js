import '@/styles/global.scss';
import './card.scss';

import { FaAngleDown } from "react-icons/fa6";

// TODO: card item
export default function Card({ title, itemsList }) {
	return(
		<div className={`card`}>
			<header className='flex flex--row flex--space-between card__header'>
				<h2 className='header__title'>{title}</h2>
				<i className='header__icon'><FaAngleDown /></i>
			</header>
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
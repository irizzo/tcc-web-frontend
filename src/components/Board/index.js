import Link from 'next/link'
import { FaPlus } from 'react-icons/fa6'

import './board.scss'

export function Board({ title, children, path }) {
	return (
		<div className='flex board__container'>
			<header className="flex flex--row board__header">
				<h2 className='header__title'>{title}</h2>
				{path && <Link className='flex flex--center header__button' href={path}>
					<i><FaPlus className='header__button__icon' /></i>
				</Link>}

			</header>
			<div className='board__list'>
				{children}
			</div>
		</div>
	)
}
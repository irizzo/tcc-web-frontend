import Link from 'next/link';

// TODO: get styles from card
export function H2Link({ title, path }) {

	return(
		<h2 className='card__title'><Link className='title__link' href={path}>{title}</Link></h2>
	)
}
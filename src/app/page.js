'use client';

import './home.scss';

import { LinkButton } from '@/components/Buttons';
import Menu from '@/components/Menu';

export default function Home() {
	// check if user's logged in, if so, redirect to dashboard

	return (
		<div className='flex home__container'>
			<Menu buttonsShown />
			<main className='home__main'>
				<h1 className='home__main__title'>Nome do Produto</h1>
				<p className='home__main__subtitle'>Descrição do Produto</p>

				<LinkButton path='/contents' title="Começar" variant="filled"/>
			</main>
		</div>
	);
}

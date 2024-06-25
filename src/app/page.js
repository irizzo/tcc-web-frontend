'use client';

import './home.scss';

import { LinkButton } from '@/components/Buttons';
import Menu from '@/components/Menu';

import { appInfo, actionsTitles } from '@/resources/locale';

export default function Home() {
	// TODO: check if user's logged in, if so, redirect to dashboard

	return (
		<div className='flex home__container'>
			<Menu buttonsShown />
			<main className='home__main'>
				<h1 className='home__main__title'>{appInfo.name}</h1>
				<p className='home__main__subtitle'>{appInfo.description}</p>

				<LinkButton path='/contents' title={actionsTitles.start} variant="filled"/>
			</main>
		</div>
	);
}

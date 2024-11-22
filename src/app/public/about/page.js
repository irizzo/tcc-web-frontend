import { PublicPageTitle } from '@/components/Menu'
import { routesMap } from '@/resources/routesMap'
import Image from 'next/image'
import { pagesTitles, appInfo } from '@/resources/locale'

import './about.scss'

export default function AboutPage() {
	return (
		<div className='flex about__container'>
			<PublicPageTitle pageTitle={pagesTitles.about.base} />

			<section className='flex about__section'>
				<h2>Sobre a Ferramenta</h2>
				<p>{appInfo.aboutTheApp}</p>
				<p>Saiba mais acessando a página <a className='link' href={routesMap.contents.base}>Conteúdos</a></p>
			</section>

			<section className='flex about__section'>
				<h2>Sobre a criadora</h2>
				<div className='flex flex--row' style={{ width: '100%', justifyContent: 'flex-start' }}>
					<Image
						alt='Foto da criadora da ferramenta'
						src='/isabellerizzo.png'
						height={250}
						width={250}
						className='avatar'
					/>
					<p>{appInfo.aboutTheCreator}</p>
				</div>
			</section>
		</div>
	)
}
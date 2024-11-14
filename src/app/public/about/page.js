import { pagesTitles, appInfo } from '@/resources/locale'
import '@/app/public/about/about.scss'
import Image from 'next/image'

export default function AboutPage() {
	return (
		<>
			<h1>{pagesTitles.about}</h1>

			<section className='flex about__section'>
				<h2>Sobre a Ferramenta</h2>
				<p>{appInfo.aboutTheApp}</p>
			</section>

			<section className='flex about__section'>
				<h2>Sobre a criadora</h2>
				<div className='flex flex--row' style={{ width: '100%', justifyContent: 'flex-start' }}>
					<Image
						alt='Foto da criadora da ferramenta'
						src='/avatar.jpg'
						height={100}
						width={100}
						className='avatar'
					/>
					<p>{appInfo.aboutTheCreator}</p>
				</div>
			</section>
		</>
	)
}
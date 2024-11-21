import { UserProviders } from '@/hooks'
import { appInfo } from '@/resources/locale'

import { Raleway } from 'next/font/google'
const raleway = Raleway({ subsets: ['latin'], variable: '--raleway-font', display: 'swap' })
import { Suspense } from 'react'
import Loading from './loading'
import { FaLinkedin, FaSquareGithub } from 'react-icons/fa6'
import '@/styles/global.scss'


export const metadata = {
	title: appInfo.name,
	description: appInfo.description
}

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br" className={raleway.className}>
			<body className={`flex ${raleway.className}`}>
				<UserProviders>
					<div className='flex watermark'>
						<ul>
							<section className='flex flex--row'>
								<li className='flex flex--row'><a target='_blank' href='https://linkedin.com/in/isabellerizzo'><FaLinkedin className='icon' /> Linkekin</a></li>
								<li className='flex flex--row'><a target='_blank' href='https://github.com/irizzo'><FaSquareGithub className='icon' /> Github</a></li>
							</section>
							<li>Created By Isabelle Rizzo</li>
						</ul>
					</div>
					<Suspense fallback={<Loading />}>
						{children}
					</Suspense>
				</UserProviders>
			</body>
		</html>
	)
}

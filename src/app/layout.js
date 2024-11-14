import { UserProviders } from '@/hooks'
import { appInfo } from '@/resources/locale'

import { Raleway } from 'next/font/google'
const raleway = Raleway({ subsets: [ 'latin' ], variable: '--raleway-font', display: 'swap' })

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
					{children}
				</UserProviders>
			</body>
		</html>
	)
}

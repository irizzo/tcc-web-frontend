import { UserProviders } from '@/hooks'

import { Raleway } from 'next/font/google'
const raleway = Raleway({ subsets: [ 'latin' ], variable: '--raleway-font', display: 'swap' })

import '@/styles/global.scss'

export const metadata = {
	title: 'Todo List',
	description: 'To-do List App created by Isabelle S. C. Rizzo '
}

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br" className={raleway.className}>
			<body className={raleway.className}>
				<UserProviders>
					{children}
				</UserProviders>
			</body>
		</html>
	)
}

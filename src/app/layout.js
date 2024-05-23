import '@/styles/global.scss';

import { UserAccessStateProvider } from '@/contexts';

// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: [ 'latin' ] });

export const metadata = {
	title: 'Todo List',
	description: 'To-do List App created by Isabelle S. C. Rizzo '
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
					<UserAccessStateProvider>
						{children}
					</UserAccessStateProvider>
			</body>
		</html>
	);
}

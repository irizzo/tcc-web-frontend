import '@/styles/global.css';
// import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';

// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: [ 'latin' ] });

export const metadata = {
	title: 'Todo List',
	description: 'To-do List App created by Isabelle S. C. Rizzo '
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className='flex'>
				<PageContainer>
					{children}
				</PageContainer>
				{/* <Footer /> */}
			</body>
		</html>
	);
}

import '@/styles/global.scss';

import SideBar from '@/components/SideBar';
import PageContainer from '@/components/PageContainer';

export const metadata = {
	title: 'Todo List',
	description: 'To-do List App created by Isabelle S. C. Rizzo '
};

export default function RootLayout({ children }) {
	return (
		<PageContainer>
			<SideBar />
			{children}
		</PageContainer>
	);
}

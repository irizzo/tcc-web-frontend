import SideBar from '@/components/SideBar';
import { DashboardPageContainer } from '@/components/PageContainer';

export const metadata = {
	title: 'Todo List',
	description: 'To-do List App created by Isabelle S. C. Rizzo '
};

export default function RootLayout({ children }) {
	return (
		<DashboardPageContainer>
			<SideBar />
			{children}
		</DashboardPageContainer>
	);
}

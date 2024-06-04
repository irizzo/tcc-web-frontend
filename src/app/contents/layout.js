import SideBar from '@/components/SideBar';
import { DashboardPageContainer } from '@/components/PageContainer';

export default function ContentsLayout({ children }) {
	return (
		<DashboardPageContainer>
			<SideBar />
			{children}
		</DashboardPageContainer>
	);
}

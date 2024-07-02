import SideBar from '@/components/SideBar';
import { DashboardPageContainer } from '@/components/PageContainer';

import './userPages.scss';

export default function UserPagesLayout({ children }) {
	// const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	// const isUserLogged = useCallback(
	// 	async () => { verifyUserAuth(userAccessState, setUserAccessState); },
	// 	[setUserAccessState, userAccessState]
	// );

	// useEffect(() => {
	// 	isUserLogged();
	// }, [isUserLogged]);

	return (
		<DashboardPageContainer>
			<SideBar />
			<main className='flex flex--row user-pages__main'>
				{children}
			</main>
		</DashboardPageContainer>
	);
}

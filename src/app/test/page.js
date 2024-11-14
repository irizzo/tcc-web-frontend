
import { DashboardPageContainer, DefaultPageContainer } from '@/components/PageContainer';
import SideBar from '@/components/SideBar';

import { GeneralInfo, GeneralWarn, GeneralError } from '@/components/Messages';

const styles = {
	width: '100%',
	height: '98vh',
	borderRadius: '10',
	margin: 'auto 0.5%'
};

export default function Test() {
	return (
		<>
			<DashboardPageContainer>
				<div className='flex' style={{ width: '300px', height: '300px', backgroundColor: 'red' }}>
					<p>a</p>
				</div>
				<div className='flex' style={{ width: '300px', height: '300px', backgroundColor: 'blue' }}>
					<p>a</p>
				</div>

			</DashboardPageContainer>

			<DefaultPageContainer>
				<div className='flex' style={{ width: '300px', height: '300px', backgroundColor: 'red' }}>
					<p>a</p>
				</div>
				<div className='flex' style={{ width: '300px', height: '300px', backgroundColor: 'blue' }}>
					<p>a</p>
				</div>

			</DefaultPageContainer>
		</>
	);
}
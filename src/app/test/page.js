
import { DashboardPageContainer } from '@/components/PageContainer';
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
		<DashboardPageContainer>
			<SideBar />
			<main className='flex flex--row' style={styles}>
				<GeneralInfo infoContent={'anduio amdaiow da dawodmawddia wdoad admawpda pdmapd amwd awpdija dajdoa wdap dlakmd apdaw idaj daiwdj '} />
			
			</main>
		</DashboardPageContainer>
	);
}
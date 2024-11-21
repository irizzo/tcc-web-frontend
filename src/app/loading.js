import LoadingPage from '@/components/Loading';
import { DefaultPageContainer } from '@/components/PageContainer';

export default function Loading() {
	return (
		<DefaultPageContainer>
			<LoadingPage style={{ height: '90vh', width: '90vw'}} />
		</DefaultPageContainer>
	);
}
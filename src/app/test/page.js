import Loading from '@/components/Loading';
import { GeneralInfo, GeneralWarn, GeneralError } from '@/components/Messages';
import { DefaultPageContainer } from '@/components/PageContainer';

export default function Test() {
	return (
		<DefaultPageContainer>
			{/* <Loading /> */}

			<GeneralInfo infoContent={'Alguma informação aqui'} />
			<GeneralWarn warnContent={'Você tem certeza?'} />
			<GeneralError errorContent={'Algo inesperado aconteceu'} />
		</DefaultPageContainer>
	);
}
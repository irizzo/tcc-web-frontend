import { DefaultButton } from '@/components/Buttons'
import { DefaultPageContainer } from '@/components/PageContainer'
import { routesMap } from '@/resources/routesMap'
import { navigateTo } from '@/utils'

export default function NotFoundPage() {
	return (
		<DefaultPageContainer>
			<h1> 404 - Não Encontrado...</h1>
			<p>Tente novamente mais tarde</p>

			<DefaultButton variant='outlined' title='Início' onClickFunction={() => { navigateTo({ path: routesMap.login })}} />
		</DefaultPageContainer>
	)
}
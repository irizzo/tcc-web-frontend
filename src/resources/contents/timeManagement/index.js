/* eslint-disable import/no-anonymous-default-export */
import { routesMap } from '@/resources/routesMap'

const title = 'A Gestão do Tempo'
const abstract = 'Na visão de Lima e Jesus (2011, p. 125), “a administração do tempo pode ser definida de forma simples, como um plano de utilização e controle do recurso da forma mais eficiente e eficaz possível”.'

const innerContent = () => {
	return (
		<>
			<p>
				Na visão de Lima e Jesus (2011, p. 125), “a administração do tempo pode ser definida de forma simples, como um plano de utilização e controle do recurso da forma mais eficiente e eficaz possível”. Para Chaves (2021), administrar o tempo é saber priorizar as tarefas e atividades, e organizar o tempo que se tem disponível para garantir que o prioritário seja feito, mas não é sobre controlar exatamente todos os minutos que se despende em cada atividade. Ainda, a Gestão do Tempo se baseia em realizar diversas escolhas para definir as prioridades e os objetivos do indivíduo e, com base nessas decisões, definir as ações necessárias para alcançar esses objetivos e resultados, traduzindo e planejando essas ações como tarefas e compromissos (Estrada; Flores; Schimith, 2011).
			</p>
			<p>
				Sendo assim, a Gestão do Tempo pode ser compreendida pela habilidade de administrar o tempo disponível para realizar tarefas e atividades de maneira mais eficaz e eficiente, com base na priorização desses compromissos. Gerir o tempo não é necessariamente definir o que se vai fazer a cada minuto do dia, mas sim, é saber definir as prioridades individuais e saber investir do tempo, da melhor forma possível, para que se faça tudo o que é necessário sem precisar abrir mão do lazer, descanso, autocuidado e de outras atividades que não necessariamente estão relacionadas com o contexto acadêmico ou profissional (Chaves, 2021; Estrada, Flores e Schimith, 2011; Estrada, Neto e Augustin, 2011).
			</p>
			<p>
				Por isso, a Gestão do Tempo pode ser entendida como um guia, de curto a médio prazo, para definir as prioridades individuais e para planejar as atividades durante os dias, semanas e meses. Ao longo dos anos foram desenvolvidos diversos modelos, ferramentas e metodologias que servem de auxílio para que os indivíduos possam aplicar os conceitos de Gestão do Tempo em seu dia a dia. Alguns dos principais modelos, ferramentas e técnicas, definidos como embasamentos para este trabalho, estão detalhados nas próximas subseções.
			</p>

			<p>Os principais modelos, ferramentas e técnincas apresentados neste trabalho foram:
				<ol>
					<li>Matriz de Gerenciamento de Tempo de Covey</li>
					<li>Modelo de Gestão do Tempo de Estrada</li>
					<li>A Técnica Pomodoro (também disponível <a href={routesMap.contents.pomo} className='link'>aqui</a>)</li>
				</ol>
				Para continuar lendo, acesse o arquivo completo do meu tcc <a className='link' href={routesMap.contents.base}>no Google Drive</a> (disponível em breve)
			</p>

			<h2>Referências</h2>
			<p></p>
		</>
	)
}

export default { title, abstract, innerContent }

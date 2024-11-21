/* eslint-disable import/no-anonymous-default-export */

import Image from 'next/image'
import image1 from './Modelo_PEP_ Estrada_Neto_Augustin.png'
import image2 from './Modelo_PEP_ Estrada_Neto_Augustin2.png'

const title = 'Planejamento Estratégico Pessoal (PEP)'
const abstract = 'Para Flores (2011, p.22), o Planejamento Estratégico (PE) pode ser entendido como “uma ferramenta de gestão que promove a excelência organizacional e pessoal, pois serve para programar o futuro desejado, por meio da formulação sistemática de objetivos, estratégias e ações.”'

const innerContent = () => {
	return (
		<>
			<p>
				{/* TODO: página dessa referência */}
				Para Flores (2011, p.22), o Planejamento Estratégico (PE) pode ser entendido como “uma ferramenta de gestão que promove a excelência organizacional e pessoal, pois serve para programar o futuro desejado, por meio da formulação sistemática de objetivos, estratégias e ações.” Já para Estrada, Neto e Augustin (2011, p.122), o PE pode ser definido como: “Uma ferramenta de gestão, que busca preparar a empresa para os desafios futuros por meio da definição da visão e missão, da análise de seu ambiente externo e interno, elaboração das estratégias, sua implementação e controle.”
			</p>
			<p>
				Com base nessas afirmações, é possível entender o PE como uma forma, muito utilizada no meio organizacional, de se definir objetivos e planejar ações e a utilização de recursos disponíveis para alcançar estes objetivos selecionados, além de ser uma ferramenta para previsão e gerenciamento de riscos.
			</p>
			<p>
				Já o PEP tem como principal objetivo melhorar o planejamento individual, trazendo uma visão que considera os recursos e as oportunidades disponíveis ao indivíduo a fim de alcançar o crescimento pessoal e profissional e seus objetivos em geral (Estrada; Flores; Schimith, 2011). Para Chaves (2021), planejar estrategicamente a vida consiste em  definir objetivos, estabelecer estratégias, criar planos táticos, executar e, por fim, monitorar e avaliar.
			</p>
			<p>
				Existem diversos modelos de PE, e todos eles, apesar de suas diferenças, descrevem as mesmas etapas, com nomes distintos mas com a mesma essência: avaliação da organização, formulação estratégica, implementação e controle ou avaliação (Flores, 2011). Em seu trabalho, Estrada, Neto e Augustin (2011) analisam a bibliografia de diversos autores, e propõem um novo modelo de PEP com a motivação de este ser um modelo mais completo e melhor explicado em sua bibliografia do que os anteriores.
			</p>
			<p>
				Os autores propõem que este modelo de PEP seja uma “ferramenta de gerenciamento pessoal, cujo objetivo é determinar as diretrizes básicas que nortearão o projeto de vida do indivíduo” (Estrada; Neto; Augustin, 2011, p. 126), ilustrado na figura a seguir.
			</p>

			<Image className='image' alt='Modelo de PEP de Estrada, Neto e Augustin' src={image1} height={400} width={450} />
			<p>
				Na figura, são ilustradas as áreas que compõem a vida do indivíduo, com base na definição dos autores. “A utilização do modelo visa orientar a pessoa em suas principais áreas de atuação, as quais devem estar em harmonia e equilibradas” (Estrada; Neto; Augustin, 2011, p. 126), ou seja, o modelo pretende auxiliar o indivíduo em sua gestão pessoal em todas e cada uma das áreas definidas, a fim de se alcançar uma vida mais equilibrada, alcançar os objetivos pessoais e evitar déficits em alguma área da vida.
			</p>
			<p>
				Segundo Estrada, Neto e Augustin (2011), a utilização do modelo prevê que para alcançar o objetivo descrito anteriormente, é necessário que o indivíduo realize cinco planejamentos específicos, cada um com etapas detalhadas. São eles: planejamento individual, planejamento profissional, planejamento de negócios pessoais e planejamento da participação política, social e religiosa/espiritual. Cada um desses planejamentos possuem alguns componentes, representados na figura abaixo.
			</p>

			<Image className='image' alt='Detalhamento do modelo de PEP de Estrada, Neto e Augustin' src={image2} height={510} width={500} />

			<p>
				O modelo proposto por Estrada, Neto e Augustin, detalhado na figura, prevê que para cada uma das cinco áreas citadas anteriormente, existem alguns pontos de foco, chamados de campos, que guiam aquela área da vida do indivíduo e que devem ser considerados ao se fazer planejamento da respectiva área. Por exemplo, é preciso que a pessoa considere sua atual carreira, suas competências técnicas, suas competências comportamentais e o ambiente organizacional a fim de construir um bom planejamento profissional que retrate bem a situação atual e que seja um guia para que o indivíduo alcance seus objetivos profissionais.
			</p>
			<p>
				O principal objetivo do modelo proposto é auxiliar o indivíduo a manter sua vida equilibrada e em harmonia entre as diferentes áreas. A importância de se construir esses diversos planejamentos, considerando as diversas áreas da vida, é ajudar a garantir que o tempo e os recursos pessoais investidos estejam equilibrados, e que o indivíduo não se desgaste demais em uma só área e prejudique outra (Estrada; Neto; Augustin, 2011).
			</p>

			<h2>Referências</h2>
			<p></p>
		</>
	)
}

export default { title, abstract, innerContent }

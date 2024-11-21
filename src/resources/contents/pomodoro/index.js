/* eslint-disable import/no-anonymous-default-export */

import Image from 'next/image'
import dailyPomodoro from '@/resources/contents/pomodoro/dailyPomodoro.png'

const title = 'A Técnica Pomodoro'
const abstract = 'O conceito de tempo é definido por “período de momentos, de horas, de dias, de semanas, de meses, de anos etc. no qual os eventos se sucedem, dando-se a noção de presente, passado e futuro” (Michaelis, 2024).'

const innerContent = () => {
	return (
		<>
			<p>	A técnica Pomodoro tem como principal objetivo ser uma técnica simples para melhorar a produtividade (Cirillo, 2006). Segundo Cirillo (2006, p.X, tradução própria),
				{' "'}A Técnica Pomodoro foi criada com o objetivo de utilizar o tempo como um valioso aliado para alcançar o que queremos fazer do jeito que queremos fazê-lo, e para nos empoderar para melhorar continuamente nosso processo de trabalho ou estudo.{'"'}
			</p>
			<p>
				A principal, e mais conhecida, ferramenta utilizada nesta técnica é o ciclo de foco e descanso, chamado também de Pomodoro, em que tradicionalmente o tempo de foco é de 25 minutos, e o de descanso é de 3 a 5 minutos (descanso curto, entre um ciclo e outro) ou de 15 a 30 minutos (descanso longo, realizado a cada 4 ciclo). O autor descreve que, em sua base, a técnica é como um conjunto de etapas a serem implementadas durante um dia, ilustrado no Quadro 1.
			</p>
			<Image className='image' alt='Etapas diárias da Técnica Pomodoro' src={dailyPomodoro} height={400} width={800} />
			<p>
				A primeira etapa diária é o Planejamento, que deve ser feita no começo do dia e com o objetivo de definir as atividades a serem realizadas no dia. A segunda etapa diária é o Monitoramento, que deve ser feito durante o dia, a fim de recolher dados brutos sobre o esforço que foi despendido e outras informações relevantes para o indivíduo. As últimas três etapas devem ser realizadas ao final do dia, sendo: Armazenamento, para compilar o que foi observado no dia; Processamento, para transformar os dados brutos observados em informações; e Visualização, para apresentar as informações de uma forma mais fácil de ser entendida e que ajude a observar o que pode ser melhorado.
				Além destas etapas diárias, o autor descreve cinco objetivos que podem ser implementados a fim de alcançar os resultados propostos pela técnica. São eles:
				<br />
				<br />
				<ul>
					<li>Objetivo 1: Descobrir quanto esforço uma atividade requer </li>
					<li>Objetivo 2: Diminuir as interrupções </li>
					<li>Objetivo 3: Estimar o esforço para as atividades </li>
					<li>Objetivo 4: Fazer o ciclo Pomodoro mais efetivo </li>
					<li>Objetivo 5: Criar uma grade de horário </li>
				</ul>
			</p>
			<p>
				O primeiro objetivo é alcançado definindo o que deve ser feito naquele dia, registrando quantos ciclos Pomodoro foram necessários para cada tarefa, e observando como o indivíduo pode melhorar sua produtividade ou eficiência com base nos registros feitos.
			</p>
			<p>
				No segundo objetivo são descritos os tipos de interrupções (internas, externas e sistemáticas) que podem ocorrer enquanto se utiliza o método Pomodoro, como lidar com elas e como diminuí-las e seus impactos na produtividade do indivíduo. No terceiro objetivo é descrito como o indivíduo pode estimar o esforço que uma atividade requer, em unidades de ciclos Pomodoro, como planejá-las para o dia e como melhorar continuamente suas estimativas
			</p>
			<p>
				Já o quarto objetivo tem como pré-requisitos conseguir utilizar a técnica Pomodoro de forma sistêmica e sem interrupções, e também conseguir boas estimativas. Este objetivo descreve como melhorar a efetividade da técnica, aplicando algumas novas regras a cada ciclo. Por fim, o quinto objetivo descreve os benefícios de se criar uma grade de horário, como definir um limite de tempo para as atividades ou separar tempo de trabalho/estudo e tempo de lazer. Além disso, este objetivo descreve como criar uma grade de horários e continuamente melhorá-la, deixando-a mais efetiva e o indivíduo mais produtivo.
			</p>


			<p>Referências: CIRILLO, F.Francesco Cirillo. <b>The Pomodoro Technique</b>.Disponível em: https://francescocirillo.com  </p>
		</>
	)
}

export default { title, abstract, innerContent }
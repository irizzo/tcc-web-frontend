/* eslint-disable import/no-anonymous-default-export */
import { routesMap } from '@/resources/routesMap'

const title = 'Tutorial da Ferramenta'
const abstract = ''

const innerContent = () => {
	return (
		<>
			<section className='flex content__section'>
				<h2 className='text--highlight'>Barra Lateral</h2>
				<p>A barra lateral, é a barra de navegação que te permite navegar entre as páginas, ter um acesso rápido às funcionalidades de criar Tarefas, Eventos, Anotações e Categorias, e ainda onde você pode acessar as configurações e desconectar sua conta. </p>
			</section>
			<section className='flex content__section'>
				<h2 className='text--highlight'>Atalhos</h2>
				<p>Os <i>Atalhos</i> são o acesso rápido à criação de Tarefas, Eventos, Anotações e Categorias</p>
			</section>
			<section className='flex content__section'>
				<h2 className='text--highlight'>Página Dashboard</h2>
				<p>A página inicial, <i>Dashboard</i>, apresenta o resumo dos seus compromissos (tarefas e eventos). Ainda, você pode criar tarefas e eventos de maneira rápida clicando no botão + (mais), na parte superior dos quadros {'"'}Mais Tarefas{'"'} e {'"'}Mais Eventos{'"'}</p>
			</section>

			<section className='flex content__section'>
				<h2 className='text--highlight'>Páginas Tarefas, Eventos, Categorias e Anotações</h2>
				<p>As páginas <i>Eventos</i> e <i>Tarefas</i>, apresentam seus respectivos compromisso do mês atual no calendário, e os demais no quadro na lateral.</p>
				<p>A página <i>Categorias</i> contém a lista de todas as suas categorias, e é onde você pode editar e excluir categorias já existentes. </p>
				<p>A página <i>Anotações</i> contém a lista de todas as suas anotações, e é onde você pode editar e excluir anotações já existentes. </p>
			</section>

			<section className='flex content__section'>
				<h2 className='text--highlight'>Página Foco</h2>
				<p>A página <i>Foco</i> contém uma ferramenta de timer, onde você pode definir tempos para ciclos de trabalho e descanso. Para saber mais, leia o conteúdo referente à Técnica Pomodoro na página <a className='link' href={routesMap.contents.base}>Conteúdos</a></p>
			</section>

			<section className='flex content__section'>
				<h2 className='text--highlight'>Página Conteúdos</h2>
				<p>A página <a className='link' href={routesMap.contents.base}>Conteúdos</a> apresenta a lista de conteúdos informacionais disponíveis publicamente. Os conteúdos são relacionados aos temas Gestão de Tempo e Planejamento Estratégico Pessoal, escritos pela graduada em Sistemas de Informação <a className='link' href='https://linkedin.com/in/isabellerizzo'>Isabelle Rizzo</a>.</p>
			</section>

			<section className='flex content__section'>
				<h2 className='text--highlight'>Página Configurações</h2>
				<p>A página configurações é onde você pode alterar as suas informações cadastradas (nome, sobrenome, email e senha), e onde você pode excluir sua conta.</p>
			</section>

			<section className='flex content__section'>
				<h2 className='text--highlight'>Página Sobre</h2>
				<p>A página <a className='link' href={routesMap.about.base}>Sobre</a> contém informações sobre a ferramenta e a criadora.</p>
			</section>
		</>
	)
}


export default { title, abstract, innerContent }
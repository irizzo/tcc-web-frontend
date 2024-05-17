import '@/styles/global.scss';
import '@/components/SideBar/sideBar.scss'

import { pageTitles } from "@/resources/locale"

// Todo: mover para recursos (@/resources)
const daysDictionary = {
	0: "Dom",
	1: "Seg",
	2: "Ter",
	3: "Qua", 
	4: "Qui",
	5: "Sex",
	6: "Sáb"
}

export default function SideBar() {
	const currentDate = new Date();
	const weekday = currentDate.getDay();
	const today = `${daysDictionary[weekday]}, ${currentDate.toLocaleDateString()}`

	return(
		<aside>
			<header className='sidebar__header'>
				<h1 className='header__title'>{`Isabelle Rizzo`}</h1>
				<p className='header__subtitle'>{today}</p>
			</header>

			{/* TODO: colocar as rotas para as páginas */}
			{/* TODO: colocar div com as opções da página atual */}
			<nav className='sidebar__nav'>
				<ul className='nav__list'>
					<li className='nav__list__item'>{pageTitles.event.all}</li>
					<li className='nav__list__item'>{pageTitles.tasks.all}</li>
					<li className='nav__list__item'>{pageTitles.routines.all}</li>
				</ul>

				<ul className='nav__list'>
					<li className='nav__list__item'>{pageTitles.settings}</li>
					<li className='nav__list__item'>{pageTitles.contents}</li>
					<li className='nav__list__item'>{pageTitles.about}</li>
				</ul>
			</nav>
		</aside>
	)
}
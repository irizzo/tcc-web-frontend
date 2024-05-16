import '@/styles/global.scss';
import '@/components/SideBar/sideBar.scss'

import { pageTitles } from "@/resources/locale"

// Todo:mover para recursos (@/resources)
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
			<header>
				<h1>{`Isabelle Rizzo`}</h1>
				<p>{today}</p>
			</header>

			{/* TODO: colocar as rotas para as páginas */}
			<nav>
				<ul>
					<li>{pageTitles.event.all}</li>
					<li>{pageTitles.tasks.all}</li>
					<li>{pageTitles.routines.all}</li>
				</ul>

				<ul>
					<li>{pageTitles.settings}</li>
					<li>{pageTitles.contents}</li>
					<li>{pageTitles.about}</li>
				</ul>
			</nav>
		</aside>
	)
}
import '@/styles/global.scss';
import '@/components/SideBar/sideBar.scss'

export default function SideBar() {
	return(
		<aside>
			<header>
				{/* <img src='' /> */}
				<div><p>imagem</p></div>
				<p>{`userInfo.name 's Tasks`}</p>
			</header>

			<nav>
				<ul>
					<li>Events</li>
					<li>Tasks</li>
					<li>Routines</li>
				</ul>

				<ul>
					<li>Settings</li>
					<li>Contents</li>
					<li>About</li>
				</ul>
			</nav>
		</aside>
	)
}
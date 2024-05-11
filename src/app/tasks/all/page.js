'use client';

import Card from '@/components/Card';
import SideBar from '@/components/SideBar';
import '@/styles/globalForm.css';

const userInfo = {
	name: "User name"
}

export default function AllTasks() {

	return(
		<>
			<SideBar />
			<main>
				<Card content={"a"} />
				<Card content={"b"}/>
				<Card content={"c"}/>
				<Card content={"d"}/>
				<Card content={"f"} />
			</main>
		</>
	)
}
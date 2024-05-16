'use client';

import '@/styles/global.scss';
import './tasks.scss';

import Card from '@/components/Card';

import { taskList } from '@/dataMock';

export default function AllTasks() {
	return(
		<main className='flex flex--row'>
			<Card itemsList={taskList} title='Master Tasklist' height='full' />
			<Card itemsList={taskList} title='Master Tasklist' height='full'/>
			<Card itemsList={taskList} title='Master Tasklist' height='full'/>
			<Card itemsList={taskList} title='Master Tasklist' height='full' />
		</main>
	)
}
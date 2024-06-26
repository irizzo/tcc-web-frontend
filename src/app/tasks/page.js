import '@/styles/global.scss';
import './tasks.scss';

import Card from '@/components/Card';

import { taskList } from '@/dataMock';

export default function AllTasks() {
	return(
		<main className='flex flex--row tasks__main'>
			<Card itemsList={taskList} title='Master Tasklist'/>
			<Card itemsList={taskList} title='Master Tasklist'/>
			<Card itemsList={taskList} title='Master Tasklist'/>
			<Card itemsList={taskList} title='Master Tasklist' />
		</main>
	)
}
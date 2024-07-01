'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import PartialLoading from '@/components/Loading/PartialLoading';

import { ListBoard, TaskCard } from '@/components/Card';
import { GeneralInfo } from '@/components/Messages';

import * as locale from '@/resources/locale';
import { listAllTasksService } from '@/services/taskServices';
import './tasks.scss';

// import TasksBoard from '@/components/TasksBoard';

export default function AllTasksPage() {
	// const taskList = [];
	const [ taskList, setTaskList ] = useState([]);

	// TESTAR DE NOVO ESSE USECALLBACK
	// const loadTasks = useCallback(async () => {
	// 	console.log('[loadTasks]');
	// 	const tasksRes = await listAllTasksService();

	// 	if (!tasksRes.success) {
	// 		throw new Error(tasksRes.message);
	// 	}

	// 	if (taskList.length > 0) {
	// 		console.log('[loadTasks] taskList: ', taskList);
	// 		taskList.push(...tasksRes.result);
	// 	}

	// 	console.log('[loadTasks] taskList: ', taskList);
	// }, [taskList]);

	useEffect(() => {
		async function loadTasks() {
			const res = await listAllTasksService();
			setTaskList([ ...res.result ]);
			console.log('[loadTasks] 2 taskList: ', taskList);
		}

		loadTasks();

		setTimeout(() => {
			console.log('[loadTasks] 2 taskList: ', taskList);
		}, 2000);
	}, []);

	return (
		<main className='flex flex--row tasks__main'>
			<h1>Tarefas</h1>
			<ListBoard title={locale.groupDataByTitle.all}>
				<Suspense fallback={<PartialLoading />}>
					{
						taskList && taskList.length > 0 ?
							taskList.map((task) => {
								return <TaskCard key={task.id} taskInfo={task} />;
							})
							:
							<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
					}
				</Suspense>
			</ListBoard>
		</main>
	);
}

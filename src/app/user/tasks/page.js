'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import PartialLoading from '@/components/Loading/PartialLoading';

import { Board } from '@/components/Board';
import { TaskCard } from '@/components/Card';
import { GeneralInfo } from '@/components/Messages';

import * as locale from '@/resources/locale';
import { listAllTasksService } from '@/services/taskServices';

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

			if (!res.success) {
				throw new Error(res.message);
			}

			setTaskList([ ...res.result ]);
		}

		loadTasks();
	}, []);

	return (
		<>
			<Board title={locale.groupDataByTitle.all}>
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
			</Board>

			<Board title={locale.groupDataByTitle.all}>
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
			</Board>

			<Board title={locale.groupDataByTitle.all}>
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
			</Board>

			<Board title={locale.groupDataByTitle.all}>
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
			</Board>
		</>
	);
}

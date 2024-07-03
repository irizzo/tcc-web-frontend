'use client';

import * as locale from '@/resources/locale';
import { listAllTasksService } from '@/services/taskServices';
import Loading from '@/components/Loading';

import { useEffect, useState } from 'react';

import { Board } from '@/components/Board';
import { TaskCard } from '@/components/Card';
import { GeneralInfo } from '@/components/Messages';

export default function AllTasksPage() {
	const [ taskList, setTaskList ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function loadTasks() {
			setIsLoading(true);
			const res = await listAllTasksService();

			if (!res.success) {
				throw new Error(res.message);
			}

			setTaskList([ ...res.result ]);
			setIsLoading(false);
		}

		loadTasks();
	}, []);

	if(isLoading) return <Loading />;

	return (
		<>
			<Board title={locale.groupDataByTitle.all}>
				{/* <Suspense fallback={<PartialLoading />}> */}
					{
						taskList && taskList.length > 0 ?
							taskList.map((task) => {
								return <TaskCard key={task.id} taskInfo={task} />;
							})
							:
							<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
					}
				{/* </Suspense> */}
			</Board>

			<Board title={locale.groupDataByTitle.all}>
				{/* <Suspense fallback={<PartialLoading />}> */}
					{
						taskList && taskList.length > 0 ?
							taskList.map((task) => {
								return <TaskCard key={task.id} taskInfo={task} />;
							})
							:
							<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
					}
				{/* </Suspense> */}
			</Board>

			<Board title={locale.groupDataByTitle.all}>
				{/* <Suspense fallback={<PartialLoading />}> */}
					{
						taskList && taskList.length > 0 ?
							taskList.map((task) => {
								return <TaskCard key={task.id} taskInfo={task} />;
							})
							:
							<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
					}
				{/* </Suspense> */}
			</Board>

			<Board title={locale.groupDataByTitle.all}>
				{/* <Suspense fallback={<PartialLoading />}> */}
					{
						taskList && taskList.length > 0 ?
							taskList.map((task) => {
								return <TaskCard key={task.id} taskInfo={task} />;
							})
							:
							<GeneralInfo infoContent={locale.notFoundDefaults.tasks} />
					}
				{/* </Suspense> */}
			</Board>
		</>
	);
}

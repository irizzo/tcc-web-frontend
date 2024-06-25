'use client';
import './tasks.scss';

import { ListBoard, TaskCard } from '@/components/Card';
import { GeneralMessage } from '@/components/Messages';
import * as locale from '@/resources/locale';

import { taskList } from '@/resources/mockData';
// const taskList = [];

export default function AllTasks() {

	return (
		<main className='flex flex--row tasks__main'>

			<ListBoard title={locale.groupDataByTitle.all}>
				{
					taskList.length > 0 ?
						taskList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.tasks} />
				}
			</ListBoard>

			<ListBoard title={locale.groupDataByTitle.dueSoon}>
				{
					taskList.length > 0 ?
						taskList.map((t) => {
							return <TaskCard key={t.id} path={`/tasks/:${t.id}`} taskInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.tasks} />
				}
			</ListBoard>

			<ListBoard title={locale.groupDataByTitle.pastDue}>
				{
					taskList.length > 0 ?
						taskList.map((t) => {
							return <TaskCard key={t.id} path={`/tasks/:${t.id}`} taskInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.tasks} />
				}
			</ListBoard>

			<ListBoard title={locale.groupDataByTitle.dueSoon}>
				{
					taskList.length > 0 ?
						taskList.map((t) => {
							return <TaskCard key={t.id} path={`/tasks/:${t.id}`} taskInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.tasks} />
				}
			</ListBoard>
		</main>
	);
}
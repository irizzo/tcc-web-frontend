
import './tasks.scss';

import { ListBoard, TaskCard } from '@/components/Card';
import { GeneralMessage } from '@/components/Messages';

import { taskList } from '@/resources/mockData';

// const taskList = [];

export default function AllTasks() {
	return (
		<main className='flex flex--row tasks__main'>
			{/* TODO: componente para mostrar 'no tasks found' */}

			<ListBoard title={'All'}>
				{
					taskList.length > 0 ?
						taskList.map((task) => {
							return <TaskCard key={task.id} taskInfo={task} />;
						})
						:
						<GeneralMessage content={'No tasks found'} />
				}
			</ListBoard>

			<ListBoard title={'Due Soon'}>
				{
					taskList.length > 0 ?
						taskList.map((t) => {
							return <TaskCard key={t.id} path={`/tasks/:${t.id}`} taskInfo={t} />;
						})
						:
						<GeneralMessage content={'No tasks found'} />
				}
			</ListBoard>

			<ListBoard title={'Past Due'}>
				{
					taskList.length > 0 ?
						taskList.map((t) => {
							return <TaskCard key={t.id} path={`/tasks/:${t.id}`} taskInfo={t} />;
						})
						:
						<GeneralMessage content={'No tasks found'} />
				}
			</ListBoard>

			<ListBoard title={'Title'}>
				{
					taskList.length > 0 ?
						taskList.map((t) => {
							return <TaskCard key={t.id} path={`/tasks/:${t.id}`} taskInfo={t} />;
						})
						:
						<GeneralMessage content={'No tasks found'} />
				}
			</ListBoard>
		</main>
	);
}
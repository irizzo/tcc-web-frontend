import { TaskCard } from '@/components/Card';
import { Board } from '../Board';
import { GeneralInfo } from '@/components/Messages';
import * as locale from '@/resources/locale';

export default async function TasksBoard({ tasks }) {
	<>
		<Board title={locale.groupDataByTitle.all}>
			{
				tasks && tasks.length > 0 ?
					tasks.map((task) => {
						return <TaskCard key={task.id} taskInfo={task} />;
					})
					:
					<GeneralInfo content={locale.notFoundDefaults.tasks} />
			}
		</Board>
		<Board title={locale.groupDataByTitle.all}>
			{
				tasks && tasks.length > 0 ?
					tasks.map((task) => {
						return <TaskCard key={task.id} taskInfo={task} />;
					})
					:
					<GeneralInfo content={locale.notFoundDefaults.tasks} />
			}
		</Board>
	</>
}
import { ListBoard, TaskCard } from '@/components/Card';
import { GeneralInfo } from '@/components/Messages';
import * as locale from '@/resources/locale';

export default async function TasksBoard({ tasks }) {
	<>
		<ListBoard title={locale.groupDataByTitle.all}>
			{
				tasks && tasks.length > 0 ?
					tasks.map((task) => {
						return <TaskCard key={task.id} taskInfo={task} />;
					})
					:
					<GeneralInfo content={locale.notFoundDefaults.tasks} />
			}
		</ListBoard>
		<ListBoard title={locale.groupDataByTitle.all}>
			{
				tasks && tasks.length > 0 ?
					tasks.map((task) => {
						return <TaskCard key={task.id} taskInfo={task} />;
					})
					:
					<GeneralInfo content={locale.notFoundDefaults.tasks} />
			}
		</ListBoard>
	</>
}
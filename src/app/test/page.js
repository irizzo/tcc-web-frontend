import { Board } from '@/components/Board';
import { DashboardPageContainer } from '@/components/PageContainer';
import SideBar from '@/components/SideBar';

import { TaskCard } from '@/components/Card';

import { groupDataByTitle } from '@/resources/locale';
import { taskList } from '@/resources/mockData';

const styles = {
	width: '100%',
	height: '98vh',
	borderRadius: '10',
	margin: 'auto 0.5%'
};

export default function Test() {
	return (
		<DashboardPageContainer>
			<SideBar />
			<main className='flex flex--row' style={styles}>
				<Board title={groupDataByTitle.all}>
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
					<TaskCard taskInfo={taskList[0]} key={taskList[0].id} />
				</Board>

				<Board title={groupDataByTitle.dueSoon}>
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
					<TaskCard taskInfo={taskList[1]} key={taskList[1].id} />
				</Board>

				<Board title={groupDataByTitle.pastDue}>
					<TaskCard taskInfo={taskList[2]} key={taskList[2].id} />
					<TaskCard taskInfo={taskList[2]} key={taskList[2].id} />
					<TaskCard taskInfo={taskList[2]} key={taskList[2].id} />
					<TaskCard taskInfo={taskList[2]} key={taskList[2].id} />
					<TaskCard taskInfo={taskList[2]} key={taskList[2].id} />
					<TaskCard taskInfo={taskList[2]} key={taskList[2].id} />
				</Board>

				<Board title={groupDataByTitle.pastDue}>
					<TaskCard taskInfo={taskList[3]} key={taskList[3].id} />
					<TaskCard taskInfo={taskList[3]} key={taskList[3].id} />
					<TaskCard taskInfo={taskList[3]} key={taskList[3].id} />
					<TaskCard taskInfo={taskList[3]} key={taskList[3].id} />
					<TaskCard taskInfo={taskList[3]} key={taskList[3].id} />
					<TaskCard taskInfo={taskList[3]} key={taskList[3].id} />
				</Board>
			</main>
		</DashboardPageContainer>
	);
}
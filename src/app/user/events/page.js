import { Board } from '@/components/Board';
import { TaskCard } from '@/components/Card';
import { GeneralMessage } from '@/components/Messages';
import * as locale from '@/resources/locale';
import routesMap from '@/resources/routesMap';

const eventList = [];

export default function EventsPage() {
	return (
		<>
			<Board title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((event) => {
							return <TaskCard key={event.id} eventInfo={event} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((t) => {
							return <TaskCard key={t.id} path={`${routesMap.events.base}/:${t.id}`} eventInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((t) => {
							return <TaskCard key={t.id} path={`${routesMap.events.base}/:${t.id}`} eventInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((t) => {
							return <TaskCard key={t.id} path={`${routesMap.events.base}/:${t.id}`} eventInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</Board>
			</>
	);
}
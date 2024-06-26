'use client';

import './events.scss';

import { ListBoard, TaskCard } from '@/components/Card';
import { GeneralMessage } from '@/components/Messages';
import * as locale from '@/resources/locale';
import routesMap from '@/resources/routesMap';

const eventList = [];

export default function EventsPage() {
	return (
		<main className='flex flex--row events__main'>

			<ListBoard title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((event) => {
							return <TaskCard key={event.id} eventInfo={event} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</ListBoard>

			<ListBoard title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((t) => {
							return <TaskCard key={t.id} path={`${routesMap.events.base}/:${t.id}`} eventInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</ListBoard>

			<ListBoard title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((t) => {
							return <TaskCard key={t.id} path={`${routesMap.events.base}/:${t.id}`} eventInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</ListBoard>

			<ListBoard title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((t) => {
							return <TaskCard key={t.id} path={`${routesMap.events.base}/:${t.id}`} eventInfo={t} />;
						})
						:
						<GeneralMessage content={locale.notFoundDefaults.events} />
				}
			</ListBoard>
		</main>
	);
}
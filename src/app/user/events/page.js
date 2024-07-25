'use client';

import * as locale from '@/resources/locale';
import { getAllEventsService } from '@/services/eventServices';
import Loading from '@/components/Loading';

import { useEffect, useState } from 'react';

import { Board } from '@/components/Board';
import { EventCard } from '@/components/Card';
import { GeneralInfo } from '@/components/Messages';

const eventList = [];

export default function EventsPage() {
	const [ eventList, setEventList ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);

	const pastDueEvents = [];
	const dueSoonEvents = [];

	useEffect(() => {
		async function loadEvents() {
			setIsLoading(true);
			const res = await getAllEventsService();

			if (!res.success) {
				throw new Error(res.message);
			}

			setEventList([ ...res.result ]);

			// const now = new Date(Date.now());

			// const pastDue = eventList.filter((event) => {
			// 	return event.endDate < now ? event : null;
			// });

			// const dueSoon = eventList.filter((event) => {
			// 	return (now <= event.endDate && event.endDate < (now + 7)) ? event : null;
			// });

			// pastDue.length > 0 && pastDueEvents.push(...pastDue);
			// dueSoon.length > 0 && dueSoonEvents.push(...dueSoon);

			// console.log('pastDue: ', pastDue);
			// console.log('dueSoon: ', dueSoon);

			// console.log('pastDueEvents: ', pastDueEvents);
			// console.log('dueSoonEvents: ', dueSoonEvents);

			setIsLoading(false);
		}

		loadEvents();

	}, []);


	if (isLoading) return <Loading />;

	return (
		<>
			<Board title={locale.groupDataByTitle.all}>
				{
					eventList.length > 0 ?
						eventList.map((event) => {
							return <EventCard key={event.id} eventInfo={event} />;
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.dueSoon}>
				{
					dueSoonEvents.length > 0 ?
						dueSoonEvents.map((event) => {
							return <EventCard key={event.id} eventInfo={event} />;
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.groupDataByTitle.pastDue}>
				{
					pastDueEvents.length > 0 ?
						pastDueEvents.map((event) => {
							return <EventCard key={event.id} eventInfo={event} />;
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>
			</>
	);
}
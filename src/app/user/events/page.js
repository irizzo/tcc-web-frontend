'use client'

import * as locale from '@/resources/locale'
import routesMap from '@/resources/routesMap'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserEventsContext } from '@/hooks'

import Loading from '@/components/Loading'
import { Board } from '@/components/Board'
import { EventCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'

export default function EventsPage() {
	const [ categories, setCategories ] = useState({})
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [ isLoading, setIsLoading ] = useState(false)

	const pastDueEvents = []
	const dueSoonEvents = []

	useEffect(() => {
		if (userCategories.categoriesList === null || userEvents.eventsList === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}

		let aux = {}
		userCategories.categoriesList.forEach((category) => {
			aux[category.code] = category.title
		})
		setCategories(aux)

	}, [ userCategories.categoriesList, userEvents.eventsList ])

	if (isLoading) return <Loading />

	return (
		<>
			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.all} path={routesMap.events.new}>
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>
			</>
	)
}
'use client'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'
import { groupEventsByDate } from '@/utils/groupData.utils'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserEventsContext } from '@/hooks'

import Loading from '@/components/Loading'
import { Board } from '@/components/Board'
import { EventCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'

export default function EventsPage() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [ isLoading, setIsLoading ] = useState(false)
	const [ categories, setCategories ] = useState({})
	const [ sortedEvents, setSortedEvents ] = useState({})

	useEffect(() => {
		if (userCategories.categoriesList === null || userEvents.eventsList === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		}

		let aux = {}
		userCategories.categoriesList.forEach((category) => {
			aux[category.code] = category.title
		})

		const sorted = groupEventsByDate(userEvents.eventsList)
		setSortedEvents({ ...sorted })

		setCategories(aux)

	}, [ userCategories.categoriesList, userEvents.eventsList ])

	if (isLoading) return <Loading />

	return (
		<>
			<Board title={locale.pagesTitles.events.base} path={routesMap.events.new}>
				{console.log('sortedEvents: ', sortedEvents)}
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.base} path={routesMap.events.new}>
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.base} path={routesMap.events.new}>
				{
					userEvents.eventsList !== null && userEvents.eventsList.length > 0 ?
						userEvents.eventsList.map((event) => <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>

			<Board title={locale.pagesTitles.events.base} path={routesMap.events.new}>
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
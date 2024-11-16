'use client'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import { groupEventsByMonth } from '@/utils/groupData.utils'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext, UserEventsContext } from '@/hooks'

import Loading from '@/components/Loading'
import { Board } from '@/components/Board'
import { EventCard } from '@/components/Card'
import { GeneralInfo } from '@/components/Messages'
import Calendar from '@/components/Calendar'

export default function EventsPage() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [ isLoading, setIsLoading ] = useState(false)
	const [ categories, setCategories ] = useState({})
	const [ sortedEvents, setSortedEvents ] = useState({})

	const [ selectedDate, setSelectedDate ] = useState({ month: new Date().getMonth(), year: new Date().getFullYear()})

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

		const sorted = groupEventsByMonth(userEvents.eventsList)
		setSortedEvents({ ...sorted })

	}, [ userCategories.categoriesList, userEvents.eventsList ])

	if (isLoading) return <Loading />

	function OtherEventsBoard() {
		return (
			<>

				{
					sortedEvents.coming && sortedEvents.coming.length > 0 ?
						sortedEvents.coming.map((event) => {
							return <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />
						})
						:
						null
				}
				{
					sortedEvents.past && sortedEvents.past.length > 0 ?
						(
							sortedEvents.past.map((event) => {
							return <EventCard key={event.id} eventInfo={event} categoryTitle={categories[event.categoryCode]} />
						}))
						:
						null
				}
			</>
		)
	}

	return (
		<>
			<Calendar events={sortedEvents.selectedMonth} tasks={null} />
			<Board title={locale.groupDataByTitle.other} path={routesMap.events.new}>
				{
					sortedEvents.coming && sortedEvents.coming.length > 0 || sortedEvents.past && sortedEvents.past.length > 0 ?
						<OtherEventsBoard />
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.events} />
				}
			</Board>
		</>
	)
}
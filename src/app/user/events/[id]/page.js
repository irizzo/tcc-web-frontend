'use client'

import { getAllEventsService, updateEventService, deleteEventService } from '@/services/eventServices'
import { navigateTo } from '@/utils'
import { treatUpdatedEventData, getCategoryTitle } from '@/utils/dataTreatments.utils'

import { useState, useContext } from 'react'
import { UserCategoriesContext, UserEventsContext } from '@/hooks'

import Loading from '@/components/Loading'
import { FormContainer, FormSection } from '@/components/Form'
import { DefaultButton, DangerButton } from '@/components/Buttons'

import * as locale from '@/resources/locale'
import routesMap from '@/resources/routesMap'

export default function EventPage({ params, searchParams }) {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [ title, setTitle ] = useState(searchParams.title)
	const [ description, setDescription ] = useState(searchParams.description)
	const [ startDate, setStartDate ] = useState(searchParams.startDate)
	const [ endDate, setEndDate ] = useState(searchParams.endDate)
	const [ categoryCode, setCategoryCode ] = useState(searchParams.categoryCode)

	const [ editing, setEditing ] = useState(false)
	const [ isLoading, setIsLoading ] = useState(false)

	function handleEditing() {
		if (editing) {
			setTitle(searchParams.title)
			setDescription(searchParams.description)
			setStartDate(searchParams.startDate)
			setEndDate(searchParams.endDate)
			setCategoryCode(searchParams.categoryCode)
		}

		setEditing(!editing)
	}

	async function handleEditEventForm(e) {
		e.preventDefault()

		// try {
			setIsLoading(true)
			setEditing(false)

			const updatedData = treatUpdatedEventData(searchParams, { title, description, startDate, endDate, categoryCode })
			const res = await updateEventService(searchParams.id, updatedData)

			if (!res.success) {
				throw new Error(res.message)
			}

			const eventsRes = await getAllEventsService()
			setUserEvents({ eventsList: eventsRes.result, updatedAt: new Date() })
			setIsLoading(false)
			navigateTo({ path: routesMap.events.base })

		// } catch (error) {
		// 	setIsLoading(false)
		// 	alert(error)
		// }
	};

	async function handleDeleteEvent() {
		// try {
			setIsLoading(true)
			setEditing(false)

			const res = await deleteEventService(searchParams.id)

			if (!res.success) {
				throw new Error(res.message)
			}

			const eventsRes = await getAllEventsService()
			setUserEvents({ eventsList: eventsRes.result, updatedAt: new Date() })
			setIsLoading(false)
			navigateTo({ path: routesMap.events.base })

		// } catch (error) {
		// 	setIsLoading(false)
		// 	alert(error)
		// }
	}

	if (isLoading) return <Loading />

	return (
		<FormContainer
			title={ locale.pagesTitles.events.view }
			submitCallback={(e) => handleEditEventForm(e)}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.general.title}>
				<input name='title' value={title} readOnly={!editing} type='text' placeholder={locale.entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.general.description}>
				<textarea name='description' readOnly={!editing} value={description} placeholder={locale.entitiesProperties.general.description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
			</FormSection>

			{
				editing ?
					<>
						<FormSection labelFor='startDate' sectionTitle={locale.entitiesProperties.events.startDate}>
							<input name='startDate' value={startDate} type='datetime-local' onChange={(e) => { setStartDate(e.target.value) }}></input>
						</FormSection>

						<FormSection labelFor='endDate' sectionTitle={locale.entitiesProperties.events.endDate}>
							<input name='endDate' value={endDate} type='datetime-local' onChange={(e) => { setEndDate(e.target.value) }}></input>
						</FormSection>

						<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
							<select name='category' onChange={(e) => { setCategoryCode(e.target.value) }}>
								<option defaultValue=''>{locale.formDefaults.defaultOption}</option>

								{userCategories.categoriesList.length > 0 ?
									userCategories.categoriesList.map((category) => {
										return (
											<option key={category.code} value={category.code}>{category.title}</option>
										)
									})
									:
									<option disabled value=''>{locale.notFoundDefaults.categories}</option>
								}
							</select>
						</FormSection>
					</>
					:
					<>
						<FormSection labelFor='startDate' sectionTitle={locale.entitiesProperties.events.startDate}>
							<input name='startDate' readOnly value={startDate} type='text'></input>
						</FormSection>

						<FormSection labelFor='endDate' sectionTitle={locale.entitiesProperties.events.endDate}>
							<input name='endDate' readOnly value={endDate} type='text' ></input>
						</FormSection>

						<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
							<input name='category' readOnly value={getCategoryTitle(categoryCode, userCategories.categoriesList)} type='text'></input>
						</FormSection>
					</>
			}

			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.actionsTitles.cancel : locale.actionsTitles.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={() => { handleEditing() }}
				/>

				<DefaultButton
					title={locale.actionsTitles.save}
					variant='filled'
					buttonType='submit'
					isDisabled={editing ? false : true}
				/>

				<DangerButton
					title={locale.actionsTitles.delete}
					onClickFunction={() => { handleDeleteEvent() }}
				/>
			</div>
		</FormContainer>
	)
}
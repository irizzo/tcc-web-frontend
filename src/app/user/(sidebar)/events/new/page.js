'use client'

import { navigateTo } from '@/utils'
import { createEventService, getAllEventsService } from '@/services/eventServices'

import { pagesTitles, entitiesProperties, formDefaults, notFoundDefaults } from '@/resources/locale'
import routesMap from '@/resources/routesMap'

import { useState, useContext } from 'react'
import { UserCategoriesContext, UserEventsContext } from '@/hooks'

import Loading from '@/components/Loading'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection } from '@/components/Form'

export default function NewEvent() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userEvents, setUserEvents } = useContext(UserEventsContext)

	const [ title, setTitle ] = useState('')
	const [ description, setDescription ] = useState('')
	const [ startDate, setStartDate ] = useState('')
	const [ endDate, setEndDate ] = useState('')
	const [ categoryCode, setCategoryCode ] = useState('')

	const [ isLoading, setIsLoading ] = useState(false)

	async function handleSubmit(e, formData) {
		try {
			e.preventDefault()
			setIsLoading(true)

			// TODO: sanitize
			const cleanData = {
				title: formData.title,
				description: formData.description.length > 0 ? formData.description : null,
				startDate: formData.startDate === '' ? null : formData.startDate,
				endDate: formData.endDate === '' ? null : formData.endDate,
				categoryCode: formData.categoryCode === '' ? null : formData.categoryCode
			}

			const res = await createEventService(cleanData)

			if (!res.success) {
				throw new Error(res.message)
			}

			const eventsRes = await getAllEventsService()
			setUserEvents({ eventsList: eventsRes.result, updatedAt: new Date() })
			setIsLoading(false)
			navigateTo({ path: routesMap.events.base })

		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

	return (
		<FormContainer
			title={pagesTitles.events.new}
			submitCallback={(e) => handleSubmit(e, { title, description, startDate, endDate, categoryCode })}
		>
			<FormSection labelFor='title' sectionTitle={entitiesProperties.general.title + ' *'}>
				<input id='title' name='title' type='text' required placeholder={entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={entitiesProperties.general.description}>
				<textarea id='description' name='description' placeholder={entitiesProperties.general.description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
			</FormSection>

			<FormSection labelFor='startDate' sectionTitle={entitiesProperties.events.startDate + ' *'}>
				<input id='startDate' name='startDate' required type='datetime-local' onChange={(e) => { setStartDate(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='endDate' sectionTitle={entitiesProperties.events.endDate + ' *'}>
				<input id='endDate' name='endDate' required type='datetime-local' onChange={(e) => { setEndDate(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={entitiesProperties.general.category}>
				<select id='category' name='category' onChange={(e) => { setCategoryCode(e.target.value) }}>
					<option defaultValue=''>--{formDefaults.defaultOption}--</option>

					{userCategories.categoriesList.length > 0 ?
						userCategories.categoriesList.map((category) => {
							return (
								<option key={category.code} value={category.code}>{category.title}</option>
							)
						})
						:
						<option disabled value=''>{notFoundDefaults.categories}</option>
					}
				</select>
			</FormSection>

			<DefaultButton title={formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	)
};
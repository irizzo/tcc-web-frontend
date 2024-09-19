'use client'

import { navigateTo } from '@/utils'
import { getAllCategoriesService } from '@/services/categoryServices'
import { createNoteService } from '@/services/notesService'

import * as locale from '@/resources/locale'

import { useEffect, useState } from 'react'

import Loading from '@/components/Loading'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection } from '@/components/Form'
import routesMap from '@/resources/routesMap'

export default function NewNote() {
	const [ title, setTitle ] = useState('')
	const [ innerContent, setInnerContent ] = useState('')
	const [ categoryCode, setCategoryCode ] = useState('')

	const [ categoriesList, setCategoriesList ] = useState(false)
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		async function loadResources() {
			setIsLoading(true)
			const res = await getAllCategoriesService()

			if (!res.success) {
				throw new Error(res.message)
			}

			setCategoriesList([ ...res.result ])
			setIsLoading(false)
		}

		loadResources()
	}, [])

	async function handleSubmit(e, formData) {
		try {
			e.preventDefault()
			setIsLoading(true)

			const cleanData = {
				title: formData.title,
				innerContent: formData.innerContent.length > 0 ? formData.innerContent : null,
				categoryCode: formData.categoryCode === '' ? null : formData.categoryCode
			}

			const res = await createNoteService(cleanData)

			if (!res.success) {
				throw new Error(res.message)
			}

			setIsLoading(false)
			navigateTo({ path: routesMap.notes.base })

		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

	return (
		<FormContainer
			title={locale.pagesTitles.notes.new}
			submitCallback={(e) => handleSubmit(e, { title, innerContent, categoryCode })}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.general.title}>
				<input id='title' name='title' type='text' placeholder={locale.entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='inner-content' sectionTitle={locale.entitiesProperties.notes.innerContent + ' *'}>
				<textarea id='inner-content' name='inner-content' required placeholder={locale.entitiesProperties.notes.innerContent} onChange={(e) => { setInnerContent(e.target.value) }}></textarea>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select name='category' onChange={(e) => { setCategoryCode(e.target.value) }}>
					<option defaultValue='' >{locale.formDefaults.category}</option>

					{categoriesList.length > 0 ?
						categoriesList.map((category) => { return <option key={category.code} value={category.code}>{category.title}</option> })
						:
						<option disabled value=''>{locale.notFoundDefaults.categories}</option>
					}
				</select>
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	)
}
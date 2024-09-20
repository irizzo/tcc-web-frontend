'use client'

import {  } from '@/services/notesService'
import { getAllCategoriesService } from '@/services/categoryServices'
import { navigateTo } from '@/utils'
import * as locale from '@/resources/locale'
import { treatUpdatedNoteData, getCategoryTitle } from '@/utils/dataTreatments.utils'
import routesMap from '@/resources/routesMap'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Loading from '@/components/Loading'
import { FormContainer, FormSection } from '@/components/Form'
import { DefaultButton, DangerButton } from '@/components/Buttons'

export default function NotePage({ params, searchParams }) {
	const router = useRouter()

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

		if (editing) {
			loadResources()
		}
	}, [ editing ])

	if (isLoading) return <Loading />

	function handleEditing() {
		if (editing) {
			setTitle(searchParams.title)
			setInnerContent(searchParams.innerContent)
			setCategoryCode(searchParams.categoryCode)
		} else {
			setTitle('')
			setInnerContent('')
			setStartDate('')
			setEndDate('')
			setCategoryCode('')
		}

		setEditing(!editing)
	}

	async function handleEditNoteForm(e) {
		e.preventDefault()

		try {
			setIsLoading(true)
			setEditing(false)

			const updatedData = treatUpdatedNoteData(searchParams, { title, innerContent, categoryCode })
			const res = await updateNoteService(searchParams.id, updatedData)

			if (!res.success) {
				throw new Error(res.message)
			} else {
				setIsLoading(false)
				navigateTo({ path: routesMap.notes.base })
			}

		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	};

	async function handleDeleteNote() {
		try {
			setIsLoading(true)
			setEditing(false)

			const res = await deleteNoteService(searchParams.id)

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

	return (
		<FormContainer
			title={locale.pagesTitles.notes.view}
			submitCallback={(e) => handleEditNoteForm(e).then(router.refresh())}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.general.title}>
				<input id='title' name='title' type='text' placeholder={locale.entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='inner-content' sectionTitle={locale.entitiesProperties.notes.innerContent + ' *'}>
				<textarea id='inner-content' name='inner-content' required placeholder={locale.entitiesProperties.notes.innerContent} onChange={(e) => { setInnerContent(e.target.value) }}></textarea>
			</FormSection>

			{
				editing ?
					<>
						<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
							<select name='category' onChange={(e) => { setCategoryCode(e.target.value) }}>
								<option defaultValue=''>{locale.formDefaults.defaultOption}</option>

								{categoriesList.length > 0 ?
									categoriesList.map((category) => {
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
						<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
							<input name='category' readOnly value={getCategoryTitle(categoryCode, categoriesList)} type='text'></input>
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
					onClickFunction={() => { handleDeleteNote() }}
				/>
			</div>
		</FormContainer>
	)
}
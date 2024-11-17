'use client'

import { navigateTo } from '@/utils'
import { createCategoryService, getAllCategoriesService } from '@/services/categoryServices'
import { pagesTitles, entitiesProperties, actionsTitles } from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'

import { useState, useContext } from 'react'
import { UserCategoriesContext } from '@/hooks'

import Loading from '@/components/Loading'
import { FormContainer, FormSection } from '@/components/Form'
import { DefaultButton } from '@/components/Buttons'

export default function NewCategory() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const [ categoryTitle, setCategoryTitle ] = useState('')
	const [ categoryDescription, setCategoryDescription ] = useState('')
	const [ isLoading, setIsLoading ] = useState(false)

	async function handleNewCategoryForm(e, formData) {
		console.log('[handleNewCategoryForm]')
		try {
			e.preventDefault()

			setIsLoading(true)

			// TODO: sanitize
			const cleanData = {
				title: formData.title,
				description: formData.description.length > 0 ? formData.description : null
			}

			const res = await createCategoryService(cleanData)

			if (!res.success) {
				setIsLoading(false)
				alert(res.message)

			} else {
				const categoriesRes = await getAllCategoriesService()
				setUserCategories({ categoriesList: categoriesRes.result, updatedAt: new Date() })
				setIsLoading(false)
				navigateTo({ path: routesMap.categories.base })
			}
		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

	return (
		<FormContainer
			title={pagesTitles.categories.new}
			submitCallback={(e) => handleNewCategoryForm(e, { title: categoryTitle, description: categoryDescription })}
		>
			<FormSection labelFor='categoryTitle' sectionTitle={entitiesProperties.general.title + ' *'}>
				<input name='categoryTitle' required value={categoryTitle} type='text' onChange={(e) => { setCategoryTitle(e.target.value) }} />
			</FormSection>

			<FormSection labelFor='categoryDescription' sectionTitle={entitiesProperties.general.description}>
				<textarea name='categoryDescription' value={categoryDescription} type='text' onChange={(e) => { setCategoryDescription(e.target.value) }} />
			</FormSection>

			<DefaultButton title={actionsTitles.save} variant='filled' buttonType='submit' />
		</FormContainer>
	)
}
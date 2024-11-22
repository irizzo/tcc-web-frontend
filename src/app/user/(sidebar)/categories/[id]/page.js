'use client'

import { navigateTo } from '@/utils'
import { treatUpdatedCategoriesData } from '@/utils/dataTreatments.utils'
import { getAllCategoriesService, deleteCategoryService, updateCategoryService } from '@/services/categoryServices'

import { useState, useContext } from 'react'
import { UserCategoriesContext } from '@/hooks'

import { FormContainer, FormSection, FormInfo } from '@/components/Form'
import { DefaultButton, DangerButton } from '@/components/Buttons'
import Loading from '@/components/Loading'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'
import './category.scss'

export default function CategoryPage({ searchParams }) {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)

	const [ editing, setEditing ] = useState(false)
	const [ isLoading, setIsLoading ] = useState(false)

	const [ categoryTitle, setCategoryTitle ] = useState(searchParams.title)
	const [ categoryDescription, setCategoryDescription ] = useState(searchParams.description)

	function handleEditing() {
		if (editing) {
			setCategoryTitle(searchParams.title)
			setCategoryDescription(searchParams.description)
		}
		setEditing(!editing)
	}

	async function handleEditCategoryForm(e) {
		// e.preventDefault()
		console.debug('[handleEditCategoryForm]')

		setIsLoading(true)
		setEditing(false)

		const updatedData = treatUpdatedCategoriesData(searchParams, { title: categoryTitle, description: categoryDescription })
		const res = await updateCategoryService(searchParams.code, updatedData)

		setIsLoading(false)

		if (!res.success) {
			throw new Error(res.message)
		} else {
			const categoriesRes = await getAllCategoriesService()
			setUserCategories({ categoriesList: categoriesRes.result, updatedAt: new Date() })
			navigateTo({ path: routesMap.categories.base })
		}

		return
	}

	async function handleDeleteCategory() {
		setIsLoading(true)
		setEditing(false)

		const res = await deleteCategoryService(searchParams.code)

		if (!res.success) {
			throw new Error(res.message)
		}

		const categoriesRes = await getAllCategoriesService()
		setUserCategories({ categoriesList: categoriesRes.result, updatedAt: new Date() })
		setIsLoading(false)
		navigateTo({ path: routesMap.categories.base })
	}

	if (isLoading) return <Loading />

	return (
		<FormContainer
			title={ locale.pagesTitles.categories.view }
			submitCallback={(e) => handleEditCategoryForm(e)}
		>
			<FormSection labelFor='categoryTitle' sectionTitle={locale.entitiesProperties.general.title}>
				<input name='categoryTitle' value={categoryTitle} readOnly={!editing} type='text' onChange={(e) => { setCategoryTitle(e.target.value)}} />
			</FormSection>

			<FormSection labelFor='categoryDescription' sectionTitle={locale.entitiesProperties.general.description}>
				<textarea name='categoryDescription' value={categoryDescription} readOnly={!editing} type='text' onChange={(e) => { setCategoryDescription(e.target.value)}} />
			</FormSection>

			<FormInfo>Preencha apenas o que deseja alterar</FormInfo>

			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.actionsTitles.cancel : locale.actionsTitles.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={handleEditing}
				/>

				<DefaultButton
					title={locale.actionsTitles.save}
					variant='filled'
					buttonType='submit'
					isDisabled={editing ? false : true}
				/>

				<DangerButton
					title={locale.actionsTitles.delete}
					onClickFunction={() => { handleDeleteCategory() }}
				/>
			</div>
		</FormContainer>
	)
}
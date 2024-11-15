'use client'

import { navigateTo } from '@/utils'
import { listAllTasksService, createTaskService } from '@/services/taskServices'
import * as locale from '@/resources/locale'

import { useState, useContext } from 'react'
import { UserCategoriesContext, UserTasksContext } from '@/hooks'

import Loading from '@/components/Loading'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection } from '@/components/Form'
import { routesMap } from '@/resources/routesMap'

export default function NewTask() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userTasks, setUserTasks } = useContext(UserTasksContext)

	const [ title, setTitle ] = useState('')
	const [ description, setDescription ] = useState('')
	const [ dueDate, setDueDate ] = useState('')
	const [ categoryCode, setCategoryCode ] = useState('')
	const [ priorityCode, setPriorityCode ] = useState('')
	const [ schedueledDate, setSchedueledDate ] = useState('')

	const [ isLoading, setIsLoading ] = useState(false)

	async function handleSubmit(e, formData) {
		try {
			e.preventDefault()
			setIsLoading(true)

			// TODO: sanitize
			const cleanData = {
				title: formData.title,
				description: formData.description.length > 0 ? formData.description : null,
				dueDate: formData.dueDate === '' ? null : formData.dueDate,
				categoryCode: formData.categoryCode === '' ? null : formData.categoryCode,
				priorityCode: formData.priorityCode === '' ? null : formData.priorityCode,
				schedueledDate: formData.schedueledDate === '' ? null : formData.schedueledDate
			}

			const res = await createTaskService(cleanData)

			if (!res.success) {
				throw new Error(res.message)
			}

			const tasksRes = await listAllTasksService()
			setUserTasks({ tasksList: tasksRes.result, updatedAt: new Date() })
			setIsLoading(false)
			navigateTo({ path: routesMap.dashboard.base })

		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

	const prioritiesList = []
	for (let key in locale.prioritiesInfo) prioritiesList.push(locale.prioritiesInfo[key])

	return (
		<FormContainer
			title={locale.pagesTitles.tasks.new}
			submitCallback={(e) => handleSubmit(e, { title, description, dueDate, categoryCode, priorityCode, schedueledDate })}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.general.title + ' *'}>
				<input id='title' name='title' type='text' required placeholder={locale.entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.general.description}>
				<textarea id='description' name='description' placeholder={locale.entitiesProperties.general.description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
				<input id='dueDate' name='dueDate' type='datetime-local' onChange={(e) => { setDueDate(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='schedueledDate' sectionTitle={locale.entitiesProperties.general.schedueledDate}>
				<input id='schedueledDate' name='schedueledDate' type='datetime-local' onChange={(e) => { setSchedueledDate(e.target.value) }}></input>
			</FormSection>

			<FormSection labelFor='priority' sectionTitle={locale.entitiesProperties.tasks.priority}>
				<select name='priority' onChange={(e) => setPriorityCode(e.target.value)}>
					<option defaultValue='' >{locale.formDefaults.priority}</option>
					{
						prioritiesList.map((priority) => {
							return <option key={priority.value} value={priority.value}>{priority.title}</option>
						})
					}
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select name='category' onChange={(e) => { setCategoryCode(e.target.value) }}>
					<option defaultValue='' >{locale.formDefaults.category}</option>

					{userCategories.categoriesList.length > 0 ?
						userCategories.categoriesList.map((category) => { return <option key={category.code} value={category.code}>{category.title}</option> })
						:
						<option disabled value=''>{locale.notFoundDefaults.categories}</option>
					}
				</select>
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	)
}
'use client';

import { navigateTo } from '@/utils';
import { getAllCategoriesService } from '@/services/categoryServices';
import { createTaskService } from '@/services/taskServices';

import * as locale from '@/resources/locale';

import { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection } from '@/components/Form';
import routesMap from '@/resources/routesMap';

export default function NewTask() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ categoryCode, setCategoryCode ] = useState('');
	const [ priorityCode, setPriorityCode ] = useState('');
	const [ toDoDate, setToDoDate ] = useState('');

	const [ categoriesList, setCategoriesList ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function loadResources() {
			setIsLoading(true);
			const res = await getAllCategoriesService();

			if (!res.success) {
				throw new Error(res.message);
			}

			setCategoriesList([ ...res.result ]);
			setIsLoading(false);
		}

		loadResources();
	}, []);

	async function handleSubmit(e, formData) {
		try {
			e.preventDefault();
			setIsLoading(true);

			// TODO: sanitize
			const cleanData = {
				title: formData.title,
				description: formData.description.length > 0 ? formData.description : null,
				dueDate: formData.dueDate === '' ? null : formData.dueDate,
				categoryCode: formData.categoryCode === '' ? null : formData.categoryCode,
				priorityCode: formData.priorityCode === '' ? null : formData.priorityCode,
				toDoDate: formData.toDoDate === '' ? null : formData.toDoDate
			};

			const res = await createTaskService(cleanData);

			if (!res.success) {
				throw new Error(res.message);
			}

			setIsLoading(false);
			navigateTo({ path: routesMap.tasks.base });

		} catch (error) {
			setIsLoading(false);
			alert(error);
		}
	}

	if (isLoading) return <Loading />;

	const prioritiesList = [];
	for (let key in locale.prioritiesInfo) prioritiesList.push(locale.prioritiesInfo[key]);

	return (
		<FormContainer
			title={locale.pagesTitles.tasks.new}
			submitCallback={(e) => handleSubmit(e, { title, description, dueDate, categoryCode, priorityCode, toDoDate })}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.general.title + ' *'}>
				<input id='title' name='title' type='text' required placeholder={locale.entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.general.description}>
				<textarea id='description' name='description' placeholder={locale.entitiesProperties.general.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
				<input id='dueDate' name='dueDate' type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='toDoDate' sectionTitle={locale.entitiesProperties.general.toDoDate}>
				<input id='toDoDate' name='toDoDate' type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='priority' sectionTitle={locale.entitiesProperties.tasks.priority}>
				<select name='priority' onChange={(e) => setPriorityCode(e.target.value)}>
					<option defaultValue='' >{locale.formDefaults.priority}</option>
					{
						prioritiesList.map((priority) => {
							return <option key={priority.value} value={priority.value}>{priority.title}</option>;
						})
					}
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select name='category' onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue='' >{locale.formDefaults.category}</option>

					{categoriesList.length > 0 ?
						categoriesList.map((category) => { return <option key={category.code} value={category.code}>{category.title}</option>; })
						:
						<option disabled value=''>{locale.notFoundDefaults.categories}</option>
					}
				</select>
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	);
};
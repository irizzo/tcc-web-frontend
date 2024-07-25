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
				setIsLoading(false);
				alert(res.message);
				return;

			} else {
				setIsLoading(false);
				navigateTo({ path: routesMap.tasks.base });
			}
		} catch (error) {
			setIsLoading(false);
			alert(error);
		}
	}

	if (isLoading) return <Loading />;

	return (
		<FormContainer
			title={locale.pagesTitles.tasks.new}
			submitCallback={(e) => handleSubmit(e, { title, description, dueDate, categoryCode, priorityCode, toDoDate })}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.tasks.title}>
				<input id='title' name='title' type='text' required placeholder={locale.entitiesProperties.tasks.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.tasks.description}>
				<textarea id='description' name='description' placeholder={locale.entitiesProperties.tasks.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
				<input id='dueDate' name='dueDate' type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='priotity' sectionTitle={locale.entitiesProperties.general.priority}>
				<select id='priority' name='priority' onChange={(e) => setPriorityCode(e.target.value)}>
					<option defaultValue=''>--{locale.formDefaults.defaultOption}--</option>
					<option key={1} value={locale.entitiesProperties.general.quadrantOne.value}>{locale.entitiesProperties.general.quadrantOne.title}</option>
					<option key={2} value={locale.entitiesProperties.general.quadrantTwo.value}>{locale.entitiesProperties.general.quadrantTwo.title}</option>
					<option key={3} value={locale.entitiesProperties.general.quadrantThree.value}>{locale.entitiesProperties.general.quadrantThree.title}</option>
					<option key={4} value={locale.entitiesProperties.general.quadrantFour.value}>{locale.entitiesProperties.general.quadrantFour.title}</option>
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select id='category' name='category' onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue=''>--{locale.formDefaults.defaultOption}--</option>

					{categoriesList.length > 0 ?
						categoriesList.map((category) => {
							return (
								<option key={category.code} value={category.code}>{category.title}</option>
							);
						})
						:
						<option disabled value=''>{locale.notFoundDefaults.categories}</option>
					}
				</select>
			</FormSection>

			<FormSection labelFor='toDoDate' sectionTitle={locale.entitiesProperties.general.toDoDate}>
				<input id='toDoDate' name='toDoDate' type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	);
};
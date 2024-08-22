'use client';

import { deleteTaskService, updateTaskService } from '@/services/taskServices';
import { getAllCategoriesService } from '@/services/categoryServices';
import { navigateTo } from '@/utils';

import { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import { FormContainer, FormSection } from '@/components/Form';
import { DefaultButton, DangerButton } from '@/components/Buttons';
import * as locale from '@/resources/locale';
import { treatUpdatedTaskData, getCategoryTitle } from '@/utils/dataTreatments.utils';
import routesMap from '@/resources/routesMap';

export default function TaskPage({ params, searchParams }) {

	const [ title, setTitle ] = useState(searchParams.title);
	const [ description, setDescription ] = useState(searchParams.description);
	const [ dueDate, setDueDate ] = useState(searchParams.dueDate);
	const [ toDoDate, setToDoDate ] = useState(searchParams.toDoDate);
	const [ priorityCode, setPriorityCode ] = useState(searchParams.priorityCode);
	const [ statusCode, setStatusCode ] = useState(searchParams.statusCode);
	const [ categoryCode, setCategoryCode ] = useState(searchParams.categoryCode);

	const [ editing, setEditing ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ categoriesList, setCategoriesList ] = useState([]);

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

		if (editing) {
			loadResources();
		}
	}, [ editing ]);

	if (isLoading) return <Loading />;

	const statusList = [];
	for (let key in locale.statusInfo) statusList.push(locale.statusInfo[key]);

	const prioritiesList = [];
	for (let key in locale.prioritiesInfo) prioritiesList.push(locale.prioritiesInfo[key]);

	function handleEditing() {
		if (editing) {
			setTitle(searchParams.title);
			setDescription(searchParams.description);
			setDueDate(searchParams.dueDate);
			setCategoryCode(searchParams.categoryCode);
			setPriorityCode(searchParams.priorityCode);
			setStatusCode(searchParams.statusCode);
			setToDoDate(searchParams.toDoDate);
		}

		setEditing(!editing);
	}

	async function handleEditTaskForm(e) {
		e.preventDefault();

		try {
			setIsLoading(true);
			setEditing(false);

			const updatedData = treatUpdatedTaskData(searchParams, { title, description, dueDate, categoryCode, priorityCode, statusCode, toDoDate });
			const res = await updateTaskService(searchParams.id, updatedData);

			if (!res.success) {
				throw new Error(res.message);
			}

			setIsLoading(false);

		} catch (error) {
			setIsLoading(false);
			alert(error);
		}
	};

	async function handleDeleteTask() {
		try {
			setIsLoading(true);
			setEditing(false);

			const res = await deleteTaskService(searchParams.id);

			if (!res.success) {
				throw new Error(res.message);
			}

			setIsLoading(false);

		} catch (error) {
			setIsLoading(false);
			alert(error);
		}
	}

	return (
		<FormContainer
			title={locale.pagesTitles.tasks.view}
			submitCallback={(e) => handleEditTaskForm(e).then(navigateTo({ path: routesMap.tasks.base }))}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.general.title}>
				<input name='title' value={title} readOnly={!editing} type='text' placeholder={locale.entitiesProperties.general.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.general.description}>
				<textarea name='description' readOnly={!editing} value={description} placeholder={locale.entitiesProperties.general.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			{
				editing ?
					<>
						<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
							<input name='dueDate' value={dueDate} type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
						</FormSection>

						<FormSection labelFor='toDoDate' sectionTitle={locale.entitiesProperties.general.toDoDate}>
							<input name='toDoDate' value={toDoDate} type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
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

						<FormSection labelFor='status' sectionTitle={locale.entitiesProperties.tasks.status}>
							<select name='status' onChange={(e) => setStatusCode(e.target.value)}>
								<option defaultValue='' >{locale.formDefaults.staus}</option>
								{
									statusList.map((status) => {
										console.log('status: ', status);
										return <option key={status.value} value={status.value}>{status.title}</option>;
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
					</>
					:
					<>
						<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
							<input name='dueDate' readOnly value={dueDate} type='text'></input>
						</FormSection>

						<FormSection labelFor='toDoDate' sectionTitle={locale.entitiesProperties.general.toDoDate}>
							<input name='toDoDate' readOnly value={toDoDate} type='text'></input>
						</FormSection>

						<FormSection labelFor='priority' sectionTitle={locale.entitiesProperties.tasks.priority}>
							<input name='priority' readOnly value={searchParams.priorityCode ? locale.prioritiesInfo[searchParams.priorityCode].title : ''} type='text'></input>
						</FormSection>

						<FormSection labelFor='status' sectionTitle={locale.entitiesProperties.tasks.status}>
							<input name='status' readOnly value={searchParams.statusCode ? locale.statusInfo[searchParams.statusCode].title : ''} type='text'></input>
						</FormSection>

						<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
							<input name='category' readOnly value={categoryCode ? getCategoryTitle(categoryCode, categoriesList) : ''} type='text'></input>
						</FormSection>
					</>
			}
			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.actionsTitles.cancel : locale.actionsTitles.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={() => { handleEditing(); }}
				/>

				<DefaultButton
					title={locale.actionsTitles.save}
					variant='filled'
					buttonType='submit'
					isDisabled={editing ? false : true}
				/>

				<DangerButton
					title={locale.actionsTitles.delete}
					onClickFunction={() => { handleDeleteTask().then(navigateTo({ path: routesMap.tasks.base })); }}
				/>
			</div>
		</FormContainer>
	);
}
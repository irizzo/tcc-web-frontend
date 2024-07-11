'use client';

import { deleteTaskService, updateTaskService } from '@/services/taskServices';
import { getCategoriesListService } from '@/services/categoryServices';
import { navigateTo } from '@/utils';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { FormContainer, FormSection } from '@/components/Form';
import { DefaultButton, DangerButton } from '@/components/Buttons';
import * as locale from '@/resources/locale';
import { treatUpdatedTaskData } from '@/utils/dataTreatments.utils';

export default function TaskPage({ params, searchParams }) {
	const router = useRouter();

	const [ title, setTitle ] = useState(searchParams.title);
	const [ description, setDescription ] = useState(searchParams.description);
	const [ dueDate, setDueDate ] = useState(searchParams.dueDate);
	const [ categoryCode, setCategoryCode ] = useState(searchParams.categoryCode);
	const [ priorityCode, setPriorityCode ] = useState(searchParams.priorityCode);
	const [ toDoDate, setToDoDate ] = useState(searchParams.toDoDate);

	const [ editing, setEditing ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ categoriesList, setCategoriesList ] = useState([]);

	useEffect(() => {
		async function loadResources() {
			setIsLoading(true);
			const res = await getCategoriesListService();

			if (!res.success) {
				throw new Error(res.message);
			}

			setCategoriesList([ ...res.result ]);
			setIsLoading(false);
		}

		if (editing) {
			loadResources();
		}
	}, [ editing ]);


	if (isLoading) return <Loading />;

	function handleEditing() {
		if (editing) {
			setTitle(searchParams.title);
			setDescription(searchParams.description);
			setDueDate(searchParams.dueDate);
			setCategoryCode(searchParams.categoryCode);
			setPriorityCode(searchParams.priorityCode);
			setToDoDate(searchParams.toDoDate);

			document.getElementById('priority').value = priorityCode;
			document.getElementById('category').value = categoryCode;
		}

		setEditing(!editing);
	}

	async function handleEditTaskForm(e) {
		e.preventDefault();

		setIsLoading(true);
		setEditing(false);

		const updatedData = treatUpdatedTaskData(searchParams, { title, description, dueDate, categoryCode, priorityCode, toDoDate });
		const res = await updateTaskService(searchParams.id, updatedData);

		setIsLoading(false);

		if (!res.success) {
			throw new Error(res.message);
		} else {
			alert(res.message);
		}
	};

	async function handleDeleteTask() {
		setIsLoading(true);
		setEditing(false);

		const res = await deleteTaskService(searchParams.id);

		if (!res.success) {
			throw new Error(res.message);
		}

		setIsLoading(false);

		await navigateTo({ path: '/user/tasks'});
	}

	return (
		<FormContainer
			title={locale.pagesTitles.tasks.view}
			submitCallback={(e) => handleEditTaskForm(e).then(router.refresh())}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.tasks.title}>
				<input name='title' value={title} readOnly={!editing} type='text' required placeholder={locale.entitiesProperties.tasks.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.tasks.description}>
				<textarea name='description' readOnly={!editing} value={description} placeholder={locale.entitiesProperties.tasks.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
				<input name='dueDate' readOnly={!editing} value={dueDate} type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='priotity' sectionTitle={locale.entitiesProperties.general.priority}>
				<select id='priority' name='priority' disabled={!editing} onChange={(e) => setPriorityCode(e.target.value)}>
					<option defaultValue='' >{priorityCode}</option>
					<option key={1} value={locale.entitiesProperties.general.quadrantOne.value}>{locale.entitiesProperties.general.quadrantOne.title}</option>
					<option key={2} value={locale.entitiesProperties.general.quadrantTwo.value}>{locale.entitiesProperties.general.quadrantTwo.title}</option>
					<option key={3} value={locale.entitiesProperties.general.quadrantThree.value}>{locale.entitiesProperties.general.quadrantThree.title}</option>
					<option key={4} value={locale.entitiesProperties.general.quadrantFour.value}>{locale.entitiesProperties.general.quadrantFour.title}</option>
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select id='category' name='category' disabled={!editing} onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue=''>{categoryCode}</option>

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
				<input name='toDoDate' readOnly={!editing} value={toDoDate} type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

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
					onClickFunction={() => { handleDeleteTask(); }}
				/>
			</div>
		</FormContainer>
	);
}
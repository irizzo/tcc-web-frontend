'use client';

import { useState } from 'react';
import { FormContainer, FormSection } from '@/components/Form';
import { DefaultButton } from '@/components/Buttons';

import * as locale from '@/resources/locale';

export default function TaskPage({ params, searchParams }) {
	console.log('TASK PAGE');
	console.log(`searchParams = ${JSON.stringify(searchParams)}`);

	let categoriesList = [];
	let prioritesList = [];

	const [ title, setTitle ] = useState(searchParams.title);
	const [ description, setDescription ] = useState(searchParams.description);
	const [ dueDate, setDueDate ] = useState(searchParams.dueDate);
	const [ categoryCode, setCategoryCode ] = useState(searchParams.categoryCode);
	const [ priorityCode, setPriorityCode ] = useState(searchParams.priorityCode);
	const [ toDoDate, setToDoDate ] = useState(searchParams.toDoDate);

	const [ editing, setEditing ] = useState(false);

	if(editing) {
		// load resources
	}

	return (
		<FormContainer
			title={locale.pageTitles.tasks.new}
			submitCallback={(e) => handleNewTaskForm(e)}
		>
			<FormSection labelFor='title' sectionTitle={locale.taskInfoTitles.title}>
				<input name='title' value={title} readOnly={!editing} type='text' required placeholder={locale.taskInfoTitles.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.taskInfoTitles.description}>
				<textarea name='description' readOnly={!editing} value={description} placeholder={locale.taskInfoTitles.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.taskInfoTitles.dueDate}>
				<input name='dueDate' readOnly={!editing} value={dueDate} type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='priotity' sectionTitle={locale.taskInfoTitles.priority}>
				<select name='priority' disabled={!editing} value={priorityCode} onChange={(e) => setPriorityCode(e.target.value)}>
					<option defaultValue=''>--{locale.formDefaults.defaultOption}--</option>
					<option key={1} value={1}>{locale.taskInfoTitles.quadrantOne}</option>
					<option key={2} value={2}>{locale.taskInfoTitles.quadrantTwo}</option>
					<option key={3} value={3}>{locale.taskInfoTitles.quadrantThree}</option>
					<option key={4} value={4}>{locale.taskInfoTitles.quadrantFour}</option>
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.taskInfoTitles.category}>
				<select name='category' disabled={!editing} value={categoryCode} onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue=''>--{locale.formDefaults.defaultOption}--</option>

					{categoriesList.length > 0 ?
						categoriesList.map((category) => {
							return (
								<option key={category.code} value={category.code}>{category.title}</option>
							);
						})
						:
						<option disabled value=''>No categories found</option>
					}
				</select>
			</FormSection>

			<FormSection labelFor='toDoDate' sectionTitle={locale.taskInfoTitles.toDoDate}>
				<input name='toDoDate' readOnly={!editing} value={toDoDate} type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.general.cancel : locale.general.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={() => setEditing(!editing)}
				/>

				<DefaultButton
					title={locale.general.save}
					variant='filled'
					buttonType='submit'
					isDisabled={editing ? false : true}
				/>
			</div>

		</FormContainer>
	);
}
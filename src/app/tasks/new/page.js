'use client';

import { useState, useEffect } from 'react';

import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection } from '@/components/Form';

import * as locale from '@/resources/locale';

// TODO: get categories from backend
const _categoriesList = [];

export default function NewTask() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ categoryCode, setCategoryCode ] = useState('');
	const [ priorityCode, setPriorityCode ] = useState('');
	const [ toDoDate, setToDoDate ] = useState('');

	const [ categoriesList, setCategoriesList ] = useState(false);

	async function loadCategories() {
		setCategoriesList(_categoriesList);

		/* const c = await categoryServices.getCategoriesList();

		if (c.result.length === 0 || c.status === false) {
			setCategoriesList(false);
		} else {
			setCategoriesList(c.result);
		}*/

	}

	useEffect(() => {
		loadCategories();
	}, []);

	async function handleNewTaskForm(e) {
		e.preventDefault();
		return;
	}

	/*
	async function handleSubmit(e) {
		e.preventDefault();

		const formattedDueDate = new Date(dueDate);

		// sanitize
		const cleanTitle = sanitizeString(title);
		const cleanDescripiton = sanitizeString(description);
		const cleanCategoryCode = sanitizeString(categoryCode);

		// title validation
		if (!titleValidation(cleanTitle)) {
			window.alert('Invalid Title');
			return;
		}

		// due date validation
		if (!dueDateValidation(formattedDueDate)) {
			window.alert('Invalid due date');
			return;
		}

		const todoData = {
			title: cleanTitle,
			description: cleanDescripiton,
			dueDate: formattedDueDate,
			categoryCode: cleanCategoryCode
		};

		console.log(`todoData = ${JSON.stringify(todoData)}`);

		const createTodoRes = await todoServices.createTodo(todoData);

		if (createTodoRes.status === true) {
			// TODO: redirect to home page
			window.alert(createTodoRes.message || 'Success');
			return;
		};

		window.alert(createTodoRes.message || 'Internal Error. try Again Later');
		return;
	}
	*/

	return (
		<FormContainer
			title={locale.pageTitles.tasks.new}
			submitCallback={(e) => handleNewTaskForm(e)}
		>
			<FormSection labelFor='title' sectionTitle={locale.taskInfoTitles.title}>
				<input name='title' type='text' required placeholder={locale.taskInfoTitles.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.taskInfoTitles.description}>
				<textarea name='description' placeholder={locale.taskInfoTitles.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.taskInfoTitles.dueDate}>
				<input name='dueDate' type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='priotity' sectionTitle={locale.taskInfoTitles.priority}>
				<select name='priority' onChange={ (e) => setPriorityCode(e.target.value) }>
					<option defaultValue=''>--{locale.formDefaults.defaultOption}--</option>
					<option key={1} value={1}>{locale.taskInfoTitles.quadrantOne}</option>
					<option key={2} value={2}>{locale.taskInfoTitles.quadrantTwo}</option>
					<option key={3} value={3}>{locale.taskInfoTitles.quadrantThree}</option>
					<option key={4} value={4}>{locale.taskInfoTitles.quadrantFour}</option>
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.taskInfoTitles.category}>
				<select name='category' onChange={(e) => { setCategoryCode(e.target.value); }}>
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
				<input name='toDoDate' type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	);
};
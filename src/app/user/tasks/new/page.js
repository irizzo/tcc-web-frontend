'use client';

import { useEffect, useState } from 'react';;

import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection } from '@/components/Form';

import * as locale from '@/resources/locale';

// TODO: fix dates and selects placeholders styles

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
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.tasks.title}>
				<input name='title' type='text' required placeholder={locale.entitiesProperties.tasks.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.tasks.description}>
				<textarea name='description' placeholder={locale.entitiesProperties.tasks.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='dueDate' sectionTitle={locale.entitiesProperties.general.dueDate}>
				<input name='dueDate' type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='priotity' sectionTitle={locale.entitiesProperties.general.priority}>
				<select name='priority' onChange={ (e) => setPriorityCode(e.target.value) }>
					<option defaultValue=''>--{locale.formDefaults.defaultOption}--</option>
					<option key={1} value={1}>{locale.entitiesProperties.general.quadrantOne}</option>
					<option key={2} value={2}>{locale.entitiesProperties.general.quadrantTwo}</option>
					<option key={3} value={3}>{locale.entitiesProperties.general.quadrantThree}</option>
					<option key={4} value={4}>{locale.entitiesProperties.general.quadrantFour}</option>
				</select>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select name='category' onChange={(e) => { setCategoryCode(e.target.value); }}>
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
				<input name='toDoDate' type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	);
};
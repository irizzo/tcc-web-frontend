'use client';

import '@/styles/globalForm.scss';

import { useState, useEffect } from 'react';

// import * as todoServices from '@/services/todoServices';
// import * as categoryServices from '@/services/categoryServices';
import * as categoryServices from '@/services/categoryServices';

// import { sanitizeString } from '@/resources/sanitization';
// import { dueDateValidation, titleValidation } from '@/resources/validations';

import { formDefaults, buttons, newTaskFormTitles, pageTitles } from '@/resources/locale'

export default function NewTask() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [categoryCode, setCategoryCode] = useState('');
	const [priorityCode, setPriorityCode] = useState('');
	const [toDoDate, setToDoDate] = useState('');


	const [categoriesList, setCategoriesList] = useState(false);
	
	async function loadCategories() {
		const c = await categoryServices.getCategoriesList();

		if (c.result.length === 0 || c.status === false) {
			setCategoriesList(false);
		} else {
			setCategoriesList(c.result);
		}
	}

	useEffect(() => {
		loadCategories();
	}, []);

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
		<form className='form' autoComplete='off' /*onSubmit={handleSubmit}*/>
			<h1 className='form__title'>{pageTitles.tasks.new}</h1>
			<section className='form__section'>
				<label htmlFor="title">{newTaskFormTitles.title}</label>
				<input name="title" type="text" required placeholder={newTaskFormTitles.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</section>

			<section className='form__section'>
				<label htmlFor="description">{newTaskFormTitles.description}</label>
				<textarea name="description" placeholder={newTaskFormTitles.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</section>

			<section className='form__section'>
				<label htmlFor="dueDate">{newTaskFormTitles.dueDate}</label>
				<input name="dueDate" type="datetime-local" onChange={(e) => { setDueDate(e.target.value); }}></input>
			</section>

			<section className='form__section'>
				<label htmlFor="priority">{newTaskFormTitles.priority}</label>
				<select>
					<option defaultValue="">--{formDefaults.defaultOption}--</option>
					<option key={1} value={1}>{newTaskFormTitles.quadrantOne}</option>
					<option key={1} value={1}>{newTaskFormTitles.quadrantTwo}</option>
					<option key={1} value={1}>{newTaskFormTitles.quadrantThree}</option>
					<option key={1} value={1}>{newTaskFormTitles.quadrantFour}</option>
				</select>
			</section>

			{/* categorias */}
			<section className='form__section'>
				<label htmlFor="category">{newTaskFormTitles.category}</label>
				<select id="category" onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue="">--{formDefaults.defaultOption}--</option>

					{categoriesList ?
						categoriesList.map((category) => {
							return (
								<option key={category.code} value={category.code}>{category.title}</option>
							);
						})
						:
						<option disabled value="">No categories found</option>
					}
				</select>
			</section>

			<section className='form__section'>
				<label htmlFor="toDoDate">{newTaskFormTitles.toDoDate}</label>
				<input name="toDoDate" type="datetime-local" onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</section>

			<button className='button button--filled' type='submit'>{buttons.submitForm}</button>
		</form>
	)
};
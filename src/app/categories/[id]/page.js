'use client';

import { useState } from 'react';

import './category.scss';

import * as locale from '@/resources/locale';

import { FormContainer, FormSection } from '@/components/Form';
import { DefaultButton } from '@/components/Buttons';

export default function CategoryPage({ searchParams }) {
	const [ editing, setEditing ] = useState(false);
	const [ categoryTitle, setCategoryTitle ] = useState(searchParams.title);
	const [ categoryDescription, setCategoryDescription ] = useState(searchParams.description);

	async function handleEditCategoryForm(e) {
		e.preventDefault();
		return;
	}

	function handleEdit() {
		if (editing) {
			setCategoryTitle(searchParams.title);
			setCategoryDescription(searchParams.description);
		}

		setEditing(!editing);
	}

	return (
		<FormContainer
			title={ editing ? locale.pageTitles.categories.edit : searchParams.title }
			submitCallback={(e) => handleEditCategoryForm(e)}
		>
			<FormSection labelFor='categoryTitle' sectionTitle={locale.categoriesInfoTitles.title}>
				<input name='categoryTitle' value={categoryTitle} readOnly={!editing} type='text' onChange={(e) => { setCategoryTitle(e.target.value);}} />
			</FormSection>

			<FormSection labelFor='categoryDescription' sectionTitle={locale.categoriesInfoTitles.description}>
				<textarea name='categoryDescription' value={categoryDescription} readOnly={!editing} type='text' onChange={(e) => { setCategoryDescription(e.target.value);}} />
			</FormSection>


			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.general.cancel : locale.general.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={handleEdit}
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
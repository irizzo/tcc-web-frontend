'use client';

import { useState } from 'react';

import * as locale from '@/resources/locale';

import { FormContainer, FormSection } from '@/components/Form';
import { DefaultButton } from '@/components/Buttons';

export default function NewCategory() {
	const [ categoryTitle, setCategoryTitle ] = useState('');
	const [ categoryDescription, setCategoryDescription ] = useState('');

	async function handleEditCategoryForm(e) {
		e.preventDefault();
		return;
	}

	return (
		<FormContainer
			title={locale.pageTitles.categories.new}
			submitCallback={(e) => handleEditCategoryForm(e)}
		>
			<FormSection labelFor='categoryTitle' sectionTitle={locale.categoriesInfoTitles.title}>
				<input name='categoryTitle' value={categoryTitle} type='text' onChange={(e) => { setCategoryTitle(e.target.value); }} />
			</FormSection>

			<FormSection labelFor='categoryDescription' sectionTitle={locale.categoriesInfoTitles.description}>
				<textarea name='categoryDescription' value={categoryDescription} type='text' onChange={(e) => { setCategoryDescription(e.target.value); }} />
			</FormSection>

			<DefaultButton title={locale.formDefaults.submitButtonTitle} variant='filled' buttonType='submit' />
		</FormContainer>
	);
}
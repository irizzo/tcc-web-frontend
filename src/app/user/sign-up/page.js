'use client';

import { useState, useContext, useEffect } from 'react';
import { UserAccessStateContext } from '@/contexts';

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection, FormInfo } from '@/components/Form';

import * as locale from '@/resources/locale';
import handleSignUp from './handleSignUp';

import { navigateTo } from '@/services/general';
import { verifyUserAccessService } from '@/services/userAccessServices';

export default function SignUp() {
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	useEffect(() => {
		if (userAccessState) {
			console.log(`logged in (userAccessState = ${userAccessState})`);
			const isUserAuthorized = verifyUserAccessService();
			if (isUserAuthorized.success) {
				navigateTo({ path: '/dashboard'});
			} else setUserAccessState(false);

		} else {
			console.log(`not logged in (userAccessState = ${userAccessState})`);
		}
	});

	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	return (
		<DefaultPageContainer>
			<Menu buttonsShown />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw' }}>
				<FormContainer
					title={locale.pageTitles.user.signUp}
					variantClasses='form__container--sign-up'
					submitCallback={(e) => handleSignUp(e, { firstName, lastName, email, password, confirmPassword })}
				>
					<FormSection labelFor='firstName' sectionTitle={locale.userFormsFields.firstName}>
						<input type='text' name="firstName" required placeholder={locale.userFormsFields.firstName} onChange={(e) => { setFirstName(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='lastName' sectionTitle={ locale.userFormsFields.lastName }>
						<input type='text' name="lastName" required placeholder={locale.userFormsFields.lastName} onChange={(e) => { setLastName(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='email' sectionTitle={ locale.userFormsFields.email }>
						<input type='email' name="email" required placeholder={locale.userFormsFields.email} onChange={(e) => { setEmail(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={ locale.userFormsFields.password }>
						<input type='password' name="password" required placeholder={locale.userFormsFields.password} onChange={(e) => { setPassword(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='confirmPassword' sectionTitle={ locale.userFormsFields.confirmPassword }>
						<input type='password' name="confirmPassword" required placeholder={locale.userFormsFields.confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} />
					</FormSection>

					<FormInfo>{locale.formDefaults.passwordRequirements}</FormInfo>

					<DefaultButton title={locale.formDefaults.defaultButtonTitle} variant="filled" buttonType='submit' />

				</FormContainer>
			</main>
		</DefaultPageContainer>
	);
}

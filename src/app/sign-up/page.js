'use client';

import { useState, useContext, useCallback, useEffect } from 'react';
import { UserAccessStateContext } from '@/hooks';

import { signUpService } from '@/services/userAccessServices';
import messagesDictionary from '@/resources/messages';

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection, FormInfo } from '@/components/Form';

import * as locale from '@/resources/locale';
import verifyUserAuth from '@/utils/verifyUserAuth';

export default function SignUp() {
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	const isUserLogged = useCallback(
		async () => { verifyUserAuth(userAccessState, setUserAccessState); },
		[ userAccessState, setUserAccessState ]
	);

	useEffect(() => {
		isUserLogged();
	}, [ isUserLogged ]);

	async function handleSignUp(e, data) {
		console.log('[handleSignUp]');

		e.preventDefault();

		// validations
		if (!data.firstName || !data.lastName || !data.email || !data.password || !data.confirmPassword) {
			alert(messagesDictionary.EMPTY_FIELD);
			return;
		}

		if (data.password !== data.confirmPassword) {
			alert(messagesDictionary.DIF_CONFIRM_PASS);
			return;
		}

		const fetchRes = await signUpService(data);

		if (fetchRes.success) {
			console.log('usuário criado!');
			setUserAccessState(true);
		} else {
			alert(fetchRes.message);
		}
	}

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
					<FormSection labelFor='firstName' sectionTitle={locale.entitiesProperties.user.firstName}>
						<input type='text' name="firstName" required placeholder={locale.entitiesProperties.user.firstName} onChange={(e) => { setFirstName(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='lastName' sectionTitle={locale.entitiesProperties.user.lastName}>
						<input type='text' name="lastName" required placeholder={locale.entitiesProperties.user.lastName} onChange={(e) => { setLastName(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
						<input type='email' name="email" required placeholder={locale.entitiesProperties.user.email} onChange={(e) => { setEmail(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={locale.entitiesProperties.user.password}>
						<input type='password' name="password" required placeholder={locale.entitiesProperties.user.password} onChange={(e) => { setPassword(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='confirmPassword' sectionTitle={locale.entitiesProperties.user.confirmPassword}>
						<input type='password' name="confirmPassword" required placeholder={locale.entitiesProperties.user.confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); }} />
					</FormSection>

					<FormInfo>{locale.formDefaults.passwordRequirements}</FormInfo>

					<DefaultButton title={locale.formDefaults.submitButtonTitle} variant="filled" buttonType='submit' />

				</FormContainer>
			</main>
		</DefaultPageContainer>
	);
}

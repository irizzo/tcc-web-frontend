'use client';

import { useState, useContext, useCallback, useEffect } from 'react';
import { UserAccessStateContext } from '@/hooks';

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection } from '@/components/Form';

import { loginService } from '@/services/userAccessServices';
import verifyUserAuth from '@/utils/verifyUserAuth';
import messagesDictionary from '@/resources/messages';
import * as locale from '@/resources/locale';

export default function Login() {
	// const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);
	// const isUserLogged = useCallback(
	// 	async () => { verifyUserAuth(userAccessState, setUserAccessState); },
	// 	[ userAccessState, setUserAccessState ]
	// );

	// useEffect(() => {
	// 	isUserLogged();
	// }, [ isUserLogged ]);

	const [ userEmail, setUserEmail ] = useState('');
	const [ userPassword, setUserPassword ] = useState('');

	async function handleLogin(e, data) {
		console.log('[handleLogin]');
		e.preventDefault();

		// validations
		if (!data.email || !data.password) {
			alert(messagesDictionary.EMPTY_FIELD);
			return;
		}

		const fetchRes = await loginService(data);

		if (fetchRes.success) {
			console.log('[handleLogin] usuário logado!');
			setUserAccessState(true);
		} else {
			alert(fetchRes.message);
		}
	}

	return (
		<DefaultPageContainer>
			<Menu buttonsShown />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw'}}>
				<FormContainer
					title={locale.pagesTitles.user.login}
					variantClasses='form__container--login'
					submitCallback={(e) => handleLogin(e, { email: userEmail, password: userPassword })}
				>
					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
						<input type='email' name="email" required placeholder={locale.entitiesProperties.user.email} onChange={(e) => { setUserEmail(e.target.value); }} />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={locale.entitiesProperties.user.password}>
						<input type='password' name="password" required placeholder={locale.entitiesProperties.user.password} onChange={(e) => { setUserPassword(e.target.value); }} />
					</FormSection>

					<DefaultButton title={locale.formDefaults.submitButtonTitle} variant="filled" buttonType='submit' />
				</FormContainer>
			</main>
		</DefaultPageContainer>
	);
}

'use client';

import { useContext, useCallback, useEffect } from 'react';

import { UserAccessStateContext } from '@/hooks';

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection } from '@/components/Form';

import _verifyUserAuth from '@/utils/verifyUserAuth';
import messagesDictionary from '@/resources/messages';
import * as locale from '@/resources/locale';

export default function Login() {
	const { userAccessState, setUserAccessState } = useContext(UserAccessStateContext);

	const verifyUserAuth = useCallback(
		async () => { _verifyUserAuth(userAccessState, setUserAccessState); },
		[ userAccessState, setUserAccessState ]
	);

	useEffect(() => {
		verifyUserAuth();
	}, [ verifyUserAuth ]);

	async function handleLogin(e) {
		console.log('handleLogin');
		e.preventDefault();
		return;
	}

	return (
		<DefaultPageContainer>
			<Menu buttonsShown />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw'}}>
				<FormContainer title={locale.pageTitles.user.login} variantClasses='form__container--login' submitCallback={handleLogin}>
					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
						<input type='email' name="email" required placeholder={locale.entitiesProperties.user.email} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={locale.entitiesProperties.user.password}>
						<input type='pacssword' name="password" required placeholder={locale.entitiesProperties.user.password} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</FormSection>

					<DefaultButton title={locale.formDefaults.submitButtonTitle} variant="filled" buttonType='submit' />
				</FormContainer>
			</main>
		</DefaultPageContainer>
	);
}

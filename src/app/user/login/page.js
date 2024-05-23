'use client';

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';
import { FormContainer, FormSection } from '@/components/Form';

export default function Login() {
	// check if user's logged in, if so, redirect to dashboard

	async function handleLogin(e) {
		console.log('handleLogin');
		e.preventDefault();
		return;
	}

	return (
		<DefaultPageContainer>
			<Menu buttonsShown />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw'}}>
				<FormContainer title={'pageTitles.user.login'} variantClasses='form__container--login' submitCallback={handleLogin}>
					<FormSection labelFor='email' sectionTitle={'loginFormTitles.email'}>
						<input type='email' name="email" required placeholder={'loginFormTitles.email'} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={'loginFormTitles.password'}>
						<input type='pacssword' name="password" required placeholder={'loginFormTitles.password'} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</FormSection>

					<DefaultButton title={'login button'} variant="filled" buttonType='submit' />
				</FormContainer>
			</main>
		</DefaultPageContainer>
	);
}

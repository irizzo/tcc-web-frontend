'use client'

import '@/styles/global.scss';
import '@/styles/globalForm.scss';
import './login.scss'

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';

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
			<main className='login__main'>
				<form className='form login__form' onSubmit={handleLogin} autoComplete='off'>
					<h1 className='form__title'>{'pageTitles.user.login'}</h1>

					<section className='form__section'>
						<label htmlFor="email">{"loginFormTitles.email"}</label>
						<input type='email' name="email" required placeholder={"loginFormTitles.email"} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<section className='form__section'>
						<label htmlFor="password">{"loginFormTitles.password"}</label>
						<input type='password' name="password" required placeholder={"loginFormTitles.password"} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<DefaultButton title={"login button"} variant="filled" buttonType='submit'/>
				</form>
			</main>
		</DefaultPageContainer>
	);
}

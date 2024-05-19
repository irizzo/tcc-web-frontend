'use client'

import '@/styles/global.scss';
import '@/styles/globalForm.scss';
import './signUp.scss'

import { DefaultPageContainer } from '@/components/PageContainer';
import Menu from '@/components/Menu';
import { DefaultButton } from '@/components/Buttons';

import { FaCircleInfo } from "react-icons/fa6";

import * as locale from '@/resources/locale'

export default function SignUp() {
	// check if user's logged in, if so, redirect to dashboard

	async function handleSignUp(e) {
		console.log('handleSignUp');
		e.preventDefault();
		return;
	}

	return (
		<DefaultPageContainer>
			<Menu buttonsShown />
			<main className='signUp__main'>
				<form className='form signUp__form' onSubmit={handleSignUp} autoComplete='off'>
					<h1 className='form__title'>{locale.pageTitles.user.signUp}</h1>

					<section className='form__section'>
						<label htmlFor="firstName">{locale.userFormsFields.firstName}</label>
						<input type='text' name="firstName" required placeholder={locale.userFormsFields.firstName} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<section className='form__section'>
						<label htmlFor="lastName">{locale.userFormsFields.lastName}</label>
						<input type='text' name="lastName" required placeholder={locale.userFormsFields.lastName} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<section className='form__section'>
						<label htmlFor="email">{locale.userFormsFields.email}</label>
						<input type='email' name="email" required placeholder={locale.userFormsFields.email} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<section className='form__section'>
						<label htmlFor="password"> {locale.userFormsFields.password}</label>
						<input type='password' name="password" required placeholder={locale.userFormsFields.password} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<section className='form__section'>
						<label htmlFor="confirmPassword">{locale.userFormsFields.confirmPassword}</label>
						<input type='password' name="confirmPassword" required placeholder={locale.userFormsFields.confirmPassword} /*onChange={(e) => { setDescription(e.target.value); }}*/ />
					</section>

					<div className='form__info'>
						<p>
							<i><FaCircleInfo /></i>
							{locale.formDefaults.passwordRequirements}
						</p>
					</div>

					<DefaultButton title={locale.formDefaults.defaultButtonTitle} variant="filled" buttonType='submit' />
				</form>
			</main>
		</DefaultPageContainer>
	);
}

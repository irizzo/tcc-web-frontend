'use client'

import { useState } from 'react'

import { navigateTo } from '@/utils'
import { signUpService } from '@/services/userAccessServices'
import messagesDictionary from '@/resources/messages'
import * as locale from '@/resources/locale'

import Menu from '@/components/Menu'
import { DefaultPageContainer } from '@/components/PageContainer'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection, PasswordInput, FormInfo } from '@/components/Form'

async function handleSignUpSubmit(e, formData) {
	console.debug('[handleSignUpSubmit]')
	try {
		e.preventDefault()

		if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
			alert(messagesDictionary.EMPTY_FIELD)
			return
		}

		if (formData.password !== formData.confirmPassword) {
			alert(messagesDictionary.DIF_CONFIRM_PASS)
			return
		}

		// TODO: sanitize
		const cleanData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
			confirmPassword: formData.confirmPassword
		}

		const res = await signUpService(cleanData)
		// console.debug('[handleSignUpSubmit] res: ', res);

		if (!res.success) {
			// console.debug('!success | message: ', res.message);
			alert(res.message)
			return

		} else {
			navigateTo({ path: '/user/dashboard' })
		}

	} catch (error) {
		alert(error)
	}
}

export default function SignUp() {
	const [ firstName, setFirstName ] = useState('')
	const [ lastName, setLastName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')

	return (
		<DefaultPageContainer>
			<Menu />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw' }}>
				<FormContainer
					title={locale.pagesTitles.signUp}
					variantClasses='form__container--sign-up'
					submitCallback={(e) => handleSignUpSubmit(e, { firstName, lastName, email, password, confirmPassword })}
				>
					<FormSection labelFor='firstName' sectionTitle={locale.entitiesProperties.user.firstName}>
						<input type='text' name="firstName" required placeholder={locale.entitiesProperties.user.firstName} onChange={(e) => { setFirstName(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='lastName' sectionTitle={locale.entitiesProperties.user.lastName}>
						<input type='text' name="lastName" required placeholder={locale.entitiesProperties.user.lastName} onChange={(e) => { setLastName(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
						<input type='email' name="email" required placeholder={locale.entitiesProperties.user.email} onChange={(e) => { setEmail(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={locale.entitiesProperties.user.password}>
						<PasswordInput
							inputName='password'
							inputValue={password}
							onChangeFn={(e) => { setPassword(e.target.value) }}
						/>
					</FormSection>
					<FormSection labelFor='confirmPassword' sectionTitle={locale.entitiesProperties.user.confirmPassword}>
						<PasswordInput
							inputName='confirmPassword'
							inputValue={confirmPassword}
							onChangeFn={(e) => { setConfirmPassword(e.target.value) }}
						/>
					</FormSection>

					<FormInfo>{locale.formDefaults.passwordRequirements}</FormInfo>

					<DefaultButton
						title={locale.formDefaults.submitButtonTitle}
						variant='filled'
						buttonType='submit'
						isDisabled={firstName === '' || lastName === '' || email === ''|| password === '' || password !== confirmPassword}
					/>

				</FormContainer>
			</main>
		</DefaultPageContainer>
	)
}

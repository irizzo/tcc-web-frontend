'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import { Menu } from '@/components/Menu'
import { DefaultPageContainer } from '@/components/PageContainer'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection, PasswordInput, FormInfo } from '@/components/Form'

import { signUpService } from '@/services/userAccessServices'
import * as locale from '@/resources/locale'

const initialState = {
	message: ''
}

export default function SignUp() {
	const [state, formAction] = useFormState(signUpService, initialState)

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
					submitCallback={formAction}
				>
					{state.message && <FormInfo>{state.message}</FormInfo>}

					<FormSection labelFor='firstName' sectionTitle={locale.entitiesProperties.user.firstName + '*'}>
						<input type='text' name="firstName" required placeholder={locale.entitiesProperties.user.firstName} onChange={(e) => { setFirstName(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='lastName' sectionTitle={locale.entitiesProperties.user.lastName + '*'}>
						<input type='text' name="lastName" required placeholder={locale.entitiesProperties.user.lastName} onChange={(e) => { setLastName(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email + '*'}>
						<input type='email' name="email" required placeholder={locale.entitiesProperties.user.email} onChange={(e) => { setEmail(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={locale.entitiesProperties.user.password + '*'}>
						<PasswordInput
							inputName='password'
							inputValue={password}
							onChangeFn={(e) => { setPassword(e.target.value) }}
						/>
					</FormSection>
					<FormSection labelFor='confirmPassword' sectionTitle={locale.entitiesProperties.user.confirmPassword + '*'}>
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

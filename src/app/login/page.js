'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import { Menu } from '@/components/Menu'
import { DefaultPageContainer } from '@/components/PageContainer'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection, PasswordInput, FormInfo } from '@/components/Form'

import { loginService } from '@/services/userAccessServices'
import * as locale from '@/resources/locale'

const initialState = {
	message: ''
}

export default function Login() {
	const [ state, formAction ] = useFormState(loginService, initialState)

	const [ userEmail, setUserEmail ] = useState('')
	const [ userPassword, setUserPassword ] = useState('')

	return (
		<DefaultPageContainer>
			<Menu />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw' }}>
				<FormContainer
					title={locale.pagesTitles.login}
					variantClasses='form__container--login'
					submitCallback={formAction}
				>
					{state.message && <FormInfo>{state.message}</FormInfo>}
					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
						<input type='email' name='email' required placeholder={locale.entitiesProperties.user.email} onChange={(e) => { setUserEmail(e.target.value) }} />
					</FormSection>

					<FormSection labelFor='password' sectionTitle={locale.entitiesProperties.user.password}>
						<PasswordInput
							inputName='password'
							inputValue={userPassword}
							onChangeFn={(e) => { setUserPassword(e.target.value) }}
						/>
					</FormSection>

					<DefaultButton
						title={locale.formDefaults.submitButtonTitle}
						variant='filled'
						buttonType='submit'
						isDisabled={userEmail === '' || userPassword === ''}
					/>
				</FormContainer>
			</main>
		</DefaultPageContainer>
	)
}

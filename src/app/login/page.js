'use client'

import { useState } from 'react'

import { navigateTo } from '@/utils'
import { loginService } from '@/services/userAccessServices'
import messagesDictionary from '@/resources/messages'
import * as locale from '@/resources/locale'

import Menu from '@/components/Menu'
import { DefaultPageContainer } from '@/components/PageContainer'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection, PasswordInput } from '@/components/Form'

async function handleLoginSubmit(e, formData) {
	console.debug('[handleLoginSubmit]')
	try {
		e.preventDefault()

		if (!formData.email || !formData.password) {
			alert(messagesDictionary.EMPTY_FIELD)
			return
		}

		// TODO: sanitize
		const cleanData = {
			email: formData.email,
			password: formData.password
		}

		const res = await loginService(cleanData)
		console.debug('[handleLoginSubmit] res: ', res)

		if(res.success) {
			navigateTo({ path: '/user/dashboard' })
		} else {
			console.debug('!success | message: ', res.message)
			alert(res.message)
			return
		}

	} catch (error) {
		alert(error)
	}
}

export default function Login() {
	const [ userEmail, setUserEmail ] = useState('')
	const [ userPassword, setUserPassword ] = useState('')

	return (
		<DefaultPageContainer>
			<Menu />
			<main className='flex flex--center' style={{ flex: 1, width: '100vw'}}>
				<FormContainer
					title={locale.pagesTitles.login}
					variantClasses='form__container--login'
					submitCallback={(e) => handleLoginSubmit(e, { email: userEmail, password: userPassword })}
				>
					<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
						<input type='email' name="email" required placeholder={locale.entitiesProperties.user.email} onChange={(e) => { setUserEmail(e.target.value) }} />
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

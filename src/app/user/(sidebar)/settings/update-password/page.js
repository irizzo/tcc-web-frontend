'use client'

import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '@/hooks'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'
import { navigateTo } from '@/utils'
import { updateUserService } from '@/services/userServices'
import { treatUpdatedUserData } from '@/utils/dataTreatments.utils'

import Loading from '@/components/Loading'
import { FormContainer, FormSection, PasswordInput, FormInfo } from '@/components/Form'
import { DefaultButton } from '@/components/Buttons'

export default function SettingsPage() {
	const { userInfo } = useContext(UserInfoContext)

	const [ newPassword, setNewPassword ] = useState({ password: '', confirmPassword: '' })
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		if (userInfo.data === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}
	}, [])


	async function handleUpdateUserPassword(e) {
		try {
			setIsLoading(true)

			const updatedData = treatUpdatedUserData(userInfo, { password: newPassword.password })

			const res = await updateUserService(updatedData)

			if (!res.success) {
				throw new Error(res.message)
			}

			setIsLoading(false)
			navigateTo({ path: routesMap.settings.base })
			return
		} catch (error) {
			console.debug('error: ', error)
			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

	return (
		<div className='flex flex--row' style={{ height: '60%', width: '90%' }}>
			<FormContainer
				title={locale.pagesTitles.settings.updatePassword}
				submitCallback={(e) => handleUpdateUserPassword(e)}
			>
				<FormSection labelFor='password' sectionTitle={'Nova ' + locale.entitiesProperties.user.password}>
					<PasswordInput
						inputName='password'
						inputValue={newPassword.password}
						onChangeFn={(e) => { setNewPassword({ ...newPassword, password: e.target.value }) }}
					/>
				</FormSection>
				<FormSection labelFor='confirmPassword' sectionTitle={locale.entitiesProperties.user.confirmPassword}>
					<PasswordInput
						inputName='confirmPassword'
						inputValue={newPassword.confirmPassword}
						onChangeFn={(e) => { setNewPassword({ ...newPassword, confirmPassword: e.target.value }) }}
					/>
				</FormSection>

				<FormInfo>{locale.formDefaults.passwordRequirements}</FormInfo>

				<div className='flex flex--row flex--center'>
					<DefaultButton
						title={locale.actionsTitles.cancel}
						variant='outlined'
						buttonType='button'
						onClickFunction={() => { navigateTo({ path: routesMap.settings.base }) }}
					/>

					<DefaultButton
						title={locale.actionsTitles.save}
						variant='filled'
						buttonType='submit'
						isDisabled={newPassword.password === '' || newPassword.password !== newPassword.confirmPassword }
					/>
				</div>
			</FormContainer>
		</div>
	)
}
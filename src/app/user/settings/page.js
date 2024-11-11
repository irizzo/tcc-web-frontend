'use client'

import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '@/hooks'

import * as locale from '@/resources/locale'
import routesMap from '@/resources/routesMap'
import { navigateTo } from '@/utils'

import Loading from '@/components/Loading'
import { FormContainer, FormSection } from '@/components/Form'
import { DefaultButton, DangerButton } from '@/components/Buttons'

export default function SettingsPage() {
	const { userInfo } = useContext(UserInfoContext)

	const [updatedUserInfo, setUpdatedUserInfo] = useState({ firstName: '', lastName: '', email: '' })
	const [editing, setEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (userInfo.data === null) {
			setIsLoading(true)

			setTimeout(() => {
				console.log('timeout')
				setIsLoading(false)
			}, 2000)
		}

		setUpdatedUserInfo({
			firstName: userInfo.data.firstName,
			lastName: userInfo.data.lastName,
			email: userInfo.data.email
		})
	}, [])

	function handleEditing() {
		if (editing) {
			setUpdatedUserInfo({
				firstName: userInfo.data.firstName,
				lastName: userInfo.data.lastName,
				email: userInfo.data.email
			})
		}

		setEditing(!editing)
	}

	async function handleUpdateUserInfo(e) {
		e.preventDefault()

		console.log('updatedUserInfo: ', updatedUserInfo)

		try {
			setIsLoading(true)

			setEditing(false)
		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	}

	async function handleDeleteUser() {
		try {
			setIsLoading(true)

			setEditing(false)
		} catch (error) {
			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

	// visualizar informações da conta
	// deletar conta
	return (

		<FormContainer
			title={locale.pagesTitles.settings.base}
			submitCallback={(e) => handleUpdateUserInfo(e)}
		>
			<FormSection labelFor='firstName' sectionTitle={locale.entitiesProperties.user.firstName}>
				<input name='firstName' value={updatedUserInfo.firstName} readOnly={!editing} type='text' onChange={(e) => { setUpdatedUserInfo({ ...updatedUserInfo, firstName: e.target.value }) }} />
			</FormSection>
			<FormSection labelFor='lastName' sectionTitle={locale.entitiesProperties.user.lastName}>
				<input name='lastName' value={updatedUserInfo.lastName} readOnly={!editing} type='text' onChange={(e) => { setUpdatedUserInfo({ ...updatedUserInfo, lastName: e.target.value }) }} />
			</FormSection>
			<FormSection labelFor='email' sectionTitle={locale.entitiesProperties.user.email}>
				<input name='email' value={updatedUserInfo.email} readOnly={!editing} type='email' onChange={(e) => { setUpdatedUserInfo({ ...updatedUserInfo, email: e.target.value }) }} />
			</FormSection>

			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.actionsTitles.cancel : locale.actionsTitles.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={() => { handleEditing() }}
				/>

				<DefaultButton
					title={locale.actionsTitles.save}
					variant='filled'
					buttonType='submit'
					isDisabled={!editing}
				/>

				<DangerButton
					title={locale.actionsTitles.deleteUser}
					onClickFunction={() => { handleDeleteUser() }}
				/>
			</div>

			<DefaultButton
				title={'Alterar Senha'}
				variant='outlined'
				buttonType='button'
				onClickFunction={() => { navigateTo({ path: routesMap.settings.updatePassword }) }}
			/>
		</FormContainer>
	)
}
'use client'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '@/hooks'

import * as locale from '@/resources/locale'
import { routesMap } from '@/resources/routesMap'
import { clearTokenCookie, navigateTo } from '@/utils'
import { treatUpdatedUserData } from '@/utils/dataTreatments.utils'
import { deleteUserService, getUserInfo, updateUserService } from '@/services/userServices'

import Loading from '@/components/Loading'
import { FormContainer, FormSection, FormInfo } from '@/components/Form'
import { DefaultButton, DangerButton } from '@/components/Buttons'

export default function SettingsPage() {
	const router = useRouter()
	const { userInfo, setUserInfo } = useContext(UserInfoContext)

	const [ updatedUserInfo, setUpdatedUserInfo ] = useState({ firstName: '', lastName: '', email: '' })
	const [ editing, setEditing ] = useState(false)
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		if (userInfo.data === null) {
			setIsLoading(true)

			setTimeout(() => {
				console.debug('timeout')
				setIsLoading(false)
			}, 2000)
		}

		setUpdatedUserInfo({
			firstName: userInfo.data.firstName,
			lastName: userInfo.data.lastName,
			email: userInfo.data.email
		})
		setIsLoading(false)

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

		console.debug('updatedUserInfo: ', updatedUserInfo)

		try {
			setIsLoading(true)
			setEditing(false)

			const updatedData = treatUpdatedUserData(userInfo, updatedUserInfo)
			const res = await updateUserService(updatedData)

			if (!res.success) {
				throw new Error(res.message)
			}

			const userInfoRes = await getUserInfo()
			setUserInfo({ data: { email: userInfoRes.result.email, firstName: userInfoRes.result.firstName, lastName: userInfoRes.result.lastName }, updatedAt: new Date() })
			setIsLoading(false)

		} catch (error) {
			console.debug('error: ', error)
			setIsLoading(false)
			alert(error)
		}
	}

	async function handleDeleteUser(e) {
		try {
			e.preventDefault()
			setIsLoading(true)
			setEditing(false)

			const res = await deleteUserService()

			console.debug('res: ', res)

			if (!res.success) {
				throw new Error(res.message)
			}

			await clearTokenCookie()
			setIsLoading(false)
			router.push(routesMap.home)

		} catch (error) {
			console.debug('error: ', error)

			setIsLoading(false)
			alert(error)
		}
	}

	if (isLoading) return <Loading />

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

			<FormInfo>Preencha apenas o que deseja alterar</FormInfo>

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
					onClickFunction={(e) => { handleDeleteUser(e) }}
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
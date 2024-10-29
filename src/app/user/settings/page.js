'use client'

import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '@/hooks'

import * as locale from '@/resources/locale'

import Loading from '@/components/Loading'


export default function SettingsPage() {
	const { userInfo } = useContext(UserInfoContext)
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		if (userInfo.data === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}
	}, [])

	if (isLoading) return <Loading />

	// visualizar informações da conta
	// deletar conta
	return (
		<>
			{console.log('userInfo: ', userInfo)}
			<h1>Configs</h1>
		</>
	)
}
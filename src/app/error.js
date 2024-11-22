'use client'

import { GeneralError } from '@/components/Messages'
import { useEffect } from 'react'
import { navigateTo } from '@/utils'
import { DefaultButton } from '@/components/Buttons'
import { routesMap } from '@/resources/routesMap'
import messagesDictionary from '@/resources/messages'

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error('error boundry: ', error)
	}, [ error ])
	setTimeout(() => { navigateTo({ path: routesMap.home }) }, 5000)
	return (
		<div className='flex' style={{ width: '70vw', height: '70vh', borderRadius: '10px', backgroundColor: '#00000020' }}>
			<GeneralError errorContent={`${messagesDictionary.DEFAULT_FAIL}... Redirecionando para o início em 5s`}/>
			<DefaultButton
				variant='filled'
				title='Tentar Novamente'
				onClick={() => reset()}
			/>
		</div>
	)
}
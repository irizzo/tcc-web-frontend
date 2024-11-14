'use client'

import { GeneralError } from '@/components/Messages'
import { useEffect } from 'react'
import { navigateTo } from '@/utils'
import { DefaultButton } from '@/components/Buttons'

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className='flex' style={{ width: '70vw', height: '70vh', borderRadius: '10px', backgroundColor: '#00000020' }}>
			<GeneralError errorContent={'Algo deu errado... Tente novamente mais tarde.'} />
			<DefaultButton
				variant='filled'
				title={'Início'}
				onClick={() => navigateTo({ path: '/' })}
			/>
		</div>
	)
}
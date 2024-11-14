'use client'

import { GeneralError } from '@/components/Messages'
import { useEffect } from 'react'
import { navigateTo } from '@/utils'

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [ error ])

	return (
		<div className='flex' style={{ width: '70vw', height: '70vh', borderRadius: '10px', backgroundColor: '#00000020'}}>
			<GeneralError errorContent={JSON.stringify(error)} />
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset() && navigateTo({ path: '/' })
				}
			>
				Try again
			</button>
		</div>
	)
}
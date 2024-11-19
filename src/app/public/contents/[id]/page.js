'use client'

import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'
import contentsList from '@/resources/contents'

import './content.scss'


export default function ContentPage({ params, searchParams }) {
	console.debug('contentsList[searchParams.id]: ', contentsList[searchParams.id])
	const router = useRouter()
	return (
		<>
			<div className='flex flex--row content__title'>
				<FaArrowLeft className='icon' onClick={() => { router.back() }} />
				<h1>{searchParams.title}</h1>
			</div>
			<section className='flex content__inner-content'>
				{contentsList[searchParams.id].innerContent()}
			</section>
		</>
	)
}
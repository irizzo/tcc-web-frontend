'use client'

import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'

import './content.scss'

export default function ContentPage ({ params, searchParams }) {
	const router = useRouter()
	return (
		<main className='flex flex--center content__container'>
			<div className='flex flex--row content__title'>
				<FaArrowLeft className='icon' onClick={() => { router.back()}} />
				<h1>{searchParams.title}</h1>
			</div>
			<p>{searchParams.content}</p>
		</main>
	)
}
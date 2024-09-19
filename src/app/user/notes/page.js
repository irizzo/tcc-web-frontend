'use client'

import { navigateTo } from '@/utils'
import { getAllCategoriesService } from '@/services/categoryServices'
import { createNoteService } from '@/services/notesService'

import * as locale from '@/resources/locale'

import { useEffect, useState } from 'react'

import Loading from '@/components/Loading'
import { DefaultButton } from '@/components/Buttons'
import { FormContainer, FormSection } from '@/components/Form'
import routesMap from '@/resources/routesMap'

export default function NewNote() {

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {

		setIsLoading(false)
	}, [])

	if (isLoading) return <Loading />

	return (
		<h1>Notes</h1>
	)
}
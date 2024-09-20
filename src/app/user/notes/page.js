'use client'

import { useEffect, useState } from 'react'
import { cache } from 'react'

import { getAllNotesService } from '@/services/notesService'
import { getAllCategoriesService } from '@/services/categoryServices'
import * as locale from '@/resources/locale'

import Loading from '@/components/Loading'
import { GeneralInfo } from '@/components/Messages'
import { NoteCard } from '@/components/Card'

export default function NotesPage() {
	const [ categories, setCategories ] = useState({})
	const [ notesList, setNoteList ] = useState([])
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		const loadCategories = cache(async () => {
			const res = await getAllCategoriesService()
			if (!res.success) {
				throw new Error(res.message)
			}

			const categoriesList = [...res.result]
			let aux = {}

			categoriesList.forEach((category) => {
				aux[category.code] = category.title
			})

			setCategories(aux)
		})

		async function loadNotes() {
			setIsLoading(true)
			const res = await getAllNotesService()

			if (!res.success) {
				throw new Error(res.message)
			}

			setNoteList([ ...res.result ])
			setIsLoading(false)
		}

		try {
			loadCategories()
			loadNotes()
		} catch (error) {
			console.log('error useEffect: ', error)
			alert(error)
		}

	}, [])

	if (isLoading) return <Loading />

	return (
		<>
		<h1>{locale.pagesTitles.notes.all}</h1>
			<div className='flex flex--row  flex--wrap'>
				{
					notesList.length > 0 ?
						notesList.map((note) => <NoteCard key={note.id} categoryTitle={categories[note.categoryCode]} noteInfo={note} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.notes} />
				}
			</div>
		</>
	)
}

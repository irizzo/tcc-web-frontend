'use client'

import { useState, useEffect, useContext } from 'react'
import { UserNotesContext, UserCategoriesContext } from '@/hooks'

import { getAllNotesService } from '@/services/notesService'

import * as locale from '@/resources/locale'

import Loading from '@/components/Loading'
import { GeneralInfo } from '@/components/Messages'
import { NoteCard } from '@/components/Card'

export default function NotesPage() {
	const { userCategories, setUserCategories } = useContext(UserCategoriesContext)
	const { userNotes, setUserNotes } = useContext(UserNotesContext)

	const [ categories, setCategories ] = useState({})
	const [ notesList, setNoteList ] = useState([])
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		if (userCategories.categoriesList === null || userNotes.notesList === null) {
			setIsLoading(true)

			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}

		let aux = {}
		userCategories.categoriesList.forEach((category) => {
			aux[category.code] = category.title
		})
		setCategories(aux)

	}, [ userCategories.categoriesList, userNotes.notesList ])

	if (isLoading) return <Loading />

	return (
		<>
			<div className='flex flex--row  flex--wrap'>
				{
					userNotes.notesList.length > 0 ?
						userNotes.notesList.map((note) => <NoteCard key={note.id} categoryTitle={categories[note.categoryCode]} noteInfo={note} />)
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.notes} />
				}
			</div>
		</>
	)
}

'use client'

import * as locale from '@/resources/locale'

import { useEffect, useState, useContext } from 'react'
import { UserCategoriesContext } from '@/hooks'

import Loading from '@/components/Loading'
import { GeneralInfo } from '@/components/Messages'
import { CategoryCard } from '@/components/Card'

import './categoriesPage.scss'

export default function ContentsFeed() {
	const { userCategories } = useContext(UserCategoriesContext)
	// const [ isLoading, setIsLoading ] = useState(false)

	// useEffect(() => {
	// 	userCategories.categoriesList ?? (setIsLoading(true) && setTimeout(() => { setIsLoading(false)}, 2000) )

	// }, [ userCategories.categoriesList ])

	// if (isLoading) return <Loading />

	return (
		<main className='flex flex--center categories__main'>
			<h1 className='categories__page-title'>{locale.pagesTitles.categories.all}</h1>
			<div className='categories__feed'>
				{
					userCategories.categoriesList.length > 0 ?
						userCategories.categoriesList.map((category) => {
							return <CategoryCard key={category.id} categoryInfo={category} />
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.categories} />
				}
			</div>
		</main>
	)
}
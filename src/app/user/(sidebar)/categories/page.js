'use client'

import * as locale from '@/resources/locale'

import { useContext } from 'react'
import { UserCategoriesContext } from '@/hooks'

import { GeneralInfo } from '@/components/Messages'
import { CategoryCard } from '@/components/Card'

import './categoriesPage.scss'

export default function ContentsFeed() {
	const { userCategories } = useContext(UserCategoriesContext)

	return (
		<main className='flex flex--center categories__main'>
			<h1 className='categories__page-title'>{locale.pagesTitles.categories.base}</h1>
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
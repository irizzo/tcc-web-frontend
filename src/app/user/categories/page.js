'use client';

import * as locale from '@/resources/locale';
import { getAllCategoriesService } from '@/services/categoryServices';

import { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import { GeneralInfo } from '@/components/Messages';
import { CategoryCard } from '@/components/Card';

import './categoriesPage.scss';

export default function ContentsFeed() {
	const [ categoriesList, setCategoriesList ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		async function loadCategories() {
			setIsLoading(true);
			const res = await getAllCategoriesService();

			if (!res.success) {
				throw new Error(res.message);
			}

			setCategoriesList([ ...res.result ]);
			setIsLoading(false);
		}

		loadCategories();
	}, []);

	if (isLoading) return <Loading />;
	return (
		<main className='flex flex--center categories__main'>
			<h1 className='categories__page-title'>{locale.pagesTitles.categories.all}</h1>
			<div className='categories__feed'>
				{
					categoriesList.length > 0 ?
						categoriesList.map((category) => {
							return <CategoryCard key={category.id} categoryInfo={category} />;
						})
						:
						<GeneralInfo infoContent={locale.notFoundDefaults.categories} />
				}
			</div>
		</main>
	);
}
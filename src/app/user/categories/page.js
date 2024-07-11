'use client';

import './categoriesPage.scss';
import * as locale from '@/resources/locale';

import { GeneralInfo } from '@/components/Messages';
import { CategoryCard } from '@/components/Card';

const categoriesList = [];

export default function ContentsFeed() {
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
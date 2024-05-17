import httpClient from './http/client';

import resDictionary from '@/resources/resDictionary';

// create a category
export async function createCategory(categoryData) {
	console.log('[service createCategory]');

	const createCategoryResponse = await httpClient.post({
		path: '/create-category',
		payload: categoryData
	});

	return {
		status: createCategoryResponse.success,
		message: resDictionary?.[createCategoryResponse.code]
	};
}

// get categories list (all categories)
export async function getCategoriesList() {
	console.log('[service getCategoriesList]');

	return { // mock data
		status: 200,
		result: [{
				title: "Category Title 1",
				description: "Category description"
			},
			{
				title: "Category Title2",
				description: "Category description"
			},
			{
				title: "Category Title3",
				description: "Category description"
			}
		],
		message: 'ok'
	};

	// const getCategoriesListResponse = await httpClient.get({
	// 	path: '/categories'
	// });

	// return {
	// 	status: getCategoriesListResponse.success,
	// 	result: getCategoriesListResponse.result,
	// 	message: resDictionary?.[getCategoriesListResponse.code]
	// };
}

// alter category

// delete category
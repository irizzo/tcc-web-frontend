import httpClient from './http/client';

import messagesDictionary from '@/resources/messages';

const basePath = '/categories';

/* Category Services
	* create category
	* alter category info
	* delete category
	* list all categories
	* list category details
*/

// create a category
export async function createCategory(categoryData, userToken) {
	console.log('[service createCategory]');

	const newHttpClient = httpClient({ headers: { 'Authorization': userToken } });

	const createCategoryResponse = await newHttpClient.post({
		path: basePath,
		payload: categoryData
	});

	return {
		status: createCategoryResponse.success,
		message: messagesDictionary?.[createCategoryResponse.code]
	};
}

// get categories list (all categories)
export async function getCategoriesList(userToken) {
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
	// 	path: basePath
	// });

	// return {
	// 	status: getCategoriesListResponse.success,
	// 	result: getCategoriesListResponse.result,
	// 	message: messagesDictionary?.[getCategoriesListResponse.code]
	// };
}

// alter category

// delete category
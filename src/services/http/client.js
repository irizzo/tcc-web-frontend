let baseURL = "";

if (process.env.CURRENT_ENV === 'production') {
	baseURL = process.env.PRODUCTION_BASE_URL
} else baseURL = process.env.DEVELOPMENT_BASE_URL;

const httpClient = ({ headers = null }) => {
	const defaultHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
		...headers
	});

	return {
		get: async ({ path }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'GET',
				headers: defaultHeaders
			});

			return res.json();
		},

		post: async ({ path, payload }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: defaultHeaders
			});

			return res.json();
		},

		put: async ({ path, payload }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
				headers: defaultHeaders
			});

			return res.json();
		},
		
		delete: async ({ path }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'DELETE',
				headers: defaultHeaders
			});

			return res.json();
		}
	};
};

export default httpClient;
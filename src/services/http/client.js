const _BASEURL = process.env.currentEnv === 'production' ? process.env.prodBaseURL : process.env.devBaseURL;

const httpClient = ({ baseURL }) => {

	const defaultHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8'
	});

	return {
		get: async({ path, customHeaders = null }) => {
			console.log('[httpClient] [get]');

			const res = await fetch(`${baseURL}${path}`, {
				method: 'GET',
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		post: async ({ path, payload, customHeaders = null }) => {
			console.log('[httpClient] [post]');

			const res = await fetch(`${baseURL}${path}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		put: async ({ path, payload, customHeaders = null }) => {
			console.log('[httpClient] [put]');

			const res = await fetch(`${baseURL}${path}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		delete: async ({ path, customHeaders = null }) => {
			console.log('[httpClient] [delete]');
			const res = await fetch(`${baseURL}${path}`, {
				method: 'DELETE',
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		}
	};
};

export default httpClient({ baseURL: _BASEURL });
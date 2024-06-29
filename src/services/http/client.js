const _BASEURL = process.env.currentEnv === 'production' ? process.env.prodBaseURL : process.env.devBaseURL;

// const _BASEURL = 'http://localhost:8080';

const httpClient = ({ baseURL }) => {
	const defaultHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8'
	});

	return {
		get: async({ path, customHeaders = null }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'GET',
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		post: async ({ path, payload, customHeaders = null }) => {
			console.log('[httpClient] [post]');
			console.log(`[httpClient] [post] headers = ${JSON.stringify(customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders)}`);

			const res = await fetch(`${baseURL}${path}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		put: async ({ path, payload, customHeaders = null }) => {
			console.log('[httpClient] [put]');
			console.log(`[httpClient] [put] headers = ${JSON.stringify(customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders)}`);

			const res = await fetch(`${baseURL}${path}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		delete: async ({ path, customHeaders = null }) => {
			console.log('[httpClient] [delete]');

			console.log(`[httpClient] [delete] headers = ${JSON.stringify(customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders)}`);

			const res = await fetch(`${baseURL}${path}`, {
				method: 'DELETE',
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		}
	};
};

export default httpClient({ baseURL: _BASEURL });
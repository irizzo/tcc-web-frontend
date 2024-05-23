const _BASEURL = process.env.currentEnv === 'production' ? process.env.prodBaseURL : process.env.devBaseURL;

// const _BASEURL = 'http://localhost:8080';

const httpClient = ({ baseURL }) => {
	const defaultHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8'
	});

	return {
		// TODO: implement custom headers in all methods
		get: async({ path, customHeaders = null }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'GET',
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
			});

			return res.json();
		},

		post: async ({ path, payload, customHeaders = null }) => {
			console.log('[httpClient] [post]');
			console.log('[httpClient] [post] test');
			console.log(`body = ${JSON.stringify(payload)}`);
			console.log(`headers = ${customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders}`);

			const res = await fetch(`${baseURL}${path}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: customHeaders ? { ...defaultHeaders, ...customHeaders } : defaultHeaders
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

console.log(`[/http/client] _BASEURL = ${_BASEURL}`);

export default httpClient({ baseURL: _BASEURL });
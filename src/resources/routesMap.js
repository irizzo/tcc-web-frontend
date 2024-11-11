const routesMap = {
	home: '/',

	about: '/about',
	contents: '/contents',

	categories: {
		base: '/user/categories',
		new: '/user/categories/new'
	},

	dashboard: '/user/dashboard',

	events: {
		base: '/user/events',
		new: '/user/events/new'
	},

	notes: {
		base: '/user/notes',
		new: '/user/notes/new'
	},

	settings: {
		base: '/user/settings',
		updatePassword: '/user/settings/update-password'
	},

	tasks: {
		base: '/user/tasks',
		new: '/user/tasks/new'
	},

	login: '/login',
	signUp: '/sign-up',

	test: '/test'
};

export default routesMap;
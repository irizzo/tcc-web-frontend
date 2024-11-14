exports.routesBasePath = {
	root: '/',
	public: '/public',
	user: '/user'
}

exports.routesMap = {
	home: '/',
	login: '/login',
	signUp: '/sign-up',
	
	about: {
		base: '/public/about'
	},

	contents: {
		base: '/public/contents',
		pomo: '/public/contents/pomo'
	},

	categories: {
		base: '/user/categories',
		new: '/user/categories/new'
	},

	dashboard: {
		base: '/user/dashboard'
	},

	events: {
		base: '/user/events',
		new: '/user/events/new'
	},

	focus: {
		base: '/user/focus'
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
	}
}
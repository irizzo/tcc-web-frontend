/* eslint-disable import/no-anonymous-default-export */
export default {
	home: '/',

	about: '/public/about',
	contents: {
		base: '/public/contents',
		pomo: '/public/contents/' // TODO: colocar link pro Pomo
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
		base: '/focus'
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
}

/*
exports.routesBasePath = {
	root: '/',
	public: '/public',
	user: '/user'
}

exports.routesMap = {
	root: {
		home: '/',
		login: '/login',
		signUp: '/sign-up'
	},

	public: {
		about: {
			base: '/public/about'
		},
		contents: {
			base: '/public/contents',
			pomo: '/public/contents/pomo'
		}
	},

	user: {
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
}
	*/
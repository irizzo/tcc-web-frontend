export const formDefaults = {
	defaultOption: 'Por favor escolha uma opção',
	submitButtonTitle: 'Enviar',
	passwordRequirements: 'A senha deve seguir as seguintes regras: conter entre 8 e 20 caracteres, pelo menos 1 letra maiúscula pelo menos 1 letra minúscula, pelo menos 1 dígito [0-9], pelo menos 1 caractere especial; Não conter espaços',
	dueDate: 'Nenhum Prazo Selecionado',
	defaultDate: 'Nenhuma Data Selecionada',
	priority: 'Nenhuma Prioridade Selecionada',
	category: 'Nenhuma Categoria Selecionada',
	staus: 'Nenhum Progresso Selecionado'
}

export const statusInfo = {
	NOT_STARTED: {
		title: 'A fazer',
		value: 'NOT_STARTED'
	},
	IN_PROGRESS: {
		title: 'Em andamento',
		value: 'IN_PROGRESS'
	},
	DONE: {
		title: 'Finalizado',
		value: 'DONE'
	}
}

export const prioritiesInfo = {
	QUADRANT_ONE: {
		title: 'Urgente e Difícil',
		value: 'QUADRANT_ONE',
		priorityLevel: 1
	},

	QUADRANT_TWO: {
		title: 'Não Urgente e Difícil',
		value: 'QUADRANT_TWO',
		priorityLevel: 2
	},

	QUADRANT_THREE: {
		title: 'Urgente e Fácil',
		value: 'QUADRANT_THREE',
		priorityLevel: 3
	},

	QUADRANT_FOUR: {
		title: 'Não Urgente e Fácil',
		value: 'QUADRANT_FOUR',
		priorityLevel: 4
	}
}

export const entitiesProperties = {
	general: {
		dueDate: 'Prazo',
		category: 'Categoria',
		schedueledDate: 'Agendar Para',
		title: 'Título',
		description: 'Descrição'
	},

	events: {
		startDate: 'Início',
		endDate: 'Fim'
	},

	tasks: {
		status: 'Progresso',
		priority: 'Prioridade'
	},

	notes: {
		innerContent: 'Anotação'
	},

	user: {
		firstName: 'Primeiro Nome',
		lastName: 'Sobrenome',
		email: 'Email',
		password: 'Senha',
		confirmPassword: 'Confirme a Senha'
	}
}

export const weekdaysMap = {
	0: 'Dom',
	1: 'Seg',
	2: 'Ter',
	3: 'Qua',
	4: 'Qui',
	5: 'Sex',
	6: 'Sáb'
}

export const pagesTitles = {
	home: 'Início',

	contents: 'Conteúdos',

	categories: {
		all: 'Categorias',
		new: 'Nova Categoria',
		edit: 'Editar Categoria',
		view: 'Visualizar Categoria'
	},

	dashboard: 'Dashboard',

	events: {
		new: 'Novo Evento',
		all: 'Eventos',
		view: 'Visualizar Evento',
		edit: 'Editar Evento'
	},

	notes: {
		all: 'Anotações',
		new: 'Nova Anotação',
		view: 'Visualizar Anotação',
		edit: 'Editar Anotação'
	},

	settings: 'Configurações',

	tasks: {
		new: 'Nova Tarefa',
		all: 'Tarefas',
		edit: 'Editar Tarefa',
		view: 'Visualizar Tarefa'
	},

	sideBar: {
		pages: 'Páginas',
		actions: 'Ações',
		options: 'Opções'
	},

	user: {
		login: 'Login',
		signUp: 'Cadastro'
	},

	about: 'Sobre',

	loading: 'Carregando'
}

export const pagesKeys = {
	home: 'HOME',

	contents: 'CONTENTS',

	categories: {
		all: 'ALL_CATEGORIES',
		new: 'NEW_CATEGORY',
		edit: 'EDIT_CATEGORY',
		view: 'VIEW_CATEGORY'
	},

	dashboard: 'DASHBOARD',

	events: {
		all: 'ALL_EVENTS',
		new: 'NEW_EVENTS',
		edit: 'EDIT_EVENTS',
		view: 'VIEW_EVENTS'
	},

	notes: {
		all: 'ALL_NOTES',
		new: 'NEW_NOTES',
		edit: 'EDIT_NOTES',
		view: 'VIEW_NOTES'
	},

	settings: 'SETTINGS',

	tasks: {
		all: 'ALL_TASKS',
		new: 'NEW_TASKS',
		edit: 'EDIT_TASKS',
		view: 'VIEW_TASKS'
	},

	user: {
		login: 'LOGIN',
		signUp: 'SIGN_UP'
	},

	about: 'ABOUT',

	loading: 'LOADING'
}

export const actionsTitles = {
	save: 'Salvar',
	delete: 'Excluir',
	edit: 'Editar',
	cancel: 'Cancelar',
	start: 'Começar',
	login: 'Login',
	logout: 'Logout'
}

export const appInfo = {
	name: 'Daily Life',
	description: 'Ferramenta de organização pessoal focada em estudantes do ensino superior para melhorar sua produtividade.'
}

export const notFoundDefaults = {
	general: 'Nenhum dado disponível',
	categories: 'Nenhuma categoria encontrada',
	contents: 'Nenhum conteúdo disponível',
	events: 'Nenhum evento encontrado',
	notes: 'Nenhuma anotação encontrada',
	tasks: 'Nenhuma tarefa encontrada',
	today: 'Nada para hoje',
	thisWeek: 'Nada nesta semana'
}

export const groupDataByTitle = {
	all: 'Todos',
	dueSoon: 'Prazo Próximo',
	pastDue: 'Prazo esgotado',
	today: 'Hoje',
	thisWeek: ' Nesta Semana'
}

export const messagesTitles = {
	infoTitle: 'Informação',
	warnTitle: 'Aviso',
	errorTitle: 'Algo Deu Errado'
}
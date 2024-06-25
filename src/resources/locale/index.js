export const formDefaults = {
	defaultOption: 'Por favor escolha uma opção',
	submitButtonTitle: 'Enviar',
	passwordRequirements: 'A senha deve seguir as seguintes regras: conter entre 8 e 20 caracteres, pelo menos 1 letra maiúscula pelo menos 1 letra minúscula, pelo menos 1 dígito [0-9], pelo menos 1 caractere especial; Não conter espaços'
};

// userInfoTitles -> entitiesProperties.user ...
export const entitiesProperties = {
	general: {
		dueDate: 'Prazo',
		priority: 'Prioridade',
		quadrantOne: 'Urgente e Difícil',
		quadrantTwo: 'Não Urgente e Difícil',
		quadrantThree: 'Urgente e Fácil',
		quadrantFour: 'Não Urgente e Fácil',
		category: 'Categoria',
		toDoDate: 'Quando fazer?'
	},

	generalDefaults: {
		dueDate: 'Nenhum Prazo Selecionado',
		priority: 'Nenhuma Prioridade Selecionada',
		category: 'Nenhuma Categoria Selecionada',
		toDoDate: 'Nenhuma Data Selecionada'
	},

	categories: {
		title: 'Título da Categoria',
		description: 'Descrição da Categoria'
	},

	contents: {
		title: 'Título da Conteúdo',
		content: 'Conteúdo'
	},

	events: {
		title: 'Título do Evento',
		description: 'Descrição do Evento'
	},

	habits: {
		title: 'Título Do Hábito',
		description: 'Descrição Do Hábito',
		high: 'Alto',
		medium: 'Médio',
		low: 'Baixo'
	},

	tasks: {
		title: 'Título da Tarefa',
		description: 'Descrição da Tarefa'
	},

	user: {
		firstName: 'Primeiro Nome',
		lastName: 'Sobrenome',
		email: 'Email',
		password: 'Senha',
		confirmPassword: 'Confirme a Senha'
	}
};

// weekday -> weekdaysMap
export const weekdaysMap = {
	0: 'Dom',
	1: 'Seg',
	2: 'Ter',
	3: 'Qua',
	4: 'Qui',
	5: 'Sex',
	6: 'Sáb'
};

export const pageTitles = {
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
		view: 'Visualizar Evento'

	},

	habits: {
		all: 'Hábitos',
		new: 'Novo Hábito',
		view: 'Visualizar Hábito'

	},

	settings: 'Configurações',

	tasks: {
		new: 'Nova Tarefa',
		all: 'Tarefas',
		edit: 'Editar Tarefa',
		view: 'Visualizar Tarefa'

	},

	user: {
		login: 'Login',
		signUp: 'Cadastro'
	},

	about: 'Sobre',

	loading: 'Carregando'
};

export const actionsTitles = {
	save: 'Salvar',
	edit: 'Editar',
	cancel: 'Cancelar',
	start: 'Começar',
	login: 'Login'
};

export const appInfo = {
	name: 'Daily Life',
	description: 'Descrição do Produto'
};

export const notFoundDefaults = {
	general: 'Nenhum dado disponível',
	categories: 'Nenhuma categoria encontrada',
	contents: 'Nenhum conteúdo disponível',
	events: 'Nenhum evento encontrado',
	habits: 'Nenhum hábito encontrado',
	tasks: 'Nenhuma tarefa encontrada'
};

export const groupDataByTitle = {
	all: 'Todos',
	dueSoon: 'Prazo Próximo',
	pastDue: 'Prazo esgotado'
}


const messagesDictionary = {
	INTERNAL_ERROR: 'Internal Error. Please try Again Later',
	INVALID_TITLE: 'Please enter a valid title.',
	INVALID_DUE_DATE: 'Please enter a valid due date',
	CREATED_TODO: 'Successfully created todo',
	CREATE_TODO_FAIL: 'An error has ocurred. Todo hasnt been created.',
	CREATED_CATEGORY: 'Successfully created category',
	CREATE_CATEGORY_FAIL: 'An error has ocurred. Category hasnt been created.',

	CREATED: 'Criado com sucesso.',
	UPDATED: 'Atualizado com sucesso.',
	DELETED: 'Deletado com sucesso.',
	FOUND: 'Resultado encontrado',

	DEFAULT_FAIL: 'Algo inesperado aconteceu. Tente novamente mais tarde',
	DEFAULT_SUCCESS: 'Sucesso.',

	EMPTY_FIELD: 'Por favor, preencha todos os campos obrigatórios.',
	DIF_CONFIRM_PASS: 'Senha e Confirmação da Senha devem ser iguais.', // TODO: change to better name

	EMAIL_NOT_UNIQUE: 'Email já cadastrado',
	INVALID_PASSWORD: 'Senha inválida',
	INVALID_EMAIL: 'Email inválido',

	INVALID_START_DATE: 'Data de início inválida.',
	INVALID_END_DATE: 'Data de fim inválida. Deve ser maior que a data de início.',
	INVALID_DUE_DATE: 'Data de prazo inválido.',
	INVALID_TODO_DATE: 'Data planejada inválida.',

};

module.exports = messagesDictionary;
import api from './index';

async function buscarCep(cep, formatoResposta = 'json') {
	if (!cep.trim()) {
		throw new Error("CEP não fornecido - favor digitar um valor válido.")
	}

	try {
		const response =
			await api.get(`${cep}/${formatoResposta}`);

		console.log(response.data)
		return response.data
	}	catch (e) {
		throw new Error("CEP não encontrado.")
	}
}

export default buscarCep;
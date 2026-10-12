const doacaoService = require('../services/doacaoService');
const { ErroHttp } = require('../utils/http');
const { inteiroPositivo } = require('../utils/validacao');

/**
 * Lida com a requisição HTTP para criar uma doação.
 */
async function criarDoacao(req, res) {
  const doadorId = req.usuario.perfilId;
  const necessidadeId = inteiroPositivo(req.body.necessidade_id);
  const quantidade = inteiroPositivo(req.body.quantidade);

  if (necessidadeId === null) {
    throw new ErroHttp(400, 'necessidade_id inválido.');
  }
  if (quantidade === null) {
    throw new ErroHttp(400, 'A quantidade deve ser um número inteiro maior que zero.');
  }

  // Delega a execução para a camada de Serviço
  const doacaoId = await doacaoService.registrarDoacao(doadorId, necessidadeId, quantidade);

  res.status(201).json({
    mensagem: 'Doação registrada e quantidade atualizada com sucesso!',
    id: doacaoId
  });
}

module.exports = {
  criarDoacao
};
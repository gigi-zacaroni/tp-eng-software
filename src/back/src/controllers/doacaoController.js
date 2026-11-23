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

async function avancarDoacao(req, res) {
  const doacaoId = inteiroPositivo(req.params.id);
  if (doacaoId === null) {
    throw new ErroHttp(400, 'id da doação inválido.');
  }

  const status = await doacaoService.avancarDoacao(req.usuario.perfilId, doacaoId);
  res.json({ mensagem: 'Status da doação atualizado.', status });
}

async function cancelarDoacao(req, res) {
  const doacaoId = inteiroPositivo(req.params.id);
  if (doacaoId === null) {
    throw new ErroHttp(400, 'id da doação inválido.');
  }

  await doacaoService.cancelarDoacao(req.usuario.perfilId, doacaoId);
  res.json({ mensagem: 'Doação cancelada e quantidade devolvida à necessidade.' });
}

module.exports = {
  criarDoacao,
  avancarDoacao,
  cancelarDoacao
};
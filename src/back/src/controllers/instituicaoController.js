const instituicaoService = require('../services/instituicaoService');
const { ErroHttp } = require('../utils/http');
const { inteiroPositivo } = require('../utils/validacao');

async function destaques(req, res) {
  res.json(await instituicaoService.destaques());
}

async function listar(req, res) {
  res.json(await instituicaoService.listar());
}

async function detalhar(req, res) {
  const id = inteiroPositivo(req.params.id);
  if (id === null) {
    throw new ErroHttp(400, 'id de instituição inválido.');
  }
  res.json(await instituicaoService.detalhar(id));
}

module.exports = {
  destaques,
  listar,
  detalhar
};

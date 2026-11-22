const { pool } = require('../config/db');
const { ErroHttp } = require('../utils/http');
const instituicaoRepository = require('../repositories/instituicaoRepository');
const necessidadeRepository = require('../repositories/necessidadeRepository');

const LIMITE_DESTAQUES = 4;

// O banco devolve `verificada` como 0/1 e a contagem como número ou string.
function resumir(linha) {
  return {
    id: linha.id,
    nome: linha.nome,
    resumo: linha.descricao || '',
    verificada: Boolean(linha.verificada),
    necessidadesAbertas: Number(linha.necessidadesAbertas)
  };
}

// RF-06: instituições em destaque na landing pública. Não expõe contato (RNF-04).
async function destaques() {
  const linhas = await instituicaoRepository.listarResumo(pool, LIMITE_DESTAQUES);
  return linhas.map(resumir);
}

// RF-07: listagem completa, só para autenticados (a rota exige o token).
async function listar() {
  const linhas = await instituicaoRepository.listarResumo(pool);
  return linhas.map(resumir);
}

// RF-10 e RF-18: detalhe com as necessidades e o quanto já foi prometido.
// O banco ainda não registra o recebido (RF-23), então o progresso é só do prometido.
async function detalhar(id) {
  const instituicao = await instituicaoRepository.buscarPorId(pool, id);
  if (!instituicao) throw new ErroHttp(404, 'Instituição não encontrada.');

  const necessidades = await necessidadeRepository.listarPorInstituicao(pool, id);
  return {
    id: instituicao.id,
    nome: instituicao.nome,
    descricao: instituicao.descricao || '',
    verificada: Boolean(instituicao.verificada),
    necessidades: necessidades.map((n) => {
      const prometido = n.quantidadeTotal - n.quantidadeFaltante;
      return {
        id: n.id,
        item: n.item,
        desejado: n.quantidadeTotal,
        prometido,
        faltante: n.quantidadeFaltante,
        percentualPrometido: n.quantidadeTotal > 0 ? Math.round((prometido / n.quantidadeTotal) * 100) : 0
      };
    })
  };
}

module.exports = { destaques, listar, detalhar };

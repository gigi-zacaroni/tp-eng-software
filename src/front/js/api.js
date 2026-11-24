// Único ponto do front-end que conversa com a API. As telas chamam estas
// funções e nunca usam fetch diretamente.

const CHAVE_SESSAO = 'conectaacao.sessao';

export class ErroApi extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.status = status;
  }
}

export function obterSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO));
  } catch {
    return null;
  }
}

function salvarSessao(sessao) {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

function limparSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
}

// A API responde sempre JSON; erros vêm como { erro: '...' } (handler central do server.js).
async function requisitar(caminho, { metodo = 'GET', corpo, autenticado = false } = {}) {
  const cabecalhos = {};
  if (corpo !== undefined) cabecalhos['Content-Type'] = 'application/json';
  if (autenticado) {
    const sessao = obterSessao();
    if (sessao) cabecalhos.Authorization = `Bearer ${sessao.token}`;
  }

  let resposta;
  try {
    resposta = await fetch(caminho, {
      method: metodo,
      headers: cabecalhos,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined
    });
  } catch {
    throw new ErroApi(0, 'Não foi possível falar com o servidor. Verifique se a API está rodando.');
  }

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    // Token vencido ou inválido: a sessão salva não serve mais.
    if (resposta.status === 401 && autenticado) limparSessao();
    throw new ErroApi(resposta.status, dados.erro || 'Erro inesperado.');
  }
  return dados;
}

// RF-05: telas protegidas mandam o visitante ao login e guardam o destino.
export function exigirSessao() {
  const sessao = obterSessao();
  if (!sessao) {
    const volta = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(`/pages/login.html?volta=${volta}`);
  }
  return sessao;
}

// RF-06: público, sem token.
export function destaques() {
  return requisitar('/instituicoes/destaques');
}

// RF-07: listagem completa, só para autenticados.
export function listarInstituicoes() {
  return requisitar('/instituicoes', { autenticado: true });
}

// RF-10 e RF-18: detalhe com necessidades e progresso.
export function detalharInstituicao(id) {
  return requisitar(`/instituicoes/${encodeURIComponent(id)}`, { autenticado: true });
}

// RF-19: o doador vem do token; o corpo leva só a necessidade e a quantidade.
export function registrarDoacao(necessidadeId, quantidade) {
  return requisitar('/doacoes', {
    metodo: 'POST',
    autenticado: true,
    corpo: { necessidade_id: necessidadeId, quantidade }
  });
}

// RF-01
export function cadastrarDoador(dados) {
  return requisitar('/cadastro/doador', { metodo: 'POST', corpo: dados });
}

// RF-02 e RF-14: acesso, dados da instituição e necessidades iniciais.
export function cadastrarInstituicao(dados) {
  return requisitar('/cadastro/instituicao', { metodo: 'POST', corpo: dados });
}

// RF-03
export async function login(email, senha) {
  const dados = await requisitar('/login', { metodo: 'POST', corpo: { email, senha } });
  salvarSessao(dados);
  return dados;
}

// RF-04: o JWT não tem estado no servidor; encerrar a sessão é descartar o token.
export async function logout() {
  try {
    await requisitar('/logout', { metodo: 'POST', autenticado: true });
  } finally {
    limparSessao();
  }
}

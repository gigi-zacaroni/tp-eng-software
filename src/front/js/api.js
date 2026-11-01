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
    throw new ErroApi(resposta.status, dados.erro || 'Erro inesperado.');
  }
  return dados;
}

// RF-06: público, sem token.
export function destaques() {
  return requisitar('/instituicoes/destaques');
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

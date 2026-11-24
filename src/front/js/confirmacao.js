// Terceiro passo da doação (RF-19, RNF-01). O resumo vem da tela de detalhe,
// guardado no sessionStorage logo depois do POST /doacoes.
import { exigirSessao } from './api.js';

const CHAVE_CONFIRMACAO = 'conectaacao.ultimaDoacao';

function lerResumo() {
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE_CONFIRMACAO));
  } catch {
    return null;
  }
}

if (exigirSessao()) {
  const resumo = lerResumo();
  if (!resumo) {
    // Sem doação recente (ex.: página aberta direto): volta para a listagem.
    window.location.replace('/pages/instituicoes.html');
  } else {
    document.querySelector('#texto').textContent =
      `Obrigado! ${resumo.instituicao} já pode contar com a sua doação.`;
    document.querySelector('#numero').textContent = String(resumo.id);
    document.querySelector('#item').textContent = resumo.item;
    document.querySelector('#quantidade').textContent = String(resumo.quantidade);
    document.querySelector('#instituicao').textContent = resumo.instituicao;
    document.querySelector('#ver-instituicao').href =
      `/pages/instituicao.html?id=${encodeURIComponent(resumo.instituicaoId)}`;
  }
}

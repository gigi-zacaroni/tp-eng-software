import { destaques, obterSessao } from './api.js';
import { criarCard, textoAbertas } from './cards.js';

const lista = document.querySelector('#destaques');
const aviso = document.querySelector('#destaques-aviso');

// Logado, "Conhecer instituições" leva direto à listagem (RF-07).
// Visitante passa pelo login e volta para a listagem depois (RF-05).
const conhecer = document.querySelector('#conhecer');
conhecer.href = obterSessao()
  ? '/pages/instituicoes.html'
  : `/pages/login.html?volta=${encodeURIComponent('/pages/instituicoes.html')}`;

async function carregar() {
  try {
    const instituicoes = await destaques();
    if (instituicoes.length === 0) {
      aviso.textContent = 'Nenhuma instituição cadastrada ainda.';
      return;
    }
    aviso.hidden = true;
    lista.append(...instituicoes.map((inst) => criarCard(inst, { link: Boolean(obterSessao()) })));

    const abertas = instituicoes.reduce((soma, i) => soma + i.necessidadesAbertas, 0);
    document.querySelector('#selo-contagem').textContent =
      `${instituicoes.length} em destaque · ${textoAbertas(abertas)}`;
  } catch (erro) {
    aviso.textContent = `Não foi possível carregar as instituições. ${erro.message}`;
  }
}

carregar();

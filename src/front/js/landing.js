import { destaques, obterSessao } from './api.js';

const lista = document.querySelector('#destaques');
const aviso = document.querySelector('#destaques-aviso');

// Logado, a listagem completa ainda não tem tela (RF-07): o botão fica em breve.
if (obterSessao()) {
  const conhecer = document.querySelector('#conhecer');
  const emBreve = document.createElement('span');
  emBreve.className = 'botao botao-grande em-breve';
  emBreve.setAttribute('aria-disabled', 'true');
  emBreve.textContent = 'Conhecer instituições';
  const marca = document.createElement('small');
  marca.textContent = 'em breve';
  emBreve.append(marca);
  conhecer.replaceWith(emBreve);
}

function texto(tag, classe, conteudo) {
  const el = document.createElement(tag);
  el.className = classe;
  el.textContent = conteudo;
  return el;
}

function textoAbertas(n) {
  return n === 1 ? '1 necessidade aberta' : `${n} necessidades abertas`;
}

// Sempre textContent: os dados vêm do cadastro das instituições.
function criarCard(inst) {
  const card = document.createElement('article');
  card.className = 'card';
  card.append(texto('div', 'card-foto', 'foto da instituição'));

  const corpo = document.createElement('div');
  corpo.className = 'card-corpo';
  corpo.append(texto('div', 'card-nome', inst.nome));
  if (inst.verificada) corpo.append(texto('div', 'card-selo', '✓ Verificada'));
  corpo.append(texto('p', 'card-resumo', inst.resumo || 'Esta instituição ainda não escreveu uma descrição.'));
  corpo.append(texto('div', 'card-rodape', textoAbertas(inst.necessidadesAbertas)));
  card.append(corpo);
  return card;
}

async function carregar() {
  try {
    const instituicoes = await destaques();
    if (instituicoes.length === 0) {
      aviso.textContent = 'Nenhuma instituição cadastrada ainda.';
      return;
    }
    aviso.hidden = true;
    lista.append(...instituicoes.map(criarCard));

    const abertas = instituicoes.reduce((soma, i) => soma + i.necessidadesAbertas, 0);
    document.querySelector('#selo-contagem').textContent =
      `${instituicoes.length} em destaque · ${textoAbertas(abertas)}`;
  } catch (erro) {
    aviso.textContent = `Não foi possível carregar as instituições. ${erro.message}`;
  }
}

carregar();

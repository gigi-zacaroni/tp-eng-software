// Tela de detalhe (RF-10) com o progresso de cada necessidade (RF-18)
// e o modal "Quero doar" em 2 passos (RF-19, RNF-01).
// A quantidade é limitada ao que falta na necessidade (RN-02, RNF-06);
// a API faz a mesma checagem dentro da transação.
import { detalharInstituicao, exigirSessao, registrarDoacao } from './api.js';
import { texto } from './cards.js';

const CHAVE_CONFIRMACAO = 'conectaacao.ultimaDoacao';

const sessao = exigirSessao();
const id = new URLSearchParams(window.location.search).get('id');

const aviso = document.querySelector('#aviso');
const modal = document.querySelector('#modal');
const campoQtd = document.querySelector('#quantidade');
const erroQtd = document.querySelector('#erro-quantidade');
const erroDoacao = document.querySelector('#erro-doacao');

let instituicao = null;
let escolhida = null;

// Mesma regra de status do protótipo (RN-05), só com o prometido: o banco
// ainda não registra o recebido (RF-23).
function statusNecessidade(n) {
  if (n.faltante === 0) return 'Atendida';
  if (n.prometido > 0) return 'Parcial';
  return 'Aberta';
}

function criarNecessidade(n) {
  const status = statusNecessidade(n);
  const linha = document.createElement('div');
  linha.className = 'necessidade';

  const info = document.createElement('div');
  info.className = 'necessidade-info';
  const nome = texto('div', 'necessidade-nome', n.item);
  nome.append(texto('span', `chip chip-${status.toLowerCase()}`, status));
  info.append(nome, texto('div', 'necessidade-sub', `desejado: ${n.desejado} · falta: ${n.faltante}`));

  const progresso = document.createElement('div');
  progresso.className = 'progresso';
  const legenda = document.createElement('div');
  legenda.className = 'progresso-legenda';
  legenda.append(texto('span', '', `${n.prometido} de ${n.desejado} prometidos`),
    texto('strong', '', `${n.percentualPrometido}%`));
  const barra = document.createElement('div');
  barra.className = 'barra';
  barra.setAttribute('role', 'progressbar');
  barra.setAttribute('aria-label', `Progresso de ${n.item}`);
  barra.setAttribute('aria-valuemin', '0');
  barra.setAttribute('aria-valuemax', '100');
  barra.setAttribute('aria-valuenow', String(n.percentualPrometido));
  const preenchido = document.createElement('span');
  preenchido.style.width = `${Math.min(n.percentualPrometido, 100)}%`;
  barra.append(preenchido);
  progresso.append(legenda, barra);

  linha.append(info, progresso);

  // Só doador doa (a rota exige o perfil); instituição apenas consulta.
  if (sessao.tipo === 'doador') {
    const botao = texto('button', 'botao botao-doar', n.faltante > 0 ? 'Quero doar' : 'Necessidade atendida');
    botao.type = 'button';
    botao.disabled = n.faltante === 0;
    botao.addEventListener('click', () => abrirModal(n.id));
    linha.append(botao);
  }
  return linha;
}

function desenhar() {
  document.title = `${instituicao.nome} · ConectaAção`;
  document.querySelector('#nome').textContent = instituicao.nome;
  document.querySelector('#descricao').textContent =
    instituicao.descricao || 'Esta instituição ainda não escreveu uma descrição.';
  const chips = document.querySelector('#chips');
  chips.replaceChildren(texto('span', `chip ${instituicao.verificada ? 'chip-aberta' : ''}`,
    instituicao.verificada ? '✓ Verificada' : 'Aguardando verificação'));

  const abertas = instituicao.necessidades.filter((n) => n.faltante > 0).length;
  document.querySelector('#resumo-necessidades').textContent =
    `${instituicao.necessidades.length} itens · ${abertas} em aberto`;
  document.querySelector('#sem-necessidades').hidden = instituicao.necessidades.length > 0;
  document.querySelector('#necessidades').replaceChildren(...instituicao.necessidades.map(criarNecessidade));

  aviso.hidden = true;
  document.querySelector('#detalhe').hidden = false;
  document.querySelector('#secao-necessidades').hidden = false;
}

// ---------- Modal "Quero doar" ----------

function mostrarEtapa(etapa) {
  const escolha = etapa === 'escolha';
  document.querySelector('#etapa-escolha').hidden = !escolha;
  document.querySelector('#etapa-revisao').hidden = escolha;
  document.querySelector('#modal-etapa').textContent = escolha
    ? 'Passo 1 de 2 · item e quantidade'
    : 'Passo 2 de 2 · revisão';
}

function selecionar(necessidade) {
  escolhida = necessidade;
  campoQtd.max = String(necessidade.faltante);
  campoQtd.value = String(Math.min(Number(campoQtd.value) || 1, necessidade.faltante));
  document.querySelector('#restante').textContent = `ainda faltam ${necessidade.faltante}`;
  validarQuantidade();
}

function desenharItens(idInicial) {
  const disponiveis = instituicao.necessidades.filter((n) => n.faltante > 0);
  const opcoes = disponiveis.map((n) => {
    const rotulo = document.createElement('label');
    rotulo.className = 'item-opcao';
    const textoItem = texto('span', '', n.item);
    textoItem.append(texto('small', '', `falta ${n.faltante} de ${n.desejado}`));
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'necessidade';
    radio.value = String(n.id);
    radio.checked = n.id === idInicial;
    radio.addEventListener('change', () => selecionar(n));
    rotulo.append(textoItem, radio);
    return rotulo;
  });
  document.querySelector('#itens').replaceChildren(...opcoes);
  selecionar(disponiveis.find((n) => n.id === idInicial) || disponiveis[0]);
}

// Devolve a quantidade válida ou null, já mostrando o erro no campo.
function validarQuantidade() {
  const valor = Number(campoQtd.value);
  let erro = '';
  if (!Number.isInteger(valor) || valor < 1) erro = 'Informe um número inteiro maior que zero.';
  else if (valor > escolhida.faltante) erro = `O máximo para este item é ${escolhida.faltante}.`;
  erroQtd.textContent = erro;
  campoQtd.setAttribute('aria-invalid', erro ? 'true' : 'false');
  document.querySelector('#revisar').disabled = Boolean(erro);
  return erro ? null : valor;
}

function abrirModal(necessidadeId) {
  campoQtd.value = '1';
  erroDoacao.textContent = '';
  document.querySelector('#modal-instituicao').textContent = instituicao.nome;
  desenharItens(necessidadeId);
  mostrarEtapa('escolha');
  modal.showModal();
}

function ajustar(delta) {
  campoQtd.value = String(Math.max(1, Math.min(escolhida.faltante, (Number(campoQtd.value) || 0) + delta)));
  validarQuantidade();
}

document.querySelector('#menos').addEventListener('click', () => ajustar(-1));
document.querySelector('#mais').addEventListener('click', () => ajustar(1));
campoQtd.addEventListener('input', validarQuantidade);
document.querySelector('#modal-fechar').addEventListener('click', () => modal.close());

document.querySelector('#revisar').addEventListener('click', () => {
  const quantidade = validarQuantidade();
  if (quantidade === null) return;
  document.querySelector('#rev-item').textContent = escolhida.item;
  document.querySelector('#rev-quantidade').textContent = String(quantidade);
  document.querySelector('#rev-instituicao').textContent = instituicao.nome;
  erroDoacao.textContent = '';
  mostrarEtapa('revisao');
});

document.querySelector('#voltar-escolha').addEventListener('click', () => mostrarEtapa('escolha'));

document.querySelector('#confirmar').addEventListener('click', async (evento) => {
  const botao = evento.currentTarget;
  const quantidade = Number(campoQtd.value);
  botao.disabled = true;
  erroDoacao.textContent = '';
  try {
    const resposta = await registrarDoacao(escolhida.id, quantidade);
    sessionStorage.setItem(CHAVE_CONFIRMACAO, JSON.stringify({
      id: resposta.id,
      item: escolhida.item,
      quantidade,
      instituicao: instituicao.nome,
      instituicaoId: instituicao.id
    }));
    window.location.href = '/pages/confirmacao.html';
  } catch (erro) {
    // Ex.: outro doador prometeu antes e o saldo diminuiu (400 da API).
    erroDoacao.textContent = erro.message;
    botao.disabled = false;
    if (erro.status === 401) exigirSessao();
  }
});

// ---------- Carga ----------

async function carregar() {
  if (!id) {
    aviso.textContent = 'Instituição não informada.';
    return;
  }
  try {
    instituicao = await detalharInstituicao(id);
    desenhar();
  } catch (erro) {
    if (erro.status === 401) {
      exigirSessao();
      return;
    }
    aviso.textContent = erro.status === 404
      ? 'Instituição não encontrada.'
      : `Não foi possível carregar a instituição. ${erro.message}`;
  }
}

if (sessao) carregar();

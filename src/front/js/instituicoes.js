// Tela de listagem (RF-07) com busca (RF-08) e estado vazio (RF-09).
// A API devolve nome, resumo, selo e contagem de necessidades abertas;
// a busca e os filtros rodam no navegador sobre essa lista.
import { exigirSessao, listarInstituicoes } from './api.js';
import { criarCard } from './cards.js';

const sessao = exigirSessao();

const form = document.querySelector('#filtros');
const lista = document.querySelector('#lista');
const vazio = document.querySelector('#vazio');
const resultado = document.querySelector('#resultado');

let instituicoes = [];

// Compara sem acento e sem diferença de maiúsculas.
function normalizar(texto) {
  return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function filtrar() {
  const termo = normalizar(form.busca.value.trim());
  const soAbertas = form.abertas.checked;
  const soVerificadas = form.verificadas.checked;

  return instituicoes.filter((inst) =>
    (!termo || normalizar(`${inst.nome} ${inst.resumo}`).includes(termo)) &&
    (!soAbertas || inst.necessidadesAbertas > 0) &&
    (!soVerificadas || inst.verificada));
}

function desenhar() {
  const filtradas = filtrar();
  lista.replaceChildren(...filtradas.map((inst) => criarCard(inst, { link: true })));
  vazio.hidden = filtradas.length > 0;

  const total = instituicoes.length;
  resultado.textContent = filtradas.length === total
    ? `${total} ${total === 1 ? 'instituição cadastrada' : 'instituições cadastradas'}`
    : `${filtradas.length} de ${total} instituições`;
}

form.addEventListener('input', desenhar);
form.addEventListener('submit', (evento) => evento.preventDefault());
// O reset limpa os campos depois do evento; por isso o redesenho vai para a fila.
form.addEventListener('reset', () => setTimeout(desenhar));
document.querySelector('#limpar-vazio').addEventListener('click', () => form.reset());

async function carregar() {
  try {
    instituicoes = await listarInstituicoes();
    desenhar();
  } catch (erro) {
    if (erro.status === 401) {
      exigirSessao();
      return;
    }
    resultado.textContent = `Não foi possível carregar as instituições. ${erro.message}`;
  }
}

if (sessao) carregar();

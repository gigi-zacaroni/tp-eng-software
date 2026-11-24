// Cadastro de doador (RF-01) e de instituição com necessidades iniciais
// (RF-02, RF-14). Formulários vindos do app.js da Sprint 6, agora no visual
// do protótipo e usando o cliente único da API (js/api.js).
import { cadastrarDoador, cadastrarInstituicao, obterSessao } from './api.js';

if (obterSessao()) window.location.replace('/index.html');

const formDoador = document.querySelector('#form-doador');
const formInstituicao = document.querySelector('#form-instituicao');
const abas = {
  doador: [document.querySelector('#aba-doador'), formDoador],
  instituicao: [document.querySelector('#aba-instituicao'), formInstituicao]
};

function mostrarAba(nome) {
  Object.entries(abas).forEach(([chave, [aba, form]]) => {
    const ativa = chave === nome;
    aba.setAttribute('aria-selected', String(ativa));
    form.hidden = !ativa;
  });
}

abas.doador[0].addEventListener('click', () => mostrarAba('doador'));
abas.instituicao[0].addEventListener('click', () => mostrarAba('instituicao'));
mostrarAba(window.location.hash === '#instituicao' ? 'instituicao' : 'doador');

// Roda o envio com o botão travado e mostra o erro da API no formulário.
async function enviar(form, acao) {
  const botao = form.querySelector('button[type="submit"]');
  const mensagem = form.querySelector('.mensagem-erro');
  mensagem.textContent = '';
  botao.disabled = true;
  try {
    await acao();
    window.location.href = '/pages/login.html?cadastro=ok';
  } catch (erro) {
    mensagem.textContent = erro.message;
    botao.disabled = false;
  }
}

formDoador.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const f = formDoador;
  enviar(f, () => cadastrarDoador({
    nome: f.nome.value.trim(),
    email: f.email.value.trim(),
    senha: f.senha.value,
    confirmarSenha: f.confirmarSenha.value
  }));
});

// ---------- Necessidades iniciais ----------

function novaLinhaNecessidade() {
  const linha = document.createElement('div');
  linha.className = 'linha-nec';

  const item = document.createElement('input');
  item.placeholder = 'Item (ex.: Arroz 5kg)';
  item.setAttribute('aria-label', 'Item');
  item.dataset.campo = 'item';

  const qtd = document.createElement('input');
  qtd.type = 'number';
  qtd.min = '1';
  qtd.placeholder = 'Qtd';
  qtd.setAttribute('aria-label', 'Quantidade');
  qtd.dataset.campo = 'quantidade';

  const remover = document.createElement('button');
  remover.type = 'button';
  remover.textContent = '×';
  remover.setAttribute('aria-label', 'Remover item');
  remover.addEventListener('click', () => linha.remove());

  linha.append(item, qtd, remover);
  document.querySelector('#necessidades').append(linha);
}

document.querySelector('#add-necessidade').addEventListener('click', novaLinhaNecessidade);
novaLinhaNecessidade();

formInstituicao.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const f = formInstituicao;
  // Linhas totalmente vazias são ignoradas; as incompletas vão para a API validar.
  const necessidadesIniciais = [...f.querySelectorAll('.linha-nec')]
    .map((l) => ({
      item: l.querySelector('[data-campo=item]').value.trim(),
      quantidade: l.querySelector('[data-campo=quantidade]').value
    }))
    .filter((n) => n.item || n.quantidade);

  enviar(f, () => cadastrarInstituicao({
    acesso: { email: f.email.value.trim(), senha: f.senha.value, confirmarSenha: f.confirmarSenha.value },
    sobre: { nome: f.nome.value.trim(), descricao: f.descricao.value.trim() },
    necessidadesIniciais
  }));
});

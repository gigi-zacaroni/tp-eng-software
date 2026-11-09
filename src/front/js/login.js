import { login, obterSessao } from './api.js';

// Quem já está logado não precisa do formulário.
if (obterSessao()) window.location.replace('/index.html');

const form = document.querySelector('#form-login');
const mensagem = document.querySelector('#mensagem');

function marcarErro(campo, texto) {
  const input = form[campo];
  input.setAttribute('aria-invalid', texto ? 'true' : 'false');
  document.querySelector(`#erro-${campo}`).textContent = texto;
}

function validar(email, senha) {
  marcarErro('email', email ? '' : 'Informe o e-mail.');
  marcarErro('senha', senha ? '' : 'Informe a senha.');
  return Boolean(email && senha);
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensagem.textContent = '';
  const email = form.email.value.trim();
  const senha = form.senha.value;
  if (!validar(email, senha)) return;

  const botao = form.querySelector('button[type="submit"]');
  botao.disabled = true;
  try {
    // A API devolve o tipo (doador ou instituição); o cabeçalho usa isso
    // para mostrar o papel, a cor do avatar e o menu de cada perfil.
    await login(email, senha);
    window.location.href = '/index.html';
  } catch (erro) {
    mensagem.textContent = erro.message;
    botao.disabled = false;
  }
});

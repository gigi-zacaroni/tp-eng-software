import { login, obterSessao } from './api.js';

// RF-05: depois do login, volta para a tela protegida que o visitante tentou abrir.
// Só aceita caminhos internos, para o parâmetro não virar um redirecionamento aberto.
function destino() {
  const volta = new URLSearchParams(window.location.search).get('volta');
  return volta && volta.startsWith('/') && !volta.startsWith('//') ? volta : '/index.html';
}

// Quem já está logado não precisa do formulário.
if (obterSessao()) window.location.replace(destino());

const form = document.querySelector('#form-login');
const mensagem = document.querySelector('#mensagem');

// Vindo da tela de cadastro (RF-01, RF-02).
if (new URLSearchParams(window.location.search).get('cadastro') === 'ok') {
  mensagem.className = 'mensagem-ok';
  mensagem.textContent = 'Conta criada com sucesso. Entre com o e-mail e a senha cadastrados.';
}

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
  mensagem.className = 'mensagem-erro';
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
    window.location.href = destino();
  } catch (erro) {
    mensagem.textContent = erro.message;
    botao.disabled = false;
  }
});

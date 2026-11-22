// Vazio = o front é servido pelo próprio Express (mesma origem).
// Se abrir o front separado, use por ex.: 'http://localhost:3000' (e ative o CORS no back).
const API_URL = '';

const $ = (sel) => document.querySelector(sel);

// ---------- Sessão (guardada no navegador) ----------
const lerSessao = () => JSON.parse(localStorage.getItem('sessao') || 'null');
const salvarSessao = (s) => localStorage.setItem('sessao', JSON.stringify(s));
const limparSessao = () => localStorage.removeItem('sessao');

// ---------- Chamada à API (async/await) ----------
// "await" pausa só esta função até a resposta chegar, sem travar a página.
async function api(caminho, { method = 'GET', corpo, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = `Bearer ${lerSessao()?.token}`;

  const resp = await fetch(API_URL + caminho, {
    method,
    headers,
    body: corpo ? JSON.stringify(corpo) : undefined
  });
  const dados = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    if (resp.status === 401 && auth) { limparSessao(); location.hash = '#login'; }
    throw new Error(dados.erro || 'Erro inesperado.'); // a API sempre manda { erro: '...' }
  }
  return dados;
}

// ---------- Avisos ----------
function avisar(texto, tipo = 'erro') {
  const el = $('#aviso');
  el.textContent = texto;
  el.className = `aviso ${tipo}`;
  el.hidden = false;
}
const limparAviso = () => { $('#aviso').hidden = true; };

// ---------- Navegação por hash (#login, #painel...) ----------
function mostrarTela() {
  limparAviso();
  const sessao = lerSessao();
  let tela = location.hash.slice(1) || 'login';
  if (tela === 'painel' && !sessao) tela = 'login';
  if (tela === 'login' && sessao) tela = 'painel';

  document.querySelectorAll('section').forEach((s) =>
    s.classList.toggle('ativa', s.dataset.view === tela));
  desenharNav(sessao);
  if (tela === 'painel') desenharPainel(sessao);
}

function desenharNav(sessao) {
  $('#nav').innerHTML = sessao
    ? `<span>Olá, ${esc(sessao.perfil.nome)}</span><a href="#" id="sair">Sair</a>`
    : `<a href="#login">Entrar</a><a href="#cadastro-doador">Cadastrar</a>`;
  $('#sair')?.addEventListener('click', sair);
}

// Evita injetar HTML vindo do usuário na página
function esc(t = '') {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

// Roda uma ação desabilitando o botão e mostrando erros da API
async function enviar(form, acao) {
  const botao = form.querySelector('button:not([type=button])');
  botao.disabled = true;
  try { await acao(); }
  catch (e) { avisar(e.message); }
  finally { botao.disabled = false; }
}
const campos = (form) => Object.fromEntries(new FormData(form));

// ---------- Login / logout ----------
$('#form-login').addEventListener('submit', (e) => {
  e.preventDefault();
  enviar(e.target, async () => {
    salvarSessao(await api('/login', { method: 'POST', corpo: campos(e.target) }));
    e.target.reset();
    location.hash = '#painel';
    mostrarTela();
  });
});

async function sair(e) {
  e.preventDefault();
  try { await api('/logout', { method: 'POST' }); } catch { /* sair mesmo assim */ }
  limparSessao();
  location.hash = '#login';
  mostrarTela();
}

// ---------- Cadastro de doador ----------
$('#form-doador').addEventListener('submit', (e) => {
  e.preventDefault();
  enviar(e.target, async () => {
    const r = await api('/cadastro/doador', { method: 'POST', corpo: campos(e.target) });
    e.target.reset();
    location.hash = '#login';
    avisar(r.mensagem + ' Faça login para continuar.', 'ok');
  });
});

// ---------- Cadastro de instituição ----------
function novaLinhaNecessidade() {
  const div = document.createElement('div');
  div.className = 'linha-nec';
  div.innerHTML = `
    <input placeholder="Item (ex.: Arroz 5kg)" data-campo="item">
    <input type="number" min="1" placeholder="Qtd" data-campo="quantidade">
    <button type="button" title="Remover">×</button>`;
  div.querySelector('button').onclick = () => div.remove();
  $('#necessidades').appendChild(div);
}
$('#add-necessidade').addEventListener('click', novaLinhaNecessidade);

$('#form-instituicao').addEventListener('submit', (e) => {
  e.preventDefault();
  enviar(e.target, async () => {
    const c = campos(e.target);
    const necessidadesIniciais = [...document.querySelectorAll('.linha-nec')].map((l) => ({
      item: l.querySelector('[data-campo=item]').value,
      quantidade: l.querySelector('[data-campo=quantidade]').value
    }));
    const r = await api('/cadastro/instituicao', {
      method: 'POST',
      corpo: {
        acesso: { email: c.email, senha: c.senha, confirmarSenha: c.confirmarSenha },
        sobre: { nome: c.nome, descricao: c.descricao },
        necessidadesIniciais
      }
    });
    e.target.reset();
    $('#necessidades').innerHTML = '';
    location.hash = '#login';
    avisar(r.mensagem + ' Faça login para continuar.', 'ok');
  });
});

// ---------- Painel ----------
function desenharPainel({ tipo, perfil }) {
  const box = $('#painel-conteudo');

  if (tipo === 'doador') {
    box.innerHTML = `
      <h1>Registrar doação</h1>
      <form id="form-doacao">
        <label>Código da necessidade <input type="number" name="necessidade_id" min="1" required></label>
        <label>Quantidade <input type="number" name="quantidade" min="1" required></label>
        <button>Doar</button>
      </form>`;
    $('#form-doacao').addEventListener('submit', (e) => {
      e.preventDefault();
      enviar(e.target, async () => {
        const r = await api('/doacoes', { method: 'POST', auth: true, corpo: campos(e.target) });
        e.target.reset();
        avisar(`${r.mensagem} (doação nº ${r.id})`, 'ok');
      });
    });
  } else {
    box.innerHTML = `
      <h1>${esc(perfil.nome)}</h1>
      <p><span class="selo ${perfil.verificada ? 'ok' : ''}">${perfil.verificada ? 'Verificada' : 'Aguardando verificação'}</span></p>
      <p>${esc(perfil.descricao || 'Sem descrição.')}</p>`;
  }
}

window.addEventListener('hashchange', mostrarTela);
novaLinhaNecessidade();
mostrarTela();

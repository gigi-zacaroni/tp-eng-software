'use strict';
/* ConectaAção: front-end de página única. As telas vêm do protótipo da equipe
   e os dados vêm da API servida pelo mesmo processo (src/back).
   O que o banco não guarda (cidade, categoria, prioridade, tipo de doação,
   contato da instituição e detalhes da entrega) fica no navegador, em
   localStorage. Esses dados valem só para o navegador onde foram salvos. */

const CHAVE_SESSAO = 'conectaacao.sessao';
const CHAVE_EXTRAS = 'conectaacao.extras';

const CATEGORIAS_NECESSIDADE = ['Alimentos', 'Higiene', 'Educação', 'Saúde', 'Vestuário', 'Animais', 'Serviços', 'Meio ambiente', 'Outros'];
const CATEGORIAS_INSTITUICAO = ['Assistência social', 'Educação', 'Animais', 'Saúde', 'Meio ambiente', 'Outros'];
const VISUAL = {
  'Alimentos': ['🥫', '#e6f0e3'], 'Higiene': ['🧼', '#eee9f6'], 'Educação': ['🎒', '#f4ead4'],
  'Saúde': ['🩺', '#daeff5'], 'Vestuário': ['🧣', '#e4eaf4'], 'Animais': ['🐾', '#f6e8dc'],
  'Serviços': ['🤝', '#e5f0ed'], 'Meio ambiente': ['🌿', '#e8f2d4'], 'Assistência social': ['🌱', '#dfeee3'],
  'Outros': ['📦', '#e5f1e8']
};
const NAO_INFORMADO = 'Não informado';

const state = {
  view: 'home', selected: null, selectedOrg: null, pendingNeed: null,
  authRole: 'doador', authTab: 'login',
  filter: 'Todos', city: '', priority: 'Todas', search: '', order: 'relevant',
  orgSearch: '', orgCategory: 'Todas', openHistory: null, carregando: false
};

// Cache das respostas da API. É limpo depois de cada alteração.
let dados = {};

/* ---------- Sessão e API ---------- */

function obterSessao() {
  try { return JSON.parse(localStorage.getItem(CHAVE_SESSAO)); } catch { return null; }
}
function salvarSessao(s) { localStorage.setItem(CHAVE_SESSAO, JSON.stringify(s)); }
function limparSessao() { localStorage.removeItem(CHAVE_SESSAO); }
function papel() { const s = obterSessao(); return s ? s.tipo : 'visitante'; }

class ErroApi extends Error {
  constructor(status, mensagem) { super(mensagem); this.status = status; }
}

// A API responde JSON e devolve erros como { erro: '...' }.
async function api(caminho, { metodo = 'GET', corpo, autenticado = true } = {}) {
  const headers = {};
  if (corpo !== undefined) headers['Content-Type'] = 'application/json';
  const sessao = obterSessao();
  if (autenticado && sessao) headers.Authorization = `Bearer ${sessao.token}`;

  let resposta;
  try {
    resposta = await fetch(caminho, { method: metodo, headers, body: corpo !== undefined ? JSON.stringify(corpo) : undefined });
  } catch {
    throw new ErroApi(0, 'Não foi possível falar com o servidor. Verifique se a API está rodando.');
  }
  const json = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    if (resposta.status === 401 && autenticado) limparSessao();
    throw new ErroApi(resposta.status, json.erro || 'Erro inesperado.');
  }
  return json;
}

/* ---------- Dados guardados só no navegador ---------- */

function lerExtras() {
  try { return JSON.parse(localStorage.getItem(CHAVE_EXTRAS)) || {}; } catch { return {}; }
}
function extrasDe(tipo, id) { return (lerExtras()[tipo] || {})[id] || {}; }
function salvarExtras(tipo, id, valores) {
  const todos = lerExtras();
  todos[tipo] = todos[tipo] || {};
  todos[tipo][id] = { ...(todos[tipo][id] || {}), ...valores };
  localStorage.setItem(CHAVE_EXTRAS, JSON.stringify(todos));
}

/* ---------- Montagem dos dados das telas ---------- */

function montarInstituicao(i) {
  const x = extrasDe('inst', i.id);
  const cat = x.cat || 'Outros';
  return {
    id: i.id, name: i.nome, desc: i.resumo ?? i.descricao ?? '', verificada: i.verificada,
    abertas: i.necessidadesAbertas, city: x.city || NAO_INFORMADO, cat,
    address: x.address || NAO_INFORMADO, cnpj: x.cnpj || NAO_INFORMADO,
    phone: x.phone || NAO_INFORMADO, email: x.email || NAO_INFORMADO,
    emoji: VISUAL[cat][0], bg: VISUAL[cat][1]
  };
}

function montarNecessidade(n, org) {
  const x = extrasDe('need', n.id);
  const cat = x.cat || 'Outros';
  return {
    id: n.id, title: n.item, orgId: org.id, org: org.name, city: org.city,
    cat, kind: x.kind || 'Itens', urg: x.urg || 'Moderada',
    desc: x.desc || 'A instituição não incluiu uma descrição para esta necessidade.',
    deadline: x.deadline || '', receipt: x.receipt || 'Endereço da instituição',
    total: n.desejado, qty: n.prometido, faltante: n.faltante, pctApi: n.percentualPrometido,
    emoji: VISUAL[cat][0], bg: VISUAL[cat][1]
  };
}

async function carregarInstituicoes() {
  if (!dados.instituicoes) dados.instituicoes = (await api('/instituicoes')).map(montarInstituicao);
  return dados.instituicoes;
}

async function carregarDetalhe(id) {
  dados.detalhes = dados.detalhes || {};
  if (!dados.detalhes[id]) {
    const d = await api(`/instituicoes/${encodeURIComponent(id)}`);
    const org = montarInstituicao(d);
    dados.detalhes[id] = { org, needs: d.necessidades.map((n) => montarNecessidade(n, org)) };
  }
  return dados.detalhes[id];
}

// A API não tem rota que liste todas as necessidades: o front junta o detalhe de cada instituição.
async function carregarNecessidades() {
  if (!dados.needs) {
    const insts = await carregarInstituicoes();
    const detalhes = await Promise.all(insts.map((i) => carregarDetalhe(i.id)));
    dados.needs = detalhes.flatMap((d) => d.needs);
  }
  return dados.needs;
}

async function carregarMinhas() {
  if (!dados.minhas) dados.minhas = await api('/doacoes/minhas');
  return dados.minhas;
}

async function carregarRecebidas() {
  if (!dados.recebidas) dados.recebidas = await api('/doacoes/recebidas');
  return dados.recebidas;
}

// O que cada tela precisa buscar antes de desenhar.
const carregadores = {
  home: async () => { if (!dados.destaques) dados.destaques = (await api('/instituicoes/destaques', { autenticado: false })).map(montarInstituicao); },
  explore: carregarNecessidades,
  institutions: carregarInstituicoes,
  institution: () => carregarDetalhe(state.selectedOrg),
  need: carregarNecessidades,
  donate: carregarNecessidades,
  tracking: carregarMinhas,
  donorProfile: carregarMinhas,
  dashboard: () => Promise.all([carregarDetalhe(obterSessao().perfil.id), carregarRecebidas()]),
  manage: carregarRecebidas,
  instProfile: () => Promise.all([carregarDetalhe(obterSessao().perfil.id), carregarRecebidas()]),
  instEdit: () => carregarDetalhe(obterSessao().perfil.id)
};

// RF-05 e RN-01: listagem, detalhe e doação exigem login.
const SO_LOGADO = ['explore', 'institutions', 'institution', 'need', 'donate', 'tracking', 'donorProfile'];
const AREA_INSTITUICAO = ['dashboard', 'create', 'manage', 'instProfile', 'instEdit'];

/* ---------- Utilitários ---------- */

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n).toLocaleString('pt-BR');
const pct = (n) => Math.max(0, Math.min(100, n.pctApi ?? Math.round(n.qty / Math.max(1, n.total) * 100)));
const fmtData = (d) => (d ? new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '');
const iniciais = (nome) => String(nome || '').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
const byNeed = (id) => (dados.needs || []).find((n) => n.id === Number(id));

function tag(v) {
  const cls = /Alta|Prometida/.test(v) ? 'urgent' : /Entregue/.test(v) ? 'blue' : /Cancelada/.test(v) ? 'red' : '';
  return `<span class="tag ${cls}">${esc(v)}</span>`;
}

function progress(n) {
  const val = n.kind === 'Financeira' ? `R$ ${fmt(n.qty)} de R$ ${fmt(n.total)} prometidos` : `${fmt(n.qty)} de ${fmt(n.total)} prometidos`;
  return `<div class="spread small"><span class="muted">${val}</span><strong>${pct(n)}%</strong></div><div class="progress" style="margin:8px 0 17px"><i style="width:${pct(n)}%"></i></div>`;
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.innerHTML = `<div class="toast">${esc(msg)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.innerHTML = ''; }, 3500);
}

function tratarErro(erro) {
  toast(erro.message);
  if (erro.status === 401) { state.view = 'auth'; render(); }
}

/* ---------- Navegação ---------- */

async function navigate(view, id) {
  if (id !== undefined && id !== null) state.selected = Number(id);
  state.openHistory = null;
  if (SO_LOGADO.includes(view) && papel() === 'visitante') {
    toast('Entre na sua conta para ver as instituições e necessidades.');
    state.authTab = 'login';
    view = 'auth';
  }
  state.view = view;
  window.scrollTo(0, 0);
  const carregar = carregadores[view];
  if (carregar && view !== 'auth') {
    state.carregando = true;
    render();
    try { await carregar(); } catch (erro) { state.carregando = false; tratarErro(erro); return; }
    state.carregando = false;
  }
  render();
}

function recarregar() { dados = {}; return navigate(state.view); }

function goDonate(id) {
  state.selected = Number(id);
  if (papel() === 'instituicao') { toast('Saia da conta institucional para fazer uma doação.'); return; }
  if (papel() !== 'doador') { state.pendingNeed = state.selected; openAuth('doador'); return; }
  navigate('donate', id);
}

function openAuth(role = 'doador', tab = 'login') { state.authRole = role; state.authTab = tab; navigate('auth'); }
function openInstitution(id) { state.selectedOrg = Number(id); navigate('institution'); }

// RF-04: o token não tem estado no servidor; sair é descartar a sessão.
async function logout() {
  try { await api('/logout', { metodo: 'POST' }); } catch { /* a sessão é descartada mesmo assim */ }
  limparSessao();
  dados = {};
  state.pendingNeed = null;
  state.authRole = 'doador';
  state.authTab = 'login';
  navigate('home');
  toast('Sessão encerrada.');
}

/* ---------- Cabeçalho e rodapé ---------- */

function profileIcon() {
  return `<button class="profile-icon" type="button" aria-label="Abrir meu perfil" title="Meu perfil" onclick="navigate('${papel() === 'instituicao' ? 'instProfile' : 'donorProfile'}')">♙</button>`;
}

function header() {
  const inside = papel() === 'instituicao';
  const logoDest = inside ? 'dashboard' : 'home';
  const doador = papel() === 'doador';
  return `<header class="nav"><div class="navin"><a class="brand" onclick="navigate('${logoDest}')" tabindex="0" onkeydown="if(event.key==='Enter')navigate('${logoDest}')"><span class="mark">✳</span> conectação<span style="color:#7db08c">.</span></a>${inside
    ? `<span class="navlinks" aria-hidden="true"></span><div class="navact">${profileIcon()}</div>`
    : `<nav class="navlinks" aria-label="Navegação principal"><a class="${state.view === 'home' ? 'active' : ''}" onclick="navigate('home')">Início</a><a class="${state.view === 'explore' ? 'active' : ''}" onclick="navigate('explore')">Explorar necessidades</a><a class="${['institutions', 'institution'].includes(state.view) ? 'active' : ''}" onclick="navigate('institutions')">Instituições</a>${doador ? `<a class="${state.view === 'tracking' ? 'active' : ''}" onclick="navigate('tracking')">Minhas doações</a>` : ''}</nav><div class="navact">${doador ? `<a class="donor-tracking-mobile ${state.view === 'tracking' ? 'active' : ''}" onclick="navigate('tracking')">Minhas doações</a>` + profileIcon() : `<button type="button" class="btn secondary sm" onclick="openAuth('doador')">Entrar</button>`}</div>`}</div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="container spread"><div><a class="brand" onclick="navigate('${papel() === 'instituicao' ? 'dashboard' : 'home'}')" style="font-size:21px"><span class="mark" style="height:28px;width:28px;font-size:17px;border-radius:9px">✳</span>conectação.</a><p style="margin:8px 0 0">Pequenos gestos. Grandes transformações.</p></div><div style="text-align:right">Conexão direta entre doadores e instituições.<br>Não processamos pagamentos.</div></div></footer>`;
}

/* ---------- Cards ---------- */

function needCard(n) {
  return `<article class="card need-card"><div class="feature-art" style="background:${n.bg}"><span class="illustration" aria-hidden="true">${n.emoji}</span><div style="position:absolute;top:14px;left:14px">${tag(n.urg)}</div></div><div class="body"><div class="small muted">${esc(n.org)}</div><h3>${esc(n.title)}</h3><p>⌖ ${esc(n.city)} &nbsp;·&nbsp; ${esc(n.cat)}</p><div class="card-bottom">${progress(n)}<button class="btn secondary full" onclick="navigate('need',${n.id})">Ver necessidade ↗</button></div></div></article>`;
}

function institutionCard(org) {
  return `<article class="card institution-card"><div class="art" style="background:${org.bg}">${org.emoji}</div><div class="body"><h3>${esc(org.name)}</h3><p class="muted small" style="margin:0 0 10px">⌖ ${esc(org.city)} · ${esc(org.cat)}</p><p>${esc(org.desc)}</p><div class="small" style="color:#27804c;margin-bottom:13px">♡ ${org.abertas} ${org.abertas === 1 ? 'necessidade aberta' : 'necessidades abertas'}</div><button class="btn full" onclick="openInstitution(${org.id})">Conhecer instituição ↗</button></div></article>`;
}

function carregando() {
  return '<div class="container"><div class="card empty-state" style="margin:60px auto"><h3>Carregando...</h3></div></div>';
}

/* ---------- Telas públicas ---------- */

// RF-06: landing pública com "Como funciona" e instituições em destaque.
function home() {
  const destaques = dados.destaques || [];
  return `<section class="hero"><div class="container hero-inner"><div><div class="eyebrow">✳ Conexões que transformam</div><h1 class="h1">Sua vontade de ajudar encontra <span style="color:var(--green)">quem precisa.</span></h1><p class="lead">Conectamos pessoas e instituições. Veja do que cada instituição precisa, prometa a sua doação e acompanhe até a entrega.</p><div class="hero-actions"><button class="btn" onclick="navigate('explore')">Encontrar onde doar →</button><button class="btn secondary" onclick="openAuth('instituicao','register')">Sou uma instituição</button></div></div><div class="hero-visual"><div class="photo main">🤝</div><div class="photo accent">💚</div><div class="float-box first">🌿 <strong>Uma conexão pode mudar tudo</strong><br><span class="muted small">Faça parte dessa rede</span></div><div class="float-box second">✅ <strong>Doação entregue!</strong><br><span class="muted small">A instituição confirma o recebimento</span></div></div></div></section><div class="strip"><div class="container stripin"><div><span class="iconround dark">♡</span><span><strong>Doações com propósito</strong><br><small>Ajude em necessidades reais</small></span></div><div><span class="iconround dark">◈</span><span><strong>Mais transparência</strong><br><small>Acompanhe o andamento</small></span></div><div><span class="iconround dark">⌖</span><span><strong>Perto de você</strong><br><small>Filtre por cidade e causa</small></span></div></div></div><section class="section"><div class="container"><div class="section-top"><div><div class="eyebrow">Faça a diferença hoje</div><h2>Instituições em destaque</h2><p class="muted">Instituições com mais necessidades abertas.</p></div><button class="btn secondary" onclick="navigate('explore')">Ver todas as necessidades →</button></div>${destaques.length ? `<div class="grid3">${destaques.map(institutionCard).join('')}</div>` : `<div class="card empty-state"><p class="muted">Nenhuma instituição cadastrada ainda.</p></div>`}</div></section><section class="section" style="padding-top:10px;background:#f3f7f2"><div class="container"><div class="section-top"><div><div class="eyebrow">Simples e transparente</div><h2>Como funciona?</h2></div></div><div class="grid3 steps"><div class="step"><span class="num">01 ✦</span><h3>Encontre uma causa</h3><p>Busque instituições e necessidades por nome, cidade, tipo ou prioridade.</p></div><div class="step"><span class="num">02 ✦</span><h3>Prometa sua doação</h3><p>Escolha a necessidade e a quantidade. O sistema não aceita mais do que falta.</p></div><div class="step"><span class="num">03 ✦</span><h3>Acompanhe até a entrega</h3><p>A doação passa de Prometida para A caminho e Entregue, conforme a instituição confirma.</p></div></div></div></section><section class="section"><div class="container"><div class="cta-banner"><div><div class="eyebrow" style="color:#9ed9af">Juntos somos mais fortes</div><h2>Representa uma instituição?</h2><p style="color:#bcd3c6;margin:0">Divulgue necessidades e conecte sua causa a novos apoiadores.</p></div><button class="btn gold" onclick="openAuth('instituicao','register')">Cadastrar instituição →</button></div></div></section>`;
}

// RF-08 e RF-09: busca e filtros feitos no navegador.
function explore() {
  const needs = dados.needs || [];
  const filtered = needs.filter((n) => (state.filter === 'Todos' || n.kind === state.filter)
    && (state.priority === 'Todas' || n.urg === state.priority)
    && (!state.city || n.city === state.city)
    && `${n.title} ${n.org} ${n.cat}`.toLowerCase().includes(state.search.toLowerCase()));
  if (state.order === 'urgent') filtered.sort((a, b) => Number(b.urg === 'Alta prioridade') - Number(a.urg === 'Alta prioridade'));
  if (state.order === 'recent') filtered.sort((a, b) => b.id - a.id);
  const locations = ['', ...new Set(needs.map((n) => n.city).filter((c) => c !== NAO_INFORMADO))];
  return `<div class="container"><div class="page-head"><div class="eyebrow">Encontre uma forma de ajudar</div><h1>Explorar necessidades</h1><p class="muted">Pessoas reais podem fazer a diferença com pequenos gestos.</p></div><div class="filters-layout"><aside class="card filter-card"><div class="spread"><h3 style="margin:0">Filtros</h3><button class="clear-btn" onclick="clearFilters()">Limpar</button></div><div class="filter-divider"></div><div role="group" aria-label="Tipo de doação"><label class="label">Tipo de doação</label>${['Todos', 'Itens', 'Serviços', 'Financeira'].map((x) => `<div style="padding:7px 0;font-size:14px"><label><input type="radio" name="kind" ${state.filter === x ? 'checked' : ''} onchange="state.filter='${x}';render()" style="accent-color:#277454;margin-right:8px">${x}</label></div>`).join('')}</div><div class="filter-divider"></div><div class="field-group"><label class="label" for="filter-city">Localização</label><select id="filter-city" class="field" onchange="state.city=this.value;render()">${locations.map((x) => `<option value="${esc(x)}" ${state.city === x ? 'selected' : ''}>${esc(x || 'Todas as cidades')}</option>`).join('')}</select></div><div class="field-group"><label class="label" for="filter-priority">Prioridade</label><select id="filter-priority" class="field" onchange="state.priority=this.value;render()"><option value="Todas">Todas</option><option value="Alta prioridade" ${state.priority === 'Alta prioridade' ? 'selected' : ''}>Alta</option><option value="Moderada" ${state.priority === 'Moderada' ? 'selected' : ''}>Moderada</option></select></div><div class="callout"><strong>💚 Toda ajuda importa</strong><div class="small" style="margin-top:7px">Não sabe por onde começar? Veja as necessidades com alta prioridade.</div></div></aside><div><form class="searchbar" style="margin-bottom:18px" onsubmit="event.preventDefault();state.search=$('#need-search').value;render()"><input id="need-search" value="${esc(state.search)}" placeholder="Buscar por necessidade, causa ou instituição..." aria-label="Pesquisar necessidades"><button class="btn" type="submit">⌕ Buscar</button></form><div class="results-head"><div><strong>${filtered.length} ${filtered.length === 1 ? 'necessidade encontrada' : 'necessidades encontradas'}</strong></div><select class="field" style="width:185px" aria-label="Ordenar necessidades" onchange="state.order=this.value;render()"><option value="relevant" ${state.order === 'relevant' ? 'selected' : ''}>Mais relevantes</option><option value="urgent" ${state.order === 'urgent' ? 'selected' : ''}>Mais urgentes</option><option value="recent" ${state.order === 'recent' ? 'selected' : ''}>Mais recentes</option></select></div>${filtered.length ? `<div class="grid3">${filtered.map(needCard).join('')}</div>` : `<div class="card empty-state"><div style="font-size:38px">🔎</div><h3>Nenhum resultado encontrado</h3><p class="muted">Tente alterar os filtros ou a busca.</p><button class="btn secondary" onclick="clearFilters()">Limpar filtros</button></div>`}</div></div></div>`;
}

function clearFilters() {
  state.filter = 'Todos'; state.city = ''; state.priority = 'Todas'; state.search = ''; state.order = 'relevant';
  render();
}

// RF-07: listagem de instituições com busca e filtro por causa.
function institutionsPage() {
  const categories = ['Todas', ...CATEGORIAS_INSTITUICAO];
  const filtered = (dados.instituicoes || []).filter((x) => (state.orgCategory === 'Todas' || x.cat === state.orgCategory)
    && `${x.name} ${x.cat} ${x.city}`.toLowerCase().includes(state.orgSearch.toLowerCase()));
  return `<div class="container"><div class="page-head"><div class="eyebrow">Faça parte dessa rede</div><h1>Instituições que transformam vidas</h1><p class="muted">Conheça organizações, descubra suas causas e escolha quem apoiar.</p></div><form class="searchbar" onsubmit="event.preventDefault();state.orgSearch=$('#org-search').value;render()"><input id="org-search" value="${esc(state.orgSearch)}" aria-label="Buscar instituição" placeholder="Buscar por nome, causa ou cidade..."><button type="submit" class="btn">Buscar</button></form><div class="pills" style="margin:19px 0 25px">${categories.map((c) => `<button class="pill ${state.orgCategory === c ? 'on' : ''}" onclick="state.orgCategory='${c}';render()">${c}</button>`).join('')}</div><div class="spread" style="margin-bottom:18px"><div><strong>${filtered.length} ${filtered.length === 1 ? 'instituição encontrada' : 'instituições encontradas'}</strong></div></div>${filtered.length ? `<div class="institution-grid" style="margin-bottom:70px">${filtered.map(institutionCard).join('')}</div>` : `<div class="card empty-state"><h3>Nenhuma instituição encontrada</h3><button class="btn secondary" onclick="state.orgCategory='Todas';state.orgSearch='';render()">Limpar filtros</button></div>`}</div>`;
}

// RF-10 e RF-18: perfil da instituição com necessidades e progresso.
function institution() {
  const { org, needs } = dados.detalhes[state.selectedOrg];
  return `<div class="container"><div class="crumb"><a onclick="navigate('home')">Início</a> / <a onclick="navigate('institutions')">Instituições</a> / ${esc(org.name)}</div><section class="institution-hero"><div class="avatar lg" style="background:${org.bg}">${org.emoji}</div><div style="flex:1"><div class="row" style="flex-wrap:wrap"><h1>${esc(org.name)}</h1></div><p class="muted" style="margin:7px 0">${esc(org.desc)}</p><div class="small muted">⌖ ${esc(org.city)} · ♡ ${esc(org.cat)}</div></div></section><div class="detail-grid" style="padding-top:33px"><section><h2 style="font-size:25px">Necessidades</h2>${needs.length ? `<div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(205px,1fr))">${needs.map(needCard).join('')}</div>` : '<p class="muted">Esta instituição ainda não publicou necessidades.</p>'}</section><aside class="card side-card"><h3>Informações da instituição</h3><div class="info-row">⌖ &nbsp; ${esc(org.address)}</div><div class="info-row">♡ &nbsp; Atuação: ${esc(org.cat)}</div><div class="info-row">✆ &nbsp; ${esc(org.phone)}</div><div class="info-row">✉ &nbsp; ${esc(org.email)}</div><div class="divider"></div><button class="btn secondary full" onclick="navigate('institutions')">← Ver outras instituições</button></aside></div></div>`;
}

function needDetail() {
  const n = byNeed(state.selected);
  if (!n) return '<div class="container"><div class="card empty-state"><h3>Necessidade não encontrada</h3><button class="btn secondary" onclick="navigate(\'explore\')">Voltar</button></div></div>';
  const org = dados.detalhes[n.orgId].org;
  const outras = dados.needs.filter((x) => x.id !== n.id).slice(0, 3);
  return `<div class="container"><div class="crumb"><a onclick="navigate('home')">Início</a> / <a onclick="navigate('explore')">Necessidades</a> / ${esc(n.title)}</div><div class="detail-grid"><div><div class="detail-cover" style="background:${n.bg}">${n.emoji}</div><div class="detail-body"><div class="row" style="margin-bottom:16px">${tag(n.urg)}<span class="tag grey">${esc(n.kind)}</span><span class="tag grey">${esc(n.cat)}</span></div><h1 style="font-size:38px;letter-spacing:-1.5px;margin-bottom:8px">${esc(n.title)}</h1><p class="muted">⌖ ${esc(n.city)}${n.deadline ? ` · Prazo: ${esc(fmtData(n.deadline + 'T12:00'))}` : ''}</p><div class="divider"></div><h2 style="font-size:24px">Sobre essa necessidade</h2><p class="muted" style="line-height:1.85">${esc(n.desc)}</p><h2 style="font-size:24px;margin-top:25px">Como você pode ajudar?</h2><p class="muted">Clique em “Quero ajudar” para prometer sua doação. A instituição aceita a proposta e confirma quando receber. Recebimento: ${esc(n.receipt)}.</p><div style="background:#f0f6ef;padding:19px;border-radius:15px;margin-top:25px"><div class="row"><span class="iconround">${org.emoji}</span><div><strong>${esc(n.org)}</strong><div class="small muted">Instituição responsável</div></div><button class="btn ghost sm" style="margin-left:auto" onclick="openInstitution(${org.id})">Ver perfil →</button></div></div></div></div><aside class="card side-card"><div class="eyebrow">Uma ajuda que transforma</div><h3 style="font-size:24px;margin:12px 0">Progresso da necessidade</h3>${progress(n)}<p class="small muted" style="margin:16px 0 22px">Ainda faltam ${fmt(n.faltante)}.</p>${n.faltante > 0 ? `<button class="btn full" onclick="goDonate(${n.id})">♡ Quero ajudar →</button>` : '<p class="tag">Necessidade atendida</p>'}<div class="divider"></div><div class="row"><span class="iconround">✓</span><div class="small"><strong>Transparência em cada etapa</strong><br><span class="muted">Acompanhe em Minhas doações.</span></div></div></aside></div>${outras.length ? `<section class="section" style="padding-top:0"><h2 style="font-size:25px">Outras formas de ajudar</h2><div class="grid3">${outras.map(needCard).join('')}</div></section>` : ''}</div>`;
}

/* ---------- Doação (RF-19, RN-02) ---------- */

function donate() {
  const n = byNeed(state.selected);
  if (!n) return needDetail();
  const sessao = obterSessao();
  const financial = n.kind === 'Financeira';
  const service = n.kind === 'Serviços';
  const measure = financial ? 'Valor da contribuição (R$)' : service ? 'Disponibilidade (horas)' : 'Quantidade';
  return `<div class="container"><div class="crumb"><a onclick="navigate('explore')">Explorar</a> / <a onclick="navigate('need',${n.id})">${esc(n.title)}</a> / Oferecer doação</div><div class="page-head" style="padding-top:10px"><div class="eyebrow">Um gesto de carinho</div><h1>Vamos fazer a diferença?</h1><p class="muted">Preencha as informações para a instituição saber como receber sua ajuda.</p></div><div class="form-layout"><form class="card form-card" onsubmit="submitDonation(event)"><div class="stepper"><i class="on"></i><i class="on"></i><i></i></div><h3>1. Sobre sua doação</h3><div class="formgrid"><div class="field-group"><label class="label">Tipo de doação</label><input class="field" value="${esc(n.kind)}" readonly title="Definido pela necessidade selecionada"></div><div class="field-group"><label class="label" for="amount">${measure} *</label><input id="amount" name="amount" class="field" type="number" step="1" required min="1" max="${n.faltante}" placeholder="Até ${fmt(n.faltante)}"></div></div><div class="field-group"><label class="label" for="description">Detalhes do que deseja ${service ? 'oferecer' : 'doar'}</label><textarea id="description" name="description" class="field" placeholder="${financial ? 'Observações sobre sua contribuição...' : service ? 'Dias, horários e disponibilidade...' : 'Itens que deseja doar e condições de entrega...'}"></textarea></div><div class="divider"></div><h3>2. Como podemos falar com você?</h3><div class="formgrid"><div class="field-group"><label class="label" for="donorName">Nome</label><input class="field" id="donorName" value="${esc(sessao.perfil.nome)}" readonly></div><div class="field-group"><label class="label" for="donorEmail">E-mail</label><input class="field" id="donorEmail" type="email" value="${esc(sessao.email || '')}" readonly></div><div class="field-group"><label class="label" for="donorPhone">Telefone</label><input class="field" id="donorPhone" name="donorPhone" type="tel" placeholder="(35) 99999-9999"></div><div class="field-group"><label class="label" for="delivery">${financial ? 'Forma de contribuição' : service ? 'Forma de participação' : 'Forma preferida de entrega'}</label><select id="delivery" name="delivery" class="field"><option>Combinar com a instituição</option><option>${financial ? 'Entrar em contato para orientações' : service ? 'Participar presencialmente' : 'Levar até a instituição'}</option></select></div></div><label class="row small muted" style="margin:10px 0 23px;align-items:start"><input type="checkbox" id="consent" name="consent" required style="accent-color:#277454;margin-top:4px"><span>Concordo em compartilhar estes dados com a instituição para organizar a doação.</span></label><button class="btn full" type="submit">Confirmar promessa de doação →</button><p class="small muted" style="text-align:center;margin:12px 0 0">A doação começa como Prometida e depende da confirmação da instituição.</p></form><aside class="card side-card"><h3>Resumo da sua contribuição</h3><div class="row" style="margin:20px 0"><div class="avatar" style="font-size:25px">${n.emoji}</div><div><strong>${esc(n.title)}</strong><div class="small muted">${esc(n.org)}</div></div></div><div class="divider"></div><div class="summary-line"><span class="muted">Tipo</span><strong>${esc(n.kind)}</strong></div><div class="summary-line"><span class="muted">Ainda falta</span><strong>${fmt(n.faltante)}</strong></div><div class="summary-line"><span class="muted">Status inicial</span>${tag('Prometida')}</div><div class="divider"></div><p class="small muted">🔒 Telefone, entrega e detalhes ficam salvos neste navegador. A API guarda a necessidade, a quantidade e o status.</p></aside></div></div>`;
}

async function submitDonation(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const n = byNeed(state.selected);
  const data = new FormData(form);
  const quantidade = Number(data.get('amount'));
  if (!Number.isInteger(quantidade) || quantidade < 1) { toast('Informe uma quantidade inteira maior que zero.'); return; }
  try {
    const { id } = await api('/doacoes', { metodo: 'POST', corpo: { necessidade_id: n.id, quantidade } });
    salvarExtras('doacao', id, { kind: n.kind, phone: data.get('donorPhone'), delivery: data.get('delivery'), details: data.get('description') });
    dados = {};
    await navigate('tracking');
    state.openHistory = id;
    render();
    toast('Doação prometida! Acompanhe em Minhas doações.');
  } catch (erro) { tratarErro(erro); }
}

/* ---------- Minhas doações (RF-20, RF-21) ---------- */

function tracking() {
  const doacoes = dados.minhas || [];
  return `<div class="container"><div class="page-head"><div class="eyebrow">Acompanhe cada gesto</div><h1>Minhas doações</h1><p class="muted">Veja seu histórico e o andamento de cada contribuição.</p></div><div class="card" style="padding:26px;margin-bottom:65px"><div class="results-head"><div><h3 style="margin:0">Histórico de doações</h3><p class="small muted" style="margin:5px 0 0">${doacoes.length} ${doacoes.length === 1 ? 'registro' : 'registros'}</p></div><button class="btn secondary sm" onclick="navigate('explore')">Explorar necessidades →</button></div>${doacoes.length ? `<div class="table-card"><table class="table" style="min-width:700px"><thead><tr><th>Número</th><th>Necessidade</th><th>Instituição</th><th>Data</th><th>Status</th><th>Detalhes</th></tr></thead><tbody>${doacoes.map((x) => `<tr><td><strong>#${x.id}</strong></td><td>${esc(x.item)} · ${fmt(x.quantidade)}</td><td>${esc(x.instituicao_nome)}</td><td>${esc(fmtData(x.dataPromessa))}</td><td>${tag(x.status)}</td><td><button class="btn secondary sm" onclick="showHistory(${x.id})">Ver mais</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Você ainda não prometeu nenhuma doação.</p>'}</div></div>`;
}

function showHistory(id) { state.openHistory = Number(id); render(); }
function closeModal() { state.openHistory = null; render(); }

function historyModal() {
  if (!state.openHistory || !dados.minhas) return '';
  const d = dados.minhas.find((x) => x.id === state.openHistory);
  if (!d) return '';
  const x = extrasDe('doacao', d.id);
  const stages = [['Prometida', 'Você registrou a promessa.'], ['A caminho', 'A instituição aceitou a proposta.'], ['Entregue', 'A instituição confirmou o recebimento.']];
  const maxStage = { 'Prometida': 0, 'A caminho': 1, 'Entregue': 2 }[d.status] ?? -1;
  const podeCancelar = d.status === 'Prometida' || d.status === 'A caminho';
  return `<div class="modal-backdrop" onclick="if(event.target===this)closeModal()"><section class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-top"><div><h2 id="modal-title" style="font-size:27px;margin:0">Detalhes da doação</h2><div class="muted small">#${d.id} · ${esc(fmtData(d.dataPromessa))}</div></div><button class="icon-button" aria-label="Fechar detalhes" onclick="closeModal()">×</button></div><h3 style="font-size:21px">${esc(d.item)}</h3><p class="muted">${esc(d.instituicao_nome)}</p><div class="spread statusline"><strong>Status atual</strong>${tag(d.status)}</div><p class="small muted">Quantidade: ${fmt(d.quantidade)}${x.delivery ? ` · ${esc(x.delivery)}` : ''}</p><h3 style="margin-top:24px">Linha do tempo</h3><div class="timeline">${stages.map(([nome, texto], i) => `<div class="event ${i <= maxStage ? 'done' : ''}"><div class="dot">${i <= maxStage ? '✓' : i + 1}</div><div><strong>${nome}</strong><p>${i <= maxStage ? texto : 'Aguardando a instituição'}</p></div></div>`).join('')}</div>${d.status === 'Cancelada' ? '<p class="tag red">Doação cancelada. A quantidade voltou para a necessidade.</p>' : ''}<div class="divider"></div><div class="spread"><button class="btn secondary" onclick="closeModal()">Fechar</button>${podeCancelar ? `<button class="btn ghost" onclick="cancelarDoacao(${d.id})">Cancelar doação</button>` : ''}<button class="btn" onclick="closeModal();openInstitution(${d.instituicao_id})">Ver instituição →</button></div></section></div>`;
}

async function cancelarDoacao(id) {
  if (!confirm('Cancelar esta doação? A quantidade volta para a necessidade.')) return;
  try {
    await api(`/doacoes/${id}/cancelar`, { metodo: 'PATCH' });
    state.openHistory = null;
    await recarregar();
    toast('Doação cancelada.');
  } catch (erro) { tratarErro(erro); }
}

function donorProfile() {
  const sessao = obterSessao();
  const doacoes = dados.minhas || [];
  const pending = doacoes.filter((x) => x.status === 'Prometida' || x.status === 'A caminho').length;
  const complete = doacoes.filter((x) => x.status === 'Entregue').length;
  return `<div class="container"><section class="profile-hero"><div class="eyebrow">Minha conta</div><h1>Meu perfil</h1><p class="muted">Acompanhe suas contribuições.</p></section><div class="card profile-header" style="padding:20px"><div class="avatar" style="background:#153b31;color:#fff">${esc(iniciais(sessao.perfil.nome))}</div><div style="flex:1"><h2>${esc(sessao.perfil.nome)}</h2><div class="muted small">Doador</div></div><button class="btn secondary" onclick="navigate('tracking')">Minhas doações →</button></div><div class="grid3 profile-stats"><div class="statbox"><strong>${doacoes.length}</strong><span class="caption">Doações registradas</span></div><div class="statbox"><strong>${pending}</strong><span class="caption">Em andamento</span></div><div class="statbox"><strong>${complete}</strong><span class="caption">Entregues</span></div></div><div class="profile-panel"><div class="card"><h3>Informações da conta</h3><div class="info-row">Nome: ${esc(sessao.perfil.nome)}</div><div class="info-row">E-mail: ${esc(sessao.email || NAO_INFORMADO)}</div></div><div class="card"><h3>Últimas doações</h3>${doacoes.slice(0, 3).map((x) => `<p class="small"><strong>${esc(x.item)}</strong><br><span class="muted">${esc(x.status)}</span></p>`).join('') || '<p class="small muted">Nenhuma doação ainda.</p>'}<button class="btn full" onclick="navigate('tracking')">Acompanhar doações →</button></div></div><div style="margin:25px 0 70px"><button class="btn secondary" onclick="logout()">Sair da conta</button></div></div>`;
}

/* ---------- Entrar e criar conta (RF-01, RF-02, RF-03) ---------- */

function changeAuthRole(value) { state.authRole = value; render(); }

function auth() {
  const role = state.authRole;
  const login = state.authTab === 'login';
  const inst = role === 'instituicao';
  const campos = login
    ? `<div class="field-group"><label class="label" for="authEmail">E-mail</label><input id="authEmail" class="field" type="email" required autocomplete="email"></div><div class="field-group"><label class="label" for="authSenha">Senha</label><input id="authSenha" class="field" type="password" required autocomplete="current-password"></div>`
    : `<div class="field-group"><label class="label" for="authRole">Cadastrar como</label><select class="field" id="authRole" onchange="changeAuthRole(this.value)"><option value="doador" ${!inst ? 'selected' : ''}>Doador</option><option value="instituicao" ${inst ? 'selected' : ''}>Instituição</option></select></div><div class="field-group"><label class="label" for="registerName">${inst ? 'Nome da instituição' : 'Nome completo'} *</label><input id="registerName" class="field" required maxlength="255"></div>${inst ? `<div class="field-group"><label class="label" for="registerDesc">Sobre a instituição</label><textarea id="registerDesc" class="field" placeholder="O que a instituição faz e para quem."></textarea></div><div class="formgrid"><div class="field-group"><label class="label" for="registerCity">Cidade</label><input id="registerCity" class="field" placeholder="Ex.: Lavras, MG"></div><div class="field-group"><label class="label" for="registerCat">Causa</label><select id="registerCat" class="field">${CATEGORIAS_INSTITUICAO.map((c) => `<option>${c}</option>`).join('')}</select></div><div class="field-group"><label class="label" for="registerItem">Primeira necessidade (opcional)</label><input id="registerItem" class="field" placeholder="Ex.: Cobertores"></div><div class="field-group"><label class="label" for="registerQtd">Quantidade</label><input id="registerQtd" class="field" type="number" min="1" step="1"></div></div>` : ''}<div class="field-group"><label class="label" for="authEmail">E-mail *</label><input id="authEmail" class="field" type="email" required autocomplete="email"></div><div class="formgrid"><div class="field-group"><label class="label" for="authSenha">Senha *</label><input id="authSenha" class="field" type="password" required autocomplete="new-password"></div><div class="field-group"><label class="label" for="authConfirmar">Confirmar senha *</label><input id="authConfirmar" class="field" type="password" required autocomplete="new-password"></div></div>`;
  return `<div class="auth-wrap"><div class="auth-art"><span class="eyebrow" style="color:#a7dcaf">Pertencer é fazer parte</span><h1>A solidariedade começa com uma conexão.</h1><p style="color:#c3dfcb;max-width:395px;font-size:17px">Participe de uma rede de pessoas que acreditam no poder de ajudar.</p><div style="font-size:105px;margin-top:20px">🤝</div><div class="small" style="color:#b2d9bc">✳ Conectando boas intenções a necessidades reais.</div></div><div class="auth-box"><div class="eyebrow">Bem-vindo à Conectação</div><h2 style="font-size:32px;margin:8px 0 9px">${login ? 'Que bom ter você aqui!' : 'Faça parte dessa rede'}</h2><p class="muted small" style="margin-bottom:24px">${login ? 'Entre com o e-mail e a senha da sua conta.' : 'Crie uma conta de doador ou de instituição.'}</p><div class="auth-tab"><button class="${login ? 'active' : ''}" onclick="state.authTab='login';render()">Entrar</button><button class="${!login ? 'active' : ''}" onclick="state.authTab='register';render()">Criar conta</button></div><form onsubmit="${login ? 'signIn(event)' : 'register(event)'}">${campos}<button class="btn full" style="margin-top:8px" type="submit">${login ? 'Entrar na minha conta' : 'Criar conta'} →</button></form></div></div>`;
}

async function entrar(email, senha) {
  const sessao = await api('/login', { metodo: 'POST', corpo: { email, senha }, autenticado: false });
  salvarSessao({ ...sessao, email: email.trim().toLowerCase() });
  dados = {};
  return sessao;
}

function seguirDepoisDoLogin() {
  const instituicao = papel() === 'instituicao';
  const target = instituicao ? 'dashboard' : state.pendingNeed ? 'donate' : 'explore';
  const id = state.pendingNeed;
  state.pendingNeed = null;
  navigate(target, id);
}

async function signIn(event) {
  event.preventDefault();
  try {
    await entrar($('#authEmail').value, $('#authSenha').value);
    seguirDepoisDoLogin();
    toast(papel() === 'instituicao' ? 'Bem-vindo ao painel da instituição!' : 'Login realizado.');
  } catch (erro) { toast(erro.message); }
}

async function register(event) {
  event.preventDefault();
  const email = $('#authEmail').value;
  const senha = $('#authSenha').value;
  const confirmarSenha = $('#authConfirmar').value;
  const nome = $('#registerName').value;
  try {
    if (state.authRole === 'instituicao') {
      const item = $('#registerItem').value.trim();
      const quantidade = $('#registerQtd').value;
      await api('/cadastro/instituicao', {
        metodo: 'POST', autenticado: false,
        corpo: {
          acesso: { email, senha, confirmarSenha },
          sobre: { nome, descricao: $('#registerDesc').value },
          necessidadesIniciais: item || quantidade ? [{ item, quantidade }] : []
        }
      });
      const sessao = await entrar(email, senha);
      salvarExtras('inst', sessao.perfil.id, { city: $('#registerCity')?.value.trim() || '', cat: $('#registerCat')?.value || 'Outros' });
    } else {
      await api('/cadastro/doador', { metodo: 'POST', autenticado: false, corpo: { nome, email, senha, confirmarSenha } });
      await entrar(email, senha);
    }
    seguirDepoisDoLogin();
    toast('Conta criada!');
  } catch (erro) { toast(erro.message); }
}

/* ---------- Área da instituição (RF-14, RF-22, RF-23) ---------- */

function minhaInstituicao() { return dados.detalhes[obterSessao().perfil.id]; }

function sidebar() {
  const sessao = obterSessao();
  const cat = extrasDe('inst', sessao.perfil.id).cat || 'Outros';
  return `<aside class="sidebar"><div class="org"><div class="row"><div class="avatar">${VISUAL[cat][0]}</div><div class="org-name"><strong style="font-size:13px">${esc(sessao.perfil.nome)}</strong><br><small class="muted">Conta da instituição</small></div></div></div><button class="side-link ${state.view === 'dashboard' ? 'active' : ''}" onclick="navigate('dashboard')">▦ <span class="side-label">Visão geral</span></button><button class="side-link ${state.view === 'manage' ? 'active' : ''}" onclick="navigate('manage')">♡ <span class="side-label">Doações recebidas</span></button><button class="side-link ${state.view === 'create' ? 'active' : ''}" onclick="navigate('create')">⊞ <span class="side-label">Nova necessidade</span></button><div class="side-ender">💚 <strong>Obrigado por transformar vidas!</strong></div></aside>`;
}

function dashboard() {
  const { org, needs } = minhaInstituicao();
  const proposals = dados.recebidas || [];
  const conta = (s) => proposals.filter((x) => x.status === s).length.toString().padStart(2, '0');
  const ativas = needs.filter((n) => n.faltante > 0);
  return `<div class="work-area">${sidebar()}<main class="workspace"><div class="heading"><div><div class="eyebrow">Painel da instituição</div><h1>Olá, ${esc(org.name)}!</h1><div class="muted">Veja as doações e o progresso das suas necessidades.</div></div><button class="btn" onclick="navigate('create')">+ Nova necessidade</button></div><div class="grid4" style="margin-bottom:25px"><div class="card metric-card"><div class="muted small">Necessidades abertas</div><div class="num">${ativas.length.toString().padStart(2, '0')}</div><span class="tag">Divulgadas</span></div><div class="card metric-card"><div class="muted small">Doações prometidas</div><div class="num">${conta('Prometida')}</div><span class="tag urgent">Aguardando resposta</span></div><div class="card metric-card"><div class="muted small">Doações entregues</div><div class="num">${conta('Entregue')}</div><span class="tag">Concluídas</span></div><div class="card metric-card"><div class="muted small">Doações registradas</div><div class="num">${proposals.length.toString().padStart(2, '0')}</div><span class="tag blue">Comunidade</span></div></div><div class="dashboard-cols"><div class="card"><div class="spread" style="padding:23px 23px 10px"><h3 style="margin:0">Doações recentes</h3><button class="btn ghost sm" onclick="navigate('manage')">Ver todas →</button></div><div class="table-card"><table class="table"><thead><tr><th>Doador</th><th>Doação</th><th>Status</th></tr></thead><tbody>${proposals.slice(0, 4).map((x) => `<tr><td><strong>${esc(x.doador_nome)}</strong><small>${esc(fmtData(x.dataPromessa))}</small></td><td>${esc(x.item)} · ${fmt(x.quantidade)}</td><td>${tag(x.status)}</td></tr>`).join('') || '<tr><td colspan="3" class="muted">Nenhuma doação ainda.</td></tr>'}</tbody></table></div></div><div class="card" style="padding:24px"><h3>Progresso das necessidades</h3>${needs.map((n) => `<div style="margin:21px 0"><div class="spread"><strong class="small">${esc(n.title)}</strong><span class="muted small">${fmt(n.qty)} de ${fmt(n.total)} · ${pct(n)}%</span></div><div class="progress" style="margin-top:12px"><i style="width:${pct(n)}%"></i></div></div>`).join('') || '<p class="small muted">Nenhuma necessidade publicada.</p>'}<button class="btn secondary full" onclick="navigate('create')">+ Adicionar necessidade</button></div></div></main></div>`;
}

function instProfile() {
  const { org, needs } = minhaInstituicao();
  const proposals = dados.recebidas || [];
  const pending = proposals.filter((x) => x.status === 'Prometida').length;
  const ativas = needs.filter((n) => n.faltante > 0).length;
  return `<div class="container"><div class="profile-back"><button class="btn secondary sm" onclick="navigate('dashboard')">← Voltar ao painel</button></div><section class="profile-hero"><div class="eyebrow">Área da instituição</div><h1>Perfil da instituição</h1><p class="muted">Sua identificação e as atividades da organização.</p></section><div class="card profile-header" style="padding:20px"><div class="avatar" style="background:#153b31;color:#fff">${esc(iniciais(org.name))}</div><div style="flex:1"><h2>${esc(org.name)}</h2><div class="muted small">Instituição · ${esc(org.cat)} · ${esc(org.city)}</div></div><button class="btn" onclick="navigate('instEdit')">Editar perfil ✎</button></div><div class="grid3 profile-stats"><div class="statbox"><strong>${ativas}</strong><span class="caption">Necessidades abertas</span></div><div class="statbox"><strong>${proposals.length}</strong><span class="caption">Doações registradas</span></div><div class="statbox"><strong>${proposals.filter((x) => x.status === 'Entregue').length}</strong><span class="caption">Doações entregues</span></div></div><div class="profile-panel"><div class="card"><h3>Dados institucionais</h3><div class="info-row">Nome: ${esc(org.name)}</div><div class="info-row">Sobre: ${esc(org.desc || NAO_INFORMADO)}</div><div class="info-row">CNPJ: ${esc(org.cnpj)}</div><div class="info-row">E-mail de contato: ${esc(org.email)}</div><div class="info-row">Telefone: ${esc(org.phone)}</div><div class="info-row">Endereço: ${esc(org.address)}</div></div><div class="card"><h3>Atividade institucional</h3><p class="small"><strong>Doações prometidas</strong><br><span class="muted">${pending} aguardando resposta</span></p><p class="small"><strong>Necessidades abertas</strong><br><span class="muted">${ativas}</span></p><button class="btn full" onclick="navigate('manage')">Gerenciar doações →</button></div></div><div style="margin:25px 0 60px"><button class="btn secondary" onclick="logout()">Sair da conta</button></div></div>`;
}

// Nome e descrição vêm do cadastro (API). Os outros campos ficam no navegador.
function instEdit() {
  const { org } = minhaInstituicao();
  const valor = (v) => esc(v === NAO_INFORMADO ? '' : v);
  return `<div class="container"><div class="profile-back"><button class="btn secondary sm" onclick="navigate('instProfile')">← Voltar ao perfil</button></div><section class="profile-hero"><div class="eyebrow">Área da instituição</div><h1>Editar perfil institucional</h1><p class="muted">Nome e descrição vêm do cadastro. Os demais dados ficam salvos neste navegador.</p></section><form class="card form-card" style="max-width:700px;margin:0 auto 70px" onsubmit="salvarPerfil(event)"><div class="field-group"><label class="label">Nome da instituição</label><input class="field" value="${esc(org.name)}" readonly></div><div class="formgrid"><div class="field-group"><label class="label" for="instCity">Cidade</label><input id="instCity" class="field" value="${valor(org.city)}"></div><div class="field-group"><label class="label" for="instCat">Causa</label><select id="instCat" class="field">${CATEGORIAS_INSTITUICAO.map((c) => `<option ${org.cat === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div><div class="field-group"><label class="label" for="instCnpj">CNPJ</label><input id="instCnpj" class="field" value="${valor(org.cnpj)}"></div><div class="field-group"><label class="label" for="instPhone">Telefone</label><input id="instPhone" class="field" type="tel" value="${valor(org.phone)}"></div></div><div class="field-group"><label class="label" for="instEmail">E-mail de contato</label><input id="instEmail" class="field" type="email" value="${valor(org.email)}"></div><div class="field-group"><label class="label" for="instAddress">Endereço</label><input id="instAddress" class="field" value="${valor(org.address)}"></div><div class="spread"><button type="button" class="btn secondary" onclick="navigate('instProfile')">Cancelar</button><button class="btn" type="submit">Salvar alterações ✓</button></div></form></div>`;
}

function salvarPerfil(event) {
  event.preventDefault();
  salvarExtras('inst', obterSessao().perfil.id, {
    city: $('#instCity').value.trim(), cat: $('#instCat').value, cnpj: $('#instCnpj').value.trim(),
    phone: $('#instPhone').value.trim(), email: $('#instEmail').value.trim(), address: $('#instAddress').value.trim()
  });
  dados = {};
  navigate('instProfile');
  toast('Perfil atualizado.');
}

function create() {
  return `<div class="work-area">${sidebar()}<main class="workspace"><div class="heading"><div><div class="eyebrow">Gestão de necessidades</div><h1>Publicar nova necessidade</h1><p class="muted">Conte à comunidade como ela pode ajudar.</p></div></div><div class="form-layout" style="max-width:1120px"><form class="card form-card" onsubmit="submitNewNeed(event)"><h3>Informações da necessidade</h3><div class="field-group"><label class="label" for="newTitle">Item necessário *</label><input id="newTitle" class="field" placeholder="Ex.: Kits de higiene para famílias" required maxlength="255"></div><div class="field-group"><label class="label" for="newDesc">Descrição</label><textarea id="newDesc" class="field" placeholder="O que é necessário, para quem é e por que essa contribuição é importante."></textarea></div><div class="formgrid"><div class="field-group"><label class="label" for="newKind">Tipo de doação</label><select id="newKind" class="field"><option>Itens</option><option>Serviços</option><option>Financeira</option></select></div><div class="field-group"><label class="label" for="newCategory">Categoria</label><select id="newCategory" class="field">${CATEGORIAS_NECESSIDADE.map((x) => `<option>${x}</option>`).join('')}</select></div><div class="field-group"><label class="label" for="newGoal">Quantidade ou meta *</label><input id="newGoal" class="field" type="number" min="1" step="1" placeholder="Ex.: 50" required></div><div class="field-group"><label class="label" for="newUrgency">Prioridade</label><select id="newUrgency" class="field"><option>Moderada</option><option>Alta prioridade</option></select></div><div class="field-group"><label class="label" for="newDeadline">Prazo desejado</label><input id="newDeadline" class="field" type="date"></div><div class="field-group"><label class="label" for="newReceipt">Local de recebimento</label><select id="newReceipt" class="field"><option>Endereço da instituição</option><option>A combinar</option></select></div></div><div class="divider"></div><div class="spread"><button class="btn secondary" type="button" onclick="navigate('dashboard')">Cancelar</button><button class="btn" type="submit">Publicar necessidade →</button></div></form><aside class="card side-card" style="position:static"><h3>💡 Dicas para uma boa publicação</h3><p class="small muted">Descrições claras ajudam os doadores a entender o que a instituição precisa.</p><div class="info-row">✓ Explique quem será beneficiado</div><div class="info-row">✓ Defina uma meta objetiva</div><div class="info-row">✓ Informe condições de recebimento</div><div class="divider"></div><p class="small muted">Item e quantidade vão para o servidor. Descrição, tipo, categoria, prioridade, prazo e local ficam salvos neste navegador.</p></aside></div></main></div>`;
}

async function submitNewNeed(event) {
  event.preventDefault();
  const item = $('#newTitle').value.trim();
  const quantidade = Number($('#newGoal').value);
  if (!item || !Number.isInteger(quantidade) || quantidade < 1) { toast('Informe o item e uma quantidade inteira maior que zero.'); return; }
  try {
    const { id } = await api('/instituicoes/necessidades', { metodo: 'POST', corpo: { item, quantidade } });
    salvarExtras('need', id, {
      desc: $('#newDesc').value.trim(), kind: $('#newKind').value, cat: $('#newCategory').value,
      urg: $('#newUrgency').value, deadline: $('#newDeadline').value, receipt: $('#newReceipt').value
    });
    dados = {};
    navigate('dashboard');
    toast('Necessidade publicada!');
  } catch (erro) { tratarErro(erro); }
}

function manage() {
  const proposals = dados.recebidas || [];
  const pending = proposals.filter((x) => x.status === 'Prometida').length;
  const received = proposals.filter((x) => x.status === 'Entregue').length;
  const acoes = (x) => (x.status === 'Prometida'
    ? `<button class="btn sm" onclick="updateProposal(${x.id},'aceitar')">Aceitar</button> <button class="btn ghost sm" onclick="updateProposal(${x.id},'recusar')">Recusar</button>`
    : x.status === 'A caminho'
      ? `<button class="btn sm" onclick="updateProposal(${x.id},'receber')">Confirmar recebimento</button>`
      : '<span class="small muted">Concluído</span>');
  return `<div class="work-area">${sidebar()}<main class="workspace"><div class="heading"><div><div class="eyebrow">Gestão de doações</div><h1>Doações recebidas</h1><p class="muted">Aceite, recuse e confirme o recebimento de cada doação.</p></div><button class="btn secondary" onclick="navigate('dashboard')">← Voltar ao painel</button></div><div class="grid3" style="margin-bottom:25px"><div class="statbox"><div class="caption">Total de doações</div><strong>${proposals.length}</strong></div><div class="statbox"><div class="caption">Aguardando resposta</div><strong>${pending}</strong></div><div class="statbox"><div class="caption">Entregues</div><strong>${received}</strong></div></div><div class="card"><div class="spread" style="padding:22px"><h3 style="margin:0">Doações da comunidade</h3><select id="statusfilter" class="field" style="width:210px" aria-label="Filtrar doações por status" onchange="filterProposals(this.value)"><option>Todos</option><option>Prometida</option><option>A caminho</option><option>Entregue</option><option>Cancelada</option></select></div><div class="table-card"><table class="table"><thead><tr><th>Número</th><th>Doador</th><th>Necessidade</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead><tbody>${proposals.map((x) => `<tr data-status="${esc(x.status)}"><td>#${x.id}</td><td><strong>${esc(x.doador_nome)}</strong><small>${fmt(x.quantidade)}</small></td><td>${esc(x.item)}</td><td>${esc(fmtData(x.dataPromessa))}</td><td>${tag(x.status)}</td><td>${acoes(x)}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">Nenhuma doação ainda.</td></tr>'}</tbody></table></div></div></main></div>`;
}

function filterProposals(value) {
  document.querySelectorAll('[data-status]').forEach((x) => { x.style.display = value === 'Todos' || x.dataset.status === value ? '' : 'none'; });
}

// RN-03 e RN-04: a instituição aceita, recusa ou confirma o recebimento.
async function updateProposal(id, acao) {
  try {
    const { status } = await api(`/doacoes/${id}/${acao}`, { metodo: 'PATCH' });
    await recarregar();
    toast(`Doação #${id} agora está ${status}.`);
  } catch (erro) { tratarErro(erro); }
}

/* ---------- Render ---------- */

function render() {
  const views = { home, explore, institutions: institutionsPage, institution, need: needDetail, donate, tracking, donorProfile, auth, dashboard, create, manage, instProfile, instEdit };
  if (AREA_INSTITUICAO.includes(state.view) && papel() !== 'instituicao') state.view = 'auth';
  if (state.view === 'donate' && papel() !== 'doador') state.view = 'auth';
  if (papel() === 'instituicao' && !AREA_INSTITUICAO.includes(state.view)) { navigate('dashboard'); return; }
  const content = state.carregando ? carregando : views[state.view] || home;
  const isInstitution = papel() === 'instituicao' && AREA_INSTITUICAO.includes(state.view);
  $('#app').innerHTML = header() + `<main class="view">${content()}</main>` + (isInstitution ? '' : footer()) + historyModal();
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.openHistory) closeModal(); });
navigate(papel() === 'instituicao' ? 'dashboard' : 'home');

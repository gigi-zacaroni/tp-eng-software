// CT-25: o front (src/front/app.js) servido pelo Express e as chamadas que ele
// faz à API. Sobe o app real e repete, na mesma ordem, as requisições das
// telas de cadastro, explorar, doar, minhas doações e painel da instituição.
// Só o MySQL é trocado pelo banco em memória (helpers/bancoFalso.js).
// Os hooks ficam dentro do describe por causa do DEF-01 (Node 18).

process.env.JWT_SECRET = 'segredo-de-teste';

const test = require('node:test');
const assert = require('node:assert/strict');
const bancoFalso = require('./helpers/bancoFalso');
const app = require('../src/server');

let servidor;
let base;
let db;

async function requisitar(metodo, caminho, { corpo, token } = {}) {
  const headers = {};
  if (corpo !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  const resposta = await fetch(base + caminho, {
    method: metodo,
    headers,
    body: corpo !== undefined ? JSON.stringify(corpo) : undefined
  });
  return { status: resposta.status, corpo: await resposta.json() };
}

// Mesmo corpo que a tela de cadastro do app.js monta para a instituição.
// A quantidade chega como texto, como sai de um <input type="number">.
async function cadastrarCasaEsperanca() {
  return requisitar('POST', '/cadastro/instituicao', {
    corpo: {
      acesso: { email: 'esperanca@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' },
      sobre: { nome: 'Casa Esperança', descricao: 'Apoio a famílias' },
      necessidadesIniciais: [{ item: 'Cobertores', quantidade: '40' }]
    }
  });
}

// Mesmo corpo que a tela de cadastro do app.js monta para o doador.
async function cadastrarEEntrarComoDoador() {
  await requisitar('POST', '/cadastro/doador', {
    corpo: { nome: 'Carla Teste', email: 'carla@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' }
  });
  const { corpo } = await requisitar('POST', '/login', { corpo: { email: 'carla@email.com', senha: 'segredo123' } });
  return corpo;
}

test.describe('CT-25: front servido e ligado à API', () => {
  test.before(async () => {
    await new Promise((resolve) => {
      servidor = app.listen(0, '127.0.0.1', resolve);
    });
    base = `http://127.0.0.1:${servidor.address().port}`;
  });
  test.after(async () => {
    await new Promise((resolve) => servidor.close(resolve));
  });
  test.beforeEach(() => { db = bancoFalso.instalar(); });
  test.afterEach(() => { db.restaurar(); });

  test('o Express serve a página única do front e os arquivos que ela carrega', async () => {
    for (const arquivo of ['/', '/index.html', '/app.js', '/style.css']) {
      const resposta = await fetch(base + arquivo);
      assert.equal(resposta.status, 200, arquivo);
    }
    const html = await (await fetch(base + '/')).text();
    const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    for (const src of scripts) {
      const resposta = await fetch(new URL(src, base + '/'));
      assert.equal(resposta.status, 200, `script carregado pelo index.html: ${src}`);
    }
  });

  test('cadastro pela tela: instituição e doador recebem 201 e o login devolve o perfil usado no cabeçalho', async () => {
    const instituicao = await cadastrarCasaEsperanca();
    assert.equal(instituicao.status, 201);

    const sessao = await cadastrarEEntrarComoDoador();
    assert.equal(sessao.tipo, 'doador');
    assert.equal(sessao.perfil.nome, 'Carla Teste');
    assert.ok(sessao.token);
  });

  test('listagem: sem sessão devolve 401 (a tela manda para o login); com sessão traz os campos dos cards', async () => {
    await cadastrarCasaEsperanca();
    const { token } = await cadastrarEEntrarComoDoador();

    const semToken = await requisitar('GET', '/instituicoes');
    assert.equal(semToken.status, 401);

    const { status, corpo } = await requisitar('GET', '/instituicoes', { token });
    assert.equal(status, 200);
    assert.equal(corpo.length, 1);
    assert.deepEqual(Object.keys(corpo[0]).sort(), ['id', 'necessidadesAbertas', 'nome', 'resumo', 'verificada']);
    assert.equal(corpo[0].necessidadesAbertas, 1);
  });

  test('detalhe e doação: quantidade acima do saldo é recusada; doação válida reduz o que falta', async () => {
    await cadastrarCasaEsperanca();
    const { token } = await cadastrarEEntrarComoDoador();
    const [instituicao] = (await requisitar('GET', '/instituicoes', { token })).corpo;

    const antes = (await requisitar('GET', `/instituicoes/${instituicao.id}`, { token })).corpo;
    const cobertores = antes.necessidades[0];
    assert.deepEqual(
      { desejado: cobertores.desejado, prometido: cobertores.prometido, faltante: cobertores.faltante },
      { desejado: 40, prometido: 0, faltante: 40 }
    );

    const acima = await requisitar('POST', '/doacoes', { token, corpo: { necessidade_id: cobertores.id, quantidade: 41 } });
    assert.equal(acima.status, 400);

    const valida = await requisitar('POST', '/doacoes', { token, corpo: { necessidade_id: cobertores.id, quantidade: 5 } });
    assert.equal(valida.status, 201);
    assert.ok(valida.corpo.id, 'a confirmação mostra o número da doação');

    const depois = (await requisitar('GET', `/instituicoes/${instituicao.id}`, { token })).corpo.necessidades[0];
    assert.equal(depois.faltante, 35);
    assert.equal(depois.prometido, 5);
    assert.equal(depois.percentualPrometido, 13);
  });

  test('instituição logada consulta o detalhe, mas a API recusa a doação (403)', async () => {
    await cadastrarCasaEsperanca();
    const { corpo: sessao } = await requisitar('POST', '/login', {
      corpo: { email: 'esperanca@email.com', senha: 'segredo123' }
    });
    assert.equal(sessao.tipo, 'instituicao');

    const detalhe = await requisitar('GET', `/instituicoes/${sessao.perfil.id}`, { token: sessao.token });
    assert.equal(detalhe.status, 200);

    const doacao = await requisitar('POST', '/doacoes', {
      token: sessao.token,
      corpo: { necessidade_id: detalhe.corpo.necessidades[0].id, quantidade: 1 }
    });
    assert.equal(doacao.status, 403);
  });

  test('minhas doações: o doador vê a doação e cancela; não existe rota para ele marcar como entregue', async () => {
    await cadastrarCasaEsperanca();
    const { token } = await cadastrarEEntrarComoDoador();
    const [instituicao] = (await requisitar('GET', '/instituicoes', { token })).corpo;
    const necessidade = (await requisitar('GET', `/instituicoes/${instituicao.id}`, { token })).corpo.necessidades[0];
    const { corpo: criada } = await requisitar('POST', '/doacoes', { token, corpo: { necessidade_id: necessidade.id, quantidade: 4 } });

    const minhas = await requisitar('GET', '/doacoes/minhas', { token });
    assert.equal(minhas.status, 200);
    assert.deepEqual(
      minhas.corpo.map((d) => [d.id, d.status, d.item, d.instituicao_nome]),
      [[criada.id, 'Prometida', 'Cobertores', 'Casa Esperança']]
    );

    const avancar = await requisitar('PATCH', `/doacoes/${criada.id}/avancar`, { token });
    assert.equal(avancar.status, 404, 'RN-04: só a instituição confirma');

    const cancelar = await requisitar('PATCH', `/doacoes/${criada.id}/cancelar`, { token });
    assert.equal(cancelar.status, 200);
    const depois = (await requisitar('GET', `/instituicoes/${instituicao.id}`, { token })).corpo.necessidades[0];
    assert.equal(depois.faltante, 40);
  });

  test('painel da instituição: recebidas, aceitar, receber, recusar e nova necessidade', async () => {
    await cadastrarCasaEsperanca();
    const { token: tokenDoador } = await cadastrarEEntrarComoDoador();
    const { corpo: inst } = await requisitar('POST', '/login', {
      corpo: { email: 'esperanca@email.com', senha: 'segredo123' }
    });
    const necessidade = (await requisitar('GET', `/instituicoes/${inst.perfil.id}`, { token: inst.token })).corpo.necessidades[0];
    const d1 = (await requisitar('POST', '/doacoes', { token: tokenDoador, corpo: { necessidade_id: necessidade.id, quantidade: 3 } })).corpo.id;
    const d2 = (await requisitar('POST', '/doacoes', { token: tokenDoador, corpo: { necessidade_id: necessidade.id, quantidade: 2 } })).corpo.id;

    const recebidas = await requisitar('GET', '/doacoes/recebidas', { token: inst.token });
    assert.equal(recebidas.status, 200);
    assert.deepEqual(recebidas.corpo.map((d) => [d.id, d.doador_nome, d.status]), [
      [d2, 'Carla Teste', 'Prometida'],
      [d1, 'Carla Teste', 'Prometida']
    ]);

    assert.equal((await requisitar('PATCH', `/doacoes/${d1}/receber`, { token: inst.token })).status, 409);
    assert.equal((await requisitar('PATCH', `/doacoes/${d1}/aceitar`, { token: inst.token })).corpo.status, 'A caminho');
    assert.equal((await requisitar('PATCH', `/doacoes/${d1}/receber`, { token: inst.token })).corpo.status, 'Entregue');
    assert.equal((await requisitar('PATCH', `/doacoes/${d2}/recusar`, { token: inst.token })).corpo.status, 'Cancelada');

    const aposRecusa = (await requisitar('GET', `/instituicoes/${inst.perfil.id}`, { token: inst.token })).corpo.necessidades[0];
    assert.equal(aposRecusa.faltante, 37, 'a recusa devolve 2 ao saldo; a entrega mantém os 3 abatidos');

    const nova = await requisitar('POST', '/instituicoes/necessidades', {
      token: inst.token,
      corpo: { item: 'Leite em pó', quantidade: 12 }
    });
    assert.equal(nova.status, 201);
    const itens = (await requisitar('GET', `/instituicoes/${inst.perfil.id}`, { token: tokenDoador })).corpo.necessidades.map((n) => n.item);
    assert.deepEqual(itens, ['Cobertores', 'Leite em pó']);
  });
});

// CT-25: páginas e chamadas das telas da Sprint 8 (cadastro, listagem,
// detalhe e confirmação). Sobe o app Express real e repete, na mesma ordem,
// as requisições que os módulos de src/front/js fazem. Só o MySQL é trocado
// pelo banco em memória (helpers/bancoFalso.js). Não precisa de MySQL.
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

// Mesmo corpo que js/cadastro.js monta a partir do formulário da instituição.
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

// Mesmo corpo que js/cadastro.js monta a partir do formulário do doador.
async function cadastrarEEntrarComoDoador() {
  await requisitar('POST', '/cadastro/doador', {
    corpo: { nome: 'Carla Teste', email: 'carla@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' }
  });
  const { corpo } = await requisitar('POST', '/login', { corpo: { email: 'carla@email.com', senha: 'segredo123' } });
  return corpo;
}

test.describe('CT-25: telas da Sprint 8 servidas e ligadas à API', () => {
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

  test('o Express serve as páginas e os módulos das telas', async () => {
    const arquivos = [
      '/', '/pages/login.html', '/pages/cadastro.html', '/pages/instituicoes.html',
      '/pages/instituicao.html', '/pages/confirmacao.html', '/style.css',
      '/js/api.js', '/js/cards.js', '/js/cadastro.js', '/js/instituicoes.js',
      '/js/instituicao.js', '/js/confirmacao.js'
    ];
    for (const arquivo of arquivos) {
      const resposta = await fetch(base + arquivo);
      assert.equal(resposta.status, 200, arquivo);
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
});

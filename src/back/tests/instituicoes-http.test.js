// Testes HTTP do fluxo prioritário "Cadastro/Visualização de Instituições"
// (RF-01, RF-02, RF-06, RF-07, RF-10). Sobem o app Express REAL em uma porta
// efêmera e fazem requisições HTTP de verdade; só o MySQL é substituído pelo
// banco falso em memória (helpers/bancoFalso.js). Não precisam de MySQL.

process.env.JWT_SECRET = 'segredo-de-teste';

const test = require('node:test');
const assert = require('node:assert/strict');
const bancoFalso = require('./helpers/bancoFalso');
const app = require('../src/server');

let servidor;
let base;
let db;

function usarApiComBancoFalso() {
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
}

async function requisitar(metodo, caminho, { corpo, token, corpoBruto } = {}) {
  const headers = {};
  if (corpo !== undefined || corpoBruto !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  const resposta = await fetch(base + caminho, {
    method: metodo,
    headers,
    body: corpoBruto !== undefined ? corpoBruto : corpo !== undefined ? JSON.stringify(corpo) : undefined
  });
  return { status: resposta.status, corpo: await resposta.json() };
}

const cadastroInstituicao = (extra = {}) => ({
  acesso: { email: 'ong@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' },
  sobre: { nome: 'Abrigo Esperança', descricao: 'Acolhimento de famílias' },
  necessidadesIniciais: [{ item: 'Cobertor', quantidade: 10 }, { item: 'Arroz 5kg', quantidade: 4 }],
  ...extra
});

async function entrarComo(email, senha) {
  const { corpo } = await requisitar('POST', '/login', { corpo: { email, senha } });
  return corpo.token;
}

test.describe('RF-02 — POST /cadastro/instituicao', () => {
  usarApiComBancoFalso();

  test('cadastro válido devolve 201 e grava instituição não verificada com necessidades', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', { corpo: cadastroInstituicao() });

    assert.equal(r.status, 201);
    assert.equal(r.corpo.mensagem, 'Instituição cadastrada com sucesso!');
    assert.equal(db.banco.instituicoes.length, 1);
    assert.equal(db.banco.instituicoes[0].verificada, false);
    assert.deepEqual(db.banco.necessidades.map((n) => [n.item, n.quantidadeTotal, n.quantidadeFaltante]),
      [['Cobertor', 10, 10], ['Arroz 5kg', 4, 4]]);
  });

  test('nome da instituição ausente devolve 400 e nada é gravado', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({ sobre: { descricao: 'sem nome' } })
    });

    assert.equal(r.status, 400);
    assert.match(r.corpo.erro, /nome é obrigatório/);
    assert.equal(db.banco.usuarios.length, 0);
  });

  test('seção de acesso ausente devolve 400', async () => {
    const corpo = cadastroInstituicao();
    delete corpo.acesso;
    const r = await requisitar('POST', '/cadastro/instituicao', { corpo });

    assert.equal(r.status, 400);
    assert.match(r.corpo.erro, /Seção de acesso incompleta/);
  });

  test('e-mail inválido devolve 400', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({ acesso: { email: 'sem-arroba', senha: 'segredo123', confirmarSenha: 'segredo123' } })
    });

    assert.equal(r.status, 400);
    assert.equal(r.corpo.erro, 'E-mail inválido.');
  });

  test('senhas diferentes devolvem 400', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({ acesso: { email: 'ong@email.com', senha: 'segredo123', confirmarSenha: 'outra' } })
    });

    assert.equal(r.status, 400);
    assert.equal(r.corpo.erro, 'As senhas não coincidem.');
  });

  test('necessidade com quantidade zero devolve 400 e nada é gravado', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({ necessidadesIniciais: [{ item: 'Cobertor', quantidade: 0 }] })
    });

    assert.equal(r.status, 400);
    assert.match(r.corpo.erro, /item e quantidade/);
    assert.equal(db.banco.instituicoes.length, 0);
  });

  test('JSON malformado devolve 400 tratado', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', { corpoBruto: '{"acesso": ' });

    assert.equal(r.status, 400);
    assert.equal(r.corpo.erro, 'JSON inválido.');
  });

  test('e-mail já cadastrado devolve 409', async () => {
    await requisitar('POST', '/cadastro/instituicao', { corpo: cadastroInstituicao() });
    const r = await requisitar('POST', '/cadastro/instituicao', { corpo: cadastroInstituicao() });

    assert.equal(r.status, 409);
    assert.equal(db.banco.instituicoes.length, 1);
  });

  test('nome maior que 255 caracteres devolve 400 (limite da coluna)', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({ sobre: { nome: 'A'.repeat(256) } })
    });

    assert.equal(r.status, 400);
    assert.match(r.corpo.erro, /no máximo 255/);
  });

  test('descrição que não é texto devolve 400, e não 500', async () => {
    const r = await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({ sobre: { nome: 'Abrigo', descricao: { x: 1 } } })
    });

    assert.equal(r.status, 400);
    assert.equal(db.banco.instituicoes.length, 0);
  });
});

test.describe('RF-06 / RF-07 — listagem de instituições', () => {
  usarApiComBancoFalso();

  async function cadastrar(n, necessidades) {
    await requisitar('POST', '/cadastro/instituicao', {
      corpo: cadastroInstituicao({
        acesso: { email: `ong${n}@email.com`, senha: 'segredo123', confirmarSenha: 'segredo123' },
        sobre: { nome: `Instituição ${n}`, descricao: `Descrição ${n}` },
        necessidadesIniciais: necessidades
      })
    });
  }

  test('GET /instituicoes sem token devolve 401', async () => {
    const r = await requisitar('GET', '/instituicoes');

    assert.equal(r.status, 401);
    assert.equal(r.corpo.erro, 'Token não informado.');
  });

  test('GET /instituicoes com token inválido devolve 401', async () => {
    const r = await requisitar('GET', '/instituicoes', { token: 'token-falso' });

    assert.equal(r.status, 401);
  });

  test('fluxo completo: cadastra, faz login e lista as instituições (200)', async () => {
    await cadastrar(1, [{ item: 'Cobertor', quantidade: 10 }]);
    await cadastrar(2, [{ item: 'Arroz', quantidade: 3 }, { item: 'Feijão', quantidade: 2 }]);
    await cadastrar(3, []);
    const token = await entrarComo('ong1@email.com', 'segredo123');

    const r = await requisitar('GET', '/instituicoes', { token });

    assert.equal(r.status, 200);
    assert.deepEqual(r.corpo.map((i) => [i.nome, i.necessidadesAbertas, i.verificada]), [
      ['Instituição 2', 2, false],
      ['Instituição 1', 1, false],
      ['Instituição 3', 0, false]
    ]);
    assert.equal(r.corpo[0].resumo, 'Descrição 2');
  });

  test('GET /instituicoes/destaques é público e devolve no máximo 4', async () => {
    for (let n = 1; n <= 5; n++) await cadastrar(n, [{ item: 'Item', quantidade: n }]);

    const r = await requisitar('GET', '/instituicoes/destaques');

    assert.equal(r.status, 200);
    assert.equal(r.corpo.length, 4);
    assert.equal(Object.hasOwn(r.corpo[0], 'email'), false);
  });
});

test.describe('RF-10 — detalhe da instituição', () => {
  usarApiComBancoFalso();

  async function prepararInstituicaoComToken() {
    await requisitar('POST', '/cadastro/instituicao', { corpo: cadastroInstituicao() });
    const token = await entrarComo('ong@email.com', 'segredo123');
    return token;
  }

  test('devolve a instituição com necessidades e percentual prometido', async () => {
    const token = await prepararInstituicaoComToken();
    db.banco.necessidades[0].quantidadeFaltante = 6; // 4 de 10 já prometidos

    const r = await requisitar('GET', '/instituicoes/1', { token });

    assert.equal(r.status, 200);
    assert.equal(r.corpo.nome, 'Abrigo Esperança');
    assert.deepEqual(r.corpo.necessidades[0], {
      id: 1, item: 'Cobertor', desejado: 10, prometido: 4, faltante: 6, percentualPrometido: 40
    });
    assert.equal(r.corpo.necessidades.length, 2);
  });

  test('instituição inexistente devolve 404', async () => {
    const token = await prepararInstituicaoComToken();

    const r = await requisitar('GET', '/instituicoes/999', { token });

    assert.equal(r.status, 404);
    assert.equal(r.corpo.erro, 'Instituição não encontrada.');
  });

  test('id inválido devolve 400', async () => {
    const token = await prepararInstituicaoComToken();

    const r = await requisitar('GET', '/instituicoes/abc', { token });

    assert.equal(r.status, 400);
    assert.equal(r.corpo.erro, 'id de instituição inválido.');
  });
});

test.describe('RF-01 — POST /cadastro/doador', () => {
  usarApiComBancoFalso();

  test('cadastro válido devolve 201', async () => {
    const r = await requisitar('POST', '/cadastro/doador', {
      corpo: { nome: 'Ana', email: 'ana@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' }
    });

    assert.equal(r.status, 201);
    assert.equal(db.banco.doadores.length, 1);
  });

  test('nome ausente devolve 400', async () => {
    const r = await requisitar('POST', '/cadastro/doador', {
      corpo: { email: 'ana@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' }
    });

    assert.equal(r.status, 400);
    assert.equal(r.corpo.erro, 'Preencha o nome.');
  });

  test('corpo vazio devolve 400', async () => {
    const r = await requisitar('POST', '/cadastro/doador', { corpo: {} });

    assert.equal(r.status, 400);
  });
});

// Testes de CARACTERIZAÇÃO (Sprint 5, T-17).
// Exercitam controllers e services reais contra um banco falso em memória e
// afirmam o comportamento externo da API. Não importam nenhum repository:
// passam tanto no código ANTES da introdução do padrão Repository quanto
// DEPOIS dele. Esse é o argumento de que a refatoração não mudou o comportamento.

process.env.JWT_SECRET = 'segredo-de-teste';

const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const bancoFalso = require('./helpers/bancoFalso');
const authController = require('../src/controllers/authController');
const doacaoController = require('../src/controllers/doacaoController');
const { ErroHttp } = require('../src/utils/http');

// Resposta HTTP mínima para chamar controllers sem Express.
function respostaFalsa() {
  const r = { statusCode: 200, corpo: undefined };
  r.status = (codigo) => { r.statusCode = codigo; return r; };
  r.json = (corpo) => { r.corpo = corpo; return r; };
  return r;
}

async function chamar(controller, req) {
  const res = respostaFalsa();
  await controller({ body: {}, ...req }, res);
  return res;
}

async function erroDe(promessa) {
  try { await promessa; } catch (e) { return e; }
  assert.fail('era esperado um erro, mas a chamada terminou sem falhar');
}

let db;
test.beforeEach(() => { db = bancoFalso.instalar(); });
test.afterEach(() => { db.restaurar(); });

const doador = (extra = {}) => ({
  nome: 'Ana', email: 'ANA@Email.com', senha: 'segredo123', confirmarSenha: 'segredo123', ...extra
});

const instituicao = (extra = {}) => ({
  acesso: { email: 'ong@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' },
  sobre: { nome: '  Abrigo Esperança  ', descricao: 'Acolhimento' },
  necessidadesIniciais: [{ item: ' Cobertor ', quantidade: '10' }, { item: 'Arroz 5kg', quantidade: 4 }],
  ...extra
});

test.describe('RF-01 — cadastro de doador', () => {
  test('cria usuário e doador, normaliza o e-mail e não guarda a senha em texto puro', async () => {
    const res = await chamar(authController.cadastrarDoador, { body: doador() });

    assert.equal(res.statusCode, 201);
    assert.equal(db.banco.usuarios.length, 1);
    assert.equal(db.banco.usuarios[0].email, 'ana@email.com');
    assert.notEqual(db.banco.usuarios[0].senha, 'segredo123');
    assert.deepEqual(db.banco.doadores.map((d) => [d.usuario_id, d.nome]), [[1, 'Ana']]);
    assert.deepEqual(db.eventos, ['begin', 'commit', 'release']);
  });

  test('e-mail repetido devolve 409 e não cria nada', async () => {
    await chamar(authController.cadastrarDoador, { body: doador() });
    const erro = await erroDe(chamar(authController.cadastrarDoador, { body: doador({ nome: 'Outra' }) }));

    assert.ok(erro instanceof ErroHttp);
    assert.equal(erro.status, 409);
    assert.equal(db.banco.usuarios.length, 1);
    assert.equal(db.banco.doadores.length, 1);
  });

  test('senhas diferentes devolvem 400 sem abrir transação', async () => {
    const erro = await erroDe(chamar(authController.cadastrarDoador, { body: doador({ confirmarSenha: 'outra' }) }));
    assert.equal(erro.status, 400);
    assert.deepEqual(db.eventos, []);
  });

  test('falha ao gravar o perfil desfaz o usuário (rollback)', async () => {
    db.falharEm('INSERT INTO doadores', new Error('falha simulada'));
    await erroDe(chamar(authController.cadastrarDoador, { body: doador() }));

    assert.equal(db.banco.usuarios.length, 0, 'não pode sobrar usuário órfão');
    assert.deepEqual(db.eventos, ['begin', 'rollback', 'release']);
  });
});

test.describe('RF-02 — cadastro de instituição', () => {
  test('cria usuário, instituição não verificada e necessidades com saldo cheio', async () => {
    const res = await chamar(authController.cadastrarInstituicao, { body: instituicao() });

    assert.equal(res.statusCode, 201);
    assert.deepEqual(
      db.banco.instituicoes.map((i) => [i.nome, i.descricao, i.verificada]),
      [['Abrigo Esperança', 'Acolhimento', false]]
    );
    assert.deepEqual(
      db.banco.necessidades.map((n) => [n.instituicao_id, n.item, n.quantidadeTotal, n.quantidadeFaltante]),
      [[1, 'Cobertor', 10, 10], [1, 'Arroz 5kg', 4, 4]]
    );
  });

  test('descrição ausente é gravada como null', async () => {
    await chamar(authController.cadastrarInstituicao, { body: instituicao({ sobre: { nome: 'ONG' } }) });
    assert.equal(db.banco.instituicoes[0].descricao, null);
  });

  test('necessidade inválida devolve 400 e nada é gravado', async () => {
    const erro = await erroDe(chamar(authController.cadastrarInstituicao, {
      body: instituicao({ necessidadesIniciais: [{ item: 'Cobertor', quantidade: 0 }] })
    }));
    assert.equal(erro.status, 400);
    assert.equal(db.banco.usuarios.length, 0);
  });

  test('falha ao gravar uma necessidade desfaz usuário e instituição (rollback)', async () => {
    db.falharEm('INSERT INTO necessidades', new Error('falha simulada'));
    await erroDe(chamar(authController.cadastrarInstituicao, { body: instituicao() }));

    assert.equal(db.banco.usuarios.length, 0);
    assert.equal(db.banco.instituicoes.length, 0);
    assert.equal(db.banco.necessidades.length, 0);
  });
});

test.describe('RF-03 — login', () => {
  test('doador recebe token com id, tipo e perfilId', async () => {
    await chamar(authController.cadastrarDoador, { body: doador() });
    const res = await chamar(authController.login, { body: { email: ' Ana@email.com ', senha: 'segredo123' } });

    assert.equal(res.corpo.tipo, 'doador');
    assert.deepEqual(res.corpo.perfil, { id: 1, nome: 'Ana' });
    const payload = jwt.verify(res.corpo.token, process.env.JWT_SECRET);
    assert.equal(payload.tipo, 'doador');
    assert.equal(payload.perfilId, 1);
    assert.equal(payload.id, 1);
  });

  test('instituição recebe o perfil com o campo verificada', async () => {
    await chamar(authController.cadastrarInstituicao, { body: instituicao() });
    const res = await chamar(authController.login, { body: { email: 'ong@email.com', senha: 'segredo123' } });

    assert.equal(res.corpo.tipo, 'instituicao');
    assert.deepEqual(res.corpo.perfil, { id: 1, nome: 'Abrigo Esperança', verificada: false });
  });

  test('senha errada e e-mail inexistente dão a mesma resposta 401', async () => {
    await chamar(authController.cadastrarDoador, { body: doador() });
    const senhaErrada = await erroDe(chamar(authController.login, { body: { email: 'ana@email.com', senha: 'errada' } }));
    const semConta = await erroDe(chamar(authController.login, { body: { email: 'x@email.com', senha: 'segredo123' } }));

    assert.equal(senhaErrada.status, 401);
    assert.equal(semConta.status, 401);
    assert.equal(senhaErrada.message, semConta.message);
  });

  test('usuário sem perfil devolve 500', async () => {
    await chamar(authController.cadastrarDoador, { body: doador() });
    db.banco.doadores.length = 0;
    const erro = await erroDe(chamar(authController.login, { body: { email: 'ana@email.com', senha: 'segredo123' } }));
    assert.equal(erro.status, 500);
  });
});

test.describe('RF-19 / RNF-06 — promessa de doação', () => {
  async function prepararNecessidade() {
    await chamar(authController.cadastrarInstituicao, { body: instituicao() });
    await chamar(authController.cadastrarDoador, { body: doador() });
  }
  const pedido = (corpo) => ({ usuario: { perfilId: 1 }, body: corpo });

  test('registra a doação como Prometida e reduz o saldo', async () => {
    await prepararNecessidade();
    const res = await chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 1, quantidade: 3 }));

    assert.equal(res.statusCode, 201);
    assert.equal(res.corpo.id, 1);
    assert.deepEqual(db.banco.doacoes.map((d) => [d.doador_id, d.necessidade_id, d.quantidade, d.status]), [[1, 1, 3, 'Prometida']]);
    assert.equal(db.banco.necessidades[0].quantidadeFaltante, 7);
    assert.equal(db.banco.necessidades[0].quantidadeTotal, 10);
  });

  test('doar exatamente o saldo zera a necessidade', async () => {
    await prepararNecessidade();
    await chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 1, quantidade: '10' }));
    assert.equal(db.banco.necessidades[0].quantidadeFaltante, 0);
  });

  test('quantidade acima do saldo devolve 400 e não altera nada', async () => {
    await prepararNecessidade();
    const erro = await erroDe(chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 1, quantidade: 11 })));

    assert.equal(erro.status, 400);
    assert.equal(db.banco.doacoes.length, 0);
    assert.equal(db.banco.necessidades[0].quantidadeFaltante, 10);
  });

  test('necessidade inexistente devolve 404', async () => {
    await prepararNecessidade();
    const erro = await erroDe(chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 99, quantidade: 1 })));
    assert.equal(erro.status, 404);
  });

  test('entrada inválida devolve 400 antes de abrir transação', async () => {
    await prepararNecessidade();
    db.eventos.length = 0;
    const a = await erroDe(chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 'abc', quantidade: 1 })));
    const b = await erroDe(chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 1, quantidade: -2 })));

    assert.equal(a.status, 400);
    assert.equal(b.status, 400);
    assert.deepEqual(db.eventos, []);
  });

  test('falha ao reduzir o saldo desfaz a doação inserida (rollback)', async () => {
    await prepararNecessidade();
    db.falharEm('UPDATE necessidades', new Error('falha simulada'));
    await erroDe(chamar(doacaoController.criarDoacao, pedido({ necessidade_id: 1, quantidade: 2 })));

    assert.equal(db.banco.doacoes.length, 0, 'a doação não pode ficar sem o saldo ter sido abatido');
    assert.equal(db.banco.necessidades[0].quantidadeFaltante, 10);
  });
});

// Testes de SERVIÇO com repositories substituídos por dublês.
// Aqui nenhum SQL e nenhum banco falso aparecem: só a regra de negócio.
// Isso só é possível porque o SQL saiu dos services (padrão Repository).

process.env.JWT_SECRET = 'segredo-de-teste';

const test = require('node:test');
const assert = require('node:assert/strict');
const { pool } = require('../src/config/db');
const usuarioRepository = require('../src/repositories/usuarioRepository');
const doadorRepository = require('../src/repositories/doadorRepository');
const instituicaoRepository = require('../src/repositories/instituicaoRepository');
const necessidadeRepository = require('../src/repositories/necessidadeRepository');
const doacaoRepository = require('../src/repositories/doacaoRepository');
const doacaoService = require('../src/services/doacaoService');
const authService = require('../src/services/authService');

const { mock } = test;
let transacao;

// A transação continua sendo do service/db.js: só fingimos a conexão do pool.
test.beforeEach(() => {
  transacao = [];
  const conexao = {
    id: 'conexao-da-transacao',
    async beginTransaction() { transacao.push('begin'); },
    async commit() { transacao.push('commit'); },
    async rollback() { transacao.push('rollback'); },
    release() { transacao.push('release'); }
  };
  mock.method(pool, 'getConnection', async () => conexao);
});
test.afterEach(() => mock.restoreAll());

async function erroDe(promessa) {
  try { await promessa; } catch (e) { return e; }
  assert.fail('era esperado um erro');
}

test.describe('doacaoService.registrarDoacao', () => {
  test('com saldo suficiente: cria a doação e reduz o saldo, na mesma conexão da transação', async () => {
    const saldo = mock.method(necessidadeRepository, 'buscarSaldoComTrava', async () => 10);
    const criar = mock.method(doacaoRepository, 'criarPrometida', async () => 55);
    const reduzir = mock.method(necessidadeRepository, 'reduzirSaldo', async () => {});

    const id = await doacaoService.registrarDoacao(1, 2, 4);

    assert.equal(id, 55);
    assert.equal(saldo.mock.calls[0].arguments[0].id, 'conexao-da-transacao');
    assert.deepEqual(criar.mock.calls[0].arguments.slice(1), [{ doadorId: 1, necessidadeId: 2, quantidade: 4 }]);
    assert.deepEqual(reduzir.mock.calls[0].arguments.slice(1), [2, 4]);
    assert.deepEqual(transacao, ['begin', 'commit', 'release']);
  });

  test('doar exatamente o saldo é permitido', async () => {
    mock.method(necessidadeRepository, 'buscarSaldoComTrava', async () => 4);
    mock.method(doacaoRepository, 'criarPrometida', async () => 1);
    mock.method(necessidadeRepository, 'reduzirSaldo', async () => {});
    assert.equal(await doacaoService.registrarDoacao(1, 2, 4), 1);
  });

  test('necessidade inexistente: 404 e nada é gravado', async () => {
    mock.method(necessidadeRepository, 'buscarSaldoComTrava', async () => null);
    const criar = mock.method(doacaoRepository, 'criarPrometida', async () => 1);

    const erro = await erroDe(doacaoService.registrarDoacao(1, 2, 4));

    assert.equal(erro.status, 404);
    assert.equal(criar.mock.callCount(), 0);
    assert.deepEqual(transacao, ['begin', 'rollback', 'release']);
  });

  test('saldo zerado não é confundido com necessidade inexistente: 400', async () => {
    mock.method(necessidadeRepository, 'buscarSaldoComTrava', async () => 0);
    const erro = await erroDe(doacaoService.registrarDoacao(1, 2, 1));
    assert.equal(erro.status, 400);
  });

  test('quantidade acima do saldo: 400 e nada é gravado', async () => {
    mock.method(necessidadeRepository, 'buscarSaldoComTrava', async () => 3);
    const criar = mock.method(doacaoRepository, 'criarPrometida', async () => 1);
    const reduzir = mock.method(necessidadeRepository, 'reduzirSaldo', async () => {});

    const erro = await erroDe(doacaoService.registrarDoacao(1, 2, 4));

    assert.equal(erro.status, 400);
    assert.equal(criar.mock.callCount(), 0);
    assert.equal(reduzir.mock.callCount(), 0);
  });

  test('erro do repository propaga e provoca rollback', async () => {
    mock.method(necessidadeRepository, 'buscarSaldoComTrava', async () => 10);
    mock.method(doacaoRepository, 'criarPrometida', async () => { throw new Error('banco indisponível'); });

    const erro = await erroDe(doacaoService.registrarDoacao(1, 2, 4));

    assert.equal(erro.message, 'banco indisponível');
    assert.deepEqual(transacao, ['begin', 'rollback', 'release']);
  });
});

test.describe('authService', () => {
  test('cadastrarDoador com e-mail já existente: 409 e o perfil não é criado', async () => {
    mock.method(usuarioRepository, 'buscarPorEmail', async () => ({ id: 1, senha: 'x' }));
    const criarUsuario = mock.method(usuarioRepository, 'criar', async () => 1);
    const criarDoador = mock.method(doadorRepository, 'criar', async () => 1);

    const erro = await erroDe(authService.cadastrarDoador('Ana', 'ana@email.com', 'segredo123', 'segredo123'));

    assert.equal(erro.status, 409);
    assert.equal(criarUsuario.mock.callCount(), 0);
    assert.equal(criarDoador.mock.callCount(), 0);
    assert.deepEqual(transacao, ['begin', 'rollback', 'release']);
  });

  test('cadastrarDoador: o usuário é criado com hash e o perfil recebe o id gerado', async () => {
    mock.method(usuarioRepository, 'buscarPorEmail', async () => null);
    const criarUsuario = mock.method(usuarioRepository, 'criar', async () => 42);
    const criarDoador = mock.method(doadorRepository, 'criar', async () => 1);

    await authService.cadastrarDoador('  Ana ', 'Ana@Email.com', 'segredo123', 'segredo123');

    const [, email, senhaHash] = criarUsuario.mock.calls[0].arguments;
    assert.equal(email, 'ana@email.com');
    assert.notEqual(senhaHash, 'segredo123');
    assert.deepEqual(criarDoador.mock.calls[0].arguments.slice(1), [42, 'Ana']);
  });

  test('cadastrarInstituicao: cada necessidade usa o id da instituição criada', async () => {
    mock.method(usuarioRepository, 'buscarPorEmail', async () => null);
    mock.method(usuarioRepository, 'criar', async () => 7);
    const criarInst = mock.method(instituicaoRepository, 'criar', async () => 9);
    const criarNec = mock.method(necessidadeRepository, 'criar', async () => 1);

    await authService.cadastrarInstituicao(
      { email: 'ong@email.com', senha: 'segredo123', confirmarSenha: 'segredo123' },
      { nome: ' ONG ', descricao: 'Texto' },
      [{ item: ' Cobertor ', quantidade: '2' }, { item: 'Arroz', quantidade: 5 }]
    );

    assert.deepEqual(criarInst.mock.calls[0].arguments.slice(1), [{ usuarioId: 7, nome: 'ONG', descricao: 'Texto' }]);
    assert.deepEqual(criarNec.mock.calls.map((c) => c.arguments[1]), [
      { instituicaoId: 9, item: 'Cobertor', quantidade: 2 },
      { instituicaoId: 9, item: 'Arroz', quantidade: 5 }
    ]);
  });

  test('autenticarLogin: sem perfil de doador, procura a instituição', async () => {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('segredo123', 4);
    mock.method(usuarioRepository, 'buscarPorEmail', async () => ({ id: 3, senha: hash }));
    mock.method(doadorRepository, 'buscarPorUsuarioId', async () => null);
    const buscarInst = mock.method(instituicaoRepository, 'buscarPorUsuarioId', async () => ({ id: 6, nome: 'ONG', verificada: 0 }));

    const res = await authService.autenticarLogin('ong@email.com', 'segredo123');

    assert.equal(res.tipo, 'instituicao');
    assert.equal(res.perfil.id, 6);
    assert.equal(buscarInst.mock.callCount(), 1);
  });

  test('autenticarLogin: doador não dispara a consulta de instituição', async () => {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('segredo123', 4);
    mock.method(usuarioRepository, 'buscarPorEmail', async () => ({ id: 3, senha: hash }));
    mock.method(doadorRepository, 'buscarPorUsuarioId', async () => ({ id: 1, nome: 'Ana' }));
    const buscarInst = mock.method(instituicaoRepository, 'buscarPorUsuarioId', async () => null);

    const res = await authService.autenticarLogin('ana@email.com', 'segredo123');

    assert.equal(res.tipo, 'doador');
    assert.equal(buscarInst.mock.callCount(), 0);
  });
});

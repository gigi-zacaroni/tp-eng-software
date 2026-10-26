// Testes dos repositories: cada função emite o SQL esperado, com os parâmetros
// na ordem certa, e traduz o resultado do driver para um valor simples.
// É o único lugar da suíte em que o texto do SQL é verificado de propósito.

const test = require('node:test');
const assert = require('node:assert/strict');
const usuarioRepository = require('../src/repositories/usuarioRepository');
const doadorRepository = require('../src/repositories/doadorRepository');
const instituicaoRepository = require('../src/repositories/instituicaoRepository');
const necessidadeRepository = require('../src/repositories/necessidadeRepository');
const doacaoRepository = require('../src/repositories/doacaoRepository');

// Conexão que grava as chamadas e devolve a resposta combinada.
function conexaoFalsa(resposta) {
  const chamadas = [];
  return {
    chamadas,
    async execute(sql, params) {
      chamadas.push({ sql: sql.replace(/\s+/g, ' ').trim(), params });
      return resposta;
    }
  };
}

test.describe('usuarioRepository', () => {
  test('buscarPorEmail devolve a primeira linha ou null', async () => {
    const achou = conexaoFalsa([[{ id: 7, senha: 'hash' }]]);
    assert.deepEqual(await usuarioRepository.buscarPorEmail(achou, 'a@b.com'), { id: 7, senha: 'hash' });
    assert.deepEqual(achou.chamadas, [{ sql: 'SELECT id, senha FROM usuarios WHERE email = ?', params: ['a@b.com'] }]);

    assert.equal(await usuarioRepository.buscarPorEmail(conexaoFalsa([[]]), 'x@y.com'), null);
  });

  test('criar devolve o insertId', async () => {
    const c = conexaoFalsa([{ insertId: 12 }]);
    assert.equal(await usuarioRepository.criar(c, 'a@b.com', 'hash'), 12);
    assert.deepEqual(c.chamadas[0].params, ['a@b.com', 'hash']);
  });
});

test.describe('doadorRepository', () => {
  test('criar e buscarPorUsuarioId', async () => {
    const c = conexaoFalsa([{ insertId: 3 }]);
    assert.equal(await doadorRepository.criar(c, 5, 'Ana'), 3);
    assert.deepEqual(c.chamadas[0].params, [5, 'Ana']);

    assert.deepEqual(await doadorRepository.buscarPorUsuarioId(conexaoFalsa([[{ id: 3, nome: 'Ana' }]]), 5), { id: 3, nome: 'Ana' });
    assert.equal(await doadorRepository.buscarPorUsuarioId(conexaoFalsa([[]]), 5), null);
  });
});

test.describe('instituicaoRepository', () => {
  test('criar grava como não verificada e converte descrição vazia em null', async () => {
    const c = conexaoFalsa([{ insertId: 4 }]);
    assert.equal(await instituicaoRepository.criar(c, { usuarioId: 9, nome: 'ONG', descricao: '' }), 4);
    assert.match(c.chamadas[0].sql, /verificada\) VALUES \(\?, \?, \?, false\)$/);
    assert.deepEqual(c.chamadas[0].params, [9, 'ONG', null]);
  });

  test('buscarPorUsuarioId devolve o perfil ou null', async () => {
    const perfil = { id: 4, nome: 'ONG', verificada: 0 };
    assert.deepEqual(await instituicaoRepository.buscarPorUsuarioId(conexaoFalsa([[perfil]]), 9), perfil);
    assert.equal(await instituicaoRepository.buscarPorUsuarioId(conexaoFalsa([[]]), 9), null);
  });
});

test.describe('necessidadeRepository', () => {
  test('criar inicia quantidadeFaltante igual à quantidadeTotal', async () => {
    const c = conexaoFalsa([{ insertId: 8 }]);
    assert.equal(await necessidadeRepository.criar(c, { instituicaoId: 2, item: 'Arroz', quantidade: 6 }), 8);
    assert.deepEqual(c.chamadas[0].params, [2, 'Arroz', 6, 6]);
  });

  test('buscarSaldoComTrava usa FOR UPDATE e devolve o número ou null', async () => {
    const c = conexaoFalsa([[{ quantidadeFaltante: 5 }]]);
    assert.equal(await necessidadeRepository.buscarSaldoComTrava(c, 1), 5);
    assert.match(c.chamadas[0].sql, /FOR UPDATE$/);

    assert.equal(await necessidadeRepository.buscarSaldoComTrava(conexaoFalsa([[]]), 1), null);
  });

  test('buscarSaldoComTrava devolve 0 (e não null) quando o saldo está zerado', async () => {
    assert.equal(await necessidadeRepository.buscarSaldoComTrava(conexaoFalsa([[{ quantidadeFaltante: 0 }]]), 1), 0);
  });

  test('reduzirSaldo subtrai a quantidade da necessidade certa', async () => {
    const c = conexaoFalsa([{}]);
    await necessidadeRepository.reduzirSaldo(c, 1, 3);
    assert.equal(c.chamadas[0].sql, 'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - ? WHERE id = ?');
    assert.deepEqual(c.chamadas[0].params, [3, 1]);
  });
});

test.describe('doacaoRepository', () => {
  test('criarPrometida grava o status Prometida e devolve o id', async () => {
    const c = conexaoFalsa([{ insertId: 21 }]);
    assert.equal(await doacaoRepository.criarPrometida(c, { doadorId: 1, necessidadeId: 2, quantidade: 3 }), 21);
    assert.match(c.chamadas[0].sql, /'Prometida'\)$/);
    assert.deepEqual(c.chamadas[0].params, [1, 2, 3]);
  });
});

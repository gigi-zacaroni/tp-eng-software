const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');

const ativo = process.env.DB_INTEGRATION === '1';
const resetSql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'reset_test.sql'), 'utf8');
const seedSql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'seed_test.sql'), 'utf8');

let conexao;

async function prepararBanco() {
  await conexao.query(resetSql);
  await conexao.query(seedSql);
}

test.describe('integração MySQL — fluxo de doações', { skip: !ativo }, () => {
  test.before(async () => {
    conexao = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });
  });

  test.after(async () => {
    if (conexao) await conexao.end();
  });

  test.beforeEach(prepararBanco);

  test('RF-19: cria uma promessa associada a uma necessidade existente e atualiza o saldo', async () => {
    await conexao.beginTransaction();
    const [necessidade] = await conexao.execute(
      'SELECT quantidadeFaltante FROM necessidades WHERE id = ? FOR UPDATE',
      [1]
    );

    await conexao.execute(
      `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
       VALUES (?, ?, ?, 'Prometida')`,
      [1, 1, 5]
    );
    await conexao.execute(
      'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - ? WHERE id = ?',
      [5, 1]
    );
    await conexao.commit();

    assert.equal(necessidade[0].quantidadeFaltante, 80);
    const [[doacao]] = await conexao.query(
      `SELECT doador_id, necessidade_id, quantidade, status
       FROM doacoes WHERE doador_id = 1 AND necessidade_id = 1 AND quantidade = 5`
    );
    const [[saldo]] = await conexao.query(
      'SELECT quantidadeFaltante FROM necessidades WHERE id = 1'
    );

    assert.deepEqual(doacao, {
      doador_id: 1,
      necessidade_id: 1,
      quantidade: 5,
      status: 'Prometida'
    });
    assert.equal(saldo.quantidadeFaltante, 75);
  });

  test('chave estrangeira rejeita doação com doador inexistente', async () => {
    await assert.rejects(
      conexao.execute(
        `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
         VALUES (?, ?, ?, 'Prometida')`,
        [999, 1, 1]
      ),
      (erro) => erro.code === 'ER_NO_REFERENCED_ROW_2'
    );
  });

  test('chave estrangeira rejeita doação com necessidade inexistente', async () => {
    await assert.rejects(
      conexao.execute(
        `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
         VALUES (?, ?, ?, 'Prometida')`,
        [1, 999, 1]
      ),
      (erro) => erro.code === 'ER_NO_REFERENCED_ROW_2'
    );
  });

  test('RF-20: só permite os status definidos para o acompanhamento', async () => {
    await assert.rejects(
      conexao.execute(
        `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
         VALUES (?, ?, ?, ?)`,
        [1, 1, 1, 'Status inválido']
      ),
      (erro) => erro.code === 'ER_CHECK_CONSTRAINT_VIOLATED'
    );

    const [insercao] = await conexao.execute(
      `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
       VALUES (?, ?, ?, 'Prometida')`,
      [1, 1, 1]
    );
    await conexao.execute(
      "UPDATE doacoes SET status = 'A caminho' WHERE id = ?",
      [insercao.insertId]
    );

    const [[doacao]] = await conexao.query(
      'SELECT status FROM doacoes ORDER BY id DESC LIMIT 1'
    );
    assert.equal(doacao.status, 'A caminho');
  });

  test('RF-21: constraint rejeita doação cancelada com quantidade zero', async () => {
    await assert.rejects(
      conexao.execute(
        `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
         VALUES (?, ?, ?, 'Cancelada')`,
        [1, 1, 0]
      ),
      (erro) =>
        erro.code === 'ER_CHECK_CONSTRAINT_VIOLATED' ||
        erro.code === 'ER_WARN_DATA_OUT_OF_RANGE'
    );
  });

  test('rollbacks não persistem promessa criada antes de uma falha', async () => {
    await conexao.beginTransaction();
    await conexao.execute(
      `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
       VALUES (?, ?, ?, 'Prometida')`,
      [1, 1, 5]
    );
    await conexao.rollback();

    const [[resultado]] = await conexao.query(
      'SELECT COUNT(*) AS quantidade FROM doacoes WHERE doador_id = 1 AND necessidade_id = 1 AND quantidade = 5'
    );
    assert.equal(resultado.quantidade, 0);
  });

  test('RF-20 e RF-21: cancelar devolve o saldo e impede novo avanço', async () => {
    await conexao.beginTransaction();
    const [insercao] = await conexao.execute(
      `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
       VALUES (?, ?, ?, 'A caminho')`,
      [1, 1, 5]
    );
    await conexao.execute(
      'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - ? WHERE id = ?',
      [5, 1]
    );
    await conexao.commit();

    await conexao.beginTransaction();
    await conexao.execute(
      'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante + ? WHERE id = ?',
      [5, 1]
    );
    await conexao.execute(
      "UPDATE doacoes SET status = 'Cancelada' WHERE id = ?",
      [insercao.insertId]
    );
    await conexao.commit();

    const [[doacao]] = await conexao.query(
      'SELECT status FROM doacoes WHERE id = ?',
      [insercao.insertId]
    );
    const [[saldo]] = await conexao.query(
      'SELECT quantidadeFaltante FROM necessidades WHERE id = 1'
    );

    assert.equal(doacao.status, 'Cancelada');
    assert.equal(saldo.quantidadeFaltante, 80);
  });
});

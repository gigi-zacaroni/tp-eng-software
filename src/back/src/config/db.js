require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sistema_doacoes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Executa `fn(conexao)` dentro de uma transação: commit se der certo,
// rollback (e relança o erro) se falhar. A conexão é sempre devolvida ao pool.
async function comTransacao(fn) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    const resultado = await fn(conexao);
    await conexao.commit();
    return resultado;
  } catch (erro) {
    await conexao.rollback().catch(() => {});
    throw erro;
  } finally {
    conexao.release();
  }
}

module.exports = { pool, comTransacao };

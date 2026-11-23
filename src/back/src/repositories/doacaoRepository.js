// Repository de DOACAO: SQL da tabela `doacoes`.

// Toda doação nasce com status 'Prometida' (RF-19).
async function criarPrometida(conexao, { doadorId, necessidadeId, quantidade }) {
  const [resultado] = await conexao.execute(
    `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
     VALUES (?, ?, ?, 'Prometida')`,
    [doadorId, necessidadeId, quantidade]
  );
  return resultado.insertId;
}

async function buscarPorIdComTrava(conexao, doacaoId) {
  const [linhas] = await conexao.execute(
    `SELECT id, doador_id, necessidade_id, quantidade, status
     FROM doacoes WHERE id = ? FOR UPDATE`,
    [doacaoId]
  );
  return linhas[0] || null;
}

async function atualizarStatus(conexao, doacaoId, status) {
  const [resultado] = await conexao.execute(
    'UPDATE doacoes SET status = ? WHERE id = ?',
    [status, doacaoId]
  );
  return resultado.affectedRows;
}

module.exports = {
  criarPrometida,
  buscarPorIdComTrava,
  atualizarStatus
};

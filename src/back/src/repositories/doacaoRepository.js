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

module.exports = { criarPrometida };

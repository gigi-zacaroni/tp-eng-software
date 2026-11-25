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
    `SELECT d.id, d.doador_id, d.necessidade_id, d.quantidade, d.status,
       n.instituicao_id
     FROM doacoes d
     JOIN necessidades n ON n.id = d.necessidade_id
     WHERE d.id = ? FOR UPDATE`,
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

async function listarPorDoador(conexao, doadorId) {
  const [linhas] = await conexao.execute(
    `SELECT d.id, d.doador_id, d.necessidade_id, d.quantidade, d.status,
       d.dataPromessa, n.item, n.quantidadeTotal, n.quantidadeFaltante,
       i.id AS instituicao_id, i.nome AS instituicao_nome
     FROM doacoes d
     JOIN necessidades n ON n.id = d.necessidade_id
     JOIN instituicoes i ON i.id = n.instituicao_id
     WHERE d.doador_id = ?
     ORDER BY d.dataPromessa DESC, d.id DESC`,
    [doadorId]
  );
  return linhas;
}

async function listarPorInstituicao(conexao, instituicaoId) {
  const [linhas] = await conexao.execute(
    `SELECT d.id, d.doador_id, d.necessidade_id, d.quantidade, d.status,
       d.dataPromessa, n.item, dr.nome AS doador_nome
     FROM doacoes d
     JOIN necessidades n ON n.id = d.necessidade_id
     JOIN doadores dr ON dr.id = d.doador_id
     WHERE n.instituicao_id = ?
     ORDER BY d.dataPromessa DESC, d.id DESC`,
    [instituicaoId]
  );
  return linhas;
}

module.exports = {
  criarPrometida,
  buscarPorIdComTrava,
  atualizarStatus,
  listarPorDoador,
  listarPorInstituicao
};

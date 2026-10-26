// Repository de INSTITUICAO: SQL da tabela `instituicoes`.

// Toda instituição nasce não verificada (RF-11 ainda não tem fluxo de verificação).
async function criar(conexao, { usuarioId, nome, descricao }) {
  const [resultado] = await conexao.execute(
    'INSERT INTO instituicoes (usuario_id, nome, descricao, verificada) VALUES (?, ?, ?, false)',
    [usuarioId, nome, descricao || null]
  );
  return resultado.insertId;
}

async function buscarPorUsuarioId(conexao, usuarioId) {
  const [linhas] = await conexao.execute(
    'SELECT id, nome, verificada FROM instituicoes WHERE usuario_id = ?',
    [usuarioId]
  );
  return linhas[0] || null;
}

module.exports = { criar, buscarPorUsuarioId };

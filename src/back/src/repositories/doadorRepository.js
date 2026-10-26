// Repository de DOADOR: SQL da tabela `doadores`.

async function criar(conexao, usuarioId, nome) {
  const [resultado] = await conexao.execute(
    'INSERT INTO doadores (usuario_id, nome) VALUES (?, ?)',
    [usuarioId, nome]
  );
  return resultado.insertId;
}

async function buscarPorUsuarioId(conexao, usuarioId) {
  const [linhas] = await conexao.execute(
    'SELECT id, nome FROM doadores WHERE usuario_id = ?',
    [usuarioId]
  );
  return linhas[0] || null;
}

module.exports = { criar, buscarPorUsuarioId };

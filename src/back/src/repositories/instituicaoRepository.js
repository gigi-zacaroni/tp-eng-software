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

// Resumo para listagem (RF-06, RF-07): dados da instituição e quantas
// necessidades ainda têm saldo. As com mais necessidades abertas vêm primeiro.
// O limite entra no texto do SQL porque o `execute` do mysql2 rejeita `LIMIT ?`;
// por isso ele é convertido para inteiro antes.
async function listarResumo(conexao, limite) {
  let sql = `SELECT i.id, i.nome, i.descricao, i.verificada,
       (SELECT COUNT(*) FROM necessidades n
         WHERE n.instituicao_id = i.id AND n.quantidadeFaltante > 0) AS necessidadesAbertas
     FROM instituicoes i
     ORDER BY necessidadesAbertas DESC, i.id`;
  if (limite !== undefined) sql += ` LIMIT ${Math.max(1, Math.trunc(limite))}`;
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

async function buscarPorId(conexao, id) {
  const [linhas] = await conexao.execute(
    'SELECT id, nome, descricao, verificada FROM instituicoes WHERE id = ?',
    [id]
  );
  return linhas[0] || null;
}

module.exports = { criar, buscarPorUsuarioId, listarResumo, buscarPorId };

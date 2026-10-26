// Repository de NECESSIDADE: SQL da tabela `necessidades`, incluindo a trava
// pessimista do saldo (DP-02). A REGRA ("não doar mais do que falta") fica no
// service; aqui ficam apenas as operações de leitura e escrita que a sustentam.

// Uma necessidade nova começa com todo o saldo por atender.
async function criar(conexao, { instituicaoId, item, quantidade }) {
  const [resultado] = await conexao.execute(
    `INSERT INTO necessidades (instituicao_id, item, quantidadeTotal, quantidadeFaltante)
     VALUES (?, ?, ?, ?)`,
    [instituicaoId, item, quantidade, quantidade]
  );
  return resultado.insertId;
}

// Lê o saldo e TRAVA a linha até o fim da transação (SELECT ... FOR UPDATE).
// Só faz sentido com uma `conexao` de transação. Devolve null se não existir.
async function buscarSaldoComTrava(conexao, necessidadeId) {
  const [linhas] = await conexao.execute(
    'SELECT quantidadeFaltante FROM necessidades WHERE id = ? FOR UPDATE',
    [necessidadeId]
  );
  return linhas.length === 0 ? null : linhas[0].quantidadeFaltante;
}

async function reduzirSaldo(conexao, necessidadeId, quantidade) {
  await conexao.execute(
    'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - ? WHERE id = ?',
    [quantidade, necessidadeId]
  );
}

module.exports = { criar, buscarSaldoComTrava, reduzirSaldo };

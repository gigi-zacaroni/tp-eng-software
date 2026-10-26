// Repository de USUARIO: único lugar que conhece o SQL da tabela `usuarios`.
// `conexao` é o executor de SQL (pool ou conexão de transação). Quem chama decide
// se a operação participa de uma transação; o repository não abre nem fecha transação.

async function buscarPorEmail(conexao, email) {
  const [linhas] = await conexao.execute(
    'SELECT id, senha FROM usuarios WHERE email = ?',
    [email]
  );
  return linhas[0] || null;
}

// Devolve o id gerado. `senhaHash` já deve vir criptografada.
async function criar(conexao, email, senhaHash) {
  const [resultado] = await conexao.execute(
    'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
    [email, senhaHash]
  );
  return resultado.insertId;
}

module.exports = { buscarPorEmail, criar };

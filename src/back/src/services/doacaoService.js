const { comTransacao } = require('../config/db');
const { ErroHttp } = require('../utils/http');

/**
 * Registra uma nova doação validando o saldo da necessidade.
 * Não possui dependência do Express (req, res).
 */
async function registrarDoacao(doadorId, necessidadeId, quantidade) {
  const doacaoId = await comTransacao(async (conexao) => {
    // 1. Trava a linha da necessidade e confere o que ainda falta
    const [necessidade] = await conexao.execute(
      'SELECT quantidadeFaltante FROM necessidades WHERE id = ? FOR UPDATE',
      [necessidadeId]
    );
    
    if (necessidade.length === 0) {
      throw new ErroHttp(404, 'Necessidade não encontrada.');
    }
    
    if (quantidade > necessidade[0].quantidadeFaltante) {
      throw new ErroHttp(400, 'Quantidade doada é maior que a necessária.');
    }

    // 2. Cria a doação com status Prometida
    const [doacao] = await conexao.execute(
      `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status)
       VALUES (?, ?, ?, 'Prometida')`,
      [doadorId, necessidadeId, quantidade]
    );

    // 3. Atualiza a quantidade faltante
    await conexao.execute(
      'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - ? WHERE id = ?',
      [quantidade, necessidadeId]
    );

    return doacao.insertId;
  });

  return doacaoId;
}

module.exports = {
  registrarDoacao
};
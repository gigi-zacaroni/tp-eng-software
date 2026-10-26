const { comTransacao } = require('../config/db');
const { ErroHttp } = require('../utils/http');
const necessidadeRepository = require('../repositories/necessidadeRepository');
const doacaoRepository = require('../repositories/doacaoRepository');

/**
 * Registra uma nova doação validando o saldo da necessidade.
 * Não possui dependência do Express (req, res) nem escreve SQL: o acesso a
 * dados passa pelos repositories e a transação continua sendo controlada aqui.
 */
async function registrarDoacao(doadorId, necessidadeId, quantidade) {
  return comTransacao(async (conexao) => {
    // 1. Trava a linha da necessidade e confere o que ainda falta
    const saldo = await necessidadeRepository.buscarSaldoComTrava(conexao, necessidadeId);

    if (saldo === null) {
      throw new ErroHttp(404, 'Necessidade não encontrada.');
    }

    if (quantidade > saldo) {
      throw new ErroHttp(400, 'Quantidade doada é maior que a necessária.');
    }

    // 2. Cria a doação com status Prometida
    const doacaoId = await doacaoRepository.criarPrometida(conexao, {
      doadorId,
      necessidadeId,
      quantidade
    });

    // 3. Atualiza a quantidade faltante
    await necessidadeRepository.reduzirSaldo(conexao, necessidadeId, quantidade);

    return doacaoId;
  });
}

module.exports = {
  registrarDoacao
};

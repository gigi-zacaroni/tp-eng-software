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

async function avancarDoacao(doadorId, doacaoId) {
  return comTransacao(async (conexao) => {
    const doacao = await doacaoRepository.buscarPorIdComTrava(conexao, doacaoId);

    if (!doacao) {
      throw new ErroHttp(404, 'Doação não encontrada.');
    }
    if (doacao.doador_id !== doadorId) {
      throw new ErroHttp(403, 'A doação pertence a outro doador.');
    }

    const proximoStatus = {
      'Prometida': 'A caminho',
      'A caminho': 'Entregue'
    }[doacao.status];

    if (!proximoStatus) {
      throw new ErroHttp(409, 'O status da doação não permite novo avanço.');
    }

    await doacaoRepository.atualizarStatus(conexao, doacaoId, proximoStatus);
    return proximoStatus;
  });
}

async function cancelarDoacao(doadorId, doacaoId) {
  return comTransacao(async (conexao) => {
    const doacao = await doacaoRepository.buscarPorIdComTrava(conexao, doacaoId);

    if (!doacao) {
      throw new ErroHttp(404, 'Doação não encontrada.');
    }
    if (doacao.doador_id !== doadorId) {
      throw new ErroHttp(403, 'A doação pertence a outro doador.');
    }
    if (doacao.status !== 'Prometida' && doacao.status !== 'A caminho') {
      throw new ErroHttp(409, 'A doação não pode mais ser cancelada.');
    }

    await necessidadeRepository.restaurarSaldo(
      conexao,
      doacao.necessidade_id,
      doacao.quantidade
    );
    await doacaoRepository.atualizarStatus(conexao, doacaoId, 'Cancelada');
  });
}

module.exports = {
  registrarDoacao,
  avancarDoacao,
  cancelarDoacao
};

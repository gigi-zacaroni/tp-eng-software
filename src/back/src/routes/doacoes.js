const express = require('express');
const { comTransacao } = require('../config/db');
const { autenticar, exigirTipo } = require('../middleware/autenticacao');
const { ErroHttp, asyncHandler } = require('../utils/http');
const { inteiroPositivo } = require('../utils/validacao');

const router = express.Router();

// Receber uma nova doação (RF-19). Só doadores autenticados; o doador é
// sempre o do token — nunca um id enviado no corpo da requisição.
router.post('/', autenticar, exigirTipo('doador'), asyncHandler(async (req, res) => {
  const doadorId = req.usuario.perfilId;
  const necessidadeId = inteiroPositivo(req.body.necessidade_id);
  const quantidade = inteiroPositivo(req.body.quantidade);

  if (necessidadeId === null) {
    throw new ErroHttp(400, 'necessidade_id inválido.');
  }
  if (quantidade === null) {
    throw new ErroHttp(400, 'A quantidade deve ser um número inteiro maior que zero.');
  }

  const doacaoId = await comTransacao(async (conexao) => {
    // 1. Trava a linha da necessidade e confere o que ainda falta
    const [necessidade] = await conexao.execute(
      'SELECT quantidadeFaltante FROM necessidades WHERE id = ? FOR UPDATE',
      [necessidadeId]
    );
    if (necessidade.length === 0) throw new ErroHttp(404, 'Necessidade não encontrada.');
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

  res.status(201).json({
    mensagem: 'Doação registrada e quantidade atualizada com sucesso!',
    id: doacaoId
  });
}));

module.exports = router;

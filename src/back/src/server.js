const express = require('express');
const { pool } = require('./config/db');
const { config, validarConfiguracaoDeProducao } = require('./config/env');
const { ErroHttp, asyncHandler } = require('./utils/http');
const authRoutes = require('./routes/auth');
const doacoesRoutes = require('./routes/doacoes');

const app = express();
app.use(express.json()); // Permite que a API entenda formato JSON

// Rota de teste: confirma que a API consegue falar com o banco
app.get('/teste-conexao', asyncHandler(async (req, res) => {
  try {
    await pool.query('SELECT 1');
  } catch (erro) {
    console.error('Falha ao conectar no banco:', erro.message);
    throw new ErroHttp(500, 'Não foi possível conectar ao banco de dados.');
  }
  res.json({ mensagem: 'API conectada ao MySQL com sucesso!' });
}));

app.use('/', authRoutes);              // /cadastro/doador, /cadastro/instituicao, /login, /logout
app.use('/doacoes', doacoesRoutes);    // POST /doacoes

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Handler central de erros (precisa ter 4 parâmetros para o Express reconhecê-lo)
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  if (erro instanceof ErroHttp) {
    return res.status(erro.status).json({ erro: erro.message });
  }
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido.' });
  }
  if (erro.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ erro: 'Já existe um registro com estes dados.' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

if (require.main === module) {
  try {
    validarConfiguracaoDeProducao();
  } catch (erro) {
    console.error(erro.message);
    process.exit(1);
  }
  app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}! Acesse: http://localhost:${config.port}/teste-conexao`);
  });
}

module.exports = app;

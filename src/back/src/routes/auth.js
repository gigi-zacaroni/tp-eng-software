const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, comTransacao } = require('../config/db');
const { ErroHttp, asyncHandler } = require('../utils/http');
const {
  textoNaoVazio,
  normalizarEmail,
  emailValido,
  inteiroPositivo
} = require('../utils/validacao');

const router = express.Router();

function gerarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  });
}

// Valida e normaliza a seção de acesso (e-mail + senha) e devolve o e-mail normalizado.
function validarAcesso({ email, senha, confirmarSenha }) {
  if (!textoNaoVazio(email) || !textoNaoVazio(senha) || !textoNaoVazio(confirmarSenha)) {
    throw new ErroHttp(400, 'Preencha e-mail, senha e confirmação de senha.');
  }
  const emailNormalizado = normalizarEmail(email);
  if (!emailValido(emailNormalizado)) {
    throw new ErroHttp(400, 'E-mail inválido.');
  }
  if (senha !== confirmarSenha) {
    throw new ErroHttp(400, 'As senhas não coincidem.');
  }
  return emailNormalizado;
}

// Cria a linha em `usuarios` (dentro da transação) e devolve o id.
async function criarUsuario(conexao, email, senha) {
  const [existente] = await conexao.execute('SELECT id FROM usuarios WHERE email = ?', [email]);
  if (existente.length > 0) throw new ErroHttp(409, 'Já existe uma conta com este e-mail.');

  const senhaHash = await bcrypt.hash(senha, 10);
  const [usuario] = await conexao.execute(
    'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
    [email, senhaHash]
  );
  return usuario.insertId;
}

// RF-01: Cadastro de doador
router.post('/cadastro/doador', asyncHandler(async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (!textoNaoVazio(nome)) {
    throw new ErroHttp(400, 'Preencha o nome.');
  }
  const emailNormalizado = validarAcesso({ email, senha, confirmarSenha });

  await comTransacao(async (conexao) => {
    const usuarioId = await criarUsuario(conexao, emailNormalizado, senha);
    await conexao.execute(
      'INSERT INTO doadores (usuario_id, nome) VALUES (?, ?)',
      [usuarioId, nome.trim()]
    );
  });

  res.status(201).json({ mensagem: 'Conta de doador criada com sucesso!' });
}));

// RF-02: Cadastro de instituição
// Simplificado ao schema atual: só "nome" e "descricao" (sem causa/cidade/contato ainda)
router.post('/cadastro/instituicao', asyncHandler(async (req, res) => {
  const { acesso, sobre, necessidadesIniciais } = req.body;

  if (!acesso || typeof acesso !== 'object') {
    throw new ErroHttp(400, 'Seção de acesso incompleta (e-mail, senha, confirmação).');
  }
  const emailNormalizado = validarAcesso(acesso);

  if (!sobre || !textoNaoVazio(sobre.nome)) {
    throw new ErroHttp(400, 'Seção "sobre a instituição" incompleta (nome é obrigatório).');
  }

  // Valida as necessidades ANTES de abrir a transação. Linhas totalmente vazias
  // (formulário com linha em branco) são ignoradas; linhas parciais/inválidas dão erro.
  const necessidades = [];
  if (necessidadesIniciais !== undefined && !Array.isArray(necessidadesIniciais)) {
    throw new ErroHttp(400, 'necessidadesIniciais deve ser uma lista.');
  }
  for (const n of necessidadesIniciais || []) {
    if (!n || (!n.item && !n.quantidade)) continue;
    const quantidade = inteiroPositivo(n.quantidade);
    if (!textoNaoVazio(n.item) || quantidade === null) {
      throw new ErroHttp(400, 'Cada necessidade precisa de item e quantidade (inteiro maior que zero).');
    }
    necessidades.push({ item: n.item.trim(), quantidade });
  }

  await comTransacao(async (conexao) => {
    const usuarioId = await criarUsuario(conexao, emailNormalizado, acesso.senha);

    const [instituicao] = await conexao.execute(
      'INSERT INTO instituicoes (usuario_id, nome, descricao, verificada) VALUES (?, ?, ?, false)',
      [usuarioId, sobre.nome.trim(), sobre.descricao || null]
    );

    for (const n of necessidades) {
      await conexao.execute(
        `INSERT INTO necessidades (instituicao_id, item, quantidadeTotal, quantidadeFaltante)
         VALUES (?, ?, ?, ?)`,
        [instituicao.insertId, n.item, n.quantidade, n.quantidade]
      );
    }
  });

  res.status(201).json({ mensagem: 'Instituição cadastrada com sucesso!' });
}));

// RF-03: Login — como não existe coluna "tipo", descobrimos consultando
// as tabelas doadores/instituicoes pelo usuario_id.
router.post('/login', asyncHandler(async (req, res) => {
  const { email, senha } = req.body;
  if (!textoNaoVazio(email) || !textoNaoVazio(senha)) {
    throw new ErroHttp(400, 'Informe e-mail e senha.');
  }

  const [usuarios] = await pool.execute(
    'SELECT id, senha FROM usuarios WHERE email = ?',
    [normalizarEmail(email)]
  );
  if (usuarios.length === 0) throw new ErroHttp(401, 'E-mail ou senha inválidos.');

  const usuario = usuarios[0];
  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOk) throw new ErroHttp(401, 'E-mail ou senha inválidos.');

  const [doadores] = await pool.execute(
    'SELECT id, nome FROM doadores WHERE usuario_id = ?',
    [usuario.id]
  );

  let tipo;
  let perfil;
  if (doadores.length > 0) {
    tipo = 'doador';
    perfil = doadores[0];
  } else {
    const [instituicoes] = await pool.execute(
      'SELECT id, nome, verificada FROM instituicoes WHERE usuario_id = ?',
      [usuario.id]
    );
    if (instituicoes.length === 0) {
      throw new ErroHttp(500, 'Usuário sem perfil de doador ou instituição associado.');
    }
    tipo = 'instituicao';
    perfil = instituicoes[0];
  }

  const token = gerarToken({ id: usuario.id, tipo, perfilId: perfil.id });
  res.json({ token, tipo, perfil });
}));

// RF-04: Encerrar sessão (o token é stateless; o cliente deve descartá-lo)
router.post('/logout', (req, res) => {
  res.json({ mensagem: 'Sessão encerrada. Descarte o token armazenado no cliente.' });
});

module.exports = router;

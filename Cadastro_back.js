const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const router = express.Router();

function gerarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  });
}

// RF-01: Cadastro de doador
router.post('/cadastro/doador', async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (!nome || !email || !senha || !confirmarSenha) {
    return res.status(400).json({ erro: 'Preencha nome, e-mail, senha e confirmação de senha.' });
  }
  if (senha !== confirmarSenha) {
    return res.status(400).json({ erro: 'As senhas não coincidem.' });
  }

  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();

    const [existente] = await conexao.execute('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existente.length > 0) throw new Error('Já existe uma conta com este e-mail.');

    const senhaHash = await bcrypt.hash(senha, 10);
    const [usuario] = await conexao.execute(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [email, senhaHash]
    );

    await conexao.execute('INSERT INTO doadores (usuario_id, nome) VALUES (?, ?)', [
      usuario.insertId,
      nome
    ]);

    await conexao.commit();
    res.status(201).json({ mensagem: 'Conta de doador criada com sucesso!' });
  } catch (erro) {
    await conexao.rollback();
    res.status(400).json({ erro: erro.message });
  } finally {
    conexao.release();
  }
});

// RF-02: Cadastro de instituição
// Simplificado ao schema atual: só "nome" e "descricao" (sem causa/cidade/contato ainda)
router.post('/cadastro/instituicao', async (req, res) => {
  const { acesso, sobre, necessidadesIniciais } = req.body;

  if (!acesso || !acesso.email || !acesso.senha || !acesso.confirmarSenha) {
    return res.status(400).json({ erro: 'Seção de acesso incompleta (e-mail, senha, confirmação).' });
  }
  if (acesso.senha !== acesso.confirmarSenha) {
    return res.status(400).json({ erro: 'As senhas não coincidem.' });
  }
  if (!sobre || !sobre.nome) {
    return res.status(400).json({ erro: 'Seção "sobre a instituição" incompleta (nome é obrigatório).' });
  }

  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();

    const [existente] = await conexao.execute('SELECT id FROM usuarios WHERE email = ?', [acesso.email]);
    if (existente.length > 0) throw new Error('Já existe uma conta com este e-mail.');

    const senhaHash = await bcrypt.hash(acesso.senha, 10);
    const [usuario] = await conexao.execute(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [acesso.email, senhaHash]
    );

    const [instituicao] = await conexao.execute(
      'INSERT INTO instituicoes (usuario_id, nome, descricao, verificada) VALUES (?, ?, ?, false)',
      [usuario.insertId, sobre.nome, sobre.descricao || null]
    );

    if (Array.isArray(necessidadesIniciais)) {
      for (const n of necessidadesIniciais) {
        if (!n.item || !n.quantidade) continue;
        await conexao.execute(
          `INSERT INTO necessidades (instituicao_id, item, quantidadeTotal, quantidadeFaltante)
           VALUES (?, ?, ?, ?)`,
          [instituicao.insertId, n.item, n.quantidade, n.quantidade]
        );
      }
    }

    await conexao.commit();
    res.status(201).json({ mensagem: 'Instituição cadastrada com sucesso!' });
  } catch (erro) {
    await conexao.rollback();
    res.status(400).json({ erro: erro.message });
  } finally {
    conexao.release();
  }
});

// RF-03: Login — como não existe coluna "tipo", descobrimos consultando
// as tabelas doadores/instituicoes pelo usuario_id.
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe e-mail e senha.' });
  }

  try {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length === 0) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });

    const usuario = usuarios[0];
    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });

    const [doadores] = await pool.execute('SELECT id, nome FROM doadores WHERE usuario_id = ?', [usuario.id]);

    let tipo, perfil;
    if (doadores.length > 0) {
      tipo = 'doador';
      perfil = doadores[0];
    } else {
      const [instituicoes] = await pool.execute(
        'SELECT id, nome, verificada FROM instituicoes WHERE usuario_id = ?',
        [usuario.id]
      );
      if (instituicoes.length === 0) {
        return res.status(500).json({ erro: 'Usuário sem perfil de doador ou instituição associado.' });
      }
      tipo = 'instituicao';
      perfil = instituicoes[0];
    }

    const token = gerarToken({ id: usuario.id, tipo, perfilId: perfil.id });
    res.json({ token, tipo, perfil });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao autenticar: ' + erro.message });
  }
});

// RF-04: Encerrar sessão
router.post('/logout', (req, res) => {
  res.json({ mensagem: 'Sessão encerrada. Descarte o token armazenado no cliente.' });
});

module.exports = router;

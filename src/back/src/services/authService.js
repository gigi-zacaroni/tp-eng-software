const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, comTransacao } = require('../config/db');
const { ErroHttp } = require('../utils/http');
const usuarioRepository = require('../repositories/usuarioRepository');
const doadorRepository = require('../repositories/doadorRepository');
const instituicaoRepository = require('../repositories/instituicaoRepository');
const necessidadeRepository = require('../repositories/necessidadeRepository');
const {
  textoNaoVazio,
  normalizarEmail,
  emailValido,
  inteiroPositivo
} = require('../utils/validacao');

// --- Funções Privadas do Serviço ---

function gerarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  });
}

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

async function criarUsuario(conexao, email, senha) {
  const existente = await usuarioRepository.buscarPorEmail(conexao, email);
  if (existente) throw new ErroHttp(409, 'Já existe uma conta com este e-mail.');

  const senhaHash = await bcrypt.hash(senha, 10);
  return usuarioRepository.criar(conexao, email, senhaHash);
}

// --- Funções Exportadas ---

async function cadastrarDoador(nome, email, senha, confirmarSenha) {
  if (!textoNaoVazio(nome)) {
    throw new ErroHttp(400, 'Preencha o nome.');
  }
  const emailNormalizado = validarAcesso({ email, senha, confirmarSenha });

  await comTransacao(async (conexao) => {
    const usuarioId = await criarUsuario(conexao, emailNormalizado, senha);
    await doadorRepository.criar(conexao, usuarioId, nome.trim());
  });
}

async function cadastrarInstituicao(acesso, sobre, necessidadesIniciais) {
  if (!acesso || typeof acesso !== 'object') {
    throw new ErroHttp(400, 'Seção de acesso incompleta (e-mail, senha, confirmação).');
  }
  const emailNormalizado = validarAcesso(acesso);

  if (!sobre || !textoNaoVazio(sobre.nome)) {
    throw new ErroHttp(400, 'Seção "sobre a instituição" incompleta (nome é obrigatório).');
  }

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

    const instituicaoId = await instituicaoRepository.criar(conexao, {
      usuarioId,
      nome: sobre.nome.trim(),
      descricao: sobre.descricao
    });

    for (const n of necessidades) {
      await necessidadeRepository.criar(conexao, {
        instituicaoId,
        item: n.item,
        quantidade: n.quantidade
      });
    }
  });
}

async function autenticarLogin(email, senha) {
  if (!textoNaoVazio(email) || !textoNaoVazio(senha)) {
    throw new ErroHttp(400, 'Informe e-mail e senha.');
  }

  const usuario = await usuarioRepository.buscarPorEmail(pool, normalizarEmail(email));
  if (!usuario) throw new ErroHttp(401, 'E-mail ou senha inválidos.');

  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOk) throw new ErroHttp(401, 'E-mail ou senha inválidos.');

  let tipo;
  let perfil = await doadorRepository.buscarPorUsuarioId(pool, usuario.id);
  if (perfil) {
    tipo = 'doador';
  } else {
    perfil = await instituicaoRepository.buscarPorUsuarioId(pool, usuario.id);
    if (!perfil) {
      throw new ErroHttp(500, 'Usuário sem perfil de doador ou instituição associado.');
    }
    tipo = 'instituicao';
  }

  const token = gerarToken({ id: usuario.id, tipo, perfilId: perfil.id });
  return { token, tipo, perfil };
}

module.exports = {
  cadastrarDoador,
  cadastrarInstituicao,
  autenticarLogin
};
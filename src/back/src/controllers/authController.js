const authService = require('../services/authService');

async function cadastrarDoador(req, res) {
  const { nome, email, senha, confirmarSenha } = req.body;
  
  await authService.cadastrarDoador(nome, email, senha, confirmarSenha);
  
  res.status(201).json({ mensagem: 'Conta de doador criada com sucesso!' });
}

async function cadastrarInstituicao(req, res) {
  const { acesso, sobre, necessidadesIniciais } = req.body;
  
  await authService.cadastrarInstituicao(acesso, sobre, necessidadesIniciais);
  
  res.status(201).json({ mensagem: 'Instituição cadastrada com sucesso!' });
}

async function login(req, res) {
  const { email, senha } = req.body;
  
  const dadosAcesso = await authService.autenticarLogin(email, senha);
  
  res.json(dadosAcesso);
}

function logout(req, res) {
  res.json({ mensagem: 'Sessão encerrada. Descarte o token armazenado no cliente.' });
}

module.exports = {
  cadastrarDoador,
  cadastrarInstituicao,
  login,
  logout
};
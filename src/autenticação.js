const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não informado.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

function exigirTipo(tipo) {
  return (req, res, next) => {
    if (req.usuario.tipo !== tipo) {
      return res.status(403).json({ erro: `Acesso permitido apenas para ${tipo}.` });
    }
    next();
  };
}

module.exports = { autenticar, exigirTipo };

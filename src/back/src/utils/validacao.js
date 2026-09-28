const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function textoNaoVazio(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

function normalizarEmail(email) {
  return String(email).trim().toLowerCase();
}

function emailValido(email) {
  return EMAIL_RE.test(email);
}

// Aceita número ou string numérica; devolve o inteiro > 0 ou null.
function inteiroPositivo(valor) {
  if (typeof valor !== 'number' && typeof valor !== 'string') return null;
  const n = Number(valor);
  return Number.isInteger(n) && n > 0 ? n : null;
}

module.exports = { textoNaoVazio, normalizarEmail, emailValido, inteiroPositivo };

const dotenv = require('dotenv');

dotenv.config();

function numeroEnv(nome, padrao) {
  const valor = process.env[nome];
  if (valor === undefined || valor === '') return padrao;

  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero <= 0) {
    throw new Error(`${nome} deve ser um número inteiro positivo.`);
  }
  return numero;
}

const config = Object.freeze({
  port: numeroEnv('PORT', 3000),
  db: Object.freeze({
    host: process.env.DB_HOST || 'localhost',
    port: numeroEnv('DB_PORT', 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'conectaacao_db'
  }),
  jwt: Object.freeze({
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  })
});

function validarConfiguracaoDeProducao() {
  if (!config.jwt.secret) {
    throw new Error('JWT_SECRET não definido. Configure o arquivo .env baseado em .env.example.');
  }
}

module.exports = { config, validarConfiguracaoDeProducao };

-- Schema reconstruído a partir das consultas do backend.
-- Confira com o banco que você já tem no DBeaver antes de rodar em cima dele.
-- Requer MySQL 8.0.16+ (por causa dos CHECK).

CREATE DATABASE IF NOT EXISTS sistema_doacoes
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sistema_doacoes;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,            -- hash bcrypt
  UNIQUE KEY uq_usuarios_email (email)
);

CREATE TABLE IF NOT EXISTS doadores (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  nome VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_doadores_usuario (usuario_id),
  CONSTRAINT fk_doadores_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS instituicoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NULL,
  verificada BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE KEY uq_instituicoes_usuario (usuario_id),
  CONSTRAINT fk_instituicoes_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS necessidades (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  instituicao_id INT UNSIGNED NOT NULL,
  item VARCHAR(255) NOT NULL,
  quantidadeTotal INT UNSIGNED NOT NULL,
  quantidadeFaltante INT UNSIGNED NOT NULL,
  CONSTRAINT ck_necessidades_qtd CHECK (quantidadeFaltante <= quantidadeTotal),
  CONSTRAINT fk_necessidades_instituicao FOREIGN KEY (instituicao_id) REFERENCES instituicoes (id)
);

CREATE TABLE IF NOT EXISTS doacoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doador_id INT UNSIGNED NOT NULL,
  necessidade_id INT UNSIGNED NOT NULL,
  quantidade INT UNSIGNED NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Prometida',
  CONSTRAINT fk_doacoes_doador FOREIGN KEY (doador_id) REFERENCES doadores (id),
  CONSTRAINT fk_doacoes_necessidade FOREIGN KEY (necessidade_id) REFERENCES necessidades (id)
);

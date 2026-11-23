-- Ambiente isolado e reprodutível para testes.
-- Este script recria a estrutura e remove todos os dados do banco de teste.

CREATE DATABASE IF NOT EXISTS conectaacao_test
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE conectaacao_test;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS doacoes;
DROP TABLE IF EXISTS necessidades;
DROP TABLE IF EXISTS instituicoes;
DROP TABLE IF EXISTS doadores;
DROP TABLE IF EXISTS usuarios;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_usuarios_email (email)
) ENGINE=InnoDB;

CREATE TABLE doadores (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  nome VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_doadores_usuario (usuario_id),
  CONSTRAINT fk_test_doadores_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

CREATE TABLE instituicoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NULL,
  verificada BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE KEY uq_instituicoes_usuario (usuario_id),
  CONSTRAINT fk_test_instituicoes_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

CREATE TABLE necessidades (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  instituicao_id INT UNSIGNED NOT NULL,
  item VARCHAR(255) NOT NULL,
  quantidadeTotal INT UNSIGNED NOT NULL,
  quantidadeFaltante INT UNSIGNED NOT NULL,
  CONSTRAINT ck_test_necessidades_qtd CHECK (
    quantidadeTotal > 0
    AND quantidadeFaltante <= quantidadeTotal
  ),
  CONSTRAINT fk_test_necessidades_instituicao FOREIGN KEY (instituicao_id) REFERENCES instituicoes (id)
) ENGINE=InnoDB;

CREATE TABLE doacoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doador_id INT UNSIGNED NOT NULL,
  necessidade_id INT UNSIGNED NOT NULL,
  quantidade INT UNSIGNED NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Prometida',
  dataPromessa DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT ck_test_doacoes_quantidade CHECK (quantidade > 0),
  CONSTRAINT ck_test_doacoes_status CHECK (
    status IN ('Prometida', 'A caminho', 'Entregue', 'Cancelada')
  ),
  CONSTRAINT fk_test_doacoes_doador FOREIGN KEY (doador_id) REFERENCES doadores (id),
  CONSTRAINT fk_test_doacoes_necessidade FOREIGN KEY (necessidade_id) REFERENCES necessidades (id)
) ENGINE=InnoDB;

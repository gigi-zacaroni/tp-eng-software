-- Massa de dados controlada para o banco de testes conectaacao_test.
-- Execute reset_test.sql antes deste script; a base fica pronta para testes manuais e automatizados.

CREATE DATABASE IF NOT EXISTS conectaacao_test
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE conectaacao_test;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE doacoes;
TRUNCATE TABLE necessidades;
TRUNCATE TABLE instituicoes;
TRUNCATE TABLE doadores;
TRUNCATE TABLE usuarios;
SET FOREIGN_KEY_CHECKS = 1;

-- Senha de todos os usuários de teste: segredo123
INSERT INTO usuarios (id, email, senha) VALUES
  (1, 'ana@email.com', '$2a$12$VsQj/klTshaIoQrWqkFgKeuQVoCQ0Lb1sODDsbvQD5ykduegn/AeW'),
  (2, 'bruno@email.com', '$2a$12$VsQj/klTshaIoQrWqkFgKeuQVoCQ0Lb1sODDsbvQD5ykduegn/AeW'),
  (3, 'esperanca@email.com', '$2a$12$VsQj/klTshaIoQrWqkFgKeuQVoCQ0Lb1sODDsbvQD5ykduegn/AeW'),
  (4, 'alimentos@email.com', '$2a$12$VsQj/klTshaIoQrWqkFgKeuQVoCQ0Lb1sODDsbvQD5ykduegn/AeW');

INSERT INTO doadores (id, usuario_id, nome) VALUES
  (1, 1, 'Ana Souza'),
  (2, 2, 'Bruno Lima');

INSERT INTO instituicoes (id, usuario_id, nome, descricao, verificada) VALUES
  (1, 3, 'Casa Esperança', 'Instituição de apoio a famílias em situação de vulnerabilidade.', TRUE),
  (2, 4, 'Banco de Alimentos Central', 'Distribuição de alimentos para comunidades locais.', FALSE);

INSERT INTO necessidades (id, instituicao_id, item, quantidadeTotal, quantidadeFaltante) VALUES
  (1, 1, 'Arroz 5kg', 100, 80),
  (2, 1, 'Cobertores', 40, 40),
  (3, 2, 'Leite em pó 400g', 60, 50);

INSERT INTO doacoes (id, doador_id, necessidade_id, quantidade, status) VALUES
  (1, 1, 1, 20, 'Prometida'),
  (2, 2, 3, 10, 'Prometida');

-- Verificações rápidas da massa.
SELECT 'usuarios' AS tabela, COUNT(*) AS quantidade FROM usuarios
UNION ALL SELECT 'doadores', COUNT(*) FROM doadores
UNION ALL SELECT 'instituicoes', COUNT(*) FROM instituicoes
UNION ALL SELECT 'necessidades', COUNT(*) FROM necessidades
UNION ALL SELECT 'doacoes', COUNT(*) FROM doacoes;

-- 1. Cria e seleciona o banco de dados
CREATE DATABASE IF NOT EXISTS sistema_doacoes;
USE sistema_doacoes;

-- 2. Cria as tabelas sem chaves estrangeiras pendentes (Base)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- 3. Cria as tabelas que dependem de Usuários
CREATE TABLE doadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE instituicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    verificada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 4. Cria a tabela que depende de Instituições
CREATE TABLE necessidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao_id INT NOT NULL,
    item VARCHAR(255) NOT NULL,
    quantidadeTotal INT NOT NULL,
    quantidadeFaltante INT NOT NULL,
    FOREIGN KEY (instituicao_id) REFERENCES instituicoes(id) ON DELETE CASCADE
);

-- 5. Cria a tabela associativa que depende de Doadores e Necessidades
CREATE TABLE doacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doador_id INT NOT NULL,
    necessidade_id INT NOT NULL,
    quantidade INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Prometida',
    dataPromessa DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doador_id) REFERENCES doadores(id),
    FOREIGN KEY (necessidade_id) REFERENCES necessidades(id)
);
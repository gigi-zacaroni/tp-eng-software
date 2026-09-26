const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json()); // Permite que a API entenda formato JSON

// Configuração da conexão com o banco no DBeaver
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',            
    password: 'senha',   
    database: 'sistema_doacoes',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Rota de Teste para ver se a API está conectada com o Banco
app.get('/teste-conexao', async (req, res) => {
    try {
        const conexao = await pool.getConnection();
        conexao.release();
        res.send('API conectada ao MySQL com sucesso! As 5 tabelas estão prontas para uso.');
    } catch (erro) {
        res.status(500).send('Erro ao conectar no banco: ' + erro.message);
    }
});

// Endpoint: Receber uma nova doação
app.post('/doacoes', async (req, res) => {
    const { doador_id, necessidade_id, quantidade } = req.body;
    const conexao = await pool.getConnection();

    try {
        await conexao.beginTransaction();

        // 1. Verifica se a necessidade existe e tem quantidade faltante
        const [necessidade] = await conexao.execute(
            'SELECT quantidadeFaltante FROM necessidades WHERE id = ? FOR UPDATE',
            [necessidade_id]
        );

        if (necessidade.length === 0) throw new Error('Necessidade não encontrada');
        if (quantidade > necessidade[0].quantidadeFaltante) throw new Error('Quantidade doada é maior que a necessária.');

        // 2. Cria a doação com status Prometida
        await conexao.execute(
            `INSERT INTO doacoes (doador_id, necessidade_id, quantidade, status) VALUES (?, ?, ?, 'Prometida')`,
            [doador_id, necessidade_id, quantidade]
        );

        // 3. Atualiza a quantidade faltante
        await conexao.execute(
            'UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - ? WHERE id = ?',
            [quantidade, necessidade_id]
        );

        await conexao.commit();
        res.status(201).json({ mensagem: 'Doação registrada e quantidade atualizada com sucesso!' });

    } catch (erro) {
        await conexao.rollback();
        res.status(400).json({ erro: erro.message });
    } finally {
        conexao.release();
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000! Acesse: http://localhost:3000/teste-conexao');
});
// Banco MySQL falso, em memória, só para os testes. Entende exatamente as
// instruções SQL que a API usa e substitui `pool` (config/db.js), de modo que
// o código real de services, controllers e repositories roda sem MySQL.
// Suporta transação (begin/commit/rollback) para testar atomicidade.

const { pool } = require('../../src/config/db');

const normalizar = (sql) => sql.replace(/\s+/g, ' ').trim();

function criarBanco() {
  return {
    usuarios: [],
    doadores: [],
    instituicoes: [],
    necessidades: [],
    doacoes: [],
    proximoId: { usuarios: 1, doadores: 1, instituicoes: 1, necessidades: 1, doacoes: 1 }
  };
}

function criarExecutor(banco, falhas) {
  const id = (tabela) => banco.proximoId[tabela]++;

  return async function execute(sqlOriginal, params = []) {
    const sql = normalizar(sqlOriginal);
    for (const falha of falhas) {
      if (sql.includes(falha.trecho)) throw falha.erro;
    }

    // Aceita `SELECT id ...` (verificação de e-mail do código original) e `SELECT id, senha ...`.
    if (/^SELECT id(, senha)? FROM usuarios WHERE email = \?$/.test(sql)) {
      return [banco.usuarios.filter((u) => u.email === params[0]).map((u) => ({ id: u.id, senha: u.senha }))];
    }
    if (/^INSERT INTO usuarios \(email, senha\) VALUES \(\?, \?\)$/.test(sql)) {
      const novo = { id: id('usuarios'), email: params[0], senha: params[1] };
      banco.usuarios.push(novo);
      return [{ insertId: novo.id }];
    }
    if (/^INSERT INTO doadores \(usuario_id, nome\) VALUES \(\?, \?\)$/.test(sql)) {
      const novo = { id: id('doadores'), usuario_id: params[0], nome: params[1] };
      banco.doadores.push(novo);
      return [{ insertId: novo.id }];
    }
    if (/^SELECT id, nome FROM doadores WHERE usuario_id = \?$/.test(sql)) {
      return [banco.doadores.filter((d) => d.usuario_id === params[0]).map((d) => ({ id: d.id, nome: d.nome }))];
    }
    if (/^INSERT INTO instituicoes \(usuario_id, nome, descricao, verificada\) VALUES \(\?, \?, \?, false\)$/.test(sql)) {
      const novo = { id: id('instituicoes'), usuario_id: params[0], nome: params[1], descricao: params[2], verificada: false };
      banco.instituicoes.push(novo);
      return [{ insertId: novo.id }];
    }
    if (/^SELECT id, nome, verificada FROM instituicoes WHERE usuario_id = \?$/.test(sql)) {
      return [banco.instituicoes
        .filter((i) => i.usuario_id === params[0])
        .map((i) => ({ id: i.id, nome: i.nome, verificada: i.verificada }))];
    }
    if (/^INSERT INTO necessidades \(instituicao_id, item, quantidadeTotal, quantidadeFaltante\) VALUES \(\?, \?, \?, \?\)$/.test(sql)) {
      const novo = {
        id: id('necessidades'), instituicao_id: params[0], item: params[1],
        quantidadeTotal: params[2], quantidadeFaltante: params[3]
      };
      banco.necessidades.push(novo);
      return [{ insertId: novo.id }];
    }
    if (/^SELECT quantidadeFaltante FROM necessidades WHERE id = \? FOR UPDATE$/.test(sql)) {
      return [banco.necessidades
        .filter((n) => n.id === params[0])
        .map((n) => ({ quantidadeFaltante: n.quantidadeFaltante }))];
    }
    if (/^INSERT INTO doacoes \(doador_id, necessidade_id, quantidade, status\) VALUES \(\?, \?, \?, 'Prometida'\)$/.test(sql)) {
      const novo = { id: id('doacoes'), doador_id: params[0], necessidade_id: params[1], quantidade: params[2], status: 'Prometida' };
      banco.doacoes.push(novo);
      return [{ insertId: novo.id }];
    }
    if (/^UPDATE necessidades SET quantidadeFaltante = quantidadeFaltante - \? WHERE id = \?$/.test(sql)) {
      const n = banco.necessidades.find((x) => x.id === params[1]);
      if (n) n.quantidadeFaltante -= params[0];
      return [{ affectedRows: n ? 1 : 0 }];
    }
    throw new Error(`BancoFalso: instrução SQL não suportada: ${sql}`);
  };
}

// Instala o banco falso no pool real. Devolve { banco, falharEm, eventos, restaurar }.
function instalar() {
  const banco = criarBanco();
  const falhas = [];
  const eventos = [];
  const execute = criarExecutor(banco, falhas);
  const original = { getConnection: pool.getConnection, execute: pool.execute, query: pool.query };

  pool.execute = execute;
  pool.query = async () => [[{ 1: 1 }]];
  pool.getConnection = async () => {
    let copia = null;
    return {
      execute,
      async beginTransaction() { copia = JSON.parse(JSON.stringify(banco)); eventos.push('begin'); },
      async commit() { copia = null; eventos.push('commit'); },
      async rollback() {
        if (copia) Object.assign(banco, JSON.parse(JSON.stringify(copia)));
        copia = null;
        eventos.push('rollback');
      },
      release() { eventos.push('release'); }
    };
  };

  return {
    banco,
    eventos,
    // Faz qualquer SQL que contenha `trecho` lançar `erro` (simula falha no meio da transação).
    falharEm(trecho, erro) { falhas.push({ trecho, erro }); },
    restaurar() { Object.assign(pool, original); }
  };
}

module.exports = { instalar };

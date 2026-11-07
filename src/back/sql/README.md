# Schema do MySQL

[`schema.sql`](schema.sql) é o único script de criação do banco versionado pela
aplicação. Ele cria o banco `conectaacao_db` e as cinco tabelas usadas pelos
repositories:

```text
usuarios
├── doadores
└── instituicoes
    └── necessidades
        └── doacoes
doadores ────────────────┘
```

As chaves estrangeiras impedem registros órfãos. As chaves únicas garantem que
um usuário tenha no máximo um perfil de doador ou de instituição, e o `CHECK`
de `necessidades` impede que o saldo faltante ultrapasse a quantidade total.
Todas as tabelas usam InnoDB para que essas relações e as transações da API
sejam aplicadas pelo MySQL.

## Criação

Execute o script completo em um cliente MySQL 8.0.16 ou superior:

```sql
SOURCE caminho/absoluto/para/src/back/sql/schema.sql;
```

O script é idempotente para uma instalação existente (`CREATE ... IF NOT
EXISTS`), mas alterações futuras de estrutura devem ser feitas por uma migração
explícita, não adicionando instruções destrutivas ao schema de criação.

## Verificação das relações

Depois da criação, selecione o banco e execute:

```sql
SELECT TABLE_NAME, ENGINE
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'conectaacao_db'
  AND TABLE_NAME IN ('usuarios', 'doadores', 'instituicoes', 'necessidades', 'doacoes')
ORDER BY TABLE_NAME;

SELECT TABLE_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME
FROM information_schema.REFERENTIAL_CONSTRAINTS
WHERE CONSTRAINT_SCHEMA = 'conectaacao_db'
ORDER BY TABLE_NAME, CONSTRAINT_NAME;

SELECT TABLE_NAME, CONSTRAINT_NAME, CHECK_CLAUSE
FROM information_schema.CHECK_CONSTRAINTS
WHERE CONSTRAINT_SCHEMA = 'conectaacao_db';
```

O resultado esperado é cinco tabelas InnoDB, quatro relações (`doadores` e
`instituicoes` com `usuarios`, `necessidades` com `instituicoes` e `doacoes`
com `doadores`/`necessidades`) e o check de saldo.


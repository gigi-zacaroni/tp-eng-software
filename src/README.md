# Código-fonte da aplicação

| Pasta | Conteúdo | Documentação |
|---|---|---|
| [`back/`](back/) | API REST em Node.js e Express, scripts SQL e testes automatizados | [`back/README.md`](back/README.md) |
| [`front/`](front/) | Página única (`index.html`, `app.js`, `style.css`) servida pela própria API | [`front/README.md`](front/README.md) |

## Resumo

- **Tecnologias:** Node.js 18.11 ou superior, Express 4, MySQL 8.0.16 ou superior, `bcryptjs`, `jsonwebtoken` e `mysql2`. O front-end usa HTML, CSS e JavaScript sem framework.
- **Instalação:** `npm install` dentro de `back/`.
- **Configuração:** copie `back/.env.example` para `back/.env` e preencha `DB_PASSWORD` e `JWT_SECRET`.
- **Banco:** rode `back/sql/schema.sql` no MySQL. Para dados de teste, rode `reset_test.sql` e `seed_test.sql` (banco `conectaacao_test`).
- **Execução:** `npm start` dentro de `back/` sobe a API e o front-end em `http://localhost:3000`.
- **Contas de teste:** só no banco `conectaacao_test`. Doadores `ana@email.com` e `bruno@email.com`, instituições `esperanca@email.com` e `alimentos@email.com`, todas com a senha `segredo123`.
- **Testes:** `npm test` dentro de `back/`.

Não versione `.env`, tokens, senhas ou chaves. O repositório tem só o `.env.example`.

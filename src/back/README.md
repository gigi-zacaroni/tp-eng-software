# API back-end

## Organização arquitetural

O back-end usa uma arquitetura em camadas. Cada camada possui uma responsabilidade
única e depende apenas das camadas abaixo dela:

```text
routes -> controllers -> services -> repositories -> MySQL
              |             |             |
          HTTP/Express   regras e       SQL por
                         transações     entidade
```

| Diretório | Responsabilidade |
|---|---|
| `src/routes/` | Declara endpoints, middleware e o controller responsável. |
| `src/controllers/` | Traduz `req`/`res` para chamadas de serviço e respostas HTTP. |
| `src/services/` | Executa validações de domínio e controla transações; não conhece Express nem escreve SQL. |
| `src/repositories/` | Centraliza o SQL de cada tabela e recebe o executor (`pool` ou conexão transacional). |
| `src/config/` | Configura o pool MySQL e o helper de transações. |
| `src/middleware/` | Valida JWT e autorizações antes do controller. |
| `src/utils/` | Helpers compartilhados de validação, erros e execução assíncrona. |

Neste projeto, `repositories/` é a camada equivalente ao acesso aos modelos
persistidos. Não foi criada uma pasta `models/` artificial: não há ORM nem
entidades com comportamento próprio; cada repository corresponde diretamente a
uma tabela do schema.

## Executar

Na pasta `src/back`:

```powershell
npm ci
Copy-Item .env.example .env
npm start
```

`package.json` e `package-lock.json` nesta pasta são os manifestos oficiais da
API. O comando `npm ci` instala exatamente as versões registradas no lockfile;
use `npm install` apenas quando alterar dependências.

O arquivo `.env.example` lista todas as configurações externas. O módulo
[`src/config/env.js`](src/config/env.js) é o único responsável por carregar e
normalizar essas variáveis, enquanto `.env` permanece ignorado pelo Git:

| Variável | Finalidade | Padrão local |
|---|---|---|
| `PORT` | Porta HTTP da API | `3000` |
| `DB_HOST`, `DB_PORT` | Host e porta do MySQL | `localhost`, `3306` |
| `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Credenciais e banco | `root`, vazio, `conectaacao_db` |
| `JWT_SECRET` | Assinatura dos tokens JWT | obrigatório para iniciar |
| `JWT_EXPIRES_IN` | Validade do token | `8h` |

Não coloque credenciais no código, no `package.json` ou no repositório.

Antes de iniciar a API, crie o banco executando
[`sql/schema.sql`](sql/schema.sql) no MySQL. Os critérios de validação das tabelas
e relações estão em [`sql/README.md`](sql/README.md).

## Testar

```powershell
npm test
```

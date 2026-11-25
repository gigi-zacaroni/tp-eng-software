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

## Ambiente e massa de dados para testes

Os testes manuais e automatizados podem usar o banco isolado
`conectaacao_test`, evitando alterações na base local da aplicação.

No MySQL, execute na ordem:

```sql
SOURCE caminho/absoluto/para/src/back/sql/reset_test.sql;
SOURCE caminho/absoluto/para/src/back/sql/seed_test.sql;
```

Use `reset_test.sql` para recriar as tabelas vazias e `seed_test.sql` para
carregar os usuários, doadores, instituições, necessidades e doações de teste.
Depois execute a API com `DB_NAME=conectaacao_test` no `.env`.

Para executar os testes de integração com MySQL real:

```powershell
$env:DB_INTEGRATION = "1"
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_USER = "root"
$env:DB_PASSWORD = "sua-senha"
npm test
```

Os testes de integração usam o banco `conectaacao_test`, recriam sua estrutura
e recarregam a massa antes de cada cenário. Sem `DB_INTEGRATION=1`, apenas os
testes com banco em memória são executados.

## Rotas

| Método e rota | Quem pode chamar | O que faz |
|---|---|---|
| `GET /teste-conexao` | qualquer um | Confirma a ligação com o MySQL. |
| `POST /cadastro/doador` | qualquer um | Cria usuário e doador. |
| `POST /cadastro/instituicao` | qualquer um | Cria usuário, instituição e necessidades iniciais opcionais. |
| `POST /login` | qualquer um | Devolve `{ token, tipo, perfil }`. |
| `POST /logout` | qualquer um | Responde sucesso; o cliente descarta o token. |
| `GET /instituicoes/destaques` | qualquer um | Até 4 instituições com mais necessidades abertas. |
| `GET /instituicoes` | logado | Lista as instituições. |
| `GET /instituicoes/:id` | logado | Detalhe com as necessidades e o progresso. |
| `POST /instituicoes/necessidades` | instituição | Cadastra item e quantidade para a instituição do token. |
| `POST /doacoes` | doador | Cria a doação `Prometida` e reduz o saldo da necessidade. |
| `GET /doacoes/minhas` | doador | Lista as doações do doador do token. |
| `PATCH /doacoes/:id/cancelar` | doador | Cancela uma doação própria em `Prometida` ou `A caminho` e devolve a quantidade. |
| `GET /doacoes/recebidas` | instituição | Lista as doações das necessidades da instituição. |
| `PATCH /doacoes/:id/aceitar` | instituição | `Prometida` para `A caminho`. |
| `PATCH /doacoes/:id/recusar` | instituição | `Prometida` para `Cancelada`, com devolução do saldo. |
| `PATCH /doacoes/:id/receber` | instituição | `A caminho` para `Entregue`. |

O doador não muda o status para `A caminho` ou `Entregue`: só a instituição confirma o recebimento (`RN-04`). A instituição só altera doações das próprias necessidades (403 nas outras). Uma transição fora da ordem devolve 409.

Chaves estrangeiras e `CHECK` violados viram respostas HTTP claras no handler central de erros.

## Testar

```powershell
npm test
```

São 88 testes com banco em memória. A lista de arquivos e casos está em [`tests/README.md`](../../tests/README.md).

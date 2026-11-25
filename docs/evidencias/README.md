# Evidências gerais

Capturas que não são de teste automatizado. As saídas do `npm test` ficam em [`docs/testes/evidencias/`](../testes/evidencias/).

Regras: nomes descritivos, sem dados pessoais, senhas ou tokens, e toda captura citada no documento ou na sprint correspondente.

## Sprint 3: verificação do back-end

Capturas de 28/09/2026, feitas com Thunder Client ou Postman e no MySQL Workbench. Citadas em [`sprint-03.md`](../sprints/sprint-03.md).

| Arquivo | O que mostra | Requisito |
|---|---|---|
| [`servidor_conexao.png`](servidor_conexao.png) | API no ar após `npm start` | |
| [`API_conexao.png`](API_conexao.png) | `GET /teste-conexao` com a API ligada ao MySQL | |
| [`BD.png`](BD.png) | As cinco tabelas criadas pelo [`schema.sql`](../../src/back/sql/schema.sql) | modelo estrutural |
| [`cadastro_doador/cadastro_doador.png`](cadastro_doador/cadastro_doador.png) | `POST /cadastro/doador` com resposta `201` | `RF-01` |
| [`cadastro_doador/BD_doadores.png`](cadastro_doador/BD_doadores.png) | Linhas em `usuarios` e `doadores`, com a senha em hash bcrypt | `RF-01`, `RNF-03` |
| [`cadastro_instituicao.png`](cadastro_instituicao.png) | `POST /cadastro/instituicao` com resposta `201` | `RF-02` |
| [`login.png`](login.png) | `POST /login` devolvendo o token JWT | `RF-03` |
| [`doacao/doacao.png`](doacao/doacao.png) | `POST /doacoes` com token de doador e resposta `201` | `RF-19` |
| [`doacao/BD_doacoes.png`](doacao/BD_doacoes.png) | Doação gravada como `Prometida` | `RF-19` |
| [`doacao/BD_necessidades.png`](doacao/BD_necessidades.png) | Saldo reduzido na mesma transação | `RF-18`, `RNF-06` |

Os casos de erro (409, 401, 403 e quantidade acima do saldo) não foram capturados. Eles são cobertos pelos testes automatizados (`CT-02`, `CT-09`, `CT-20`).

## Sprint 4: testes manuais após a refatoração

Citadas em [`sprint-04.md`](../sprints/sprint-04.md).

| Arquivo | O que mostra | Requisito |
|---|---|---|
| [`sprint-04/cadastro-instituicao.png`](sprint-04/cadastro-instituicao.png) | Cadastro no Postman | `RF-01`, `RF-02` |
| [`sprint-04/login.png`](sprint-04/login.png) | Login no Postman | `RF-03` |
| [`sprint-04/doacoes.png`](sprint-04/doacoes.png) | Doação no Postman | `RF-19` |

## Sprint 5: testes manuais do padrão Repository

Citadas em [`sprint-05.md`](../sprints/sprint-05.md).

| Arquivo | O que mostra | Requisito |
|---|---|---|
| [`login.jpeg`](login.jpeg) | Login depois da camada de repositories | `RF-03` |
| [`doações.jpeg`](doa%C3%A7%C3%B5es.jpeg) | Doação depois da camada de repositories | `RF-19` |
| [`cadastro_instituicoes.jpeg`](cadastro_instituicoes.jpeg) | Cadastro de instituição depois da camada de repositories | `RF-02` |
| [`reuniao-2026-10.png`](reuniao-2026-10.png) | Captura da reunião on-line de outubro | |

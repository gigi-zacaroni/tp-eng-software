# Evidências gerais

Use esta pasta para armazenar capturas, relatórios e pequenos vídeos/GIFs que não pertençam especificamente à pasta de testes.

Regras:

- use nomes descritivos;
- evite arquivos duplicados;
- não inclua dados pessoais, senhas ou tokens;
- sempre cite a evidência no documento ou na sprint correspondente;
- prefira formatos acessíveis no GitHub, como PNG, JPG, PDF e arquivos de texto;
- não use uma captura como substituta do código, do modelo ou do teste.

## Índice

### Sprint 3 — verificação do back-end

Todas produzidas em 28/09/2026 por chamada HTTP (Thunder Client / Postman) e inspeção no MySQL Workbench. Citadas em [`docs/sprints/sprint-03.md`](../sprints/sprint-03.md).

| Arquivo | O que mostra | Requisito |
|---|---|---|
| [`servidor_conexao.png`](servidor_conexao.png) | API no ar após `npm start` | — |
| [`API_conexao.png`](API_conexao.png) | `GET /teste-conexao` respondendo — API conectada ao MySQL | — |
| [`BD.png`](BD.png) | As cinco tabelas criadas no banco a partir de [`schema.sql`](../../src/back/sql/schema.sql) | modelo estrutural |
| [`cadastro_doador/cadastro_doador.png`](cadastro_doador/cadastro_doador.png) | `POST /cadastro/doador` respondendo `201` | `RF-01` |
| [`cadastro_doador/BD_doadores.png`](cadastro_doador/BD_doadores.png) | Linhas em `usuarios` e `doadores`, com a senha em hash bcrypt | `RF-01`, `RNF-03` |
| [`cadastro_instituicao.png`](cadastro_instituicao.png) | `POST /cadastro/instituicao` respondendo `201` | `RF-02` |
| [`login.png`](login.png) | `POST /login` devolvendo o token JWT | `RF-03` |
| [`doacao/doacao.png`](doacao/doacao.png) | `POST /doacoes` com token de doador, respondendo `201` | `RF-19` |
| [`doacao/BD_doacoes.png`](doacao/BD_doacoes.png) | Doação gravada com status `Prometida` | `RF-19` |
| [`doacao/BD_necessidades.png`](doacao/BD_necessidades.png) | `quantidadeFaltante` decrementada na mesma transação | `RF-18`, `RNF-06` |

**Não coberto por evidência:** os casos de erro (e-mail duplicado `409`, acesso sem token `401`, tipo incorreto `403`, quantidade acima do saldo) estão implementados e verificáveis pelo roteiro da [§4 da Sprint 3](../sprints/sprint-03.md#como-executar-e-verificar), mas não foram capturados.

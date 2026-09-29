# Sprint 3 — Modelagem e rastreabilidade dos requisitos

- **Data de entrega:** 28/09/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-03`
- **Responsável por conferir este arquivo:** Karol Guimarães (@KarolGSMiranda)

## 1. Pergunta que esta sprint deve responder

**Como a estrutura e os principais fluxos do sistema são representados?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** elaborar os modelos comportamental (fluxo de doação) e estrutural (entidade-relacionamento do domínio) do ConectaAção em Mermaid, versionados no repositório, e estabelecer a rastreabilidade verificável entre requisitos (`RF-01`–`RF-27`), modelos, código e banco de dados.

**Resultado efetivamente alcançado:** os dois modelos foram produzidos em [`docs/modelagem/modelagem.md`](../modelagem/modelagem.md), com descrição das decisões que representam, e a [matriz de rastreabilidade](../rastreabilidade.md) foi atualizada do estado da Sprint 2 para o desta sprint. O incremento correspondente é um back-end Node.js/Express que torna executável a **metade de escrita** do fluxo modelado — cadastro, login e promessa de doação — verificado por chamadas HTTP e inspeção no banco.

A **metade de leitura** do modelo (arestas 10 a 14: descobrir instituições, ver necessidades, painel da instituição) não saiu do diagrama. Essa é a principal pendência da sprint, detalhada na [seção 7](#7-revisão-do-incremento).

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/modelagem/modelagem.md`, ao menos um modelo comportamental e um estrutural, descrições e vínculo com requisitos.

- [x] Modelos legíveis e versionados no repositório — dois diagramas Mermaid renderizados pelo GitHub, sem imagem externa.
- [x] Descrição textual da finalidade e decisões de cada modelo — inclusive as três decisões de modelagem registradas na §3 e a justificativa da escolha dos dois modelos na §1.
- [x] Requisitos ligados aos elementos dos modelos — §4 de `modelagem.md` e a coluna *Modelo* da matriz de rastreabilidade.
- [x] Backlog/requisitos refinados quando a modelagem revelar mudanças — quatro linhas novas no [histórico de refinamento](../backlog-produto.md#7-histórico-de-refinamento) e dois itens criados (`T-09`, `T-10`).
- [x] Links entre elementos modelados e código existente — §5 de `modelagem.md`, incluindo a tabela de divergências conhecidas entre modelo e código.

### Links dos artefatos

| Artefato criado/atualizado | Link | O que mudou |
|---|---|---|
| [`docs/modelagem/modelagem.md`](../modelagem/modelagem.md) | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/docs/modelagem/modelagem.md) | **Artefato central.** Modelo comportamental e estrutural em Mermaid, decisões representadas, relação requisito × modelo, correspondência com o código e divergências conhecidas. |
| [`src/back/sql/schema.sql`](../../src/back/sql/schema.sql) | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/src/back/sql/schema.sql) | Tradução do modelo estrutural para DDL: cinco tabelas, FKs nomeadas, `UNIQUE` de e-mail e de perfil, e `CHECK (quantidadeFaltante <= quantidadeTotal)`. |
| [`docs/rastreabilidade.md`](../rastreabilidade.md) | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/docs/rastreabilidade.md) | Saiu do estado da Sprint 2: coluna *Modelo* preenchida com o elemento concreto (ou justificada quando vazia), coluna *Código* distinguindo back-end de protótipo, e dois estados novos na legenda. |
| [`docs/backlog-produto.md`](../backlog-produto.md) | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/docs/backlog-produto.md) | Seis itens novos (`D-05`–`D-07`, `T-08`–`T-10`), quatro histórias reclassificadas e cinco linhas no histórico de refinamento. |
| [`src/back/`](../../src/back/) | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-03/src/back) | Incremento da aplicação: API REST organizada em `config/`, `middleware/`, `routes/` e `utils/`. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** evolução de um fluxo modelado, estrutura de dados/classes coerente e evidência de correspondência entre modelo e código.

### O que foi implementado ou evoluído

O back-end (Node.js + Express + MySQL) implementa o fluxo **cadastro → login → promessa de doação**, correspondente às arestas 1 a 9 do modelo comportamental. Cada etapa é um endpoint chamável e verificável.

- **Cadastro de doador (`RF-01`)** — cria o usuário e o perfil de doador em uma única transação. Normaliza o e-mail, exige confirmação de senha e bloqueia e-mail duplicado com `409`. A senha é guardada com hash bcrypt (`RNF-03`).
- **Cadastro de instituição (`RF-02`)** — cria o usuário, a instituição (`verificada = false`) e as necessidades iniciais na mesma transação. Rejeita necessidade com item vazio ou quantidade que não seja inteiro maior que zero.
- **Login (`RF-03`)** — identifica se o usuário é doador ou instituição consultando as tabelas de perfil e devolve um JWT com `id`, `tipo` e `perfilId`.
- **Logout (`RF-04`)** — o token não é guardado no servidor, então o endpoint apenas orienta o cliente a descartá-lo. É um encerramento de sessão do lado do cliente, não uma revogação.
- **Prometer doação (`RF-19`)** — `POST /doacoes` exige doador autenticado e usa o doador vindo do token, nunca um id enviado no corpo. Numa transação com `SELECT ... FOR UPDATE`, confere se a necessidade existe e se a quantidade cabe no saldo; então grava a doação como `Prometida` e decrementa `quantidadeFaltante`. Se qualquer passo falhar, nada é alterado.

**Estrutura de dados** ([`src/back/sql/schema.sql`](../../src/back/sql/schema.sql)): cinco tabelas ligadas por chaves estrangeiras, traduzindo diretamente o modelo estrutural. `usuarios` se relaciona com `doadores` e `instituicoes` (um perfil por usuário, garantido por `UNIQUE` em `usuario_id`); `instituicoes` tem várias `necessidades`; `doacoes` liga `doadores` a `necessidades`. Duas regras do produto ficam no próprio banco: `UNIQUE` em `usuarios.email` e `CHECK (quantidadeFaltante <= quantidadeTotal)`, que sustenta o `RNF-06` independentemente do código de aplicação.

**Organização do código:** `config/` (conexão e o helper `comTransacao`), `middleware/` (autenticação JWT e permissão por tipo), `routes/` (os fluxos) e `utils/` (validação e erros HTTP).

### O que este incremento não cobre

O incremento é de escrita. Não há **nenhum endpoint de consulta** além do diagnóstico de conexão: não é possível listar instituições, ver o detalhe de uma, nem descobrir necessidades abertas pela API. Na prática, para prometer uma doação é preciso conhecer o `necessidade_id` de antemão, consultando o banco.

O front-end em [`src/front/`](../../src/front/) continua sendo a página estática da Sprint 2 — não tem formulário nem chamada HTTP, e não foi integrado à API (que também não tem CORS configurado). Toda a verificação desta sprint foi feita por cliente HTTP e inspeção no banco.

### Como executar e verificar

```bash
# 1. Banco: no MySQL Workbench, abra e execute src/back/sql/schema.sql
#    (requer MySQL 8.0.16+, por causa do CHECK)

# 2. Dependências e configuração
cd src/back
npm install
copy .env.example .env      # preencha DB_PASSWORD e JWT_SECRET no .env

# 3. Subir a API
npm start

# 4. Conferir a conexão com o banco
#    abrir no navegador: http://localhost:3000/teste-conexao

# 5. Verificação dos endpoints (Thunder Client / Postman), nesta ordem:
#    POST /cadastro/instituicao  -> 201
#    POST /cadastro/doador       -> 201
#    POST /login                 -> 200 (retorna o token)
#    POST /doacoes (header Authorization: Bearer <token>) -> 201
#    body: { "necessidade_id": 1, "quantidade": 4 }
```

Conferência no banco (Workbench):

```sql
SELECT id, item, quantidadeTotal, quantidadeFaltante FROM necessidades;
SELECT * FROM doacoes;
```

| Requisito/Issue | Código | Evidência de execução |
|---|---|---|
| `RF-01` — cadastro de doador · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [`routes/auth.js`](../../src/back/src/routes/auth.js) | [Requisição e linha no banco](../evidencias/cadastro_doador/) |
| `RF-02` — cadastro de instituição · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [`routes/auth.js`](../../src/back/src/routes/auth.js) | [Requisição](../evidencias/cadastro_instituicao.png) |
| `RF-03` — login · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [`routes/auth.js`](../../src/back/src/routes/auth.js) | [Token emitido](../evidencias/login.png) |
| `RF-19` — prometer doação · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [`routes/doacoes.js`](../../src/back/src/routes/doacoes.js) · [`middleware/autenticacao.js`](../../src/back/src/middleware/autenticacao.js) | [Requisição e efeito nas duas tabelas](../evidencias/doacao/) |
| Modelo estrutural aplicado · [#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16) | [`sql/schema.sql`](../../src/back/sql/schema.sql) | [Tabelas no MySQL](../evidencias/BD.png) |
| Subida da API e conexão com o banco · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [`server.js`](../../src/back/src/server.js) · [`config/db.js`](../../src/back/src/config/db.js) | [Servidor](../evidencias/servidor_conexao.png) · [`GET /teste-conexao`](../evidencias/API_conexao.png) |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

Os quatro primeiros itens são o trabalho próprio da sprint; os quatro últimos são as histórias de usuário que o incremento tocou.

| Issue | Descrição | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) | `D-05` — Modelo comportamental do fluxo de doação (`RF-19`–`RF-24`) | @gigi-zacaroni | Diagrama Mermaid versionado, cobrindo o ciclo até a confirmação de recebimento, com descrição das decisões. | Concluída |
| [#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16) | `D-06` — Modelo estrutural (ER) e schema MySQL (`RF-01`, `RF-02`, `RF-18`, `RF-19`) | @Malupestana | `erDiagram` versionado e DDL executável com as constraints que sustentam o `RNF-06`. | Concluída |
| [#17](https://github.com/gigi-zacaroni/tp-eng-software/issues/17) | `D-07` — Matriz de rastreabilidade da Sprint 3 (`RF-01`–`RF-27`) | @ArtJamis1208 | Coluna *Modelo* apontando para o elemento concreto, células vazias justificadas e legenda atualizada. | Concluída |
| [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | `T-08` — API REST de cadastro, login e promessa de doação | @gigi-zacaroni | Cinco endpoints operacionais, senha com bcrypt, transações atômicas e doador vindo do token. | Concluída |
| [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | `US-01` — Criar conta de doador (`RF-01`) | @gigi-zacaroni | 3 critérios de aceitação atendidos no back-end, com evidência de execução. | Implementada (back-end) — **sem interface e sem revisão de par** |
| [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `US-02` — Cadastrar instituição (`RF-02`, `RF-11`) | @Malupestana | Cadastro em três seções com necessidades iniciais. | Implementada parcialmente — **faltam causa, cidade e contato** |
| [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | `US-03` — Entrar e acesso protegido (`RF-03`–`RF-05`) | @gigi-zacaroni | Login, logout e restrição de dados a autenticados. | Implementada parcialmente — **`RF-05` sem rota de leitura para proteger** |
| [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `US-08` — Prometer uma doação (`RF-18`, `RF-19`, `RNF-06`) | @gigi-zacaroni | Doação limitada ao saldo, com progresso da necessidade atualizado. | Implementada parcialmente — **`RF-18` sem endpoint que exponha o progresso** |

> **Nenhuma história de usuário atingiu `Concluída` nesta sprint.** A [Definition of Done](../backlog-produto.md#6-definition-of-done) do grupo exige revisão por outro integrante, evidências e documentação atualizada. As quatro histórias acima têm código e evidência de execução, mas nenhuma foi exercitada por uma interface nem revisada em Pull Request — ver a seção 6.

### Estado do quadro no fechamento da sprint

O acompanhamento é feito no [GitHub Project](https://github.com/users/gigi-zacaroni/projects/1), cujas colunas são `Backlog · A fazer · Em andamento · Em revisão · Concluído`.

| Card | Coluna | Sprint | Responsável |
|---|---|---|---|
| [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) `D-05` Modelo comportamental | Concluído | 3 | @gigi-zacaroni |
| [#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16) `D-06` Modelo estrutural + schema | Concluído | 3 | @Malupestana |
| [#17](https://github.com/gigi-zacaroni/tp-eng-software/issues/17) `D-07` Matriz de rastreabilidade | Concluído | 3 | @ArtJamis1208 |
| [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) `T-08` API REST | Concluído | 3 | @gigi-zacaroni |
| [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) `US-01` Criar conta de doador | Em revisão | 3 | @gigi-zacaroni |
| [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) `US-03` Entrar e acesso protegido | Em andamento | 3 | @gigi-zacaroni |
| [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) `US-02` Cadastrar instituição | Em andamento | 3 | @Malupestana |
| [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) `US-08` Prometer uma doação | Em andamento | 3 | @gigi-zacaroni |
| [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) `T-10` Endpoints de consulta | A fazer | 4 | a definir |
| [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) `T-09` Remover legado e consolidar schema | A fazer | 4 | a definir |
| [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) `US-04` Encontrar instituições | A fazer | 4 | @KarolGSMiranda |
| [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) `US-05` Detalhe da instituição | A fazer | 4 | @KarolGSMiranda |
| [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) `US-07` Gerenciar necessidades | A fazer | 4 | @Malupestana |
| [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) `US-09` Acompanhar e cancelar doações | Backlog | 5 | @ArtJamis1208 |
| [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) `US-10` Receber e confirmar doações | Backlog | 5 | @Malupestana |
| [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) `US-11` Receber notificações | Backlog | — | @ArtJamis1208 |
| [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) `US-06` Favoritar instituições | Backlog | — | @ArtJamis1208 |

`US-04` e `US-05` foram alocadas para a Sprint 4 logo atrás de `T-10`, porque dependem dos endpoints de consulta. `US-09` e `US-10` ficam para a Sprint 5 por dependerem da transição de status da doação, que ainda não existe.

### Acompanhamento

- **GitHub Project:** [ConectaAção — Backlog](https://github.com/users/gigi-zacaroni/projects/1) — onde os itens da sprint são acompanhados.
- **Reuniões/decisões:** [ata da Sprint 3](../reunioes/2026-09-22-planejamento-sprint-03.md), cobrindo os dois momentos do ciclo.
  - **Planejamento, 22/09, presencial** (três integrantes): escolha dos dois modelos e do Mermaid como formato, divisão do trabalho entre os integrantes, **mudança de stack para Node.js/Express** e decisão de implementar o fluxo de doação como incremento, indo além do mínimo exigido pela sprint.
  - **Fechamento, 28/09, por mensagem** (quatro integrantes): revisão do incremento contra os modelos, de onde saíram o tratamento transacional da promessa de doação, o registro explícito das divergências entre modelo e código, o reconhecimento da ausência dos endpoints de consulta como lacuna, os dois estados novos do backlog e a adoção de Pull Request a partir da Sprint 4. A ata aponta onde cada decisão foi registrada.
- **Impedimentos:** nenhum impedimento externo. A dificuldade interna foi a duplicação de esforço no back-end: duas tentativas paralelas de implementação (`src/server.js` em 26/09 e `src/Cadastro_back.js` em 27/09) foram feitas antes da consolidação em `src/back/` no dia 28. Isso consumiu parte da sprint e deixou um arquivo órfão no repositório (`T-09`).
- **Mudanças de escopo:** **uma, relevante — a troca de stack.** A [decisão 5 da ata de 12/09](../reunioes/2026-09-12-refinamento-requisitos.md) fixou Next.js/React no front e Java/Spring Boot no back, e o `README.md` registrava isso. No [planejamento de 22/09](../reunioes/2026-09-22-planejamento-sprint-03.md) o grupo revisou essa escolha — nenhuma linha havia sido escrita no stack anterior — e optou por **Node.js/Express + MySQL**, com front em HTML/CSS, para conseguir entregar um fluxo verificável dentro do prazo. Nenhum requisito foi alterado, adicionado ou removido: a decisão troca a tecnologia, não o comportamento especificado. O `README.md` e o [histórico de refinamento do backlog](../backlog-produto.md#7-histórico-de-refinamento) foram atualizados.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) · [#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16) · [#17](https://github.com/gigi-zacaroni/tp-eng-software/issues/17) · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | Os quatro itens de trabalho da sprint, cada um com requisitos relacionados e critérios de conclusão no corpo. Abertas no fechamento da sprint, para dar registro formal a trabalho que estava sendo acompanhado informalmente — a data de criação reflete isso. Issues de trabalho futuro descoberto: [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) e [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20). |
| Pull Request | **Nenhum nesta sprint.** Últimos: [#1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) · [#4](https://github.com/gigi-zacaroni/tp-eng-software/pull/4) · [#14](https://github.com/gigi-zacaroni/tp-eng-software/pull/14), todos de 14/09 (Sprint 2) | Todo o trabalho da Sprint 3 foi enviado direto para `main`, sem branch e sem revisão. Isso descumpre os passos 3, 5, 6 e 8 do fluxo de [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e é a razão pela qual nenhuma história consta como revisada. Ação corretiva na seção 8. |
| Commit | [`26b7fd1`](https://github.com/gigi-zacaroni/tp-eng-software/commit/26b7fd135624e5c47428425a190b44c7a0420c23) · [`d72574c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d72574c4cf49a529badbd6d8858ceec19492998f) · [`ca58383`](https://github.com/gigi-zacaroni/tp-eng-software/commit/ca58383) | Primeira API e DDL (26/09); consolidação do back-end em `src/back/` com as evidências (28/09); revisão final da modelagem (28/09). O histórico entre 24 e 28/09 mostra a evolução diária, com participação de Maria Luiza, Geovana e Arthur. |
| Código/arquivo | [`docs/modelagem/modelagem.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/docs/modelagem/modelagem.md) · [`src/back/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-03/src/back) · [`docs/rastreabilidade.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/docs/rastreabilidade.md) | Artefato central, incremento e matriz de rastreabilidade, na tag da sprint. |
| Teste/captura/relatório | [`docs/evidencias/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-03/docs/evidencias) — 10 capturas | Execução de cada endpoint com a linha correspondente no banco: [servidor no ar](../evidencias/servidor_conexao.png), [conexão com o MySQL](../evidencias/API_conexao.png), [schema aplicado](../evidencias/BD.png), [cadastro de doador](../evidencias/cadastro_doador/), [cadastro de instituição](../evidencias/cadastro_instituicao.png), [login](../evidencias/login.png) e [promessa de doação](../evidencias/doacao/). **Não há teste automatizado** — `tests/` segue vazio; é o artefato da Sprint 7. |

### Rastreabilidade resumida

A tabela completa dos 27 requisitos está em [`docs/rastreabilidade.md`](../rastreabilidade.md). Resumo do que esta sprint moveu:

| Requisito | Issue | Modelo | Código | Evidência |
|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [§3 — `USUARIO` + `DOADOR`](../modelagem/modelagem.md#3-modelo-estrutural) | [`routes/auth.js`](../../src/back/src/routes/auth.js) | [captura](../evidencias/cadastro_doador/) |
| `RF-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [§3 — `INSTITUICAO` + `NECESSIDADE`](../modelagem/modelagem.md#3-modelo-estrutural) | [`routes/auth.js`](../../src/back/src/routes/auth.js) | [captura](../evidencias/cadastro_instituicao.png) |
| `RF-03`, `RF-04` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [§6 — separação de perfis](../modelagem/modelagem.md#6-refinamentos-identificados) | [`routes/auth.js`](../../src/back/src/routes/auth.js) | [captura](../evidencias/login.png) |
| `RF-05` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | [§2 — etapa de acesso](../modelagem/modelagem.md#2-modelo-comportamental) | [`middleware/autenticacao.js`](../../src/back/src/middleware/autenticacao.js) | parcial — aplicado só em `POST /doacoes` |
| `RF-18` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | [§3 — saldo da necessidade](../modelagem/modelagem.md#3-modelo-estrutural) | [`routes/doacoes.js`](../../src/back/src/routes/doacoes.js) | [saldo no banco](../evidencias/doacao/BD_necessidades.png) — sem endpoint que o exponha |
| `RF-19` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) · [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | [§2 — arestas 1 a 9](../modelagem/modelagem.md#2-modelo-comportamental) | [`routes/doacoes.js`](../../src/back/src/routes/doacoes.js) | [captura](../evidencias/doacao/) |
| `RF-20`–`RF-24` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) · [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | [§2 — arestas 10 a 16](../modelagem/modelagem.md#2-modelo-comportamental) | — modelado, sem código | — |
| `RNF-03` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | — | `bcrypt.hash` em [`routes/auth.js`](../../src/back/src/routes/auth.js) | [hash no banco](../evidencias/cadastro_doador/BD_doadores.png) |
| `RNF-06` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | [§3 — decisão 2](../modelagem/modelagem.md#3-modelo-estrutural) | `FOR UPDATE` + `CHECK` no [schema](../../src/back/sql/schema.sql) | [saldo decrementado](../evidencias/doacao/BD_necessidades.png) |

## 7. Revisão do incremento

- **O que foi demonstrado:** execução do fluxo de escrita do back-end (Node.js + Express + MySQL) por cliente HTTP (Thunder Client / Postman) com inspeção do estado no MySQL Workbench:

  1. **Cadastro de doador e de instituição (`RF-01`, `RF-02`).** Registro de doador e de instituição, cada um criando usuário e perfil na mesma transação. Verificou-se no banco que a coluna `senha` guarda hash bcrypt, e que a instituição nasce com `verificada = false` e com suas necessidades iniciais vinculadas.
  2. **Login (`RF-03`) e logout (`RF-04`).** Login com credenciais válidas devolvendo o JWT com `id`, `tipo` e `perfilId`.
  3. **Promessa de doação (`RF-19`).** `POST /doacoes` com o token do doador. Verificou-se no banco que a doação é gravada como `Prometida` e que `quantidadeFaltante` da necessidade é decrementada na mesma transação.

- **Critérios atendidos:** os quatro itens de trabalho da sprint ([#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) a [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18)) tiveram seus critérios de conclusão cumpridos. No plano dos requisitos:
  - `RF-01`, `RF-03`, `RF-04` e `RF-19` operacionais no back-end, com evidência de execução;
  - `RF-02`, `RF-05` e `RF-18` atendidos parcialmente (ver tabela abaixo);
  - `RNF-03` atendido (bcrypt) e `RNF-06` atendido no back-end — este último cobrindo a lacuna que o protótipo havia deixado aberta na Sprint 2;
  - correspondência entre os modelos de [`modelagem.md`](../modelagem/modelagem.md) e os arquivos de `src/back/` registrada na §5 daquele documento, **incluindo as divergências encontradas**.

- **Itens não concluídos:**

  | Item | Estado atual | O que falta | Registro |
  |---|---|---|---|
  | `RF-06`–`RF-10` — descoberta de instituições | Nenhum endpoint de consulta na API | Rotas `GET` de listagem, filtro e detalhe, mais CORS | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) |
  | `RF-02` — dados da instituição | Só `nome` e `descricao` são gravados | Causa, cidade e contato no schema e na rota | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) |
  | `RF-05` — acesso protegido | Middleware existe e funciona, mas não há rota de leitura para proteger | Depende de [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) |
  | `RF-18` — progresso da necessidade | Saldo mantido corretamente no banco, invisível pela API | Endpoint que exponha o progresso | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) |
  | `RF-20`, `RF-21`, `RF-23` — ciclo da doação | Trava em `Prometida`; o campo `status` existe mas não muda | Rota de transição e cancelamento com devolução de saldo | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) |
  | Front-end | Página estática da Sprint 2, sem formulário e sem `fetch` | Integração com a API | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) |
  | `src/server.js` legado | Versionado, com credencial no código e doador forjável no corpo da requisição | Remover | [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) |
  | Dois arquivos de schema | `database/` e `src/back/sql/` divergem; `dataPromessa` existe no modelo e não no schema em uso | Consolidar num único arquivo | [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) |

- **Motivo das pendências:** duas causas distintas. A primeira é de **priorização**: o objetivo da sprint era demonstrar correspondência entre modelo e código, e o fluxo de escrita é o que exercita as regras de negócio mais sensíveis (transação, saldo, autorização) — foi por onde o grupo começou, deixando as consultas para depois. A consequência não prevista é que o produto ficou sem a funcionalidade que resolve o problema central: descobrir quem ajudar. A segunda é de **processo**: houve duas tentativas paralelas de back-end antes da consolidação, o que consumiu tempo e deixou o arquivo órfão de [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19).

- **Feedback recebido e ajustes:** dois, ambos durante a execução.
  1. **Concorrência no saldo da necessidade.** Ao revisar o fluxo de doação, identificou-se que dois doadores simultâneos poderiam prometer quantidades que, somadas, excederiam o saldo — o `RNF-06` seria violado sem que nenhuma requisição individual parecesse inválida. Ajuste: isolamento por transação com `SELECT ... FOR UPDATE` antes de gravar, mais o `CHECK (quantidadeFaltante <= quantidadeTotal)` como última barreira no banco.
  2. **Correspondência modelo × código desatualizada.** Na revisão final da modelagem ([`ca58383`](https://github.com/gigi-zacaroni/tp-eng-software/commit/ca58383)) constatou-se que a seção de correspondência apontava para arquivos que a reorganização de [`d72574c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d72574c4cf49a529badbd6d8858ceec19492998f) havia renomeado ou removido. Ajuste: a seção foi reescrita com os caminhos reais e ganhou uma tabela explícita de divergências conhecidas entre o que o modelo afirma e o que o código faz.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** a divisão entre modelagem e implementação permitiu que as duas avançassem em paralelo, e a exigência de evidenciar cada endpoint com a linha correspondente no banco tornou o incremento verificável por quem não escreveu o código.

- **Precisa melhorar:** três pontos, em ordem de impacto.
  1. **Nenhum Pull Request nesta sprint.** Todo o código entrou direto na `main`, sem revisão — o que contraria [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e é a razão de nenhuma história atingir a Definition of Done.
  2. **Trabalho sem Issue.** As Issues desta sprint só foram criadas no fechamento, então o quadro não refletiu o andamento enquanto a sprint corria.
  3. **Mensagens de commit genéricas.** Há uma sequência de commits `Update sprint-03.md`, exatamente o padrão que `CONTRIBUTING.md` desaconselha — consequência de editar o arquivo pelo editor web do GitHub, que sugere esse texto e grava direto na `main`.
  4. **O fechamento foi assíncrono.** A revisão do incremento aconteceu por troca de mensagens no dia da entrega, e não em um momento em que os quatro examinassem o código junto. As decisões foram tomadas e registradas, mas sem revisão conjunta — o que se soma à ausência de Pull Request para explicar por que nenhuma história atende à Definition of Done.

- **Ações concretas para a Sprint 4:**
  1. Abrir a Issue **antes** de começar cada item e movê-la no Project ao longo da sprint, não no fim.
  2. Trabalhar em branch e abrir PR com revisão de outro integrante — começando por [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19), que é pequeno e serve de piloto do fluxo.
  3. Priorizar [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) (endpoints de consulta), que destrava `US-04`, `US-05` e a verificação do `RF-05`.
  4. Marcar a revisão do incremento como reunião síncrona, com os quatro presentes e o código aberto, em vez de fechar a sprint por mensagem no dia da entrega.
  5. Aplicar princípios de projeto — coesão e baixo acoplamento — separando as rotas das regras de negócio, que é o artefato central da Sprint 4.

## 9. O que não será considerado suficiente

- Diagramas sem explicação.
- Imagens externas sem versão no repositório.
- Modelo genérico que não corresponde aos requisitos ou ao código.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-03`:** https://github.com/gigi-zacaroni/tp-eng-software/releases/tag/sprint-03
- **Este arquivo na tag:** https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-03/docs/sprints/sprint-03.md
- **Observação adicional:** o artefato central está em [`docs/modelagem/modelagem.md`](../modelagem/modelagem.md). Durante a sprint o conteúdo foi escrito num arquivo paralelo (`modelagemConecta.md`), consolidado no arquivo previsto antes da entrega.

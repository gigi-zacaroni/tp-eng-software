# Matriz de rastreabilidade

> Atualize esta tabela ao longo do semestre. Células vazias devem ser justificadas; não invente links ou evidências.

**Estado em: Sprint 3 (28/09/2026).** A coluna *Modelo* passou a apontar para o elemento correspondente em [`docs/modelagem/modelagem.md`](modelagem/modelagem.md). A coluna *Código* registra o arquivo do back-end quando o requisito foi implementado e, nos demais casos, a **tela do protótipo navegável** que o demonstra, conforme [`docs/prototipo/README.md`](prototipo/README.md) — o prefixo `protótipo:` distingue os dois. As colunas *Decisão/padrão* e *Caso de teste* seguem sem conteúdo: são os artefatos das Sprints 4 e 7.

Legenda da situação:

- **Implementado (back-end)** — requisito atendido por código executável, com evidência de execução registrada em [`docs/evidencias/`](evidencias/). Ainda sem interface e sem teste automatizado.
- **Implementado parcialmente** — parte do requisito tem código; a lacuna está registrada na [seção 7 do arquivo da Sprint 3](sprints/sprint-03.md).
- **Especificado** — requisito identificado, com critério de aceitação e fluxo demonstrado no protótipo, sem implementação.
- **Especificado (parcial)** — o protótipo não demonstra integralmente o critério; a lacuna está registrada na [seção 7 do arquivo da Sprint 2](sprints/sprint-02.md).

## Requisitos funcionais

| Requisito | História/Issue | Modelo ([`modelagem.md`](modelagem/modelagem.md)) | Decisão/padrão/arquitetura | Código / protótipo | Caso de teste | Resultado/evidência | Situação final |
|---|---|---|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) — `US-01` | §3 — `USUARIO` + `DOADOR` | Sprint 4 | [`routes/auth.js`](../src/back/src/routes/auth.js) | Sprint 7 | [Cadastro de doador](evidencias/cadastro_doador/) | **Implementado (back-end)** |
| `RF-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) — `US-02` | §3 — `INSTITUICAO` + `NECESSIDADE` (um para muitos obrigatório) | Sprint 4 | [`routes/auth.js`](../src/back/src/routes/auth.js) | Sprint 7 | [Cadastro de instituição](evidencias/cadastro_instituicao.png) | **Implementado parcialmente** — sem causa, cidade e contato |
| `RF-03` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | §3 — `USUARIO` · §6 separação de perfis | Sprint 4 | [`routes/auth.js`](../src/back/src/routes/auth.js) | Sprint 7 | [Login](evidencias/login.png) | **Implementado (back-end)** |
| `RF-04` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | — não modelado: o logout é stateless e não altera o domínio | Sprint 4 | [`routes/auth.js`](../src/back/src/routes/auth.js) | Sprint 7 | — sem captura; o endpoint só orienta o descarte do token | **Implementado (back-end)** |
| `RF-05` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | §2 — etapa de acesso que precede o passo 1 | Sprint 4 | [`middleware/autenticacao.js`](../src/back/src/middleware/autenticacao.js) | Sprint 7 | — aplicado só em `POST /doacoes` | **Implementado parcialmente** — sem rota de leitura para proteger |
| `RF-06` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | Sprint 4 | protótipo: `landing` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-07` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | Sprint 4 | protótipo: `listagem` | Sprint 7 | [Roteiro `US-04`](prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) | Especificado |
| `RF-08` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | Sprint 4 | protótipo: busca em `listagem` | Sprint 7 | [Roteiro `US-04`](prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) | Especificado |
| `RF-09` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | Sprint 4 | protótipo: filtros em `listagem` | Sprint 7 | [Roteiro `US-04`](prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) | Especificado |
| `RF-10` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | — não modelado; lacuna registrada na §6 | Sprint 4 | protótipo: `detalhe` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-11` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | §3 — `INSTITUICAO.verificada` | Sprint 4 | campo existe no [schema](../src/back/sql/schema.sql), sem fluxo de verificação · protótipo: selo ilustrativo | Sprint 7 | [Limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) | Especificado (parcial) |
| `RF-12` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | — favoritos fora do escopo dos dois modelos desta sprint | Sprint 4 | protótipo: ação favoritar | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-13` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | — favoritos fora do escopo dos dois modelos desta sprint | Sprint 4 | protótipo: `favoritos` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-14` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | §3 — `NECESSIDADE` | Sprint 4 | criação só no cadastro inicial, em [`routes/auth.js`](../src/back/src/routes/auth.js) · protótipo: `painel` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-15` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | §3 — `NECESSIDADE` | Sprint 4 | protótipo: `painel` → editar | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-16` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | §3 — FK `DOACAO` → `NECESSIDADE` preserva as doações | Sprint 4 | protótipo: `painel` → excluir | Sprint 7 | [Roteiro `US-07`](prototipo/README.md#us-07-ca-3--excluir-necessidade-preserva-doações-rf-16-rnf-07) | Especificado |
| `RF-17` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | — a situação Aberta/Pausada não foi representada no modelo estrutural | Sprint 4 | protótipo: situação no formulário | Sprint 7 | [Limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) | Especificado (parcial) |
| `RF-18` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | §3 — `quantidadeTotal` e `quantidadeFaltante` | Sprint 4 | saldo mantido em [`routes/doacoes.js`](../src/back/src/routes/doacoes.js), sem endpoint que o exponha | Sprint 7 | [Necessidades no banco](evidencias/doacao/BD_necessidades.png) | **Implementado parcialmente** — dado correto, sem consulta |
| `RF-19` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | §2 — arestas 1 a 9 · §3 — `DOACAO` | Sprint 4 | [`routes/doacoes.js`](../src/back/src/routes/doacoes.js) | Sprint 7 | [Promessa de doação](evidencias/doacao/) | **Implementado (back-end)** |
| `RF-20` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | §2 — aresta 15 · §3 — `DOACAO.status` | Sprint 4 | sem rota de transição · protótipo: `minhasDoacoes` | Sprint 7 | [Roteiro `US-09`](prototipo/README.md#us-09-ca-2-e-ca-4--avançar-e-cancelar-rf-20-rf-21-rn-03) | Especificado |
| `RF-21` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | §2 — aresta 15, devolução ao saldo | Sprint 4 | sem rota de cancelamento · protótipo: ação cancelar | Sprint 7 | [Limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) | Especificado (parcial) |
| `RF-22` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | §2 — arestas 10 a 14 | Sprint 4 | sem endpoint de consulta · protótipo: `painel` → Doações a receber | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-23` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | §2 — aresta 16 | Sprint 4 | sem rota de confirmação · protótipo: "Marcar recebida" | Sprint 7 | [Roteiro `US-10`](prototipo/README.md#us-05-ca-1--us-10-ca-2-e-ca-3--progresso-e-confirmação-rf-18-rf-23-rn-04-rn-05) | Especificado |
| `RF-24` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | §2 — painel · §3 — agregação de `DOACAO` por `NECESSIDADE` | Sprint 4 | sem consulta de agregação · protótipo: Resumo por necessidade | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-25` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | — notificações fora do escopo dos dois modelos desta sprint | Sprint 4 | protótipo: sino de notificações | Sprint 7 | [Roteiro `US-11`](prototipo/README.md#us-11-ca-1-e-ca-2--notificações-rf-25-rf-27) | Especificado |
| `RF-26` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | — notificações fora do escopo dos dois modelos desta sprint | Sprint 4 | protótipo: sino (perfil doador) | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-27` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | — notificações fora do escopo dos dois modelos desta sprint | Sprint 4 | protótipo: dropdown + contador | Sprint 7 | [Roteiro `US-11`](prototipo/README.md#us-11-ca-1-e-ca-2--notificações-rf-25-rf-27) | Especificado |

> **Por que 14 dos 27 requisitos aparecem sem modelo.** Os dois modelos desta sprint cobrem o fluxo de doação e o domínio persistido. As funcionalidades de descoberta (`RF-06`–`RF-10`), favoritos (`RF-12`, `RF-13`) e notificações (`RF-25`–`RF-27`) não foram modeladas — no caso da descoberta, isso se revelou uma lacuna relevante, registrada na [§6 de `modelagem.md`](modelagem/modelagem.md#6-refinamentos-identificados) e transformada no item `T-10` do backlog.

## Requisitos não funcionais

| Requisito | História/Issue | Como será verificado | Situação na Sprint 3 |
|---|---|---|---|
| `RNF-01` — doação em no máximo 3 passos | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Contagem de passos no fluxo | **Atendido no protótipo:** item → quantidade → confirmação ([roteiro](prototipo/README.md#us-08-ca-1-e-rnf-01--doar-em-3-passos-rf-19)). Não reverificável no back-end: a contagem é da interface, que ainda não existe. |
| `RNF-02` — 390 px a 1440 px, toque ≥ 44 px | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5)–[#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Emulação de dispositivos no navegador | Planejado — depende da interface |
| `RNF-03` — senhas com hash (bcrypt) | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | Inspeção do banco e do código de autenticação | **Atendido no back-end:** `bcrypt.hash(senha, 10)` em [`routes/auth.js`](../src/back/src/routes/auth.js); coluna `senha` guarda o hash, verificável em [`BD_doadores.png`](evidencias/cadastro_doador/BD_doadores.png) |
| `RNF-04` — contato visível só a autenticados | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Acesso ao detalhe sem login | **Atendido no protótipo.** No back-end não é verificável ainda: não há endpoint que devolva dados de contato. |
| `RNF-05` — nenhum dado de pagamento | — (restrição de escopo) | Revisão de telas e formulários | **Atendido:** nem o protótipo nem o schema em uso guardam qualquer dado de pagamento |
| `RNF-06` — prometido + recebido ≤ desejado | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Teste de limite no fluxo de doação | **Atendido no back-end:** validação em [`routes/doacoes.js`](../src/back/src/routes/doacoes.js) sob `SELECT ... FOR UPDATE`, reforçada pelo `CHECK (quantidadeFaltante <= quantidadeTotal)` no [schema](../src/back/sql/schema.sql). Cobre a lacuna que o protótipo deixou aberta na Sprint 2. |
| `RNF-07` — excluir necessidade preserva doações | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Exclusão de necessidade com doação associada | **Atendido no protótipo** ([roteiro](prototipo/README.md#us-07-ca-3--excluir-necessidade-preserva-doações-rf-16-rnf-07)). No back-end não há rota de exclusão; a FK de `doacoes` já impede a perda silenciosa. |
| `RNF-08` — listagem carrega em até 2 s | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Medição no navegador | Planejado — não há listagem implementada |
| `RNF-09` — Chrome, Firefox e Edge | — (aplica-se a todo o produto) | Teste manual multi-navegador | Planejado |
| `RNF-10` — foco visível, contraste e teclado | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Checklist WCAG básico e navegação sem mouse | Planejado — checklist previsto para a Sprint 7 |

## Como preencher

- **Requisito:** identificador existente em `docs/requisitos/requisitos.md`.
- **História/Issue:** link direto para a Issue no GitHub.
- **Modelo:** seção, diagrama ou arquivo que representa o requisito.
- **Decisão/padrão/arquitetura:** identificador da decisão técnica pertinente.
- **Código:** link para o arquivo ou diretório na tag da sprint.
- **Caso de teste:** identificador definido no plano de testes.
- **Resultado/evidência:** relatório, captura, log ou execução documentada.
- **Situação final:** atendido, parcialmente atendido, não atendido ou retirado do escopo com justificativa.

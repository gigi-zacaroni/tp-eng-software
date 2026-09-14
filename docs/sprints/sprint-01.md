# Sprint 1 — Problema, visão do produto e organização inicial

- **Data de entrega:** 24/08/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-01`
- **Responsável por conferir este arquivo:** Karol Guimarães (@KarolGSMiranda)

> **Nota de registro:** os artefatos desta sprint (`README.md`, `docs/visao-geral.md` e `docs/backlog-produto.md`) foram produzidos dentro do prazo, mas este arquivo-índice só foi consolidado durante a Sprint 2. A falha e a ação corretiva estão registradas na seção 8.

## 1. Pergunta que esta sprint deve responder

**Qual problema será tratado, quem é afetado e qual produto o grupo pretende desenvolver?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** delimitar um problema real e específico, identificar quem é afetado por ele, definir a proposta de valor da solução e estruturar o repositório e o backlog inicial para as sprints seguintes.

**Resultado efetivamente alcançado:** o problema foi delimitado como a **dificuldade de conexão entre pessoas dispostas a ajudar e instituições de caridade que precisam de apoio** — explicitando que a escassez não é de doadores, mas de conexão entre as duas pontas. Foram definidos o nome do produto (**ConectaAção**), a proposta de valor, cinco objetivos específicos, três stakeholders e os limites iniciais de escopo (8 itens dentro, 6 fora). O repositório foi estruturado, o GitHub Project criado e o backlog inicial registrado com 8 itens (`T-01`–`T-07` e `D-01`), além da definição de papéis dos quatro integrantes.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `README.md`, `docs/visao-geral.md`, `docs/backlog-produto.md` e GitHub Project com pelo menos dez itens descritos e priorizados.

- [x] Problema delimitado, com público e contexto identificados.
- [x] Proposta de valor, objetivos e limites iniciais definidos.
- [x] Integrantes e organização de trabalho registrados.
- [x] GitHub Project criado e linkado.
- [ ] Issues iniciais com prioridade, responsável e critério de aceitação.

> O último item **não foi concluído nesta sprint**: o backlog inicial da Sprint 1 foi registrado apenas em `docs/backlog-produto.md`, sem Issues correspondentes no GitHub. A regularização ocorreu na Sprint 2, com a abertura das onze histórias `US-01` a `US-11` como Issues ([#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5)–[#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)), todas com prioridade, responsável e critérios de aceitação.

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/visao-geral.md` | [ver na tag `sprint-01`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) | Criado: problema, evidências, stakeholders, visão do produto, escopo inicial, restrições/premissas e diferenciais. |
| `docs/backlog-produto.md` | [ver na tag `sprint-01`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/backlog-produto.md) | Criado: convenção do Project, estratégia de priorização, backlog inicial (`T-01`–`T-07`, `D-01`), Definition of Ready e Definition of Done. |
| `README.md` | [ver na tag `sprint-01`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/README.md) | Preenchido: identificação do projeto, integrantes e responsabilidades, resumo da solução e funcionalidades prioritárias. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Estrutura inicial em `src/`, instruções de execução e ao menos uma página/estrutura executável ou protótipo navegável.

### O que foi implementado ou evoluído

O incremento desta sprint foi a **estrutura executável mínima do repositório**: a pasta `src/` com uma página estática servível e as instruções de execução no `README.md`, garantindo que o repositório já possuísse uma aplicação executável desde a primeira entrega. Ainda não há requisitos formalizados nesta sprint — eles são o artefato central da Sprint 2 —, portanto o incremento se vincula aos **objetivos específicos** registrados em `docs/visao-geral.md`, seção 3, e não a identificadores `RF`.

O protótipo navegável das funcionalidades prioritárias (tarefa `T-07`) foi **iniciado nesta sprint e concluído na Sprint 2**, onde está registrado como incremento.

### Como executar e verificar

```bash
python -m http.server 8000 --directory src
```

Abrir `http://localhost:8000` e confirmar que a página é servida.

| Objetivo/Item do backlog | Código ou protótipo | Evidência de execução |
|---|---|---|
| `T-01`, `T-02`, `T-03` — problema, público e proposta de valor | [`docs/visao-geral.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) | Documento com problema delimitado, evidências e três stakeholders. |
| `D-01` — visão geral do produto | [`docs/visao-geral.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) | Seções 3 e 4: proposta de valor, objetivos e escopo inicial. |
| Estrutura executável | [`src/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-01/src) | Página servida via `http.server` na porta 8000. |
| `T-07` — protótipo inicial (iniciado) | [`docs/prototipo/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/docs/prototipo) | Concluído e entregue na Sprint 2. |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

Nesta sprint o backlog foi mantido em `docs/backlog-produto.md` e no GitHub Project, **sem Issues individuais** — limitação registrada na seção 3 e corrigida na Sprint 2.

| Item | Descrição | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| `T-01` | Definir e delimitar o problema que o ConectaAção pretende solucionar. | @KarolGSMiranda | Problema descrito com contexto e evidências em `docs/visao-geral.md`. | Concluído |
| `T-02` | Identificar o público principal e os stakeholders envolvidos. | @KarolGSMiranda | Tabela de stakeholders com necessidade e forma de envolvimento. | Concluído |
| `T-03` | Definir o nome do projeto e sua proposta de valor. | @gigi-zacaroni | Nome e proposta de valor registrados no README e na visão geral. | Concluído |
| `T-04` | Criar e configurar o GitHub Project para gerenciamento. | @gigi-zacaroni | Project criado e linkado no README e no backlog. | Concluído |
| `T-05` | Criar o backlog inicial com as principais funcionalidades e atividades. | @KarolGSMiranda | Backlog com itens identificados, tipo e prioridade. | Concluído |
| `T-06` | Definir os integrantes e suas responsabilidades. | @Malupestana | Tabela de integrantes preenchida no README. | Concluído |
| `T-07` | Criar o protótipo inicial da interface da aplicação. | @gigi-zacaroni | Protótipo cobrindo as funcionalidades prioritárias. | Concluído na Sprint 2 |
| `D-01` | Criar a visão geral do produto. | @KarolGSMiranda | Documento `docs/visao-geral.md` completo. | Concluído |

### Acompanhamento

- **GitHub Project:** [ConectaAção — Backlog](https://github.com/users/gigi-zacaroni/projects/1)
- **Reuniões/decisões:** as decisões da sprint (delimitação do problema, nome do produto e divisão de papéis) foram tomadas em conversas do grupo, **sem ata registrada** em `docs/reunioes/` — pendência corrigida a partir da Sprint 2.
- **Impedimentos:** nenhum impedimento técnico. A principal dificuldade foi delimitar o problema com especificidade suficiente para não resultar em um CRUD genérico.
- **Mudanças de escopo:** nenhuma — esta foi a sprint de definição inicial do escopo.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | Nenhuma nesta sprint | O backlog inicial foi registrado em `docs/backlog-produto.md` e no Project, sem Issues individuais. As onze Issues foram abertas na Sprint 2. |
| Pull Request | Nenhum nesta sprint | O trabalho foi integrado por commits diretos na `main`. O fluxo de PR passou a ser adotado na Sprint 2 ([PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1)). |
| Commit | [`32c0ac7`](https://github.com/gigi-zacaroni/tp-eng-software/commit/32c0ac7) · [`f3199bb`](https://github.com/gigi-zacaroni/tp-eng-software/commit/f3199bb) · [`3e6156c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/3e6156c) | Criação da visão geral, do backlog de produto e da definição de papéis dos integrantes. |
| Código/arquivo | [`docs/visao-geral.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) · [`docs/backlog-produto.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/backlog-produto.md) | Artefatos centrais da sprint. |
| Teste/captura/relatório | Ainda não aplicável | O plano de testes é o artefato central da Sprint 7. |

### Rastreabilidade resumida

Esta sprint antecede a definição de requisitos identificados (`RF`/`RNF`), criados na Sprint 2. A rastreabilidade possível nesta etapa liga o **problema** aos **objetivos do produto** e aos **itens do backlog**:

| Problema/objetivo | Item do backlog | Artefato/decisão | Requisito derivado (Sprint 2) |
|---|---|---|---|
| Doadores não sabem quais instituições existem nem do que precisam | `T-01`, `T-05` | [`visao-geral.md`, seções 1 e 3](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) | `RF-07`, `RF-08`, `RF-09`, `RF-10` |
| Instituições têm dificuldade de divulgar suas necessidades | `T-01`, `T-02` | [`visao-geral.md`, seções 1 e 2](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) | `RF-02`, `RF-14`–`RF-17` |
| Facilitar o contato e a contribuição | `T-03`, `D-01` | [`visao-geral.md`, seção 4](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/visao-geral.md) | `RF-19`, `RF-20` |

## 7. Revisão do incremento

- **O que foi demonstrado:** o repositório estruturado conforme o modelo da disciplina, a página executável em `src/` servida localmente e os três artefatos da sprint (`README.md`, `visao-geral.md`, `backlog-produto.md`) preenchidos.
- **Critérios atendidos:** problema delimitado com contexto e evidências; público e stakeholders identificados; proposta de valor, objetivos e escopo inicial definidos; integrantes e papéis registrados; GitHub Project criado e linkado.
- **Itens não concluídos:** as Issues iniciais com prioridade, responsável e critério de aceitação; o protótipo navegável (`T-07`); e este arquivo-índice da sprint.
- **Motivo das pendências:** o grupo concentrou o esforço na delimitação do problema e tratou o backlog apenas como documento, sem migrá-lo para Issues. O protótipo demandou mais tempo do que o previsto e foi concluído na sprint seguinte.
- **Feedback recebido e ajustes:** a revisão interna do grupo apontou que o escopo inicial descrevia a ação do usuário de forma vaga ("demonstrar interesse em ajudar"), sem comportamento verificável. O ajuste foi feito na Sprint 2, que refinou esse item para o fluxo de **prometer doação e acompanhar até a entrega** (`RF-19`–`RF-21`).

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** a delimitação do problema foi feita com cuidado e evitou um tema genérico — a distinção entre "falta de doadores" e "falta de conexão" orientou todas as decisões seguintes de escopo.
- **Precisa melhorar:** o backlog viveu apenas como documento, sem Issues; não houve registro de atas; e o arquivo-índice da sprint e a tag `sprint-01` não foram fechados na data de entrega, o que fragilizou a evidência da sprint no GitHub.
- **Ação concreta para a próxima sprint:** migrar o backlog para Issues no GitHub Project, com prioridade, responsável e critérios de aceitação em cada uma — executado na Sprint 2 com as onze histórias `US-01` a `US-11`; e passar a fechar o arquivo da sprint junto com a criação da tag, na data de entrega.

## 9. O que não será considerado suficiente

- Tema genérico sem delimitação do problema.
- Backlog composto apenas por títulos vagos.
- Repositório apenas com documentos, sem estrutura inicial da aplicação.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-01`:** https://github.com/gigi-zacaroni/tp-eng-software/releases/tag/sprint-01
- **Este arquivo na tag:** https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-01/docs/sprints/sprint-01.md
- **Observação adicional:** este arquivo-índice foi consolidado retroativamente durante a Sprint 2, conforme registrado na nota do cabeçalho e na seção 8. Os artefatos que ele indexa foram produzidos dentro do prazo da Sprint 1.

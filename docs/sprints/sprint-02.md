# Sprint 2 — Requisitos e escopo validável da solução

- **Data de entrega:** 14/09/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-02`
- **Responsável por conferir este arquivo:** Karol Guimarães (@KarolGSMiranda)

## 1. Pergunta que esta sprint deve responder

**O que o sistema deverá fazer e quais condições verificáveis deverá atender?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** transformar a visão do produto definida na Sprint 1 em **requisitos identificados, priorizados e verificáveis**, vinculá-los a histórias de usuário com critérios de aceitação e delimitar explicitamente o que fica fora do escopo. Como a implementação depende de decisões técnicas previstas para as Sprints 3 e 4, o escopo seria validado por um **protótipo navegável** em vez de código.

**Resultado efetivamente alcançado:** foi produzido o documento [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md) com **4 atores**, **27 requisitos funcionais** (`RF-01`–`RF-27`) priorizados, **10 requisitos não funcionais** (`RNF-01`–`RNF-10`) com condição mensurável, **8 regras de negócio** (`RN-01`–`RN-08`), **11 histórias de usuário** (`US-01`–`US-11`) com 3 a 4 critérios de aceitação cada, e **8 itens explicitamente fora do escopo**. As onze histórias foram registradas como Issues no GitHub, com prioridade, responsável e critérios no corpo. O **protótipo navegável** foi concluído e entregue, cobrindo 10 telas e os fluxos das onze histórias, com o vínculo tela → requisito → critério documentado em [`docs/prototipo/README.md`](../prototipo/README.md).

A sprint também produziu um resultado não previsto e relevante: a construção do protótipo **expôs quatro lacunas entre o comportamento desenhado e os critérios de aceitação escritos** — registradas na seção 7 e convertidas em pendências rastreáveis para a implementação.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/requisitos/requisitos.md`, histórias/casos, critérios de aceitação, escopo excluído e backlog refinado.

- [x] Atores/perfis identificados.
- [x] Requisitos funcionais com IDs e prioridade.
- [x] Requisitos não funcionais verificáveis.
- [x] Histórias/casos vinculados aos requisitos.
- [x] Critérios de aceitação nas Issues ou em links diretos.

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/requisitos/requisitos.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/requisitos/requisitos.md) | **Criado.** 4 atores, 27 RF priorizados, 10 RNF com métrica, 8 regras de negócio, 11 histórias com critérios de aceitação e 8 itens fora do escopo. |
| `docs/prototipo/` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-02/docs/prototipo) | **Criado.** Protótipo navegável com 10 telas, modais e navegação, cobrindo os fluxos das onze histórias. |
| `docs/prototipo/README.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/prototipo/README.md) | **Criado.** Instruções de execução, mapa tela → requisito → história, roteiro de verificação dos critérios e limitações conhecidas. |
| `docs/rastreabilidade.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/rastreabilidade.md) | **Preenchido.** Tabela central ligando os 27 RF às Issues, ao documento de requisitos e à tela do protótipo. |
| `docs/visao-geral.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/visao-geral.md) | **Atualizado.** Escopo revisado: "demonstrar interesse em ajudar" passou a "prometer doação e acompanhar até a entrega"; incluídos favoritos e notificações. |
| `docs/backlog-produto.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/backlog-produto.md) | **Atualizado.** Histórias vinculadas a requisitos e Issues; `T-04`–`T-07` concluídas; itens `D-02`, `D-03` e `D-04` incluídos. |
| `docs/sprints/sprint-01.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/sprints/sprint-01.md) | **Consolidado** retroativamente, com registro explícito do que ficou pendente na Sprint 1. |
| `README.md` | [ver na tag](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/README.md) | **Atualizado.** Stack definido pelo grupo e link do protótipo. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Implementação de pelo menos um fluxo prioritário ou protótipo navegável ligado a requisitos e critérios de aceitação.

### O que foi implementado ou evoluído

O incremento desta sprint é o **protótipo navegável do ConectaAção**, em [`docs/prototipo/`](../prototipo/). A opção pelo protótipo, e não por código, segue a alternativa prevista para quando a implementação ainda depende de decisões técnicas posteriores — no caso, as decisões de modelagem (Sprint 3) e de projeto (Sprint 4). O stack da aplicação real já está definido: **Next.js/React** no front e **Java/Spring Boot** no back.

O protótipo **não é um conjunto de telas estáticas**: é dirigido por estado, com navegação real, validação de formulários, guardas de acesso e cálculo de progresso. Isso permite verificar critérios de aceitação por execução, e não por inspeção visual. Comportamentos demonstráveis:

- **Acesso protegido (`RF-05`, `RN-01`):** as telas `listagem`, `detalhe`, `favoritos`, `minhasDoacoes` e `painel` redirecionam o visitante ao login e o devolvem ao destino pretendido após autenticar.
- **Fluxo de doação em 3 passos (`RF-19`, `RNF-01`):** item → quantidade → confirmação, cumprindo exatamente a métrica declarada no `RNF-01`.
- **Progresso e status derivado (`RF-18`, `RN-05`):** cada necessidade calcula desejado/prometido/recebido e deriva o status `Aberta`, `Parcial` ou `Atendida`.
- **Confirmação de recebimento (`RF-23`, `RN-04`):** marcar uma doação como recebida transfere a quantidade de "prometido" para "recebido" e atualiza o progresso.
- **Integridade na exclusão (`RF-16`, `RNF-07`):** excluir uma necessidade com doações associadas remove a necessidade e **preserva** as doações.
- **Ciclo de vida da doação (`RN-03`):** Prometida → A caminho → Entregue, com o cancelamento indisponível após a entrega.

### Como executar e verificar

```bash
python -m http.server 8000 --directory docs/prototipo
```

Abrir `http://localhost:8000/ConectaAcao%20Prototipo.dc.html`. Os perfis são alternados pelo parâmetro `perfilInicial` (`visitante`, `doador`, `instituicao`). O roteiro passo a passo de cada verificação está na [seção 5 do README do protótipo](../prototipo/README.md).

| Requisito/Issue | Protótipo — tela | Evidência de execução |
|---|---|---|
| `RF-01` / [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | `escolhaConta` → `cadDoador` | [Mapa de telas](../prototipo/README.md#4-mapa-tela--requisito--história) |
| `RF-03`, `RF-04`, `RF-05` / [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | `login` + guardas de acesso | [Roteiro `US-03` CA-3](../prototipo/README.md#us-03-ca-3--acesso-protegido-rf-05-rn-01) |
| `RF-02` / [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `cadInst` (três seções) | [Mapa de telas](../prototipo/README.md#4-mapa-tela--requisito--história) |
| `RF-06`–`RF-09` / [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | `landing` + `listagem` | [Roteiro `US-04` CA-2 e CA-3](../prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) |
| `RF-10`, `RF-18` / [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | `detalhe` | [Roteiro `US-05` CA-1](../prototipo/README.md#us-05-ca-1--us-10-ca-2-e-ca-3--progresso-e-confirmação-rf-18-rf-23-rn-04-rn-05) |
| `RF-12`, `RF-13` / [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | `favoritos` | [Mapa de telas](../prototipo/README.md#4-mapa-tela--requisito--história) |
| `RF-14`–`RF-16` / [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | `painel` → Minhas necessidades | [Roteiro `US-07` CA-3](../prototipo/README.md#us-07-ca-3--excluir-necessidade-preserva-doações-rf-16-rnf-07) |
| `RF-19`, `RNF-01` / [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | modal de doação → `confirmacao` | [Roteiro `US-08` CA-1](../prototipo/README.md#us-08-ca-1-e-rnf-01--doar-em-3-passos-rf-19) |
| `RF-20`, `RF-21` / [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | `minhasDoacoes` | [Roteiro `US-09` CA-2 e CA-4](../prototipo/README.md#us-09-ca-2-e-ca-4--avançar-e-cancelar-rf-20-rf-21-rn-03) |
| `RF-22`–`RF-24` / [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | `painel` → Doações a receber | [Roteiro `US-10` CA-2 e CA-3](../prototipo/README.md#us-05-ca-1--us-10-ca-2-e-ca-3--progresso-e-confirmação-rf-18-rf-23-rn-04-rn-05) |
| `RF-25`, `RF-27` / [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | sino de notificações | [Roteiro `US-11` CA-1 e CA-2](../prototipo/README.md#us-11-ca-1-e-ca-2--notificações-rf-25-rf-27) |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

O objetivo desta sprint foi **especificar e validar o escopo completo**, não implementá-lo. Por isso as onze histórias entraram no Sprint Backlog com o mesmo critério de conclusão: estar especificada, com critérios de aceitação registrados na Issue e fluxo demonstrado no protótipo.

> A divisão de responsabilidades abaixo é registrada **neste documento e no [GitHub Project](https://github.com/users/gigi-zacaroni/projects/1)**. As Issues no GitHub carregam o título, a história com os critérios de aceitação e a label de prioridade; o acompanhamento por sprint é feito pelo Project, não por milestones.

| Issue | Descrição | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | `US-01` — Criar conta de doador (`RF-01`) | @gigi-zacaroni | 3 critérios de aceitação registrados; fluxo de cadastro e validações demonstrados em `cadDoador`. | Especificada |
| [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | `US-03` — Entrar e acesso protegido (`RF-03`–`RF-05`, `RN-01`) | @gigi-zacaroni | 4 critérios registrados; login, guardas de acesso e logout demonstrados. | Especificada |
| [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `US-02` — Cadastrar instituição (`RF-02`, `RF-11`) | @Malupestana | 3 critérios registrados; cadastro em três seções demonstrado em `cadInst`. | Especificada |
| [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | `US-04` — Encontrar instituições (`RF-06`–`RF-09`) | @KarolGSMiranda | 3 critérios registrados; busca, filtros e estado vazio demonstrados em `listagem`. | Especificada |
| [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | `US-05` — Detalhe da instituição (`RF-10`, `RF-11`, `RF-18`) | @KarolGSMiranda | 3 critérios registrados; detalhe e progresso demonstrados. **CA-3 pendente** (ver seção 7). | Especificada com ressalva |
| [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | `US-06` — Favoritar instituições (`RF-12`, `RF-13`) | @ArtJamis1208 | 3 critérios registrados; favoritar, desfavoritar e estado vazio demonstrados. | Especificada |
| [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | `US-07` — Gerenciar necessidades (`RF-14`–`RF-17`, `RNF-07`) | @Malupestana | 4 critérios registrados; CRUD e preservação de doações na exclusão demonstrados. | Especificada |
| [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `US-08` — Prometer uma doação (`RF-18`, `RF-19`, `RNF-01`) | @gigi-zacaroni | 3 critérios registrados; fluxo em 3 passos demonstrado. **CA-2 pendente** (ver seção 7). | Especificada com ressalva |
| [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | `US-09` — Acompanhar e cancelar doações (`RF-20`, `RF-21`, `RN-03`) | @ArtJamis1208 | 4 critérios registrados; timeline e trava de cancelamento demonstradas. **CA-3 parcial** (ver seção 7). | Especificada com ressalva |
| [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | `US-10` — Receber e confirmar doações (`RF-22`–`RF-24`, `RN-04`) | @Malupestana | 3 critérios registrados; confirmação de recebimento e atualização do progresso demonstradas. | Especificada |
| [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | `US-11` — Receber notificações (`RF-25`–`RF-27`) | @ArtJamis1208 | 3 critérios registrados; central, contador e marcação de lida demonstrados. | Especificada |

Itens de documentação da sprint, acompanhados em [`docs/backlog-produto.md`](../backlog-produto.md): `D-02` (documento de requisitos), `D-03` (protótipo navegável) e `D-04` (consolidação dos registros das sprints) — todos **Concluídos**.

### Acompanhamento

- **GitHub Project:** [ConectaAção — Backlog](https://github.com/users/gigi-zacaroni/projects/1) — onde os itens da sprint são acompanhados
- **Reuniões/decisões:** [ata de 12/09/2026 — refinamento de requisitos e validação do protótipo](../reunioes/2026-09-12-refinamento-requisitos.md)
- **Impedimentos:** nenhum impedimento externo. A principal dificuldade interna foi escrever requisitos não funcionais **mensuráveis**: a primeira versão trazia formulações vagas ("interface simples e rápida"), substituídas por condições verificáveis — 3 passos no fluxo de doação (`RNF-01`), faixa de 390 px a 1440 px e alvos de toque de 44 px (`RNF-02`), carregamento em até 2 s (`RNF-08`).
- **Mudanças de escopo:** três, todas derivadas do protótipo e registradas na seção 8 de [`requisitos.md`](../requisitos/requisitos.md):
  1. "Demonstrar interesse em ajudar" (Sprint 1) foi refinado para **prometer doação e acompanhar até a entrega** (`RF-19`–`RF-21`), tornando o comportamento verificável.
  2. Inclusão de **favoritos** (`RF-12`, `RF-13`).
  3. Inclusão da **central de notificações** (`RF-25`–`RF-27`).

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5), [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7), [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8), [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10), [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11), [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12), [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Cada funcionalidade prioritária representada por uma Issue, com **critérios de aceitação no corpo**, label de prioridade e bloco de demonstração no protótipo. As onze são acompanhadas no [GitHub Project](https://github.com/users/gigi-zacaroni/projects/1). |
| Pull Request | [#1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) · [#4](https://github.com/gigi-zacaroni/tp-eng-software/pull/4) · [#14](https://github.com/gigi-zacaroni/tp-eng-software/pull/14) | Documento de requisitos e vínculo das histórias às Issues submetidos à revisão do grupo, conforme o fluxo de `CONTRIBUTING.md`. |
| Commit | [`69b636f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/69b636f) · [`419c24f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/419c24f) · [`e167b37`](https://github.com/gigi-zacaroni/tp-eng-software/commit/e167b37) | Escrita dos requisitos; entrega do protótipo navegável; documentação do vínculo entre telas e requisitos. |
| Código/arquivo | [`docs/requisitos/requisitos.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/requisitos/requisitos.md) · [`docs/prototipo/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-02/docs/prototipo) | Artefato central da sprint e incremento navegável. |
| Teste/captura/relatório | [Roteiro de verificação dos critérios](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/prototipo/README.md#5-roteiro-de-verificação-dos-critérios-de-aceitação) | Verificação executável dos critérios de aceitação sobre o protótipo. Testes automatizados são o artefato da Sprint 7; `tests/` ainda está vazio. |

### Rastreabilidade resumida

A tabela completa dos 27 requisitos está em [`docs/rastreabilidade.md`](../rastreabilidade.md). Resumo por história:

| Requisito | Issue | Artefato/decisão | Protótipo | Teste/evidência |
|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) — `US-01` | [`requisitos.md` §6](../requisitos/requisitos.md) | `cadDoador` | Roteiro §5 · testes a partir da Sprint 7 |
| `RF-02`, `RF-11` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) — `US-02` | [`requisitos.md` §6](../requisitos/requisitos.md) | `cadInst` | Roteiro §5 · testes a partir da Sprint 7 |
| `RF-03`, `RF-04`, `RF-05` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | [`requisitos.md` §6 · `RN-01`](../requisitos/requisitos.md) | `login` + guardas | [Roteiro `US-03`](../prototipo/README.md#us-03-ca-3--acesso-protegido-rf-05-rn-01) |
| `RF-06`–`RF-09` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | [`requisitos.md` §6](../requisitos/requisitos.md) | `landing`, `listagem` | [Roteiro `US-04`](../prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) |
| `RF-10`, `RF-18` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | [`requisitos.md` §6 · `RN-05`](../requisitos/requisitos.md) | `detalhe` | Roteiro §5 · `RF-17` pendente (seção 7) |
| `RF-12`, `RF-13` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | [`requisitos.md` §6](../requisitos/requisitos.md) | `favoritos` | Roteiro §5 · testes a partir da Sprint 7 |
| `RF-14`–`RF-17` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | [`requisitos.md` §6 · `RN-06`, `RNF-07`](../requisitos/requisitos.md) | `painel` → Necessidades | [Roteiro `US-07`](../prototipo/README.md#us-07-ca-3--excluir-necessidade-preserva-doações-rf-16-rnf-07) |
| `RF-19` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | [`requisitos.md` §6 · `RN-02`, `RNF-01`](../requisitos/requisitos.md) | modal → `confirmacao` | [Roteiro `US-08`](../prototipo/README.md#us-08-ca-1-e-rnf-01--doar-em-3-passos-rf-19) · `RNF-06` pendente |
| `RF-20`, `RF-21` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | [`requisitos.md` §6 · `RN-03`](../requisitos/requisitos.md) | `minhasDoacoes` | [Roteiro `US-09`](../prototipo/README.md#us-09-ca-2-e-ca-4--avançar-e-cancelar-rf-20-rf-21-rn-03) |
| `RF-22`–`RF-24` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | [`requisitos.md` §6 · `RN-04`](../requisitos/requisitos.md) | `painel` → A receber | [Roteiro `US-10`](../prototipo/README.md#us-05-ca-1--us-10-ca-2-e-ca-3--progresso-e-confirmação-rf-18-rf-23-rn-04-rn-05) |
| `RF-25`–`RF-27` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | [`requisitos.md` §6](../requisitos/requisitos.md) | sino de notificações | [Roteiro `US-11`](../prototipo/README.md#us-11-ca-1-e-ca-2--notificações-rf-25-rf-27) |

## 7. Revisão do incremento

- **O que foi demonstrado:** o protótipo navegável completo, percorrido nos três perfis (visitante, doador e instituição), cobrindo as 10 telas, os modais de doação, exclusão e cancelamento, e a central de notificações. Foram executados os sete roteiros de verificação da [seção 5 do README do protótipo](../prototipo/README.md).

- **Critérios atendidos:** verificados por execução — acesso protegido com retorno ao destino (`US-03` CA-3); busca, filtros e estado vazio (`US-04` CA-2 e CA-3); doação em 3 passos, cumprindo o `RNF-01` (`US-08` CA-1); progresso e status derivado `Aberta`/`Parcial`/`Atendida` (`US-05` CA-1, `RN-05`); confirmação de recebimento com transferência de prometido para recebido (`US-10` CA-2 e CA-3, `RN-04`); preservação das doações ao excluir uma necessidade (`US-07` CA-3, `RNF-07`); ciclo Prometida → A caminho → Entregue com cancelamento indisponível após a entrega (`US-09` CA-2 e CA-4, `RN-03`); e notificações com contador de não lidas (`US-11` CA-1 e CA-2).

- **Itens não concluídos:** quatro critérios de aceitação **não** são demonstráveis no protótipo, além de dois RNF que dependem de back-end:

  | Critério / requisito | Comportamento atual do protótipo | O que falta |
  |---|---|---|
  | `US-08` CA-2 · `RN-02`, `RNF-06` | O modal informa "ainda faltam N", mas não bloqueia quantidade acima do saldo | Validar e limitar a quantidade ao saldo da necessidade |
  | `US-09` CA-3 · `RN-03` | Cancelar altera o status para "Cancelada" | Devolver a quantidade cancelada ao saldo pendente |
  | `US-05` CA-3 · `RF-17`, `RN-06` | A necessidade pausada exibe o selo "Pausada" | Ocultá-la da página pública |
  | `RF-11` · `RN-08` | O selo "Verificada" é exibido de forma ilustrativa | Condicioná-lo à validação por administrador |
  | `RNF-03` | Sem autenticação real | Hash de senha (bcrypt) no back-end |
  | `RNF-08` | Estado em memória, volume mínimo | Medição com volume representativo |

- **Motivo das pendências:** o protótipo foi construído para validar **fluxo e navegação**, e as regras de integridade só foram escritas com precisão depois, ao redigir os critérios de aceitação. A divergência é, em si, um resultado útil da sprint: ela mostra que os critérios são de fato verificáveis, já que foram capazes de reprovar o protótipo em quatro pontos. As pendências estão registradas no corpo das Issues [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) e [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11), e serão tratadas na implementação, não no protótipo — que é descartável por definição.

- **Feedback recebido e ajustes:** na revisão interna, o grupo apontou que (a) os RNF iniciais não eram mensuráveis, o que levou à reescrita com métricas objetivas; (b) o `RF-05` restringia conteúdo a usuários autenticados, mas a landing page precisava permanecer pública para atrair doadores — resolvido separando `RF-06` (landing pública) de `RF-07` (listagem protegida); e (c) o documento afirmava alocações de milestone que não existiam no GitHub — corrigido nesta sprint, com o texto passando a descrever apenas o que as Issues de fato carregam (título, critérios de aceitação e prioridade) e o acompanhamento por sprint atribuído ao GitHub Project.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** construir o protótipo **antes** de fechar os requisitos. Desenhar as telas obrigou o grupo a decidir regras que a visão da Sprint 1 não previa — o ciclo de vida da doação, o cálculo de progresso e o comportamento da necessidade pausada — e foi o que permitiu transformar "demonstrar interesse em ajudar" em comportamento verificável. Escrever os critérios no formato **Dado que / quando / então** também se mostrou eficaz: foi esse formato que expôs as quatro lacunas da seção 7.

- **Precisa melhorar:** a documentação chegou a **afirmar um estado que o GitHub não refletia** — o texto dizia que havia histórias alocadas a um milestone quando nenhuma Issue o possuía. Isso quebra a rastreabilidade justamente onde ela é verificada. Além disso, a tag da Sprint 1 não foi criada na data e o arquivo-índice daquela sprint ficou por preencher até agora.

- **Ação concreta para a próxima sprint:** antes de fechar a Sprint 3, conferir item a item que **cada afirmação do arquivo da sprint tem link verificável e corresponde ao estado real do GitHub**, abrindo a própria interface em vez de presumir. A tag será criada na data de entrega, junto com o fechamento do arquivo da sprint, e não retroativamente.

## 9. O que não será considerado suficiente

- Repetir a descrição do problema da Sprint 1.
- Listar funcionalidades sem identificadores ou critérios.
- Apresentar telas sem relacioná-las a requisitos.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-02`:** https://github.com/gigi-zacaroni/tp-eng-software/releases/tag/sprint-02
- **Este arquivo na tag:** https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/sprints/sprint-02.md
- **Observação adicional:** o incremento desta sprint é o **protótipo navegável** em [`docs/prototipo/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-02/docs/prototipo), conforme a alternativa prevista para quando a implementação depende de decisões técnicas posteriores. O vínculo entre cada tela, seus requisitos e seus critérios de aceitação está em [`docs/prototipo/README.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-02/docs/prototipo/README.md).

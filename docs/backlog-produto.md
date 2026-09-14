
# Product Backlog

> O backlog operacional deve ser mantido no **GitHub Project**, por meio de Issues. Este documento explica a convenção adotada e apresenta uma visão rastreável dos itens.

## 1. Link do GitHub Project

[ConectaAção — Backlog](https://github.com/users/gigi-zacaroni/projects/1)

## 2. Campos obrigatórios no Project

Cada item deve possuir, no mínimo:

* título claro;
* tipo (`user-story`, `task`, `bug`, `documentation`, `test` etc.);
* prioridade;
* responsável;
* sprint;
* status;
* critério de aceitação ou conclusão;
* requisito relacionado, quando aplicável.

## 3. Estratégia de priorização

A priorização dos itens será realizada considerando principalmente o **valor para o usuário**, a **importância para o funcionamento da aplicação**, as **dependências entre funcionalidades** e a **complexidade de desenvolvimento**. As funcionalidades essenciais para solucionar o problema principal terão prioridade maior, enquanto funcionalidades complementares poderão ser desenvolvidas posteriormente.

## 4. Visão resumida do backlog


| ID     | Link da Issue                                                                          | Tipo         | Descrição curta                                                                             | Prioridade | Requisito | Sprint | Estado final |
| ------ | -------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------- | ---------- | --------- | ------ | ------------ |
| `T-01` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/visao-geral.md) | Tarefa       | Definir e delimitar o problema que o ConectaAção pretende solucionar.                       | Alta       | —         | 1      | Concluído    |
| `T-02` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/visao-geral.md) | Tarefa       | Identificar o público principal e os stakeholders envolvidos no sistema.                    | Alta       | —         | 1      | Concluído    |
| `D-01` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/visao-geral.md) | Documentação | Criar a visão geral do produto, incluindo problema, público, proposta de valor e objetivos. | Alta       | —         | 1      | Concluído    |
| `T-03` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/visao-geral.md) | Tarefa       | Definir o nome do projeto e sua proposta de valor.                                          | Média      | —         | 1      | Concluído    |
| `T-04` | [Link](https://github.com/users/gigi-zacaroni/projects/1) | Tarefa       | Criar e configurar o GitHub Project para gerenciamento do projeto.                          | Alta       | —         | 1      | Concluído   |
| `T-05` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/backlog-produto.md) | Tarefa       | Criar o backlog inicial com as principais funcionalidades e atividades do projeto.          | Alta       | —         | 1      | Concluído    |
| `T-06` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/README.md) | Tarefa       | Definir os integrantes e suas responsabilidades dentro do projeto.                          | Média      | —         | 1      | Concluído   |
| `T-07` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/docs/prototipo) | Tarefa       | Criar o protótipo inicial da interface da aplicação.                                        | Média      | —         | 1–2      | Concluído   |
| `D-02` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) | Documentação | Documentar os requisitos verificáveis do ConectaAção (atores, RF, RNF, regras de negócio e histórias). | Alta | `RF-01`–`RF-27`, `RNF-01`–`RNF-10`, `RN-01`–`RN-08` | 2 | Concluído |
| `D-03` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/prototipo/README.md) | Documentação | Entregar o protótipo navegável e documentar o vínculo entre suas telas, os requisitos e os critérios de aceitação. | Alta | `RF-01`–`RF-27` | 2 | Concluído |
| `D-04` | [Link](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/sprints/sprint-02.md) | Documentação | Consolidar o registro das Sprints 1 e 2 e preencher a rastreabilidade requisito → Issue → protótipo. | Alta | — | 2 | Concluído |
| `US-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | User story | Criar conta de doador informando nome, e-mail, senha e confirmação. | Alta | `RF-01`, `RNF-03` | 2 (especificação) | Especificada |
| `US-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | User story | Cadastrar a instituição em três seções: identificação/acesso, sobre a instituição e necessidades iniciais. | Alta | `RF-02`, `RF-11` | 2 (especificação) | Especificada |
| `US-03` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | User story | Entrar com e-mail e senha, encerrar sessão e restringir dados sensíveis a quem está autenticado. | Alta | `RF-03`, `RF-04`, `RF-05` | 2 (especificação) | Especificada |
| `US-04` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | User story | Buscar e filtrar instituições para encontrar rapidamente quem ajudar. | Alta | `RF-06`–`RF-09` | 2 (especificação) | Especificada |
| `US-05` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | User story | Ver a página de detalhe da instituição, com necessidades, contato e progresso. | Alta | `RF-10`, `RF-11`, `RF-18` | 2 (especificação) | Especificada |
| `US-06` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | User story | Favoritar e desfavoritar instituições e consultar a lista de favoritos. | Baixa | `RF-12`, `RF-13` | 2 (especificação) | Especificada |
| `US-07` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | User story | Cadastrar, editar, excluir e pausar as necessidades da instituição. | Alta | `RF-14`–`RF-17` | 2 (especificação) | Especificada |
| `US-08` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | User story | Prometer uma doação para uma necessidade, limitada ao que ainda falta. | Alta | `RF-18`, `RF-19` | 2 (especificação) | Especificada |
| `US-09` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | User story | Acompanhar o status das doações e cancelá-las quando necessário. | Média | `RF-20`, `RF-21` | 2 (especificação) | Especificada |
| `US-10` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | User story | Ver as doações prometidas e confirmar o recebimento. | Alta | `RF-22`–`RF-24` | 2 (especificação) | Especificada |
| `US-11` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | User story | Ser notificado sobre eventos relevantes das doações. | Média | `RF-25`–`RF-27` | 2 (especificação) | Especificada |

> **Estado `Especificada`:** a história possui requisitos identificados, critérios de aceitação registrados na Issue e fluxo demonstrado no [protótipo navegável](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/prototipo/README.md). A implementação em código será alocada nas sprints seguintes, conforme as decisões técnicas das Sprints 3 e 4.




## 5. Definition of Ready

Um item está pronto para entrar em uma sprint quando:

* [ ] possui descrição compreensível;
* [ ] tem valor ou objetivo identificável;
* [ ] possui critério de aceitação/conclusão;
* [ ] dependências principais foram registradas;
* [ ] foi estimado de acordo com a convenção do grupo.

## 6. Definition of Done

Um item está concluído quando:

* [ ] atende aos critérios de aceitação;
* [ ] foi revisado por outro integrante;
* [ ] está integrado à branch `main`;
* [ ] possui testes/evidências quando aplicável;
* [ ] atualizou a documentação afetada;
* [ ] está relacionado ao arquivo da sprint.

## 7. Histórico de refinamento

| Sprint   | Itens criados/divididos/removidos                                                                                                                           | Motivo                                                                                                   | Evidência |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------- |
| Sprint 1 | Criação das tarefas de definição do problema, público, visão do produto, proposta de valor, GitHub Project, backlog, responsabilidades e protótipo inicial. | Estruturar o projeto, delimitar o problema e estabelecer as bases para o desenvolvimento do ConectaAção. | [`docs/visao-geral.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/visao-geral.md) |
| Sprint 2 | Inclusão do item de documentação dos requisitos (`D-02`) e abertura das onze histórias como Issues ([#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)) no [GitHub Project](https://github.com/users/gigi-zacaroni/projects/1). | Vincular os itens do backlog aos requisitos definidos em `docs/requisitos/requisitos.md` e migrar o acompanhamento para Issues. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) · [PR #4](https://github.com/gigi-zacaroni/tp-eng-software/pull/4) |
| Sprint 2 | Entrega do protótipo navegável (`T-07` concluída) e inclusão dos itens `D-03` e `D-04`. Conclusão das tarefas `T-04` a `T-06`, pendentes desde a Sprint 1. | Fechar o incremento da sprint e regularizar o registro das tarefas iniciais. | [`docs/prototipo/README.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/prototipo/README.md) |
| Sprint 2 | Padronização do estado das **onze** histórias como `Especificada`, com a label de prioridade aplicada em cada Issue e um bloco de demonstração no protótipo acrescentado ao corpo. | O objetivo da sprint foi especificar e validar o escopo completo, não implementá-lo; todas as histórias passaram pelo mesmo ciclo de refinamento e validação no protótipo. | [Issues #2–#13](https://github.com/gigi-zacaroni/tp-eng-software/issues) · [GitHub Project](https://github.com/users/gigi-zacaroni/projects/1) |


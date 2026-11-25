# Product Backlog

O backlog operacional fica no GitHub Project, em Issues. Este documento registra a convenção adotada e uma visão rastreável dos itens.

## 1. Link do GitHub Project

[ConectaAção: Backlog](https://github.com/users/gigi-zacaroni/projects/1)

**Última atualização:** 25/11/2026 (entrega final).

## 2. Campos de cada item no Project

Título, tipo (`user-story`, `task`, `bug`, `documentation`, `test`), prioridade, responsável, sprint, status, critério de conclusão e requisito relacionado.

## 3. Estratégia de priorização

O grupo priorizou pelo valor para o usuário, pela importância para o fluxo principal, pelas dependências e pela complexidade. O fluxo de doação (cadastro, login, promessa e acompanhamento) veio primeiro. Favoritos, notificações e a gestão completa de necessidades ficaram para depois e não couberam no prazo.

## 4. Visão resumida do backlog

| ID | Issue | Tipo | Descrição curta | Prioridade | Requisito | Sprint | Estado final |
|---|---|---|---|---|---|---|---|
| `T-01` | [visão](visao-geral.md) | Tarefa | Definir e delimitar o problema. | Alta | | 1 | Concluído |
| `T-02` | [visão](visao-geral.md) | Tarefa | Identificar público e stakeholders. | Alta | | 1 | Concluído |
| `D-01` | [visão](visao-geral.md) | Documentação | Visão geral do produto. | Alta | | 1 | Concluído |
| `T-03` | [visão](visao-geral.md) | Tarefa | Definir nome e proposta de valor. | Média | | 1 | Concluído |
| `T-04` | [Project](https://github.com/users/gigi-zacaroni/projects/1) | Tarefa | Criar e configurar o GitHub Project. | Alta | | 1 | Concluído |
| `T-05` | este arquivo | Tarefa | Criar o backlog inicial. | Alta | | 1 | Concluído |
| `T-06` | [README](../README.md) | Tarefa | Definir integrantes e responsabilidades. | Média | | 1 | Concluído |
| `T-07` | [protótipo](prototipo/README.md) | Tarefa | Criar o protótipo inicial da interface. | Média | | 1 e 2 | Concluído |
| `D-02` | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) | Documentação | Documentar os requisitos verificáveis. | Alta | `RF-01` a `RF-27`, `RNF-01` a `RNF-10`, `RN-01` a `RN-08` | 2 | Concluído |
| `D-03` | [protótipo](prototipo/README.md) | Documentação | Protótipo navegável ligado aos requisitos e critérios. | Alta | `RF-01` a `RF-27` | 2 | Concluído |
| `D-04` | [Sprint 2](sprints/sprint-02.md) | Documentação | Registro das Sprints 1 e 2 e rastreabilidade inicial. | Alta | | 2 | Concluído |
| `US-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | User story | Criar conta de doador. | Alta | `RF-01`, `RNF-03` | 2 a 8 | Concluída |
| `US-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | User story | Cadastrar instituição. | Alta | `RF-02`, `RF-11` | 2 a 8 | Concluída. Sem selo "Verificada" (`RF-11`). |
| `US-03` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | User story | Entrar, sair e acesso protegido. | Alta | `RF-03` a `RF-05` | 2 a 8 | Concluída |
| `US-04` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | User story | Buscar e filtrar instituições e necessidades. | Alta | `RF-06` a `RF-09` | 2 e 8 | Concluída. Filtros e dados no navegador. |
| `US-05` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | User story | Ver o detalhe da instituição. | Alta | `RF-10`, `RF-18` | 2 e 8 | Concluída. Contato no navegador. |
| `US-06` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | User story | Favoritar instituições. | Baixa | `RF-12`, `RF-13` | 2 | Não implementada |
| `US-07` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | User story | Gerenciar necessidades. | Alta | `RF-14` a `RF-17` | 2 e entrega final | Concluída parcialmente. Só cadastro (`RF-14`). |
| `US-08` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | User story | Prometer uma doação limitada ao que falta. | Alta | `RF-18`, `RF-19` | 2 a 8 | Concluída |
| `US-09` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | User story | Acompanhar e cancelar doações. | Média | `RF-20`, `RF-21` | 2, 8 e entrega final | Concluída |
| `US-10` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | User story | Ver as doações e confirmar o recebimento. | Alta | `RF-22` a `RF-24` | 2 e entrega final | Concluída. Sem total recebido (`RF-24`). |
| `US-11` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | User story | Receber notificações. | Média | `RF-25` a `RF-27` | 2 | Não implementada |
| `D-05` | [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) | Documentação | Modelo comportamental do fluxo de doação. | Alta | `RF-19` a `RF-24` | 3 | Concluído |
| `D-06` | [#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16) | Documentação | Modelo estrutural e schema MySQL. | Alta | `RF-01`, `RF-02`, `RF-18`, `RF-19`, `RNF-06` | 3 | Concluído |
| `D-07` | [#17](https://github.com/gigi-zacaroni/tp-eng-software/issues/17) | Documentação | Rastreabilidade da Sprint 3. | Alta | `RF-01` a `RF-27` | 3 | Concluído |
| `T-08` | [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) | Tarefa | API de cadastro, login e promessa de doação. | Alta | `RF-01` a `RF-04`, `RF-19` | 3 | Concluído |
| `T-09` | [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) | Tarefa | Remover a API legada e consolidar o schema. | Alta | | 4 | Concluído |
| `T-10` | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | Tarefa | Endpoints `GET` de instituições e necessidades. | Alta | `RF-06` a `RF-10`, `RF-18`, `RNF-04` | 4 a 8 | Concluído (`CT-20`) |
| `T-11` | [#21](https://github.com/gigi-zacaroni/tp-eng-software/issues/21) | Tarefa | Separar o back-end em rotas, controllers e services. | Média | `RF-01` a `RF-04`, `RF-19` | 4 | Concluído |
| `T-12` | [#22](https://github.com/gigi-zacaroni/tp-eng-software/issues/22) | Tarefa | JWT no `authService` e middleware de proteção. | Média | `RF-03`, `RF-05` | 4 | Concluído |
| `T-13` | [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23) | Tarefa | Regra de doação com `SELECT ... FOR UPDATE` no `doacaoService`. | Média | `RF-19`, `RNF-06` | 4 | Concluído |
| `T-14` | [#24](https://github.com/gigi-zacaroni/tp-eng-software/issues/24) | Tarefa | Variáveis de ambiente para banco e JWT. | Média | | 4 | Concluído |
| `D-08` | sem Issue | Documentação | Decisões de projeto e análise de coesão e acoplamento. | Alta | | 4 | Concluído |
| `T-15` | sem Issue | Tarefa | Services lançam erro de domínio; só o handler traduz para HTTP. | Média | | 5 | Não realizado. Os services ainda lançam `ErroHttp`. |
| `T-16` | sem Issue | Tarefa | Lugar único para validar a entrada das requisições. | Baixa | | 5 | Não realizado |
| `T-17` | [#25](https://github.com/gigi-zacaroni/tp-eng-software/issues/25) | Tarefa | Padrão Repository nos services. | Média | `RF-01` a `RF-03`, `RF-14`, `RF-18`, `RF-19` | 5 | Concluído |
| `T-18` | [#26](https://github.com/gigi-zacaroni/tp-eng-software/issues/26) | Teste | Validar o padrão Repository com testes. | Média | `RF-01` a `RF-03`, `RF-19`, `RNF-06` | 5 a 7 | Concluído (`CT-01` a `CT-12`). O roteiro com MySQL ficou na `T-24`. |
| `D-09` | [#30](https://github.com/gigi-zacaroni/tp-eng-software/issues/30) | Documentação | Documento de arquitetura. | Alta | `RF-01` a `RF-04`, `RF-19` | 6 | Concluído |
| `T-19` | [#27](https://github.com/gigi-zacaroni/tp-eng-software/issues/27) | Tarefa | Servir o front pelo Express e criar o cliente da API. | Alta | `RF-01` a `RF-04`, `RF-19` | 6 | Concluído. As telas foram substituídas na `T-31`. |
| `T-20` | [#28](https://github.com/gigi-zacaroni/tp-eng-software/issues/28) | Tarefa | Landing com instituições em destaque. | Média | `RF-06` | 6 | Concluído. Substituída pela tela inicial da `T-31`. |
| `T-21` | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | Tarefa | Login com estado por perfil. | Média | `RF-03` | 6 | Concluído. Substituído pelo login da `T-31`. |
| `D-10` | sem Issue | Documentação | Rastreabilidade da Sprint 6. | Média | `RF-01` a `RF-27` | 6 | Concluído |
| `D-11` | [#33](https://github.com/gigi-zacaroni/tp-eng-software/issues/33) | Documentação | Plano de testes. | Alta | `RF-01` a `RF-03`, `RF-19`, `RNF-06` | 7 | Concluído |
| `T-22` | [#34](https://github.com/gigi-zacaroni/tp-eng-software/issues/34) | Teste | Executar a suíte e salvar as evidências. | Alta | `RF-01` a `RF-03`, `RF-19`, `RNF-06` | 7 | Concluído |
| `T-23` | [#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35) | Defeito | DEF-01: estado vazando entre testes no Node 18. | Alta | | 7 | Concluído |
| `T-24` | [#36](https://github.com/gigi-zacaroni/tp-eng-software/issues/36) | Teste | Executar o caso manual `CT-13` com MySQL. | Média | `RF-01`, `RF-03`, `RF-19`, `RNF-01` | 7 e 8 | Pendente. Depende do MySQL. |
| `D-12` | [evidências](testes/evidencias-testes.md) | Documentação | Resultados dos testes e situação de cada requisito. | Alta | `RF-01` a `RF-27` | 8 | Concluído |
| `T-25` | sem Issue | Tarefa | Telas de cadastro, listagem, detalhe e confirmação em `src/front/pages/`. | Alta | `RF-07` a `RF-10`, `RF-19` | 8 | Substituída pela `T-31`. As páginas foram apagadas. |
| `T-26` | [#38](https://github.com/gigi-zacaroni/tp-eng-software/issues/38) | Defeito | DEF-02: testes de doação usavam o MySQL. | Média | `RF-20`, `RF-21` | 8 | Concluído |
| `T-27` | [#39](https://github.com/gigi-zacaroni/tp-eng-software/issues/39) | Defeito | DEF-03: cadastro de instituição aceitava dados inválidos. | Média | `RF-02` | 8 | Concluído |
| `T-28` | [#40](https://github.com/gigi-zacaroni/tp-eng-software/issues/40) | Defeito | DEF-04: plano de testes sobrescrito. | Média | | 8 | Concluído |
| `T-29` | [#41](https://github.com/gigi-zacaroni/tp-eng-software/issues/41) | Defeito | DEF-05: landing e login quebrados. | Alta | `RF-03`, `RF-06` | 8 | Corrigido. As telas antigas saíram; falta conferir a nova home e o login no navegador. |
| `T-30` | [#42](https://github.com/gigi-zacaroni/tp-eng-software/issues/42) | Defeito | DEF-06: senha real no `.env.example`. | Alta | | 8 | Corrigido no arquivo. Falta trocar a senha no MySQL. |
| `T-31` | Issue a criar | Tarefa | Telas do protótipo (`app.js`) ligadas à API: minhas doações, painel da instituição, nova necessidade e filtros no navegador. | Alta | `RF-06` a `RF-10`, `RF-14`, `RF-18` a `RF-24` | Entrega final | Concluído (`CT-25`, `CT-26`) |
| `T-32` | Issue a criar | Tarefa | Remover o avanço de status pelo doador (`RN-04`). | Alta | `RF-20`, `RF-23` | Entrega final | Concluído (`CT-24`, `CT-25`) |
| `D-13` | Issue a criar | Documentação | Revisão final da documentação conforme o código. | Alta | todos | Entrega final | Concluído |
| `D-14` | Issue a criar | Documentação | Entrega final: slides, vídeo, tag `versao-final` e link da aplicação. | Alta | | Entrega final | Pendente |

Estados das histórias:

- **Concluída:** os requisitos da história têm código no back-end e no front-end e teste aprovado.
- **Concluída parcialmente:** parte dos requisitos tem código. O que falta está na coluna e em [`requisitos.md`](requisitos/requisitos.md).
- **Não implementada:** a história foi especificada, mas não tem código.

## 5. Definition of Ready

Um item entra numa sprint quando:

- tem descrição compreensível;
- tem valor ou objetivo claro;
- tem critério de aceitação ou de conclusão;
- tem as dependências principais registradas.

## 6. Definition of Done

Um item está concluído quando:

- atende aos critérios de aceitação;
- foi revisado por outro integrante, ou registrado como não revisado;
- está na branch `main`;
- tem teste ou evidência, quando aplicável;
- atualizou a documentação afetada;
- aparece no arquivo da sprint.

## 7. Histórico de refinamento

| Sprint | Itens criados, divididos ou removidos | Motivo | Evidência |
|---|---|---|---|
| Sprint 1 | Tarefas de problema, público, visão, proposta de valor, Project, backlog, responsabilidades e protótipo. | Estruturar o projeto. | [`visao-geral.md`](visao-geral.md) |
| Sprint 2 | `D-02` e as onze histórias como Issues ([#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)). | Ligar o backlog aos requisitos. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1), [PR #4](https://github.com/gigi-zacaroni/tp-eng-software/pull/4) |
| Sprint 2 | `T-07` concluída; `D-03` e `D-04` criados; `T-04` a `T-06` concluídas. | Fechar o incremento. | [`prototipo/README.md`](prototipo/README.md) |
| Sprint 3 | `D-05`, `D-06`, `D-07` e `T-08` ([#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) a [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18)). | Modelagem e back-end eram trabalho real sem item no backlog. | [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) a [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) |
| Sprint 3 | Troca de stack para Node.js, Express e MySQL, com front em HTML e CSS. | O grupo já dominava essa stack e precisava entregar no prazo. Nenhum requisito mudou. | [Ata de 22/09](reunioes/2026-09-22-planejamento-sprint-03.md) |
| Sprint 3 | `T-09` ([#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19)) e `T-10` ([#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20)). | API legada com credencial versionada e consultas sem endpoint. | [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19), [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) |
| Sprint 4 | `T-11` a `T-14` ([#21](https://github.com/gigi-zacaroni/tp-eng-software/issues/21) a [#24](https://github.com/gigi-zacaroni/tp-eng-software/issues/24)) e `D-08`. `T-09` concluída. | Registrar a refatoração em camadas e as decisões de projeto. | [`decisoes-de-projeto.md`](projeto/decisoes-de-projeto.md) |
| Sprint 4 | `T-15`, `T-16` e `T-17`. `T-10`, `US-04`, `US-05` e `US-07` passam para a Sprint 5. | Saíram da análise de coesão e acoplamento. | [`decisoes-de-projeto.md` §5](projeto/decisoes-de-projeto.md#5-melhorias-identificadas) |
| Sprint 5 | `T-17` resolvida; `T-18` criada. | O SQL dentro dos services justificou o padrão Repository. | [`padroes-de-projeto.md`](padroes/padroes-de-projeto.md) |
| Sprint 6 | `D-09`, `T-19` a `T-21` e `D-10`. | Arquitetura e primeira interface ligada à API. | [`arquitetura.md`](arquitetura/arquitetura.md) |
| Sprint 7 | `D-11`, `T-22`, `T-23` e `T-24`. | Plano de testes; a 1ª execução revelou o DEF-01. | [`plano-de-testes.md`](testes/plano-de-testes.md) |
| Sprint 8 | `D-12`, `T-25` e `T-26` a `T-30` ([#38](https://github.com/gigi-zacaroni/tp-eng-software/issues/38) a [#42](https://github.com/gigi-zacaroni/tp-eng-software/issues/42)). `T-10` concluída. | A validação final revelou cinco defeitos. | [`evidencias-testes.md`](testes/evidencias-testes.md) |
| Entrega final | `T-31`, `T-32`, `D-13` e `D-14`. `T-25`, `T-20` e `T-21` substituídas pela `T-31`. `T-15` e `T-16` encerradas como não realizadas. `US-06` e `US-11` encerradas como não implementadas. | O protótipo virou a interface oficial ligada à API, e a revisão final alinhou documentação e código. | Commits `4eff1f4` a `e65bceb` |

## 8. Fechamento das Issues no GitHub

Situação conferida em 25/11/2026 a partir do export do Project.

| Ação | Issues |
|---|---|
| Fechar como concluída | US-01 #2, US-03 #3, US-08 #10, T-10 #20, T-18 #26, D-11 #33, T-22 #34, T-23 #35 |
| Fechar como concluída, com comentário sobre o que ficou parcial | US-02 #5 (sem selo), US-04 #6 e US-05 #7 (dados no navegador), US-07 #9 (só cadastro de necessidade), US-09 #11, US-10 #12 (sem total recebido) |
| Fechar como "não planejada" | US-06 #8, US-11 #13 |
| Manter aberta até a ação indicada | T-24 #36 (rodar o `CT-13` com MySQL), DEF-05 #41 (conferir home e login no navegador), DEF-06 #42 (trocar a senha do MySQL) |
| Criar | `T-31`, `T-32`, `D-13`, `D-14` |

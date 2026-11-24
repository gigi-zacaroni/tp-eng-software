# Registro de uso de Inteligência Artificial

> Documento obrigatório na Sprint 8 e na entrega final. Cada integrante registra aqui como usou IA. O uso foi acompanhado de revisão humana.
> Última atualização: 23/11/2026.

## 1. Ferramentas utilizadas

| Ferramenta/modelo | Finalidade | Integrantes que utilizaram |
|---|---|---|
| Claude Code (Claude Opus 5.5), extensão do VS Code | Redação e revisão de documentos de teste, análise do repositório, escrita de telas do front-end e execução assistida de comandos (`git`, `npm test`) | Arthur Veiga (@ArtJamis1208) |
| GitHub Copilot (agente e sugestões no editor) | Apoio na correção da persistência do fluxo de doações, nos scripts SQL de teste e nos testes de integração | Maria Luiza Pestana (@Malupestana) |
| `[A COMPLETAR: Geovana e Karol]` | `[finalidade]` | `[integrante]` |

O registro do Copilot vem do trailer `Co-authored-by: Copilot` no commit [`c2321b9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c2321b9). Maria Luiza deve confirmar e detalhar a linha dela na seção 2.

## 2. Registro por atividade

| Data/sprint | Artefato ou código apoiado | Como a IA foi utilizada | O que foi revisado/modificado pelo grupo | Evidência/commit |
|---|---|---|---|---|
| 15/11 a 16/11, Sprint 7 | `docs/testes/plano-de-testes.md` (escopo, riscos, CT-01 a CT-13, matriz) | Arthur pediu a estrutura do plano a partir dos requisitos e dos testes já existentes. A IA leu `src/back/tests/` e propôs os casos ligados aos arquivos. | Arthur conferiu cada caso contra o código e os requisitos, ajustou dados e resultados esperados e cortou casos sem código. | [`551154e`](https://github.com/gigi-zacaroni/tp-eng-software/commit/551154e), [`229900f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/229900f) |
| 16/11, Sprint 7 | Diagnóstico e correção do DEF-01 (hooks no Node 18) | A IA rodou a suíte, leu a saída com 15 falhas e apontou a causa: hooks no nível do arquivo não rodam dentro de `describe` no Node 18. | Arthur reproduziu a falha, aplicou a correção e salvou o reteste com 47 aprovados. | [`43ff986`](https://github.com/gigi-zacaroni/tp-eng-software/commit/43ff986), [`61dabb8`](https://github.com/gigi-zacaroni/tp-eng-software/commit/61dabb8) |
| 16/11, Sprint 7 | `docs/sprints/sprint-07.md`, ata de 15/11, itens do backlog | Rascunho dos textos a partir do que já estava no repositório. | Arthur e Karol revisaram o texto e os links. | [`89f8f7b`](https://github.com/gigi-zacaroni/tp-eng-software/commit/89f8f7b) |
| 23/11, Sprint 8 | Restauração do plano de testes e casos CT-20 a CT-24 | A IA encontrou o plano sobrescrito no commit `5e1ca6c`, restaurou a versão anterior e propôs os casos novos a partir dos testes de Geovana e Maria Luiza. | Arthur conferiu a contagem de testes por caso, os dados da massa (`seed_test.sql`) e os resultados esperados. | [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a), [`0ceb3fb`](https://github.com/gigi-zacaroni/tp-eng-software/commit/0ceb3fb) |
| 23/11, Sprint 8 | Front-end: restauração da landing e telas de cadastro, listagem, detalhe com modal e confirmação | A IA leu o protótipo (`docs/prototipo`) e a API, escreveu HTML, CSS e JS das telas e testou as chamadas contra o app com o banco em memória. | Arthur escolheu as telas e decidiu restaurar a base da Karol. A IA escreveu o `CT-25` para travar o contrato entre telas e API. A revisão visual no navegador (`CT-21` a `CT-23`) fica registrada em `evidencias-testes.md`. | [`8959059`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8959059) a [`8607b8e`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8607b8e) |
| 23/11, Sprint 8 | `docs/testes/evidencias-testes.md` e este arquivo | Consolidação dos resultados a partir das saídas salvas e do histórico do Git. | Arthur conferiu os totais contra as saídas em `docs/testes/evidencias/`. | Commits da Sprint 8 de @ArtJamis1208 |
| `[A COMPLETAR]` | `[artefato]` | `[uso]` | `[revisão]` | `[link]` |

## 3. Verificação humana

- **Correção técnica:** todo código gerado com IA passou pela suíte (`npm test`, 80 testes, 0 falhas). As telas também têm o `CT-25`, que repete as chamadas do front contra o app real. Os roteiros manuais `CT-13` e `CT-21` a `CT-23` ainda precisam ser executados no navegador com MySQL (ver [`evidencias-testes.md`](testes/evidencias-testes.md)).
- **Compatibilidade com o projeto:** as telas usam o cliente único `js/api.js`, o mesmo estilo do protótipo e só as rotas que já existiam na API. Nenhuma rota nova foi criada.
- **Autoria e entendimento:** quem fez o commit revisou o conteúdo e consegue explicar cada decisão. Textos que não batiam com o código foram reescritos ou cortados.
- **Dados sensíveis:** nenhum `.env`, token ou senha real foi enviado para a IA ou para o repositório. Na revisão, o grupo removeu uma senha real que estava no `.env.example` ([`c646b42`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c646b42)).
- **Funcionamento do código sugerido:** as saídas de execução estão salvas em [`docs/testes/evidencias/`](testes/evidencias/) e citadas em [`evidencias-testes.md`](testes/evidencias-testes.md).

## 4. Declaração do grupo

Declaramos que o conteúdo final foi revisado pelo grupo e que somos capazes de explicar e justificar os artefatos e o código entregues.

`[A COMPLETAR: confirmação dos quatro integrantes]`

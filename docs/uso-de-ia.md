# Registro de uso de Inteligência Artificial

> Documento obrigatório na Sprint 8 e na entrega final. Cada integrante registra aqui como usou IA.
> Última atualização: 23/11/2026.

## 1. Ferramentas utilizadas

| Ferramenta/modelo | Finalidade | Integrantes que utilizaram |
|---|---|---|
| Claude Code (Claude Opus 5.5), no VS Code | Documentos de teste, telas do front-end e execução de `git` e `npm test` | Arthur Veiga (@ArtJamis1208) |
| GitHub Copilot | Correção da persistência de doações, scripts SQL e testes de integração | Maria Luiza Pestana (@Malupestana) |
| `[A COMPLETAR: Geovana e Karol]` | `[finalidade]` | `[integrante]` |

O uso do Copilot aparece no commit [`c2321b9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c2321b9). A Maria Luiza deve confirmar e detalhar a linha dela.

## 2. Registro por atividade

| Data/sprint | Artefato ou código | Como a IA foi usada | Revisão do grupo | Evidência |
|---|---|---|---|---|
| 15 e 16/11, Sprint 7 | Plano de testes (CT-01 a CT-13) | Propôs os casos a partir dos requisitos e dos testes existentes. | Arthur conferiu cada caso com o código e ajustou dados e resultados. | [`551154e`](https://github.com/gigi-zacaroni/tp-eng-software/commit/551154e), [`229900f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/229900f) |
| 16/11, Sprint 7 | Correção do DEF-01 | Leu a saída com 15 falhas e apontou a causa. | Arthur reproduziu a falha, corrigiu e salvou o reteste. | [`43ff986`](https://github.com/gigi-zacaroni/tp-eng-software/commit/43ff986), [`61dabb8`](https://github.com/gigi-zacaroni/tp-eng-software/commit/61dabb8) |
| 16/11, Sprint 7 | `sprint-07.md`, ata e backlog | Fez o rascunho dos textos. | Arthur e Karol revisaram textos e links. | [`89f8f7b`](https://github.com/gigi-zacaroni/tp-eng-software/commit/89f8f7b) |
| 23/11, Sprint 8 | Plano de testes (CT-14 a CT-25) | Achou o plano sobrescrito, restaurou e propôs os casos novos. | Arthur conferiu contagens, massa de dados e resultados. | [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a), [`0ceb3fb`](https://github.com/gigi-zacaroni/tp-eng-software/commit/0ceb3fb) |
| 23/11, Sprint 8 | Telas de cadastro, listagem, detalhe e confirmação | Escreveu HTML, CSS e JS a partir do protótipo e criou o CT-25. | Arthur escolheu as telas e a base visual. A revisão no navegador está em `evidencias-testes.md`. | [`8959059`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8959059) a [`8607b8e`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8607b8e) |
| 23/11, Sprint 8 | `evidencias-testes.md` e este arquivo | Consolidou resultados das saídas e do histórico do Git. | Arthur conferiu os totais com as saídas salvas. | Commits de @ArtJamis1208 |
| `[A COMPLETAR]` | `[artefato]` | `[uso]` | `[revisão]` | `[link]` |

## 3. Verificação humana

- **Correção técnica:** o código passou na suíte (`npm test`: 80 testes, 0 falhas). As telas também passam no `CT-25`. Os roteiros no navegador (`CT-13`, `CT-21` a `CT-23`) ainda dependem do MySQL.
- **Compatibilidade:** as telas usam o cliente `js/api.js`, o estilo do protótipo e só rotas que já existiam.
- **Autoria:** quem fez o commit revisou o conteúdo e sabe explicar cada decisão.
- **Dados sensíveis:** nenhum `.env`, token ou senha real foi enviado à IA. Na revisão, o grupo tirou uma senha real do `.env.example` ([`c646b42`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c646b42)).
- **Funcionamento:** as saídas estão em [`docs/testes/evidencias/`](testes/evidencias/) e citadas em [`evidencias-testes.md`](testes/evidencias-testes.md).

## 4. Declaração do grupo

Declaramos que o conteúdo final foi revisado pelo grupo e que somos capazes de explicar e justificar os artefatos e o código entregues.

`[A COMPLETAR: confirmação dos quatro integrantes]`

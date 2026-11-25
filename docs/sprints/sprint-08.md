# Sprint 8: Validação final, estabilização e fechamento técnico

## 1. Identificação

- **Número:** 8
- **Período:** 17/11/2026 a 23/11/2026
- **Data limite:** 23/11/2026
- **Tag da entrega:** `sprint-08`
- **Link da tag:** https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-08
- **GitHub Project:** [ConectaAção Backlog](https://github.com/users/gigi-zacaroni/projects/1)
- **Aplicação publicada:** não há. A aplicação roda localmente (seção 7).
- **Responsáveis pela sprint:** Arthur Veiga (@ArtJamis1208) e Karol Guimarães (@KarolGSMiranda)

## 2. Objetivo específico da sprint

**Pergunta:** quais requisitos foram atendidos, quais testes foram executados e qual é a situação final da aplicação?

**Objetivo planejado:** consolidar os resultados dos testes, tratar os defeitos encontrados e confrontar cada requisito com o resultado.

**Resultado alcançado:**

- A suíte automatizada chegou a 87 testes: 80 aprovados, 0 reprovados e 7 pulados.
- Dos 25 casos de teste, 15 foram executados e aprovados. Os outros 10 dependem do MySQL.
- Cinco defeitos novos (DEF-02 a DEF-06) foram registrados e corrigidos.
- Cada requisito tem uma situação final: 10 atendidos, 13 parciais, 12 não atendidos e 2 não verificados.
- O doador agora consegue listar instituições, ver o detalhe e prometer uma doação pela interface.

## 3. Diferença em relação à Sprint 7

- **O que é novo:** `evidencias-testes.md`, `uso-de-ia.md`, os casos `CT-14` a `CT-25`, as telas de listagem, detalhe e confirmação e os defeitos DEF-02 a DEF-06.
- **O que foi apenas atualizado:** plano de testes, backlog, requisitos, rastreabilidade e README do front.
- **Por que mudou:** a Sprint 7 planejou e fez a primeira execução. A Sprint 8 precisava mostrar resultados consolidados e a situação real de cada requisito.

## 4. Sprint Backlog

| Issue | Item | Responsável | Critério de conclusão | Estado |
|---|---|---|---|---|
| [#36](https://github.com/gigi-zacaroni/tp-eng-software/issues/36) | `T-24` Executar o `CT-13` no navegador | Geovana | Fluxo com MySQL e capturas salvas | Pendente (depende do MySQL) |
| [#38](https://github.com/gigi-zacaroni/tp-eng-software/issues/38) | `T-26` DEF-02: testes de doação usavam o MySQL | Geovana | 4 testes passam sem MySQL | Concluída |
| [#39](https://github.com/gigi-zacaroni/tp-eng-software/issues/39) | `T-27` DEF-03: cadastro de instituição aceitava dados inválidos | Geovana | Resposta 400 sem gravar | Concluída |
| [#40](https://github.com/gigi-zacaroni/tp-eng-software/issues/40) | `T-28` DEF-04: plano de testes sobrescrito | Arthur | Plano restaurado e ampliado | Concluída |
| [#41](https://github.com/gigi-zacaroni/tp-eng-software/issues/41) | `T-29` DEF-05: landing e login quebrados | Arthur | `CT-25` aprovado e `CT-21` no navegador | Em revisão |
| [#42](https://github.com/gigi-zacaroni/tp-eng-software/issues/42) | `T-30` DEF-06: senha real no `.env.example` | Geovana | Senha removida e trocada no MySQL | Em revisão |
| `D-12` | Evidências finais dos testes | Arthur | Resultados, defeitos e requisitos registrados | Concluída |
| `T-25` | Telas de listagem, detalhe e confirmação | Arthur | Telas ligadas à API e `CT-25` aprovado | Concluída |
| `T-10` ([#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20)) | Endpoints `GET` de instituições | Geovana e Maria Luiza | Rotas cobertas por `CT-20` | Concluída |

## 5. Artefato central da disciplina

- **Arquivo:** [`docs/testes/evidencias-testes.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/testes/evidencias-testes.md)
- **Conteúdo:** resumo dos testes executados, aprovados e não executados; resultado por caso; defeitos com correção e reteste; requisitos atendidos, parciais e não atendidos; limitações e trabalho futuro.
- **Complemento:** [`docs/uso-de-ia.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/uso-de-ia.md) registra onde a IA foi usada e como o grupo revisou.
- **Relação com a disciplina:** aplica o capítulo 8 (Testes) ao confrontar cada requisito com a evidência de execução.

## 6. Artefatos anteriores atualizados

| Arquivo | Alteração | Motivo | Commit |
|---|---|---|---|
| [`plano-de-testes.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/testes/plano-de-testes.md) | Restaurado e ampliado com `CT-14` a `CT-25` | Corrigir o DEF-04 e cobrir as telas novas | [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a), [`0ceb3fb`](https://github.com/gigi-zacaroni/tp-eng-software/commit/0ceb3fb), [`7e95ea4`](https://github.com/gigi-zacaroni/tp-eng-software/commit/7e95ea4) |
| [`backlog-produto.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/backlog-produto.md) | Itens `D-12`, `T-25` a `T-30` e estado final das histórias | Registrar os defeitos e o que foi entregue | [`6cc2305`](https://github.com/gigi-zacaroni/tp-eng-software/commit/6cc2305) |
| [`requisitos.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/requisitos/requisitos.md) | Linha "Verificação" em cada história, com o caso de teste de cada critério | Tornar os critérios verificáveis pelos testes | [`74072af`](https://github.com/gigi-zacaroni/tp-eng-software/commit/74072af) |
| [`rastreabilidade.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/rastreabilidade.md) | Casos de teste, evidência e situação final de cada requisito | Fechar a matriz requisito × teste | [`cd44412`](https://github.com/gigi-zacaroni/tp-eng-software/commit/cd44412) |
| [`src/front/README.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/front/README.md) | Telas, requisitos e massa de teste | Explicar como usar as telas novas | [`62429b9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/62429b9) |
| [`.env.example`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/back/.env.example) | Senha real removida | Corrigir o DEF-06 | [`c646b42`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c646b42) |

## 7. Incremento da aplicação web

- **O que foi criado:** telas de listagem com busca e filtros, detalhe da instituição com o modal "Quero doar" e confirmação da doação. A landing e o login voltaram a funcionar (DEF-05). O cadastro de instituição passou a recusar dados inválidos (DEF-03).
- **Requisitos relacionados:** `RF-06` a `RF-10`, `RF-18`, `RF-19` e `RNF-01`.
- **Como executar:**

```bash
cd src/back
npm install
npm test        # 80 aprovados e 0 falhas; sem MySQL, os testes de integração não rodam
npm start       # aplicação em http://localhost:3000 (precisa do MySQL e do .env)
```

Para rodar com banco, siga a seção 6 de [`evidencias-testes.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/testes/evidencias-testes.md).

- **Evidência:** [saída da suíte na Sprint 8](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/testes/evidencias/execucao-sprint-08-unitarios.txt).

## 8. Rastreabilidade

| Item | Issue/Requisito | Artefato ou código | Commit/Teste/Evidência |
|---|---|---|---|
| Listagem de instituições | `RF-07` a `RF-09` / `T-25` | [`pages/instituicoes.html`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/front/pages/instituicoes.html) | [`19a2f1b`](https://github.com/gigi-zacaroni/tp-eng-software/commit/19a2f1b), `CT-25` aprovado |
| Detalhe e "Quero doar" | `RF-10`, `RF-18`, `RF-19` / `T-25` | [`pages/instituicao.html`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/front/pages/instituicao.html) | [`c6da345`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c6da345), `CT-25` aprovado |
| Confirmação da doação | `RF-19`, `RNF-01` / `T-25` | [`pages/confirmacao.html`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/front/pages/confirmacao.html) | [`8607b8e`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8607b8e), `CT-25` aprovado |
| Rotas de consulta | `RF-05` a `RF-07`, `RF-10` / #20 | [`routes/instituicoes.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/back/src/routes/instituicoes.js) | `CT-20` aprovado |
| Avançar e cancelar doação | `RF-20`, `RF-21` / #38 | [`services/doacaoService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/back/src/services/doacaoService.js) | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f), `CT-24` aprovado |
| Validação do cadastro de instituição | `RF-02` / #39 | [`services/authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/back/src/services/authService.js) | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f), `CT-20` aprovado |
| Persistência no MySQL | `RF-18` a `RF-21`, `RNF-06` | [`doacoes-integracao.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/src/back/tests/doacoes-integracao.test.js) | [`c2321b9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c2321b9), `CT-14` a `CT-19` pendentes |
| Matriz completa | `RF-01` a `RF-27`, `RNF-01` a `RNF-10` | [`rastreabilidade.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/rastreabilidade.md) | [`cd44412`](https://github.com/gigi-zacaroni/tp-eng-software/commit/cd44412) |

## 9. Evidências de colaboração

| Integrante | Issues/atividades | Commits relevantes |
|---|---|---|
| Arthur Veiga | Evidências finais, plano de testes, telas novas, `CT-25`, DEF-04, DEF-05 e uso de IA | [`06f14b0`](https://github.com/gigi-zacaroni/tp-eng-software/commit/06f14b0), [`111f6c8`](https://github.com/gigi-zacaroni/tp-eng-software/commit/111f6c8), [`19a2f1b`](https://github.com/gigi-zacaroni/tp-eng-software/commit/19a2f1b), [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a), [`00dcae9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/00dcae9) |
| Geovana Zacaroni | Novos testes automatizados, DEF-02 e DEF-03, configuração do ambiente (PR #37) | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f), [`c12a9c0`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c12a9c0) |
| Maria Luiza Pestana | Persistência do fluxo de doações e instruções técnicas do banco | [`c2321b9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c2321b9), [`9f1395a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/9f1395a) |
| Karol Guimarães | Issues #38 a #42, backlog, requisitos, rastreabilidade, ata, este arquivo e tag | [`6cc2305`](https://github.com/gigi-zacaroni/tp-eng-software/commit/6cc2305), [`74072af`](https://github.com/gigi-zacaroni/tp-eng-software/commit/74072af), [`cd44412`](https://github.com/gigi-zacaroni/tp-eng-software/commit/cd44412), [`6c24dbe`](https://github.com/gigi-zacaroni/tp-eng-software/commit/6c24dbe) |

## 10. Reuniões e acompanhamento

| Data | Participantes | Decisões | Encaminhamentos |
|---|---|---|---|
| 23/11/2026 ([ata](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/reunioes/2026-11-23-fechamento-sprint-08.md)) | Arthur, Geovana, Karol e Maria Luiza | Registrar DEF-02 a DEF-06 como Issues. Fechar as que têm reteste. Incluir as telas novas. | Geovana executa os casos com MySQL e troca a senha exposta até a entrega final. |

## 11. Revisão do incremento

- **O que foi concluído:** evidências finais, 80 testes aprovados, telas novas, cinco defeitos corrigidos e a situação de cada requisito.
- **O que não foi concluído:** 10 casos que dependem do MySQL (`CT-13` a `CT-19` e `CT-21` a `CT-23`) e a troca da senha exposta.
- **Demonstração realizada:** execução do `npm test` com a saída salva no repositório.
- **Feedback recebido:** a revisão de QA encontrou o plano sobrescrito, a landing quebrada e a senha no `.env.example`.
- **Ajustes necessários:** executar os casos pendentes e conferir as telas no navegador.

## 12. Dificuldades e riscos

- Só a Geovana tem o MySQL configurado. Isso impediu 10 casos de teste.
- Commits que substituíram arquivos inteiros (`5e1ca6c` e `4c29f80`) quebraram o plano e o front. Eles foram restaurados nesta sprint.
- A senha do MySQL ainda aparece no histórico do Git até ser trocada.
- O modelo de dados não tem causa, cidade, contato nem quantidade recebida. Por isso vários requisitos ficaram parciais.

## 13. Pendências para a entrega final

- Executar `CT-13` a `CT-19` e `CT-21` a `CT-23` com MySQL e salvar as capturas.
- Trocar a senha do MySQL e fechar a #42.
- Conferir as telas no navegador e fechar a #41 e a #36.
- Criar a tag `versao-final`, gravar o vídeo e salvar os slides em `slides/`.

**Depois da Sprint 8 (25/11):** as telas do protótipo de alta fidelidade passaram a ser a interface oficial e foram ligadas à API, com minhas doações e o painel da instituição (`d393149`, `e65bceb`). As páginas de `src/front/pages/` foram apagadas. O doador deixou de poder marcar a doação como entregue (`3ba1f81`). A suíte passou para 88 testes. Os detalhes estão em [`evidencias-testes.md`](../testes/evidencias-testes.md) e no [backlog](../backlog-produto.md).

## 14. Checklist da entrega

- [x] Artefato central presente
- [x] Backlog e quadro atualizados
- [x] Incremento executável ou demonstrável
- [x] Links para Issues e commits
- [x] Evidências de todos os integrantes
- [x] Documentação anterior atualizada
- [x] Tag criada
- [ ] Link permanente enviado no UFLA Virtual

## Links enviados no UFLA Virtual

- **Tag `sprint-08`:** https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-08
- **Este arquivo na tag:** https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-08/docs/sprints/sprint-08.md

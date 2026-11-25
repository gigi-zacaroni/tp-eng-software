# Sprint 5: Padrões de projeto aplicados ao código

- **Data de entrega:** 26/10/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-05`
- **Responsável por conferir este arquivo:** Karol Guimarães (@KarolGSMiranda)

## 1. Pergunta que esta sprint deve responder

**Qual problema concreto e recorrente justifica a aplicação de um padrão?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** achar um problema recorrente no código, escolher um padrão que o resolva e aplicá-lo sem mudar o comportamento da API. O problema escolhido foi o SQL misturado à regra de negócio nos services, apontado na Sprint 4 (`T-17`).

**Resultado alcançado:** padrão **Repository** aplicado. São cinco repositories em `src/back/src/repositories/`, e os services passaram de 11 instruções SQL para 0. O comportamento externo ficou igual: 18 testes de caracterização passam no código da Sprint 4 e no novo, e a suíte chegou a 39 testes. `T-15` e `T-16` não foram tratados.

## 3. Checklist do artefato central (0,75 ponto)

**Entrega esperada:** `docs/padroes/padroes-de-projeto.md`, com padrão, contexto, participantes, alternativas e evidência no código.

- [x] Problema descrito antes do padrão ([§1](../padroes/padroes-de-projeto.md#1-problema-recorrente-identificado)).
- [x] Participantes mapeados para arquivos reais ([§4](../padroes/padroes-de-projeto.md#4-evidência-no-código)).
- [x] Alternativas e justificativa, incluindo não usar padrão ([§5](../padroes/padroes-de-projeto.md#5-alternativas-e-justificativas)).
- [x] Benefícios e custos no contexto do projeto ([§6](../padroes/padroes-de-projeto.md#6-resultado-observado)).
- [x] Testes automatizados preservam o comportamento (`npm test`).

### Links dos artefatos

| Artefato | Link na tag | O que mudou |
|---|---|---|
| `padroes-de-projeto.md` | [tag `sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/padroes/padroes-de-projeto.md) | Documento central: problema, alternativas, estrutura, evidência e resultado. |
| `decisoes-de-projeto.md` | [tag `sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/projeto/decisoes-de-projeto.md) | Nova `DP-04`; análise de acoplamento e melhorias atualizadas. |
| `modelagem.md` | [tag `sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/modelagem/modelagem.md) | Diagrama de classes com a camada de repositories. |
| `backlog-produto.md` e `rastreabilidade.md` | [tag `sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/backlog-produto.md) | `T-17` e `T-18`; requisitos ligados a `DP-04`, `PP-01` e aos repositories. |

## 4. Incremento da aplicação web (0,75 ponto)

### O que foi implementado

Refatoração com o padrão Repository, sem mudar a API. Cadastro de doador (`RF-01`), cadastro de instituição (`RF-02`), login (`RF-03`) e promessa de doação (`RF-19`, `RNF-06`) seguem com o mesmo comportamento, agora com o SQL em `src/back/src/repositories/`. A comparação antes e depois está em [`padroes-de-projeto.md`](../padroes/padroes-de-projeto.md#6-resultado-observado).

### Como executar e verificar

```bash
cd src/back
npm install
npm test        # 39 testes na Sprint 5, sem MySQL
```

Verificação manual: com o MySQL no ar e o `.env` preenchido, rodar `npm start` e repetir cadastro, login e `POST /doacoes`, conferindo `necessidades.quantidadeFaltante` no banco.

| Requisito/Issue | Código | Evidência |
|---|---|---|
| `RF-01` a `RF-03`, `T-17` | [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/src/back/src/services/authService.js) e [repositories](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/src/repositories) | `npm test` (`caracterizacao.test.js`), [login](../evidencias/login.jpeg), [cadastro](../evidencias/cadastro_instituicoes.jpeg) |
| `RF-19`, `RNF-06`, `T-17` | [`doacaoService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/src/back/src/services/doacaoService.js) e [repositories](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/src/repositories) | `npm test` (`caracterizacao.test.js`, `services.test.js`), [doação](../evidencias/doa%C3%A7%C3%B5es.jpeg) |
| `T-18` | [`tests/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/tests) | Saída do `npm test` e as capturas acima |

## 5. Scrum e gestão do trabalho (0,50 ponto)

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| [#25](https://github.com/gigi-zacaroni/tp-eng-software/issues/25) | `T-17` Padrão Repository nos services | @gigi-zacaroni | Services sem SQL, API com o mesmo comportamento, `DP-04` registrada | Concluída |
| [#26](https://github.com/gigi-zacaroni/tp-eng-software/issues/26) | `T-18` Validar o padrão com testes automatizados e roteiro manual | @gigi-zacaroni | `npm test` sem falhas e capturas do fluxo real | Parcial na Sprint 5. Concluída na Sprint 7 com os casos `CT-01` a `CT-12`. |

### Acompanhamento

- **GitHub Project:** [ConectaAção: Backlog](https://github.com/users/gigi-zacaroni/projects/1)
- **Reunião:** [ata de outubro](../reunioes/2026-10-20-planejamento-sprint_5.md)
- **Impedimentos:** agendas divergentes.
- **Mudanças de escopo:** `T-15` e `T-16` ficaram fora para a sprint se concentrar em um padrão bem aplicado e testado. `T-18` foi criado para a validação.

## 6. GitHub, documentação e rastreabilidade (0,50 ponto)

| Evidência | Link | O que comprova |
|---|---|---|
| Issues | [#25](https://github.com/gigi-zacaroni/tp-eng-software/issues/25), [#26](https://github.com/gigi-zacaroni/tp-eng-software/issues/26) | Problema, decisão e validação do padrão |
| Pull Request | Não houve: commits direto na `main` | |
| Commit | [`fa515a9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/fa515a9f36ab5306bf0011052301527ba26fae87) | Repositories e refatoração dos services |
| Código | [`repositories/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/src/repositories) | Implementação do padrão |
| Testes | [`src/back/tests/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/tests) | Testes automatizados |
| Antes e depois | [`sprint-04...sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/compare/sprint-04...sprint-05) | Diff da refatoração |

### Rastreabilidade resumida

| Requisito | Issue | Decisão | Código | Evidência |
|---|---|---|---|---|
| `RF-01` a `RF-03`, `RF-14`, `RF-18`, `RF-19` | #25, #26 | [`DP-04`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/projeto/decisoes-de-projeto.md), [`PP-01`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/padroes/padroes-de-projeto.md) | [`repositories/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/src/repositories) | [`tests/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/tests), [login](../evidencias/login.jpeg), [doação](../evidencias/doa%C3%A7%C3%B5es.jpeg), [cadastro](../evidencias/cadastro_instituicoes.jpeg) |

## 7. Revisão do incremento

- **O que foi demonstrado:** o SQL saiu dos services e foi para 5 repositories (`usuario`, `doador`, `instituicao`, `necessidade` e `doacao`).
- **Critérios atendidos:** padrão documentado em `DP-04` e `PP-01`; comportamento da API igual, conferido por 39 testes; modelagem e decisões atualizadas.
- **Itens não concluídos:** `T-15` e `T-16`. O roteiro manual completo com MySQL ficou para a Sprint 7 (`T-24`).
- **Motivo:** o grupo priorizou a refatoração e os testes automatizados antes da validação com o banco real.
- **Feedback e ajustes:** a revisão da Karol conferiu a separação das camadas e a clareza do código.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** com o Repository, os services ficaram mais curtos e fáceis de ler. Os 39 testes mostraram que a refatoração não mudou o comportamento.
- **Precisa melhorar:** rodar o roteiro manual com MySQL durante a sprint, e não no fim.
- **Ação para a próxima sprint:** registrar as validações com o banco logo no início da etapa seguinte.

## 9. O que não será considerado suficiente

- Copiar a definição teórica do padrão.
- Forçar um padrão sem necessidade.
- Apresentar diagrama sem código correspondente.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-05`:** [tag `sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05)
- **Este arquivo na tag:** [`sprint-05.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/sprints/sprint-05.md)

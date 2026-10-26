# Sprint 5 — Padrões de projeto aplicados ao código

- **Data de entrega:** 26/10/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-05`
- **Responsável por conferir este arquivo:** Karol Guimarães 

## 1. Pergunta que esta sprint deve responder

**Qual problema concreto e recorrente justifica a aplicação de um padrão?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** Identificar um problema recorrente do código, escolher um padrão que o resolva (ou justificar que nenhum serve) e aplicá-lo sem alterar o comportamento da API. O problema escolhido foi o SQL misturado à regra de negócio nos services, já apontado na análise da Sprint 4 (`T-17`).

**Resultado efetivamente alcançado:** Padrão **Repository** aplicado: cinco repositories em `src/back/src/repositories/`, e os dois services passaram de 11 instruções SQL para 0. O comportamento externo foi preservado: 18 testes de caracterização passam no código da Sprint 4 e no código novo; a suíte final tem 39 testes. **Pendente:** conferir o fluxo contra o MySQL real (ver §4) e preencher links de Issue, commit e tag. Não foram tratados `T-15` e `T-16`.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/padroes/padroes-de-projeto.md`, padrão selecionado, contexto, participantes, alternativas e evidência no código.

- [x] Problema descrito antes do padrão ([§1](../padroes/padroes-de-projeto.md#1-problema-recorrente-identificado)).
- [x] Participantes do padrão mapeados para arquivos reais ([§5](../padroes/padroes-de-projeto.md#5-evidência-no-código)).
- [x] Alternativas e justificativa registradas, incluindo não usar padrão ([§2](../padroes/padroes-de-projeto.md#2-alternativas-consideradas)).
- [x] Benefícios e trade-offs explicados no contexto do projeto ([§7](../padroes/padroes-de-projeto.md#7-benefícios-custos-e-limitações)).
- [x] Testes automatizados preservam o comportamento esperado (`npm test`). O roteiro manual contra o MySQL real ainda precisa ser repetido e registrado.

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/padroes/padroes-de-projeto.md` | [link](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/padroes/padroes-de-projeto.md) | Documento central do padrão: problema, alternativas, estrutura, evidência, comparação e limitações. |
| `docs/projeto/decisoes-de-projeto.md` | [link](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/padroes/padroes-de-projeto.md) | Nova `DP-04`; análise de acoplamento e melhorias atualizadas. |
| `docs/modelagem/modelagem.md` | [link](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/modelagem/modelagem.md) | Diagrama de classes com a camada `Repositories`; §5, §6 e §7 atualizadas. |
| `docs/backlog-produto.md` e `docs/rastreabilidade.md` | [link](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/backlog-produto.md) | `T-17` e `T-18`; links dos requisitos para `DP-04`, `PP-01` e os repositories. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Implementação ou refatoração de ao menos um padrão pertinente, vinculada a Issue/PR e demonstrável.

### O que foi implementado ou evoluído

Refatoração com o padrão Repository, sem mudar a API. Cadastro de doador (`RF-01`), cadastro de instituição (`RF-02`), login (`RF-03`) e promessa de doação (`RF-19`, `RNF-06`) continuam com o mesmo comportamento, agora com o SQL concentrado em `src/back/src/repositories/`. Detalhes e comparação antes × depois em [`padroes-de-projeto.md`](../padroes/padroes-de-projeto.md#6-comparação-entre-a-situação-anterior-e-a-solução-adotada).

### Como executar e verificar

```bash
cd src/back
npm install
npm test        # 39 testes, sem MySQL
```

Verificação manual (pendente): com o MySQL no ar e o `.env` preenchido, rodar `npm start` e repetir o roteiro de [`docs/evidencias/`](../evidencias/README.md) (cadastro de doador, cadastro de instituição com necessidades, login, `POST /doacoes`), conferindo `necessidades.quantidadeFaltante` no banco. Registrar as capturas em `docs/evidencias/sprint-05/`.

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| `RF-01`–`RF-03` · `T-17` | [authService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js) e [repositories](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/src/repositories) | `npm test`, `caracterizacao.test.js` |
| `RF-19`, `RNF-06` · `T-17` | [doacaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/doacaoService.js) e  [repositories](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/src/repositories) | `npm test`, `caracterizacao.test.js` e `services.test.js` |
| `T-18` | [tests](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/tests) | Saída do `npm test` e roteiro manual `[a registrar]` |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| [T-17](https://github.com/gigi-zacaroni/tp-eng-software/issues/25) | Implementar o padrão Repository nos services | @gigi-zacaroni | Services sem SQL; API com o mesmo comportamento; `DP-04` registrada | Implementada, aguarda revisão  |
|  [T-18](https://github.com/gigi-zacaroni/tp-eng-software/issues/26) | Validar o padrão: testes automatizados e roteiro manual com MySQL | @gigi-zacaroni | `npm test` verde; capturas do fluxo real em `docs/evidencias/sprint-05/` | Parcial: testes feitos, roteiro manual pendente |


### Acompanhamento

- **GitHub Project:** [Quadro Kanban](https://github.com/users/gigi-zacaroni/projects/1)
- **Reuniões/decisões:** [ata_reuniao](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/reunioes/2026-10-20-planejamento-sprint_5.md)
- **Impedimentos:**  Divergência de agendas 
- **Mudanças de escopo:** `T-15` e `T-16`, previstos para a Sprint 5 na análise da Sprint 4, ficaram fora para concentrar a sprint em um padrão bem aplicado e testado. `T-18` foi criado para a validação.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [T-17](https://github.com/gigi-zacaroni/tp-eng-software/issues/25) ·  [T-18](https://github.com/gigi-zacaroni/tp-eng-software/issues/26) | Problema, decisão e validação do padrão. |
| Pull Request |  N/A (commits feitos direto na main) | Revisão por outro integrante (Definition of Done). |
| Commit | [link](https://github.com/johnatan-si/tp-eng-software/commit/fa515a9f36ab5306bf0011052301527ba26fae87) | Introdução dos repositories e refatoração dos services. |
| Código/arquivo | [`src/back/src/repositories/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/src/repositories) | Implementação do padrão. |
| Teste/captura/relatório | [`src/back/tests/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/tests) | Testes automatizados; capturas do fluxo manual `[a registrar]`. |
| Comparação antes × depois | [`sprint-04...sprint-05`](https://github.com/gigi-zacaroni/tp-eng-software/compare/sprint-04...sprint-05) | Diff da refatoração. |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-01`–`RF-03`, `RF-14`, `RF-18`, `RF-19` | `T-17`, `T-18` | [`DP-04`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/projeto/decisoes-de-projeto.md) · [`PP-01`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/padroes/padroes-de-projeto.md) | [`repositories/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/src/repositories) | [`tests/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05/src/back/tests) (automatizados e manuais : [login](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/evidencias/login.jpeg) , [doacoes](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/evidencias/doa%C3%A7%C3%B5es.jpeg) , [cadastro](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/evidencias/cadastro_instituicoes.jpeg) |

## 7. Revisão do incremento

- **O que foi demonstrado:** A refatoração estrutural do backend utilizando o padrão Repository, removendo completamente o SQL direto de dentro dos *services* e centralizando-o em 5 repositories dedicados (`doacaoRepository`, `doadorRepository`, `instituicaoRepository`, `necessidadeRepository` e `usuarioRepository`).
- **Critérios atendidos:** Aplicação correta do padrão de projeto documentado em `DP-04` e `PP-01`, preservação integral do comportamento externo da API atestada por 39 testes automatizados com sucesso, e documentação de modelagem e decisões atualizada.
- **Itens não concluídos:** A execução do roteiro de validação manual conectado ao banco MySQL real e o registro das capturas de tela correspondentes em `docs/evidencias/sprint-05/`. As tarefas `T-15` e `T-16` também foram postergadas.
- **Motivo das pendências:** Foco estratégico em garantir a robustez da refatoração arquitetural, a criação correta dos repositórios e a cobertura da suíte de testes automatizados, priorizando a qualidade do código base antes da validação de ambiente integrado.
- **Feedback recebido e ajustes:** Alinhamento contínuo com a equipe e com a revisora da entrega (Karol Guimarães) para assegurar o desacoplamento adequado das camadas e a clareza do código refatorado.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** A separação clara de responsabilidades proporcionada pelo padrão Repository, que deixou o código dos *services* muito mais limpo, legível e fácil de manter. A suíte com 39 testes automatizados deu total segurança de que a refatoração não alterou o comportamento esperado da aplicação.
- **Precisa melhorar:** O gerenciamento do tempo para garantir a execução em paralelo do roteiro de validação manual com o MySQL real, evitando deixar pendências de evidências visuais no fechamento da sprint.
- **Ação concreta para a próxima sprint:** Concluir e registrar formalmente as validações manuais com o banco de dados logo no início da próxima etapa, garantindo que todas as evidências de execução fiquem completas.

## 9. O que não será considerado suficiente

- Copiar definição teórica de padrão.
- Forçar padrão sem necessidade.
- Apresentar diagrama sem código correspondente.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-05`:** [link](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-05)
- **Este arquivo na tag:** [link](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-05/docs/sprints/sprint-05.md)
- **Observação adicional:** `[quando necessária]`

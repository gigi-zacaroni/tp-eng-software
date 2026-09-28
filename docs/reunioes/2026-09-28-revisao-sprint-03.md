# Reunião — Revisão do incremento e fechamento da Sprint 3

- **Data:** 28/09/2026
- **Participantes:** Geovana Oliveira Zacaroni (@gigi-zacaroni), Maria Luiza Pestana (@Malupestana), Karol Guimarães (@KarolGSMiranda), Arthur Veiga (@ArtJamis1208)
- **Sprint:** 3 — Modelagem e rastreabilidade dos requisitos
- **Objetivo:** revisar o incremento do back-end contra os modelos produzidos na sprint, verificar a correspondência entre o que os diagramas afirmam e o que o código faz, e decidir o que fica registrado como pendência.

## Decisões

1. **Tratar a promessa de doação sob transação com bloqueio de linha.** Ao revisar o fluxo do `RF-19` contra o modelo comportamental, constatou-se que dois doadores simultâneos poderiam prometer quantidades que, somadas, excederiam o saldo da necessidade — o `RNF-06` seria violado sem que nenhuma das requisições, isoladamente, parecesse inválida. Decidiu-se envolver a leitura e a escrita numa única transação com `SELECT ... FOR UPDATE` sobre a necessidade, e acrescentar `CHECK (quantidadeFaltante <= quantidadeTotal)` no schema como última barreira, para que a regra valha mesmo se outro cliente escrever no banco. Implementado em [`src/back/src/routes/doacoes.js`](../../src/back/src/routes/doacoes.js).

2. **Corrigir a correspondência entre modelo e código em vez de deixá-la desatualizada.** A reorganização do back-end em [`d72574c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d72574c4cf49a529badbd6d8858ceec19492998f) renomeou ou removeu arquivos que a seção de correspondência do documento de modelagem ainda citava. Decidiu-se reescrever a seção com os caminhos reais e, além disso, acrescentar uma **tabela explícita de divergências conhecidas** entre o que o modelo afirma e o que o código faz — em vez de ajustar silenciosamente o diagrama para casar com o código. As três divergências registradas são: `dataPromessa` presente no modelo e ausente no schema em uso; `INSTITUICAO` sem causa, cidade e contato; e as arestas de consulta sem código correspondente. Ver [§5 de `modelagem.md`](../modelagem/modelagem.md#5-correspondência-entre-modelo-e-código).

3. **Reconhecer a ausência dos endpoints de consulta como lacuna da sprint, não como escopo futuro.** A revisão evidenciou que a API implementa apenas escrita: não há como listar instituições nem descobrir necessidades, de modo que as arestas 10 a 14 do modelo comportamental não têm código. Como isso deixa o produto sem a funcionalidade que resolve seu problema central, decidiu-se registrar o item como prioritário para a Sprint 4, e não apenas como continuação natural do trabalho — [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20).

4. **Registrar a mudança de stack no backlog e no `README.md`.** A [decisão 5 da ata de 12/09](2026-09-12-refinamento-requisitos.md) havia fixado Next.js/React e Java/Spring Boot, mas a implementação foi feita em Node.js/Express com MySQL. Decidiu-se tratar isso como mudança de escopo registrável: nenhum requisito muda, mas a documentação não pode continuar descrevendo um stack que não existe no repositório.

5. **Não marcar nenhuma história de usuário como concluída.** Embora `RF-01`, `RF-03`, `RF-04` e `RF-19` estejam operacionais com evidência de execução, nenhuma história passou por revisão de par nem tem interface que a exercite. Decidiu-se criar os estados `Implementada (back-end)` e `Implementada parcialmente` no backlog, em vez de forçar as histórias para `Concluída` ou mantê-las em `Especificada` — o primeiro seria falso, o segundo esconderia o avanço.

6. **Abrir Issues retroativas para o trabalho da sprint.** A modelagem e a implementação estavam sendo acompanhadas informalmente sob as Issues das histórias de usuário, o que misturava especificação com execução. Decidiu-se criar [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15) a [#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) com critérios de conclusão próprios, registrando no corpo de cada uma que foram abertas no fechamento da sprint.

7. **Adotar branch e Pull Request a partir da Sprint 4.** Todo o código desta sprint entrou direto na `main`, contrariando o fluxo de [`CONTRIBUTING.md`](../../CONTRIBUTING.md) — é a razão pela qual nenhuma história atende à Definition of Done. Decidiu-se usar [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) como piloto do fluxo completo na próxima sprint, por ser um item pequeno e bem delimitado.

## Impedimentos

- Nenhum impedimento externo. A dificuldade interna foi a duplicação de esforço no back-end: houve duas tentativas paralelas de implementação (26/09 e 27/09) antes da consolidação em `src/back/` no dia 28. Isso consumiu parte da sprint e deixou um arquivo órfão no repositório, registrado em [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19).

## Evidências complementares

- [`docs/modelagem/modelagem.md`](../modelagem/modelagem.md) — artefato central revisado nesta reunião
- [`docs/sprints/sprint-03.md`](../sprints/sprint-03.md) — registro da sprint, com a tabela de pendências na seção 7
- [`docs/evidencias/`](../evidencias/) — capturas da execução dos endpoints usadas na revisão
- [GitHub Project — ConectaAção](https://github.com/users/gigi-zacaroni/projects/1)

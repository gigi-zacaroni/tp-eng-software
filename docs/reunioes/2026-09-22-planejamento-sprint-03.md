# Reunião — Planejamento da Sprint 3

- **Data:** 22/09/2026
- **Participantes:** Geovana Oliveira Zacaroni (@gigi-zacaroni), Maria Luiza Pestana (@Malupestana), Arthur Veiga (@ArtJamis1208)
- **Sprint:** 3 — Modelagem e rastreabilidade dos requisitos
- **Objetivo:** definir quais modelos seriam produzidos, dividir o trabalho entre os integrantes e decidir o que entraria como incremento da aplicação.

> O fechamento da sprint não teve reunião presencial: foi conduzido por mensagem em 28/09, e está registrado [ao final deste documento](#fechamento-da-sprint--28092026-por-mensagem).

## Decisões do planejamento

1. **Produzir dois modelos: um comportamental e um estrutural.** O [mapa das entregas](../sprints/README.md) pede modelos estrutural e comportamental, sem fixar o tipo de diagrama. O grupo decidiu por um **fluxo de doação** como comportamental — por ser o processo que dá nome ao produto e o único que atravessa os dois perfis de usuário — e um **modelo entidade-relacionamento do domínio** como estrutural, por ser onde a regra de integridade mais sensível do sistema (`RNF-06`, o saldo de uma necessidade) precisa ser decidida. Ambos em **Mermaid**, versionados no repositório, em vez de imagem exportada de ferramenta externa: o GitHub renderiza o diagrama e o diff fica legível quando o modelo mudar.

2. **Dividir o trabalho de modelagem entre os integrantes.** Maria Luiza ficou com o modelo estrutural e a tradução dele para o schema do banco; Geovana, com o modelo comportamental; Arthur, com a revisão final dos dois modelos e a conferência do arquivo da sprint. A divisão permitiu que as duas frentes avançassem em paralelo a partir de 24/09.

3. **Trocar o stack para Node.js/Express + MySQL.** A [decisão 5 da ata de 12/09](2026-09-12-refinamento-requisitos.md) havia fixado Next.js/React no front e Java/Spring Boot no back, mas nenhuma linha havia sido escrita nesse stack — a decisão fora tomada olhando o protótipo, não o código. Com duas semanas até a entrega e a necessidade de demonstrar correspondência entre modelo e código, o grupo optou por **Node.js/Express com MySQL**, que já dominava, mantendo o front em HTML/CSS. Nenhum requisito é alterado por essa decisão: ela troca a tecnologia, não o comportamento especificado.

4. **Implementar o back-end como incremento, indo além do mínimo exigido.** A Sprint 3 pede apenas "código coerente com ao menos um modelo". O grupo decidiu implementar o fluxo **cadastro → login → promessa de doação**, que corresponde ao caminho principal do modelo comportamental, para que a correspondência entre modelo e código pudesse ser demonstrada por execução real — chamando cada endpoint e conferindo o efeito no banco — e não apenas por uma tabela de equivalências.

## Fechamento da sprint — 28/09/2026, por mensagem

O grupo não voltou a se reunir presencialmente. A revisão do incremento e o fechamento da sprint foram conduzidos **de forma assíncrona, por troca de mensagens em 28/09/2026**, com a participação dos quatro integrantes: Geovana Oliveira Zacaroni (@gigi-zacaroni), Maria Luiza Pestana (@Malupestana), Karol Guimarães (@KarolGSMiranda) e Arthur Veiga (@ArtJamis1208).

As decisões tomadas nessa conversa estão registradas nos documentos que elas afetaram, e não repetidas aqui:

| Decisão | Onde está registrada |
|---|---|
| Tratar a promessa de doação sob transação com `SELECT ... FOR UPDATE`, após identificar o risco de duas promessas simultâneas excederem o saldo (`RNF-06`) | [`sprint-03.md` §7 — Feedback recebido](../sprints/sprint-03.md#7-revisão-do-incremento) |
| Registrar as divergências entre modelo e código numa tabela explícita, em vez de ajustar o diagrama para casar com o código | [`modelagem.md` §5](../modelagem/modelagem.md#5-correspondência-entre-modelo-e-código) |
| Reconhecer a ausência de endpoints de consulta como lacuna da sprint, e não como continuação natural do trabalho | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) · [`modelagem.md` §6](../modelagem/modelagem.md#6-refinamentos-identificados) |
| Não marcar nenhuma história como concluída, criando os estados `Implementada (back-end)` e `Implementada parcialmente` | [`backlog-produto.md` §4](../backlog-produto.md#4-visão-resumida-do-backlog) |
| Abrir Issues retroativas para o trabalho da sprint, separando especificação de execução | [#15](https://github.com/gigi-zacaroni/tp-eng-software/issues/15)–[#18](https://github.com/gigi-zacaroni/tp-eng-software/issues/18) |
| Adotar branch e Pull Request a partir da Sprint 4, usando [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) como piloto | [`sprint-03.md` §8](../sprints/sprint-03.md#8-retrospectiva-e-próxima-sprint) |

> O formato assíncrono foi o possível no dia da entrega, mas tem limite: não houve momento em que os quatro examinassem o código junto. A ação correspondente está na retrospectiva da sprint.

## Impedimentos

- Nenhum impedimento externo registrado no planejamento.
- No fechamento, a dificuldade apontada foi a duplicação de esforço no back-end: houve duas tentativas paralelas de implementação (26/09 e 27/09) antes da consolidação em `src/back/` no dia 28, o que consumiu parte da sprint e deixou um arquivo órfão no repositório ([#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19)).

## Evidências complementares

- [`docs/sprints/README.md`](../sprints/README.md) — mapa das entregas, usado para delimitar o escopo da sprint
- [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md) — base para escolher quais requisitos os modelos cobririam
- [`docs/sprints/sprint-03.md`](../sprints/sprint-03.md) — registro do resultado da sprint, incluindo a revisão do incremento na seção 7
- [GitHub Project — ConectaAção](https://github.com/users/gigi-zacaroni/projects/1)

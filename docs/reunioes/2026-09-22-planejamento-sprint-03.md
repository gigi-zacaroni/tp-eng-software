# Reunião — Planejamento da Sprint 3

- **Data:** 22/09/2026
- **Participantes:** Geovana Oliveira Zacaroni (@gigi-zacaroni), Maria Luiza Pestana (@Malupestana), Arthur Veiga (@ArtJamis1208)
- **Sprint:** 3 — Modelagem e rastreabilidade dos requisitos
- **Objetivo:** definir quais modelos seriam produzidos, dividir o trabalho entre os integrantes e decidir o que entraria como incremento da aplicação.

## Decisões

1. **Produzir dois modelos: um comportamental e um estrutural.** O [mapa das entregas](../sprints/README.md) pede modelos estrutural e comportamental, sem fixar o tipo de diagrama. O grupo decidiu por um **fluxo de doação** como comportamental — por ser o processo que dá nome ao produto e o único que atravessa os dois perfis de usuário — e um **modelo entidade-relacionamento do domínio** como estrutural, por ser onde a regra de integridade mais sensível do sistema (`RNF-06`, o saldo de uma necessidade) precisa ser decidida. Ambos em **Mermaid**, versionados no repositório, em vez de imagem exportada de ferramenta externa: o GitHub renderiza o diagrama e o diff fica legível quando o modelo mudar.

2. **Dividir o trabalho de modelagem entre os integrantes.** Maria Luiza ficou com o modelo estrutural e a tradução dele para o schema do banco; Geovana, com o modelo comportamental; Arthur, com a revisão final dos dois modelos e a conferência do arquivo da sprint. A divisão permitiu que as duas frentes avançassem em paralelo a partir de 24/09.

3. **Trocar o stack para Node.js/Express + MySQL.** A [decisão 5 da ata de 12/09](2026-09-12-refinamento-requisitos.md) havia fixado Next.js/React no front e Java/Spring Boot no back, mas nenhuma linha havia sido escrita nesse stack — a decisão fora tomada olhando o protótipo, não o código. Com duas semanas até a entrega e a necessidade de demonstrar correspondência entre modelo e código, o grupo optou por **Node.js/Express com MySQL**, que já dominava, mantendo o front em HTML/CSS. Nenhum requisito é alterado por essa decisão: ela troca a tecnologia, não o comportamento especificado.

4. **Implementar o back-end como incremento, indo além do mínimo exigido.** A Sprint 3 pede apenas "código coerente com ao menos um modelo". O grupo decidiu implementar o fluxo **cadastro → login → promessa de doação**, que corresponde ao caminho principal do modelo comportamental, para que a correspondência entre modelo e código pudesse ser demonstrada por execução real — chamando cada endpoint e conferindo o efeito no banco — e não apenas por uma tabela de equivalências.

## Impedimentos

- Nenhum impedimento externo registrado no planejamento.

## Evidências complementares

- [`docs/sprints/README.md`](../sprints/README.md) — mapa das entregas, usado para delimitar o escopo da sprint
- [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md) — base para escolher quais requisitos os modelos cobririam
- [`docs/sprints/sprint-03.md`](../sprints/sprint-03.md) — registro do resultado da sprint, incluindo a revisão do incremento na seção 7
- [GitHub Project — ConectaAção](https://github.com/users/gigi-zacaroni/projects/1)

# Reunião — Refinamento de requisitos e validação do protótipo

- **Data e horário:** 12/09/2026, 19h30 — 21h00
- **Participantes:** Geovana Oliveira Zacaroni (@gigi-zacaroni), Maria Luiza Pestana (@Malupestana), Karol Guimarães (@KarolGSMiranda), Arthur Veiga (@ArtJamis1208)
- **Sprint:** 2 — Requisitos e escopo validável da solução
- **Objetivo:** revisar o documento de requisitos, percorrer o protótipo navegável em conjunto e decidir o que entra no escopo da primeira versão.

## Decisões

1. **Refinar "demonstrar interesse em ajudar" para um fluxo verificável.** O escopo da Sprint 1 descrevia a ação do doador de forma vaga, sem comportamento testável. O grupo decidiu substituí-la pelo ciclo **prometer doação → acompanhar até a entrega** (`RF-19`–`RF-21`), com os status Prometida → A caminho → Entregue (`RN-03`).

2. **Incluir favoritos e central de notificações no escopo.** Ambas surgiram ao percorrer o protótipo: favoritos (`RF-12`, `RF-13`) apoia a recorrência de uso, e as notificações (`RF-25`–`RF-27`) são o que avisa a instituição de que há uma doação a caminho. Prioridades definidas como Baixa e Média, respectivamente.

3. **Reescrever os requisitos não funcionais com condições mensuráveis.** A primeira versão trazia formulações como "interface simples e rápida", que o grupo considerou não verificáveis. Foram substituídas por métricas: no máximo 3 passos no fluxo de doação (`RNF-01`), faixa de 390 px a 1440 px com alvos de toque de 44 px (`RNF-02`) e carregamento da listagem em até 2 segundos (`RNF-08`).

4. **Separar a landing page pública da listagem protegida.** O `RF-05` restringia o conteúdo a usuários autenticados, mas a landing precisa ser pública para atrair doadores. Decidiu-se separar `RF-06` (landing pública) de `RF-07` (listagem protegida), mantendo os dados de contato das instituições restritos (`RNF-04`, `RN-01`).

5. **Adotar o protótipo navegável como incremento da sprint.** Como a modelagem (Sprint 3) e as decisões de projeto (Sprint 4) ainda não ocorreram, o grupo optou pela alternativa do protótipo em vez de código, confirmando o stack da aplicação real: **Next.js/React** no front e **Java/Spring Boot** no back.

6. **Registrar as lacunas do protótipo em vez de corrigi-las.** Ao percorrer os critérios de aceitação contra o protótipo, quatro não passaram: o limite de quantidade na doação (`US-08` CA-2), a devolução do saldo ao cancelar (`US-09` CA-3), a ocultação da necessidade pausada (`US-05` CA-3) e o selo "Verificada" condicionado (`RF-11`). Como o protótipo é descartável, decidiu-se **documentá-las como pendências da implementação**, no corpo das Issues e na seção 7 do arquivo da sprint.

7. **Padronizar o estado das onze histórias como `Especificada`.** O objetivo da sprint foi especificar o escopo completo, e todas as histórias passaram pelo mesmo ciclo de refinamento e validação. O acompanhamento por sprint ficará no [GitHub Project](https://github.com/users/gigi-zacaroni/projects/1), e não em milestones — as Issues carregam o título, a história com os critérios de aceitação e a label de prioridade.

## Tarefas e responsáveis

| Tarefa/Issue | Responsável | Prazo |
|---|---|---|
| Finalizar `docs/requisitos/requisitos.md` com atores, RF, RNF, regras e histórias | @KarolGSMiranda | 13/09/2026 |
| Concluir o protótipo navegável e documentar o vínculo tela → requisito | @gigi-zacaroni | 14/09/2026 |
| Revisar os critérios de aceitação das onze Issues | @ArtJamis1208 | 13/09/2026 |
| Atualizar `docs/visao-geral.md` e `docs/backlog-produto.md` com o escopo refinado | @Malupestana | 14/09/2026 |
| Aplicar a label de prioridade e o bloco de demonstração no protótipo nas Issues [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2)–[#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | @KarolGSMiranda | 14/09/2026 |

## Impedimentos

- Nenhum impedimento externo. A dificuldade interna foi transformar requisitos não funcionais em condições mensuráveis — tratada na decisão 3.

## Evidências complementares

- [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md) — documento revisado nesta reunião
- [`docs/prototipo/README.md`](../prototipo/README.md) — roteiro usado para percorrer os critérios de aceitação
- [GitHub Project — ConectaAção](https://github.com/users/gigi-zacaroni/projects/1) — acompanhamento decidido no item 7

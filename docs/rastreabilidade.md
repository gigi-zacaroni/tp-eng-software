# Matriz de rastreabilidade

> Atualize esta tabela ao longo do semestre. Células vazias devem ser justificadas; não invente links ou evidências.

**Estado em: Sprint 2 (14/09/2026).** As colunas *Modelo*, *Decisão/padrão*, *Caso de teste* e *Resultado/evidência* ainda não se aplicam — a modelagem é o artefato da Sprint 3, as decisões de projeto da Sprint 4 e os testes da Sprint 7. A coluna *Código* registra, nesta etapa, a **tela do protótipo navegável** que demonstra o requisito, conforme [`docs/prototipo/README.md`](prototipo/README.md).

Legenda da situação: **Especificado** — requisito identificado, com critério de aceitação e fluxo demonstrado no protótipo. **Especificado (parcial)** — o protótipo não demonstra integralmente o critério; a lacuna está registrada na [seção 7 do arquivo da Sprint 2](sprints/sprint-02.md). **Planejado** — sem demonstração no protótipo, previsto para a implementação.

## Requisitos funcionais

| Requisito | História/Issue | Modelo | Decisão/padrão/arquitetura | Código (protótipo na Sprint 2) | Caso de teste | Resultado/evidência | Situação final |
|---|---|---|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) — `US-01` | Sprint 3 | Sprint 4 | `cadDoador` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) — `US-02` | Sprint 3 | Sprint 4 | `cadInst` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-03` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | Sprint 3 | Sprint 4 | `login` | Sprint 7 | [Roteiro `US-03`](prototipo/README.md#us-03-ca-3--acesso-protegido-rf-05-rn-01) | Especificado |
| `RF-04` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | Sprint 3 | Sprint 4 | ação "Sair" no cabeçalho | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-05` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | Sprint 3 | Sprint 4 | guardas nas telas protegidas | Sprint 7 | [Roteiro `US-03`](prototipo/README.md#us-03-ca-3--acesso-protegido-rf-05-rn-01) | Especificado |
| `RF-06` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | Sprint 3 | Sprint 4 | `landing` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-07` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | Sprint 3 | Sprint 4 | `listagem` | Sprint 7 | [Roteiro `US-04`](prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) | Especificado |
| `RF-08` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | Sprint 3 | Sprint 4 | busca em `listagem` | Sprint 7 | [Roteiro `US-04`](prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) | Especificado |
| `RF-09` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | Sprint 3 | Sprint 4 | filtros em `listagem` | Sprint 7 | [Roteiro `US-04`](prototipo/README.md#us-04-ca-2-e-ca-3--busca-e-estado-vazio-rf-08-rf-09) | Especificado |
| `RF-10` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | Sprint 3 | Sprint 4 | `detalhe` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-11` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | Sprint 3 | Sprint 4 | selo em `detalhe` (ilustrativo) | Sprint 7 | [Limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) | Especificado (parcial) |
| `RF-12` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | Sprint 3 | Sprint 4 | ação favoritar em `detalhe`/`listagem` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-13` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | Sprint 3 | Sprint 4 | `favoritos` | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-14` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | Sprint 3 | Sprint 4 | `painel` → formulário de necessidade | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-15` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | Sprint 3 | Sprint 4 | `painel` → editar necessidade | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-16` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | Sprint 3 | Sprint 4 | `painel` → excluir necessidade | Sprint 7 | [Roteiro `US-07`](prototipo/README.md#us-07-ca-3--excluir-necessidade-preserva-doações-rf-16-rnf-07) | Especificado |
| `RF-17` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | Sprint 3 | Sprint 4 | situação Aberta/Pausada no formulário | Sprint 7 | [Limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) | Especificado (parcial) |
| `RF-18` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | Sprint 3 | Sprint 4 | barras de progresso em `detalhe` e `painel` | Sprint 7 | [Roteiro `US-05`/`US-10`](prototipo/README.md#us-05-ca-1--us-10-ca-2-e-ca-3--progresso-e-confirmação-rf-18-rf-23-rn-04-rn-05) | Especificado |
| `RF-19` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | Sprint 3 | Sprint 4 | modal de doação → `confirmacao` | Sprint 7 | [Roteiro `US-08`](prototipo/README.md#us-08-ca-1-e-rnf-01--doar-em-3-passos-rf-19) | Especificado (parcial) |
| `RF-20` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | Sprint 3 | Sprint 4 | `minhasDoacoes` | Sprint 7 | [Roteiro `US-09`](prototipo/README.md#us-09-ca-2-e-ca-4--avançar-e-cancelar-rf-20-rf-21-rn-03) | Especificado |
| `RF-21` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | Sprint 3 | Sprint 4 | ação cancelar em `minhasDoacoes` | Sprint 7 | [Limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) | Especificado (parcial) |
| `RF-22` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | Sprint 3 | Sprint 4 | `painel` → Doações a receber | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-23` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | Sprint 3 | Sprint 4 | ação "Marcar recebida" | Sprint 7 | [Roteiro `US-10`](prototipo/README.md#us-05-ca-1--us-10-ca-2-e-ca-3--progresso-e-confirmação-rf-18-rf-23-rn-04-rn-05) | Especificado |
| `RF-24` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | Sprint 3 | Sprint 4 | `painel` → Resumo por necessidade | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-25` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | Sprint 3 | Sprint 4 | sino de notificações | Sprint 7 | [Roteiro `US-11`](prototipo/README.md#us-11-ca-1-e-ca-2--notificações-rf-25-rf-27) | Especificado |
| `RF-26` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | Sprint 3 | Sprint 4 | sino de notificações (perfil doador) | Sprint 7 | [Mapa de telas](prototipo/README.md#4-mapa-tela--requisito--história) | Especificado |
| `RF-27` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | Sprint 3 | Sprint 4 | dropdown + contador de não lidas | Sprint 7 | [Roteiro `US-11`](prototipo/README.md#us-11-ca-1-e-ca-2--notificações-rf-25-rf-27) | Especificado |

## Requisitos não funcionais

| Requisito | História/Issue | Como será verificado | Situação na Sprint 2 |
|---|---|---|---|
| `RNF-01` — doação em no máximo 3 passos | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Contagem de passos no fluxo | **Atendido no protótipo:** item → quantidade → confirmação ([roteiro](prototipo/README.md#us-08-ca-1-e-rnf-01--doar-em-3-passos-rf-19)) |
| `RNF-02` — 390 px a 1440 px, toque ≥ 44 px | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5)–[#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Emulação de dispositivos no navegador | Planejado — verificação sistemática na implementação |
| `RNF-03` — senhas com hash (bcrypt) | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | Inspeção do banco e do código de autenticação | Planejado — depende do back-end |
| `RNF-04` — contato visível só a autenticados | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Acesso ao detalhe sem login | **Atendido no protótipo:** `detalhe` é tela protegida |
| `RNF-05` — nenhum dado de pagamento | — (restrição de escopo) | Revisão de telas e formulários | **Atendido:** nenhum formulário do protótipo coleta dado de pagamento |
| `RNF-06` — prometido + recebido ≤ desejado | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Teste de limite no fluxo de doação | **Não atendido no protótipo** — ver [limitações](prototipo/README.md#6-limitações-conhecidas-do-protótipo) |
| `RNF-07` — excluir necessidade preserva doações | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Exclusão de necessidade com doação associada | **Atendido no protótipo** ([roteiro](prototipo/README.md#us-07-ca-3--excluir-necessidade-preserva-doações-rf-16-rnf-07)) |
| `RNF-08` — listagem carrega em até 2 s | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Medição no navegador | Planejado — exige volume representativo |
| `RNF-09` — Chrome, Firefox e Edge | — (aplica-se a todo o produto) | Teste manual multi-navegador | Planejado |
| `RNF-10` — foco visível, contraste e teclado | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Checklist WCAG básico e navegação sem mouse | Planejado — checklist previsto para a Sprint 7 |

## Como preencher

- **Requisito:** identificador existente em `docs/requisitos/requisitos.md`.
- **História/Issue:** link direto para a Issue no GitHub.
- **Modelo:** seção, diagrama ou arquivo que representa o requisito.
- **Decisão/padrão/arquitetura:** identificador da decisão técnica pertinente.
- **Código:** link para o arquivo ou diretório na tag da sprint.
- **Caso de teste:** identificador definido no plano de testes.
- **Resultado/evidência:** relatório, captura, log ou execução documentada.
- **Situação final:** atendido, parcialmente atendido, não atendido ou retirado do escopo com justificativa.

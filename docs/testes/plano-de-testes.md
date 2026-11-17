# Plano de testes

> Artefato central da Sprint 7. Responsáveis: Arthur Veiga (@ArtJamis1208) e Karol Guimarães (@KarolGSMiranda).
> Última atualização: 16/11/2026.

## 1. Objetivos e escopo

**Objetivo:** verificar que os fluxos já implementados cumprem os requisitos e não perdem dados quando algo falha.

**Dentro do escopo (fluxos implementados):**

| Fluxo | Requisitos |
|---|---|
| Cadastro de doador | `RF-01`, `RNF-03` |
| Cadastro de instituição com necessidades iniciais | `RF-02`, `RF-14` |
| Login de doador e de instituição | `RF-03` |
| Consulta de instituições (destaques, lista e detalhe) | `RF-06`, `RF-07`, `RF-10` |
| Promessa de doação limitada ao saldo | `RF-18`, `RF-19`, `RNF-06` |

**Fora do escopo neste ciclo:** favoritos, gestão de necessidades, acompanhamento de doações e notificações (`RF-12`, `RF-13`, `RF-15` a `RF-17`, `RF-20` a `RF-27`). Esses requisitos ainda não têm código. Os RNFs de interface (`RNF-02`, `RNF-08` a `RNF-10`) ficam para a Sprint 8.

## 2. Estratégia

| Nível | Objetivo | Ferramenta | Arquivo | Evidência |
|---|---|---|---|---|
| Unidade (repositories) | Conferir o SQL, os parâmetros e os retornos de cada repository. | `node:test` com dublê do `pool` | [`repositories.test.js`](../../src/back/tests/repositories.test.js) | Saída do `npm test` |
| Unidade (services) | Conferir as regras de negócio com os repositories substituídos por dublês. | `node:test` + `mock` | [`services.test.js`](../../src/back/tests/services.test.js) | Saída do `npm test` |
| Integração | Exercitar controller, service e repository juntos contra um banco em memória. | `node:test` + [`bancoFalso.js`](../../src/back/tests/helpers/bancoFalso.js) | [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) | Saída do `npm test` |
| Sistema (manual) | Percorrer o fluxo completo no navegador com MySQL real. | Roteiro manual | `CT-13` deste plano | Capturas em [`evidencias/`](evidencias/) |

Os testes automatizados não precisam de MySQL. O SQL real só é validado no teste de sistema.

## 3. Riscos e prioridades

| Risco | Probabilidade | Impacto | Prioridade | Requisitos | Casos |
|---|---|---|---|---|---|
| Doação acima do que falta na necessidade | Média | Alta | 1 | `RF-19`, `RNF-06` | `CT-08`, `CT-09` |
| Cadastro ou doação gravados pela metade após uma falha | Média | Alta | 1 | `RF-01`, `RF-02`, `RNF-06` | `CT-05`, `CT-10` |
| Senha gravada em texto puro | Baixa | Alta | 1 | `RNF-03` | `CT-01` |
| Login revela se o e-mail existe | Média | Média | 2 | `RF-03` | `CT-07` |
| E-mail duplicado ou dados inválidos aceitos | Média | Média | 2 | `RF-01`, `RF-02` | `CT-02` a `CT-04` |
| Consulta de instituições com dados errados | Baixa | Média | 3 | `RF-06`, `RF-07`, `RF-10` | `CT-11` |

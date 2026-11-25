# Sprint 6: Arquitetura e organização global da aplicação

- **Data de entrega:** 09/11/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-06`
- **Responsável por conferir este arquivo:** não registrado na época. As Issues da sprint ficaram com Karol Guimarães (@KarolGSMiranda).

## 1. Pergunta que esta sprint deve responder

**Como as partes principais da aplicação são organizadas, comunicam-se, executam e são implantadas?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** documentar a arquitetura global e ter a primeira comunicação funcional entre front-end, API e banco: rotas de consulta de instituições, front-end servido pela API, página inicial com destaques e login por perfil.

**Resultado alcançado:** o documento [`arquitetura.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/docs/arquitetura/arquitetura.md) foi criado com os diagramas de contexto, contêineres e componentes. A API ganhou `GET /instituicoes/destaques`, `GET /instituicoes` e `GET /instituicoes/:id`. O Express passou a servir o front-end, que ganhou a página inicial com destaques e o login de doador e instituição. A configuração do ambiente foi centralizada em `config/env.js`. A paginação e o teste com MySQL real ficaram pendentes.

## 3. Checklist do artefato central (0,75 ponto)

**Entrega esperada:** `docs/arquitetura/arquitetura.md`, com diagramas, componentes, responsabilidades, tecnologias, decisões e implantação.

- [x] Estilo arquitetural justificado.
- [x] Componentes ligados a diretórios reais.
- [x] Comunicação e dependências explicadas.
- [x] Requisitos não funcionais ligados a decisões arquiteturais.
- [x] Execução local documentada. Não houve ambiente publicado.

### Links dos artefatos

| Artefato | Link na tag | O que mudou |
|---|---|---|
| `arquitetura.md` | [tag `sprint-06`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/docs/arquitetura/arquitetura.md) | Criação do documento: estilo, diagramas, componentes, decisões DA-01 a DA-05, implantação e riscos. |
| `src/back/README.md` | [tag `sprint-06`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/src/back/README.md) | Variáveis de ambiente documentadas. |
| `backlog-produto.md` | [tag `sprint-06`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/docs/backlog-produto.md) | Itens `D-09`, `T-19` a `T-21` e `D-10`. |

## 4. Incremento da aplicação web (0,75 ponto)

### O que foi implementado

- Consulta de instituições pela API: destaques públicos, listagem e detalhe protegidos por token.
- Express servindo os arquivos do front-end na mesma origem da API, com as chamadas centralizadas em `js/api.js`.
- Página inicial com instituições em destaque carregadas da API.
- Login de doador e de instituição, com o cabeçalho adaptado ao perfil.
- Variáveis de ambiente carregadas só por `src/config/env.js`, usadas pela conexão MySQL e pelo JWT, e listadas no `.env.example`.

As telas desta sprint foram substituídas na entrega final pelo `app.js` (ver [`sprint-08.md`](sprint-08.md)).

### Validação

- Suíte da entrega principal: 47 testes aprovados, 8 deles novos.
- Validação da configuração (PR #32): 39 testes aprovados.
- Nenhum `.env` real foi enviado ao repositório.

### Como executar e verificar

```bash
cd src/back
npm install
npm test            # não precisa de MySQL
npm start           # com MySQL e .env preenchido
```

Abrir `http://localhost:3000`, e não o `index.html` pelo sistema de arquivos.

| Verificação | Requisito |
|---|---|
| A página inicial mostra as instituições do banco | `RF-06` |
| Login como doador e como instituição mostra o menu de cada perfil | `RF-03` |
| "Sair" volta o cabeçalho ao estado de visitante | `RF-04` |
| `GET /instituicoes` sem token responde 401 | `RF-05` |

### Pendências

- **Teste com MySQL real:** só foi feito com o banco em memória.
- **#20, critério de CORS:** deixou de ser necessário, porque o front é servido pela mesma origem (DA-05).
- **#20, critério de paginação:** não foi feito.
- **Banco sem causa e cidade:** os cards mostram nome, selo e resumo. Registrado como risco em `arquitetura.md`.

## 5. Scrum e gestão do trabalho (0,50 ponto)

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) `T-10` | Endpoints de consulta de instituições e necessidades | @KarolGSMiranda | `GET /instituicoes/destaques`, `GET /instituicoes` e `GET /instituicoes/:id` funcionando; consultas protegidas exigem token | Parcial: sem paginação. Concluída na Sprint 8. |
| [#27](https://github.com/gigi-zacaroni/tp-eng-software/issues/27) `T-19` | Front-end servido pela API e cliente HTTP único | @KarolGSMiranda | Express serve `src/front/`; `js/api.js` centraliza o `fetch` | Concluída |
| [#28](https://github.com/gigi-zacaroni/tp-eng-software/issues/28) `T-20` | Página inicial com instituições em destaque | @KarolGSMiranda | Destaques carregados da API, com tratamento de erro | Concluída |
| [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) `T-21` | Login de doador e instituição com cabeçalho por perfil | @KarolGSMiranda | Login funcionando e menu de acordo com o perfil | Concluída |
| [#30](https://github.com/gigi-zacaroni/tp-eng-software/issues/30) `D-09` | Documento de arquitetura | @KarolGSMiranda | `arquitetura.md` com camadas, comunicação e decisões | Concluída |

### Acompanhamento

- **GitHub Project:** [ConectaAção: Backlog](https://github.com/users/gigi-zacaroni/projects/1)
- **Reuniões:** não há ata desta sprint.
- **Impedimentos:** agendas divergentes.
- **Mudanças de escopo:** a paginação da #20 ficou fora.

## 6. GitHub, documentação e rastreabilidade (0,50 ponto)

| Evidência | Link | O que comprova |
|---|---|---|
| Issues | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20), [#27](https://github.com/gigi-zacaroni/tp-eng-software/issues/27), [#28](https://github.com/gigi-zacaroni/tp-eng-software/issues/28), [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29), [#30](https://github.com/gigi-zacaroni/tp-eng-software/issues/30) | Rotas de consulta, integração do front, página inicial, login e documento de arquitetura |
| Pull Requests | [#31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31), [#32](https://github.com/gigi-zacaroni/tp-eng-software/pull/32) | #31: rotas de consulta, integração, página inicial, login e arquitetura, com 47 testes. #32: configuração do ambiente, conexão MySQL e JWT. |
| Commits de merge | [`4f4c7d9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/4f4c7d9856ceb0e4357c33bbed5ba0959f343a8c), [`fb20b34`](https://github.com/gigi-zacaroni/tp-eng-software/commit/fb20b34ad99153e2b0a4eac909066bb9a645ad3e) | Os dois PRs foram aceitos |
| Código | [`src/front/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-06/src/front), [`routes/instituicoes.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/src/back/src/routes/instituicoes.js) | Implementação das Issues |
| Testes | [`src/back/tests/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-06/src/back/tests) | 47 testes aprovados |

### Rastreabilidade resumida

| Requisito | Issue | Decisão | Código na tag | Evidência |
|---|---|---|---|---|
| `RF-03` Login | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | DA-03 | `services/authService.js`, `front/js/login.js` | `services.test.js` |
| `RF-04` Encerrar sessão | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | DA-03 | `controllers/authController.js`, `front/js/api.js` | [PR #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RF-05` Acesso restrito | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | DA-03 | `middleware/autenticacao.js`, `routes/instituicoes.js` | [PR #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RF-06` Página inicial | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20), [#28](https://github.com/gigi-zacaroni/tp-eng-software/issues/28) | DA-02 | `front/js/landing.js`, `services/instituicaoService.js` | `services.test.js` |
| `RF-07` Listar instituições | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | DA-01 | `routes/instituicoes.js`, `services/instituicaoService.js`, `repositories/instituicaoRepository.js` | `repositories.test.js` |
| `RF-10` Detalhe | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | DA-01 | `controllers/instituicaoController.js`, `repositories/necessidadeRepository.js` | `services.test.js` |
| `RF-18` Progresso | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | DP-02 | `services/instituicaoService.js` | `services.test.js` |
| `RNF-04` Privacidade | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | DA-03 | `middleware/autenticacao.js` | [PR #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| Integração do front | [#27](https://github.com/gigi-zacaroni/tp-eng-software/issues/27) | DA-05 | `server.js`, `front/js/api.js` | [PR #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| Documento de arquitetura | [#30](https://github.com/gigi-zacaroni/tp-eng-software/issues/30) | | `docs/arquitetura/arquitetura.md` | [PR #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |

## 7. Revisão do incremento

- **O que foi demonstrado:** consulta de instituições pela API, página inicial com destaques, login por perfil, front-end servido pela API e documento de arquitetura.
- **Critérios atendidos:** rotas de consulta (menos a paginação), front na mesma origem, cliente HTTP único, destaques dinâmicos, login por perfil, arquitetura documentada e ambiente centralizado. Os testes automatizados passaram.
- **Itens não concluídos:** paginação de `GET /instituicoes` e teste com MySQL real.
- **Motivo:** a paginação ficou fora do escopo da sprint, e não havia MySQL configurado no ambiente de validação.
- **Feedback e ajustes:** servir o front pela mesma origem dispensou o CORS.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** a divisão de tarefas, a integração entre front e API e os testes automatizados.
- **Precisa melhorar:** testar com o banco real e registrar evidências durante a sprint.
- **Ação para a próxima sprint:** planejar os testes com MySQL e revisar os critérios de aceitação das Issues antes de começar.

## 9. O que não será considerado suficiente

- Somente lista de frameworks.
- Diagrama que não corresponde ao código.
- Confundir arquitetura global com padrão de projeto local.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-06`:** [tag `sprint-06`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-06)
- **Este arquivo na tag:** [`sprint-06.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/docs/sprints/sprint-06.md)

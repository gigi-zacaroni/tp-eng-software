# Sprint 6 — Arquitetura e organização global da aplicação

- **Data de entrega:** 09/11/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-06`
- **Responsável por conferir este arquivo:** `[PREENCHER]`

## 1. Pergunta que esta sprint deve responder

**Como as partes principais da aplicação são organizadas, comunicam-se, executam e são implantadas?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** `[PREENCHER]`

**Resultado efetivamente alcançado:** `[PREENCHER ao final da sprint]`

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/arquitetura/arquitetura.md`, diagramas, componentes, responsabilidades, tecnologias, decisões e implantação.

- [ ] Estilo arquitetural justificado.
- [ ] Componentes ligados a diretórios/serviços reais.
- [ ] Comunicação e dependências explicadas.
- [ ] Requisitos não funcionais relacionados a decisões arquiteturais.
- [ ] Execução local e, quando possível, ambiente publicado documentados.

### Links dos artefatos

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-03` – Login | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | [Arquitetura – DA-03 (JWT)](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [authService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js), [login.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/login.js) | [Testes](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RF-04` – Encerrar sessão | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | [Arquitetura – DA-03 (JWT)](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [authController.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/controllers/authController.js), [api.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/api.js), [cabecalho.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/cabecalho.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RF-05` – Acesso restrito a autenticados | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Arquitetura – DA-03](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [autenticacao.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/middleware/autenticacao.js), [instituicoes.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/instituicoes.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RF-06` – Landing page pública | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) e [#28](https://github.com/gigi-zacaroni/tp-eng-software/issues/28) | [Protótipo](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/docs/prototipo), [Arquitetura – DA-02](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [landing.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/landing.js), [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js) | [services.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RF-07` – Listar instituições | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Modelagem](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/modelagem/modelagem.md), [Arquitetura](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [instituicoes.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/instituicoes.js), [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js), [instituicaoRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/instituicaoRepository.js) | [repositories.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/repositories.test.js) |
| `RF-10` – Detalhe da instituição | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Modelagem](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/modelagem/modelagem.md), [Arquitetura](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [instituicaoController.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/controllers/instituicaoController.js), [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js), [necessidadeRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/necessidadeRepository.js) | [services.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RF-18` – Progresso da necessidade | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Modelagem](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/modelagem/modelagem.md), [Decisões de projeto – DP-02](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/projeto/decisoes-de-projeto.md) | [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js), [necessidadeRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/necessidadeRepository.js) | [services.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RNF-04` – Privacidade | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Arquitetura – DA-03](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [autenticacao.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/middleware/autenticacao.js), [instituicoes.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/instituicoes.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RNF-08` – Desempenho da listagem | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Issue #20 – critério de paginação](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [instituicaoRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/instituicaoRepository.js) | [Pull Request #31 – pendência de paginação](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `—` – Integração técnica do front-end | [#27](https://github.com/gigi-zacaroni/tp-eng-software/issues/27) | [Arquitetura – DA-02](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [server.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/server.js), [api.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/api.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `—` – Documentação arquitetural | [#30](https://github.com/gigi-zacaroni/tp-eng-software/issues/30) | [Documento de arquitetura e diagramas](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | Não se aplica – artefato documental | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Código organizado conforme a arquitetura, comunicação funcional entre partes e configuração de execução/dependências.

### O que foi implementado ou evoluído


Nesta Sprint, foi implementada a consulta de instituições pela API, incluindo o endpoint público de instituições em destaque e os endpoints protegidos para listagem e consulta individual.

Também foi realizada a integração entre o front-end e o back-end, configurando o Express para servir os arquivos do protótipo na mesma origem da API e centralizando as requisições no arquivo `js/api.js`.

No protótipo, foi desenvolvida a landing page com instituições em destaque carregadas diretamente da API, além das funcionalidades de login para doadores e instituições. O cabeçalho passou a se adaptar automaticamente ao perfil autenticado, exibindo menus e identificações específicas para cada tipo de usuário.

Na parte de configuração e segurança, foi centralizado o carregamento das variáveis de ambiente em `src/config/env.js`, organizando as credenciais do banco de dados, a porta da API e as chaves JWT. A conexão MySQL e a autenticação JWT foram atualizadas para utilizar essa configuração centralizada. Também foram documentadas as variáveis necessárias no `.env.example` e no README da API, além da conferência das dependências no `package.json` e no `package-lock.json`.

Além disso, foram criados os **diagramas de fluxo e de contêiner**, complementando a documentação arquitetural do sistema, registrada em `docs/arquitetura/arquitetura.md`.

### Validação e testes

- Suíte de testes da entrega principal: 47 testes aprovados, sendo 8 novos.
- Validação da configuração: 39 testes aprovados.
- Sintaxe dos arquivos alterados verificada.
- Dependências verificadas com sucesso.
- Nenhum arquivo `.env` real foi enviado ao repositório.


### Como executar e verificar


```bash
cd src/back
npm install
npm test            # não precisa de MySQL
npm start           # com MySQL e .env preenchido
```

Abrir `http://localhost:3000` (não abrir o `index.html` direto pelo arquivo, senão o `fetch` não funciona).

- [ ] A landing mostra as instituições cadastradas no banco
- [ ] Login como doador: avatar verde, papel "Doador", menu Instituições, Favoritos e Minhas doações
- [ ] Login como instituição: avatar laranja, papel "Instituição", menu Instituições e Painel
- [ ] Sair volta o cabeçalho ao estado de visitante
- [ ] `GET /instituicoes` sem token responde 401

## Pendências

- **Teste com MySQL real:** só foi feito com dados falsos (sem banco nesta máquina). Falta rodar o roteiro acima e salvar as capturas em `docs/evidencias/sprint-06/`.
- **#20, critério 4 (CORS):** deixou de ser necessário, porque o front é servido pela mesma origem (`DA-02`).
- **#20, critério 5 (paginação):** não foi feita. Por isso este PR não fecha a #20; decidir no grupo se a paginação entra agora ou vira item próprio.
- **Banco sem causa e cidade:** os cards mostram nome, selo e resumo. Registrado como risco no `arquitetura.md`.

`
## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação / conclusão |
|---|---|---|---|
| #20 `T-10` | Implementar os endpoints de consulta de instituições e suas necessidades, permitindo a visualização de instituições em destaque e a consulta de informações detalhadas. | @KarolGSMiranda | Endpoints `GET /instituicoes/destaques`, `GET /instituicoes` e `GET /instituicoes/:id` implementados e funcionando. Consultas protegidas exigem token válido, e as respostas seguem o padrão definido pela API. |
| #27 `T-19` | Integrar o front-end à API, configurando o Express para servir os arquivos da aplicação e centralizando as requisições HTTP em um único cliente. | @KarolGSMiranda | Express disponibiliza os arquivos de `src/front/` na mesma origem da API. O arquivo `js/api.js` centraliza as chamadas `fetch`, evitando requisições espalhadas pelo front-end. |
| #28 `T-20` | Desenvolver a landing page do sistema, apresentando as instituições em destaque e estabelecendo a identidade visual inicial da aplicação. | @KarolGSMiranda | Landing page implementada com identidade visual consistente. Instituições em destaque são carregadas dinamicamente pela API, com apresentação adequada das informações e tratamento de erros de carregamento. |
| #29 `T-21` | Implementar as interfaces de login para doadores e instituições, adaptando o cabeçalho da aplicação conforme o perfil do usuário autenticado. | @KarolGSMiranda | Login de doadores e instituições funcionando. O cabeçalho apresenta as opções correspondentes ao perfil autenticado, respeitando o estado de autenticação e as permissões de cada tipo de usuário. |
| #30 `D-09` | Elaborar a documentação de arquitetura da Sprint 6, registrando a organização dos componentes e as decisões técnicas adotadas no desenvolvimento. | @KarolGSMiranda | Documento `docs/arquitetura/arquitetura.md` criado e atualizado, contendo a visão geral da arquitetura, a organização das camadas, a comunicação entre front-end e API e as principais decisões técnicas. |


### Acompanhamento

- **GitHub Project:** [Quadro Kanban](https://github.com/users/gigi-zacaroni/projects/1)
- **Reuniões/decisões:** [ata_reuniao](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/reunioes/2026-10-20-planejamento-sprint_5.md)
- **Impedimentos:**  Divergência de agendas 
- **Mudanças de escopo:** `T-15` e `T-16`, previstos para a Sprint 5 na análise da Sprint 4, ficaram fora para concentrar a sprint em um padrão bem aplicado e testado. `T-18` foi criado para a validação.
## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [T-10](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) , [T-19](https://github.com/gigi-zacaroni/tp-eng-software/issues/27) , [T-20](https://github.com/gigi-zacaroni/tp-eng-software/issues/28 , [T-21](https://github.com/gigi-zacaroni/tp-eng-software/issues/29), [D-09](https://github.com/gigi-zacaroni/tp-eng-software/issues/30)) | - **[#20 – T-10]** `routes/instituicoes.js`, `controllers/instituicaoController.js`, `services/instituicaoService.js` e `repositories/instituicaoRepository.js`: comprovam a implementação das rotas GET, das regras de consulta e do acesso aos dados das instituições.

- **[#27 – T-19]** `server.js` e `front/js/api.js`: comprovam que o Express disponibiliza o front-end na mesma origem da API e que existe um cliente centralizado para as requisições HTTP.

- **[#28 – T-20]** `front/js/landing.js` e `front/style.css`: comprovam a implementação da landing page, dos cards de instituições e da identidade visual.

- **[#29 – T-21]** `front/js/login.js`, `front/js/cabecalho.js` e `services/authService.js`: comprovam a implementação do login, a identificação dos perfis de usuário e a adaptação do cabeçalho conforme o perfil autenticado.

- **[#30 – D-09]** `docs/arquitetura/arquitetura.md`: comprova a documentação da arquitetura do sistema, incluindo os diagramas de fluxo e de contêiner. |
| Pull Request | [Pull_Request_1](https://github.com/gigi-zacaroni/tp-eng-software/pull/31)
[Pull_Request_2](https://github.com/gigi-zacaroni/tp-eng-software/pull/32),| *PR_1* :Comprova a implementação das funcionalidades da Sprint 6, incluindo os endpoints de consulta de instituições, a integração entre front-end e back-end, a landing page dinâmica, o login de doadores e instituições e a adaptação do cabeçalho conforme o perfil do usuário. Também comprova a elaboração da documentação arquitetural e a aprovação de 47 testes automatizados, sendo 8 novos. *PR_2* : Comprova a centralização das configurações do ambiente, a padronização da conexão com o banco de dados MySQL, a atualização da autenticação JWT e a documentação das variáveis necessárias para execução da API, além da validação técnica das alterações realizadas. |

| Commit | [Commit_merge1](https://github.com/johnatan-si/tp-eng-software/commit/4f4c7d9856ceb0e4357c33bbed5ba0959f343a8c)
[Commit_merge2] (https://github.com/johnatan-si/tp-eng-software/commit/fb20b34ad99153e2b0a4eac909066bb9a645ad3e)
| Comprova que os pull request foram aceitos e implementados |
| Código/arquivo | [Front-End](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/front) , [arquitetura.md](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md)  | Comprova que as Issues foram tratadas |
| Teste/captura/relatório | [testes](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/tests) | 39 testes foram aprovados |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-03` – Login | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | [Arquitetura – DA-03 (JWT)](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [authService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js), [login.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/login.js) | [Testes](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RF-04` – Encerrar sessão | [#29](https://github.com/gigi-zacaroni/tp-eng-software/issues/29) | [Arquitetura – DA-03 (JWT)](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [authController.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/controllers/authController.js), [api.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/api.js), [cabecalho.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/cabecalho.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RF-05` – Acesso restrito a autenticados | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Arquitetura – DA-03](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [autenticacao.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/middleware/autenticacao.js), [instituicoes.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/instituicoes.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RF-06` – Landing page pública | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) e [#28](https://github.com/gigi-zacaroni/tp-eng-software/issues/28) | [Protótipo](https://github.com/gigi-zacaroni/tp-eng-software/tree/main/docs/prototipo), [Arquitetura – DA-02](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [landing.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/landing.js), [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js) | [services.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RF-07` – Listar instituições | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Modelagem](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/modelagem/modelagem.md), [Arquitetura](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [instituicoes.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/instituicoes.js), [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js), [instituicaoRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/instituicaoRepository.js) | [repositories.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/repositories.test.js) |
| `RF-10` – Detalhe da instituição | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Modelagem](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/modelagem/modelagem.md), [Arquitetura](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [instituicaoController.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/controllers/instituicaoController.js), [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js), [necessidadeRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/necessidadeRepository.js) | [services.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RF-18` – Progresso da necessidade | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Modelagem](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/modelagem/modelagem.md), [Decisões de projeto – DP-02](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/projeto/decisoes-de-projeto.md) | [instituicaoService.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/instituicaoService.js), [necessidadeRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/necessidadeRepository.js) | [services.test.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/tests/services.test.js) |
| `RNF-04` – Privacidade | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Arquitetura – DA-03](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [autenticacao.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/middleware/autenticacao.js), [instituicoes.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/instituicoes.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `RNF-08` – Desempenho da listagem | [#20](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [Issue #20 – critério de paginação](https://github.com/gigi-zacaroni/tp-eng-software/issues/20) | [instituicaoRepository.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/instituicaoRepository.js) | [Pull Request #31 – pendência de paginação](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `—` – Integração técnica do front-end | [#27](https://github.com/gigi-zacaroni/tp-eng-software/issues/27) | [Arquitetura – DA-02](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | [server.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/server.js), [api.js](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/js/api.js) | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |
| `—` – Documentação arquitetural | [#30](https://github.com/gigi-zacaroni/tp-eng-software/issues/30) | [Documento de arquitetura e diagramas](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/arquitetura/arquitetura.md) | Não se aplica – artefato documental | [Pull Request #31](https://github.com/gigi-zacaroni/tp-eng-software/pull/31) |

## 7. Revisão do incremento

- **O que foi demonstrado:** Consulta de instituições pela API, landing page com instituições em destaque carregadas dinamicamente, login de doadores e instituições com cabeçalho adaptado ao perfil autenticado, integração entre front-end e back-end, centralização das configurações de ambiente e documentação arquitetural com diagramas de fluxo e de contêiner.

- **Critérios atendidos:** Implementação dos endpoints de consulta de instituições (com exceção da paginação), disponibilização do front-end pela API, centralização das requisições no `js/api.js`, carregamento dinâmico das instituições na landing page, autenticação dos diferentes perfis, adaptação do cabeçalho, documentação da arquitetura e centralização das variáveis de ambiente. Os testes automatizados foram executados com sucesso.

- **Itens não concluídos:** Implementação da paginação no endpoint `GET /instituicoes` e realização dos testes de integração com um banco de dados MySQL real, incluindo o registro das evidências da Sprint.

- **Motivo das pendências:** A paginação não foi incluída no escopo implementado durante a Sprint. Já os testes com MySQL real não foram realizados devido à indisponibilidade de um banco configurado no ambiente de validação, sendo utilizados dados falsos nos testes automatizados.

- **Feedback recebido e ajustes:** A integração entre front-end e back-end foi simplificada com a utilização da mesma origem, eliminando a necessidade de configuração de CORS. Também foram centralizadas as configurações de ambiente e aprimorada a documentação técnica para facilitar a manutenção e a compreensão da arquitetura.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** A divisão das tarefas entre os integrantes, a implementação gradual das funcionalidades, a integração entre front-end e back-end e a criação de testes automatizados. A centralização das configurações e a documentação arquitetural também contribuíram para melhorar a organização do projeto.

- **Precisa melhorar:** Ampliar os testes de integração com o banco de dados real, registrar as evidências durante o desenvolvimento e melhorar o planejamento das tarefas para evitar que critérios de aceitação fiquem parcialmente atendidos ao final da Sprint.

- **Ação concreta para a próxima sprint:** Implementar a paginação do endpoint `GET /instituicoes`, realizar os testes completos com MySQL real, registrar as evidências em `docs/evidencias/sprint-06/` e revisar os critérios de aceitação das próximas issues antes de iniciar o desenvolvimento.

## 9. O que não será considerado suficiente

- Somente lista de frameworks.
- Diagrama que não corresponde ao código.
- Confundir arquitetura global com padrão de projeto local.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-06`:** [LINK](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-06)
- **Este arquivo na tag:** [LINK](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-06/docs/sprints/sprint-06.md)
- **Observação adicional:** `[quando necessária]`

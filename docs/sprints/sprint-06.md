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

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `[PREENCHER]` | `[link]` | `[PREENCHER]` |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Código organizado conforme a arquitetura, comunicação funcional entre partes e configuração de execução/dependências.

### O que foi implementado ou evoluído

O incremento entrega o fluxo completo de ponta a ponta entre as três partes da arquitetura: **front-end web → API REST (Node.js/Express) → banco MySQL**. O código do back-end segue as camadas definidas em `docs/arquitetura.md` (rotas → controllers → services → repositories), e o front-end (`src/front/`) consome a API por `fetch`, com respostas em JSON.

Comportamentos demonstráveis:

- **Cadastro de doador (RF-01):** formulário com nome, e-mail, senha e confirmação. A API valida os dados, grava a senha com hash `bcrypt` e cria o usuário e o perfil de doador na mesma transação.
- **Cadastro de instituição (RF-02):** formulário com acesso, dados da instituição e lista dinâmica de necessidades iniciais (item e quantidade). Usuário, instituição e necessidades são gravados em uma única transação, então o cadastro é todo ou nada.
- **Login (RF-03):** a API devolve um token JWT com o tipo do usuário (`doador` ou `instituicao`). O front guarda o token e abre o painel correspondente ao tipo.
- **Encerrar sessão (RF-04):** o botão "Sair" chama `POST /logout` e descarta o token no navegador.
- **Registro de doação (RF-19):** o doador autenticado informa a necessidade e a quantidade. A API só aceita a requisição de doadores (middleware `autenticar` + `exigirTipo`), usa o doador do token (nunca um id enviado no corpo), bloqueia a linha da necessidade (`SELECT ... FOR UPDATE`), recusa quantidade maior que o saldo e atualiza `quantidadeFaltante` na mesma transação.
- **Tratamento de erros:** a API responde sempre no formato `{ "erro": "..." }` (400, 401, 403, 404, 409), e o front exibe a mensagem ao usuário.

**Configuração de execução e dependências:** o back-end lê `PORT`, `DB_*` e `JWT_SECRET` do arquivo `.env` e se recusa a iniciar sem `JWT_SECRET`. O banco é criado pelo script `src/back/sql/schema.sql`. As dependências são `express`, `mysql2`, `bcryptjs`, `jsonwebtoken` e `dotenv`. O front-end é servido pelo próprio Express (`express.static`), então front e API ficam na mesma origem, sem configuração de CORS.

### Como executar e verificar

```bash
# 1. Entrar no back-end e instalar as dependências
cd src/back
npm install

# 2. Criar o banco e as tabelas (MySQL 8.0.16+)
mysql -u root -p < sql/schema.sql

# 3. Configurar o ambiente (defina JWT_SECRET e os dados do banco)
cp .env.example .env

# 4. Subir a aplicação
node src/server.js
```

**Verificação pelo navegador:** abrir `http://localhost:3000`, cadastrar uma instituição com uma necessidade inicial, cadastrar um doador, fazer login com o doador e registrar uma doação.

**Verificação pela API (opcional):**

```bash
# Conexão com o banco
curl http://localhost:3000/teste-conexao

# Cadastro de doador
curl -X POST http://localhost:3000/cadastro/doador \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","email":"maria@email.com","senha":"123456","confirmarSenha":"123456"}'

# Login (copie o "token" da resposta)
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@email.com","senha":"123456"}'

# Doação (use o id de uma necessidade existente e o token obtido)
curl -X POST http://localhost:3000/doacoes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"necessidade_id":1,"quantidade":2}'
```

**Resultado esperado:** `201` com `"Doação registrada e quantidade atualizada com sucesso!"`. Para conferir o saldo no banco: `SELECT id, item, quantidadeFaltante FROM necessidades;`. Uma doação maior que o saldo retorna `400`, e uma requisição sem token retorna `401`.

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| `RF-01` Cadastro de doador / [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | Rota `POST /cadastro/doador`: [`routes/auth.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/auth.js), [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js) (valida senha e e-mail duplicado). Tela: [`index.html`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/index.html), [`app.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/app.js) | `[link]` (print do cadastro com resposta 201 e da linha criada em `usuarios` e `doadores`) |
| `RF-02` Cadastro de instituição / [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | Rota `POST /cadastro/instituicao`: [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js) (usuário, instituição e necessidades iniciais em uma transação), [`necessidadeRepository.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/necessidadeRepository.js). Tela: [`app.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/app.js) | `[link]` (print do cadastro com resposta 201 e das linhas em `instituicoes` e `necessidades`) |
| `RF-03` Login / [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Rota `POST /login`: [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js) (`autenticarLogin`, gera o token JWT com o tipo do usuário). Tela: [`app.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/app.js) | `[link]` (print/vídeo do login levando ao painel do doador e ao da instituição; print do erro 401 com credenciais inválidas) |
| `RF-04` Encerrar sessão / [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Rota `POST /logout`: [`authController.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/controllers/authController.js). Botão "Sair": [`app.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/app.js) | `[link]` (vídeo ou print clicando em "Sair" e voltando ao login) |
| `RF-19` Prometer doação (parcial) / [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Rota `POST /doacoes`: [`routes/doacoes.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/routes/doacoes.js), [`doacaoService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/doacaoService.js) (doação "Prometida" e redução do saldo em uma transação). Tela: painel do doador em [`app.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/front/app.js) | `[link]` (print da resposta 201 e da consulta `SELECT id, item, quantidadeFaltante FROM necessidades;` antes e depois da doação) |
| `RNF-03` Senhas com hash / [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `bcrypt.hash` e `bcrypt.compare` em [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/authService.js) | `[link]` (print da coluna `senha` da tabela `usuarios` com o hash, nunca o texto puro) |
| `RNF-06` Integridade do saldo (parcial) / [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Trava `SELECT ... FOR UPDATE` e validação do saldo em [`necessidadeRepository.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/repositories/necessidadeRepository.js) e [`doacaoService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/src/services/doacaoService.js); `CHECK` em [`schema.sql`](https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/sql/schema.sql) | `[link]` (print do erro 400 "Quantidade doada é maior que a necessária." ao doar acima do saldo) |

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| `#XX` | `[PREENCHER]` | `@usuario` | `[PREENCHER]` | Concluída/Pendente |

### Acompanhamento

- **GitHub Project:** `[link filtrado ou visão da sprint]`
- **Reuniões/decisões:** `[links para docs/reunioes/]`
- **Impedimentos:** `[PREENCHER ou Nenhum]`
- **Mudanças de escopo:** `[PREENCHER ou Nenhuma]`

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | `[link]` | `[PREENCHER]` |
| Pull Request | `[link]` | `[PREENCHER]` |
| Commit | `[link]` | `[PREENCHER]` |
| Código/arquivo | `[link]` | `[PREENCHER]` |
| Teste/captura/relatório | `[link]` | `[PREENCHER]` |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-XX` | `#XX` | `[link]` | `[link]` | `[link ou ainda não aplicável]` |

## 7. Revisão do incremento

- **O que foi demonstrado:** `[PREENCHER]`
- **Critérios atendidos:** `[PREENCHER]`
- **Itens não concluídos:** `[PREENCHER]`
- **Motivo das pendências:** `[PREENCHER]`
- **Feedback recebido e ajustes:** `[PREENCHER]`

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** `[PREENCHER]`
- **Precisa melhorar:** `[PREENCHER]`
- **Ação concreta para a próxima sprint:** `[PREENCHER]`

## 9. O que não será considerado suficiente

- Somente lista de frameworks.
- Diagrama que não corresponde ao código.
- Confundir arquitetura global com padrão de projeto local.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-06`:** `[COLAR LINK]`
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** `[quando necessária]`

# Sprint 3 — Modelagem e rastreabilidade dos requisitos

- **Data de entrega:** 28/09/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-03`
- **Responsável por conferir este arquivo:** `[PREENCHER]`

## 1. Pergunta que esta sprint deve responder

**Como a estrutura e os principais fluxos do sistema são representados?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** `[PREENCHER]`

**Resultado efetivamente alcançado:** `[PREENCHER ao final da sprint]`

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/modelagem/modelagem.md`, ao menos um modelo comportamental e um estrutural, descrições e vínculo com requisitos.

- [ ] Modelos legíveis e versionados no repositório.
- [ ] Descrição textual da finalidade e decisões de cada modelo.
- [ ] Requisitos ligados aos elementos dos modelos.
- [ ] Backlog/requisitos refinados quando a modelagem revelar mudanças.
- [ ] Links entre elementos modelados e código existente.

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `[PREENCHER]` | `[link]` | `[PREENCHER]` |

4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Evolução de um fluxo modelado, estrutura de dados/classes coerente e evidência de correspondência entre modelo e código.

### O que foi implementado ou evoluído

Foi implementado no backend (Node.js + Express + MySQL) o fluxo **cadastro → login → promessa de doação**, em que cada etapa é um endpoint que pode ser chamado e verificado.

- **Cadastro de doador (RF-01):** cria o usuário e o perfil de doador em uma única transação. Valida e normaliza o e-mail, exige confirmação de senha e bloqueia e-mail duplicado (409). A senha é guardada com hash bcrypt.
- **Cadastro de instituição (RF-02):** cria o usuário, a instituição (`verificada = false`) e as necessidades iniciais na mesma transação. Rejeita necessidades com item vazio ou quantidade que não seja um inteiro maior que zero.
- **Login (RF-03):** identifica se o usuário é doador ou instituição consultando as tabelas de perfil e devolve um token JWT com `id`, `tipo` e `perfilId`.
- **Logout (RF-04):** como o token não fica guardado no servidor, o endpoint orienta o cliente a descartá-lo.
- **Prometer doação (RF-19):** `POST /doacoes` só aceita doador autenticado e usa o doador do token, nunca um id enviado no corpo. Em uma transação com `SELECT ... FOR UPDATE`, confere se a necessidade existe e se a quantidade cabe no que falta. Depois grava a doação como `Prometida` e reduz `quantidadeFaltante`. Se qualquer passo falhar, nada é alterado.

**Estrutura de dados** (`src/back/sql/schema.sql`): cinco tabelas ligadas por chaves estrangeiras. `usuarios` se relaciona com `doadores` e com `instituicoes` (um perfil por usuário); `instituicoes` tem várias `necessidades`; e `doacoes` liga `doadores` a `necessidades`. Um `UNIQUE` em `usuarios.email` e um `CHECK (quantidadeFaltante <= quantidadeTotal)` reforçam as regras no próprio banco.

**Organização do código:** `config/` (conexão e transações), `middleware/` (autenticação e permissão por tipo), `routes/` (os fluxos) e `utils/` (validação e erros).

### Como executar e verificar

```bash
# 1. Banco: no MySQL Workbench, abra e execute src/back/sql/schema.sql

# 2. Dependências e configuração
cd src/back
npm install
copy .env.example .env      # preencha DB_PASSWORD e JWT_SECRET no .env

# 3. Subir a API
npm start

# 4. Conferir a conexão com o banco
#    abrir no navegador: http://localhost:3000/teste-conexao

# 5. Verificação dos endpoints (Thunder Client / Postman), nesta ordem:
#    POST /cadastro/instituicao  -> 201
#    POST /cadastro/doador       -> 201
#    POST /login                 -> 200 (retorna o token)
#    POST /doacoes (header Authorization: Bearer <token>) -> 201
#    body: { "necessidade_id": 1, "quantidade": 4 }
```

Conferência no banco (Workbench):

```sql
SELECT id, item, quantidadeTotal, quantidadeFaltante FROM necessidades;
SELECT * FROM doacoes;
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| `RF-01` Cadastro de doador | [Abrir arquivo](../../src/back/src/routes/auth.js) |
| `RF-02` Cadastro de instituição |[Abrir arquivo ](../../src/back/src/routes/auth.js) | 
| `RF-03` Login | [Abrir arquivo de Autenticação](../../src/back/src/routes/auth.js) | 
| `RF-19` Prometer doação | [`routes/doacoes.js`](src/back/src/routes/doacoes.js), [`middleware/autenticacao.js`](src/back/src/middleware/autenticacao.js) | 

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

- Diagramas sem explicação.
- Imagens externas sem versão no repositório.
- Modelo genérico que não corresponde aos requisitos ou ao código.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-03`:** `[COLAR LINK]`
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** `[quando necessária]`

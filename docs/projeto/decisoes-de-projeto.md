# Decisões de projeto

Artefato central da Sprint 4. Registre decisões locais de organização do código, responsabilidades, interfaces, modularidade, coesão e acoplamento. Não confunda esta etapa com a arquitetura global da Sprint 6.

## 1. Decomposição da solução

| Módulo/componente local | Responsabilidade | Dependências permitidas | Requisitos relacionados |
| :--- | :--- | :--- | :--- |
| **`routes/` (Rotas HTTP)** | Receber as requisições HTTP (Express), mapear os endpoints e delegar para os Controllers. | `controllers/`, `middleware/` | Todos funcionais |
| **`controllers/` (Controladores)** | Extrair parâmetros (req.body, req.params), invocar regras de negócio e formatar a resposta HTTP (status, JSON). | `services/`, `utils/` | Todos funcionais |
| **`services/` (Serviços / Regras de Negócio)** | Executar as validações de domínio, cálculos e interagir com o banco de dados via transações. Não recebe `req` nem `res`. | `config/db.js`, `utils/` | RF-01, RF-02, RF-19 |
| **`middleware/` (Interceptadores)** | Isolar a responsabilidade de segurança (validação de JWT) e controle de acesso aos perfis antes das requisições chegarem ao negócio. | `utils/` | RF-03, RF-05 |
| **`config/db.js` (Infraestrutura)** | Centralizar e gerenciar o pool de conexões do MySQL e utilitários de transação atômica. | Nenhuma interna (apenas lib externa `mysql2`) | RNF-06 |

---

## 2. Registro de decisões

### DP-01 — Separação de Regras de Negócio e Roteamento (Controllers e Services)
- **Contexto/problema:** O arquivo original `routes/doacoes.js` misturava responsabilidades de roteamento do Express, parse de requisição, validações de negócio e queries SQL, resultando em "rotas gordas" com baixa coesão.
- **Alternativas consideradas:** 1) Manter as validações e queries nas rotas para poupar tempo. 2) Extrair as regras de negócio para uma camada de `services/` e a gestão HTTP para `controllers/`.
- **Decisão:** Adotar a divisão em camadas locais (`routes/` → `controllers/` → `services/`).
- **Justificativa:** A separação garante o princípio de Responsabilidade Única (SRP). Aumentamos a coesão funcional (cada arquivo tem um único propósito claro) e reduzimos drasticamente o acoplamento, permitindo que a regra de registro de doações seja chamada internamente por outras partes do sistema ou testada isoladamente no futuro, sem depender de objetos HTTP (`req`, `res`).
- **Consequências positivas:** Código mais limpo, modular, altamente testável e focado no domínio.
- **Trade-offs/riscos:** Aumenta a quantidade de arquivos no projeto e exige mais etapas (boilerplate) para criar um novo endpoint simples.
- **Código afetado:** `src/back/src/routes/doacoes.js`, `src/back/src/controllers/doacaoController.js`, `src/back/src/services/doacaoService.js`
- **Issue/PR/commit:** [#21](https://github.com/gigi-zacaroni/tp-eng-software/issues/21) (T-11) · [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23) (T-13) · commit [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). Sem PR.

### DP-02 — Materialização do Saldo e Trava Pessimista no Banco de Dados
- **Contexto/problema:** O sistema possui uma regra de integridade crítica onde as doações não podem ultrapassar o saldo pendente de uma necessidade (RNF-06). 
- **Alternativas consideradas:** 1) Calcular o saldo dinamicamente no código Node.js a cada consulta somando as doações (sem guardar o estado). 2) Criar o campo materializado `quantidadeFaltante` e validá-lo via banco de dados durante a transação.
- **Decisão:** Materializar o saldo `quantidadeFaltante` na tabela `NECESSIDADE` e usar bloqueio pessimista (`SELECT ... FOR UPDATE`) junto a um `CHECK` constraint.
- **Justificativa:** Esta decisão aumenta a coesão de dados e delega a responsabilidade da atomicidade para o SGBD. Fazer a validação em memória no Node.js criaria risco de *race conditions* (condições de corrida) em caso de acessos simultâneos, o que violaria o limite de doações.
- **Consequências positivas:** Garantia absoluta de integridade transacional. Impossibilidade de estourar a quantidade desejada pela instituição.
- **Trade-offs/riscos:** O uso de `FOR UPDATE` causa um pequeno acoplamento temporal (lock) na linha do banco, o que pode atrasar requisições se milhares de pessoas tentarem doar para o mesmo item exato no mesmo segundo.
- **Código afetado:** `src/back/sql/schema.sql`, `src/back/src/services/doacaoService.js`
- **Issue/PR/commit:** [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23) (T-13) · commit [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). O `FOR UPDATE` já existia desde [`d72574c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d72574c4cf49a529badbd6d8858ceec19492998f); nesta sprint ele saiu da rota e foi para o service.

### DP-03 — Segregação de Identidade e Perfis no Esquema do Banco
- **Contexto/problema:** Durante a modelagem, os usuários precisavam ser categorizados como Doadores ou Instituições, que possuem atributos totalmente diferentes.
- **Alternativas consideradas:** 1) Uma única tabela gigantesca `USUARIO` agrupando dados de instituições e doadores com colunas opcionais (NULL). 2) Separar as credenciais em `USUARIO` e os dados descritivos nas tabelas `DOADOR` e `INSTITUICAO`.
- **Decisão:** Separar a entidade de autenticação dos perfis de atuação.
- **Justificativa:** Aplicação local do princípio de Separação de Interesses (Separation of Concerns). Evita alto nível de dispersão, anomalias de colunas vazias e garante que as regras de autenticação fiquem totalmente desvinculadas das regras específicas de domínio de cada tipo de ator.
- **Consequências positivas:** Facilita a modelagem orientada a objetos (onde Doador herda/referencia Usuário) e a emissão de tokens JWT coesos.
- **Trade-offs/riscos:** Exige que o cadastro `POST /cadastro` manipule inserções em múltiplas tabelas atreladas a uma transação obrigatória, sob pena de deixar usuários "órfãos" sem perfil no banco de dados.
- **Código afetado:** `src/back/sql/schema.sql`, `src/back/src/services/authService.js`
- **Issue/PR/commit:** [#22](https://github.com/gigi-zacaroni/tp-eng-software/issues/22) (T-12) · commit [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). A separação de tabelas vem da Sprint 3 ([#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16)).

---

## 3. Antes e depois

A refatoração abaixo é a evidência concreta da DP-01. O comportamento externo da API não mudou: os mesmos endpoints, com as mesmas respostas.

| Aspecto | Antes | Depois | Benefício observado |
| :--- | :--- | :--- | :--- |
| **Autenticação** | [`routes/auth.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/43a430aa69b34b841ba76df7a3a064575fc60d82/src/back/src/routes/auth.js) com 168 linhas. Fazia HTTP, validação, SQL, hash e JWT no mesmo arquivo. | [`routes/auth.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/routes/auth.js) com 18 linhas, só o mapeamento das URLs. A lógica foi para [`authController.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/controllers/authController.js) e [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/services/authService.js). | Dá para ler as rotas da API num olhar só. A regra de cadastro e login pode ser chamada sem subir o Express. |
| **Doação** | [`routes/doacoes.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/43a430aa69b34b841ba76df7a3a064575fc60d82/src/back/src/routes/doacoes.js) com 56 linhas. A regra do saldo estava misturada com `req` e `res`. | [`doacaoController.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/controllers/doacaoController.js) lê a requisição. [`doacaoService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/services/doacaoService.js) recebe três números e cuida do saldo. | A regra de decrementar o saldo pode ser testada passando valores simples, sem objeto HTTP. |
| **Schema do banco** | Dois arquivos DDL diferentes: `database/schema.sql` e `src/back/sql/schema.sql` ([#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19)). | Fonte única em [`src/back/sql/schema.sql`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/sql/schema.sql), já com `dataPromessa`. A API legada `src/server.js` também saiu. | Não existe mais dúvida sobre qual estrutura a API espera. |

Commit da refatoração: [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). O diff mostra o antes e o depois lado a lado.

---

## 4. Análise de coesão, acoplamento e responsabilidade

Olhamos cada parte do back-end depois da refatoração. A ideia foi ver o que melhorou e o que ainda pesa.

| Arquivo | Coesão | Acoplamento | O que ainda pesa |
| :--- | :--- | :--- | :--- |
| [`routes/`](../../src/back/src/routes/) | Alta. Cada arquivo só liga URL a controller. | Depende só dos controllers e do middleware. | Nada relevante. |
| [`controllers/`](../../src/back/src/controllers/) | Alta. Lê a requisição, chama o service e monta a resposta. | Depende do service e de `utils/`. | O `doacaoController` valida a entrada, mas no auth quem valida é o service. A mesma tarefa mora em lugares diferentes. |
| [`services/doacaoService.js`](../../src/back/src/services/doacaoService.js) | Alta. Uma função, uma regra: registrar a doação dentro do saldo. | Recebe números, não objetos HTTP. | Ainda lança `ErroHttp(404)` e `ErroHttp(400)`. Ou seja, o service ainda sabe qual status HTTP devolver. |
| [`services/authService.js`](../../src/back/src/services/authService.js) | Média. Junta validação, hash de senha, SQL e geração de JWT. | Depende de `bcrypt`, `jsonwebtoken`, banco e `utils/`. | É o arquivo mais pesado (150 linhas). O login faz duas consultas para descobrir se o usuário é doador ou instituição. |
| [`middleware/autenticacao.js`](../../src/back/src/middleware/autenticacao.js) | Alta. Só cuida do token e do tipo de usuário. | Depende do `jsonwebtoken`. | Responde com `res.status(...)` direto, em vez de passar pelo handler central de erros. São dois caminhos de erro. |
| [`config/db.js`](../../src/back/src/config/db.js) | Alta. Pool de conexões e o helper `comTransacao`. | Não depende de nenhum módulo interno. | Nada relevante. |
| [`server.js`](../../src/back/src/server.js) | Média. Monta o Express e trata os erros. | O handler conhece o código `ER_DUP_ENTRY`, que é do MySQL. | O servidor fica preso ao banco escolhido. |

**Resumo:** a separação em camadas resolveu o problema principal, que era a rota fazendo tudo. O que sobrou é acoplamento mais fino: services que conhecem HTTP, servidor que conhece MySQL e validação sem lugar fixo.

---

## 5. Melhorias identificadas

Pontos que a análise acima revelou. Viraram itens do backlog para as próximas sprints.

| ID | Melhoria | Por que importa | Sprint prevista |
| :--- | :--- | :--- | :--- |
| `T-15` | Services lançam um erro de domínio próprio. A tradução para status HTTP fica só no handler central. | Tira o conhecimento de HTTP dos services e junta os dois caminhos de erro (middleware e handler). | 5 |
| `T-16` | Definir um lugar único para validar a entrada. | Hoje cada fluxo valida num lugar diferente, e isso confunde quem mexe no código. | 5 |
| `T-17` | Tirar o SQL de dentro dos services. | Os services ficariam só com a regra de negócio. É candidato ao padrão Repository, tema da Sprint 5. | 5 |

---

## 6. Verificação dos princípios

- [x] Cada módulo possui responsabilidade identificável.
- [x] Dependências desnecessárias foram reduzidas.
- [x] Nomes representam o domínio e o comportamento.
- [x] A decisão aparece no código, não apenas neste documento.
- [x] O grupo consegue explicar alternativas e consequências.

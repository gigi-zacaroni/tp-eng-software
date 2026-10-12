# Decisões de projeto

Artefato central da Sprint 4. Registre decisões locais de organização do código, responsabilidades, interfaces, modularidade, coesão e acoplamento. Não confunda esta etapa com a arquitetura global da Sprint 6.

## 1. Decomposição da solução

| Módulo/componente local | Responsabilidade | Dependências permitidas | Requisitos relacionados |
| :--- | :--- | :--- | :--- |
| **`routes/` (Rotas HTTP)** | Receber as requisições HTTP (Express), mapear os endpoints e delegar para os Controllers. | `controllers/`, `middleware/` | Todos funcionais |
| **`controllers/` (Controladores)** | Extrair parâmetros (req.body, req.params), invocar regras de negócio e formatar a resposta HTTP (status, JSON). | `services/`, `utils/` | Todos funcionais |
| **`services/` (Serviços / Regras de Negócio)** | Executar as validações de domínio, cálculos e interagir com o banco de dados via transações. Não sabe da existência de HTTP. | `config/db.js`, `utils/` | RF-01, RF-02, RF-19 |
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
- **Issue/PR/commit:** [Substituir pelo link da Issue/Commit no GitHub]

### DP-02 — Materialização do Saldo e Trava Pessimista no Banco de Dados
- **Contexto/problema:** O sistema possui uma regra de integridade crítica onde as doações não podem ultrapassar o saldo pendente de uma necessidade (RNF-06). 
- **Alternativas consideradas:** 1) Calcular o saldo dinamicamente no código Node.js a cada consulta somando as doações (sem guardar o estado). 2) Criar o campo materializado `quantidadeFaltante` e validá-lo via banco de dados durante a transação.
- **Decisão:** Materializar o saldo `quantidadeFaltante` na tabela `NECESSIDADE` e usar bloqueio pessimista (`SELECT ... FOR UPDATE`) junto a um `CHECK` constraint.
- **Justificativa:** Esta decisão aumenta a coesão de dados e delega a responsabilidade da atomicidade para o SGBD. Fazer a validação em memória no Node.js criaria risco de *race conditions* (condições de corrida) em caso de acessos simultâneos, o que violaria o limite de doações.
- **Consequências positivas:** Garantia absoluta de integridade transacional. Impossibilidade de estourar a quantidade desejada pela instituição.
- **Trade-offs/riscos:** O uso de `FOR UPDATE` causa um pequeno acoplamento temporal (lock) na linha do banco, o que pode atrasar requisições se milhares de pessoas tentarem doar para o mesmo item exato no mesmo segundo.
- **Código afetado:** `src/back/sql/schema.sql`, `src/back/src/services/doacaoService.js`
- **Issue/PR/commit:** [Substituir pelo link da Issue/Commit no GitHub]

### DP-03 — Segregação de Identidade e Perfis no Esquema do Banco
- **Contexto/problema:** Durante a modelagem, os usuários precisavam ser categorizados como Doadores ou Instituições, que possuem atributos totalmente diferentes.
- **Alternativas consideradas:** 1) Uma única tabela gigantesca `USUARIO` agrupando dados de instituições e doadores com colunas opcionais (NULL). 2) Separar as credenciais em `USUARIO` e os dados descritivos nas tabelas `DOADOR` e `INSTITUICAO`.
- **Decisão:** Separar a entidade de autenticação dos perfis de atuação.
- **Justificativa:** Aplicação local do princípio de Separação de Interesses (Separation of Concerns). Evita alto nível de dispersão, anomalias de colunas vazias e garante que as regras de autenticação fiquem totalmente desvinculadas das regras específicas de domínio de cada tipo de ator.
- **Consequências positivas:** Facilita a modelagem orientada a objetos (onde Doador herda/referencia Usuário) e a emissão de tokens JWT coesos.
- **Trade-offs/riscos:** Exige que o cadastro `POST /cadastro` manipule inserções em múltiplas tabelas atreladas a uma transação obrigatória, sob pena de deixar usuários "órfãos" sem perfil no banco de dados.
- **Código afetado:** `src/back/sql/schema.sql`, `src/back/src/routes/auth.js`
- **Issue/PR/commit:** [Substituir pelo link da Issue/Commit no GitHub]

---

## 3. Antes e depois

*(Esta refatoração representa a evidência concreta da aplicação da decisão DP-01)*

| Aspecto | Antes | Depois | Benefício observado |
| :--- | :--- | :--- | :--- |
| **Responsabilidade duplicada (Rotas vs Regras)** | `src/back/src/routes/doacoes.js` [link do estado antigo no github] | Código dividido entre `doacaoController.js` e `doacaoService.js` [https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/src/controllers] [https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/src/services]| O express (`req`/`res`) não polui mais a regra de decrementar o estoque, permitindo testar o negócio enviando objetos JavaScript puros. |
| **Gestão de Banco de Dados** | Múltiplos arquivos DDL conflitantes (`database/` e `src/back/sql/`) [link das issues] | Fonte única mantida em `src/back/sql/schema.sql` [https://github.com/gigi-zacaroni/tp-eng-software/blob/main/src/back/sql/schema.sql] | Coesão documental. Elimina a ambiguidade sobre qual estrutura o sistema e a API realmente esperam, facilitando novos deploys. |

---

## 4. Verificação dos princípios

- [x] Cada módulo possui responsabilidade identificável.
- [x] Dependências desnecessárias foram reduzidas.
- [x] Nomes representam o domínio e o comportamento.
- [x] A decisão aparece no código, não apenas neste documento.
- [x] O grupo consegue explicar alternativas e consequências.
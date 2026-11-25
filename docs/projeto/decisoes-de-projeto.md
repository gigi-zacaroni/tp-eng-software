# Decisões de projeto

Artefato central da Sprint 4, atualizado na Sprint 5 e na entrega final. Registra as decisões locais de organização do back-end: responsabilidades, interfaces, coesão e acoplamento. A arquitetura global está em [`arquitetura.md`](../arquitetura/arquitetura.md).

## 1. Decomposição da solução

| Módulo | Responsabilidade | Dependências permitidas | Requisitos |
| :--- | :--- | :--- | :--- |
| `routes/` | Recebe as requisições, liga cada URL ao controller e aplica o middleware de acesso. | `controllers/`, `middleware/` | Todos os funcionais com código |
| `controllers/` | Lê `req.body` e `req.params`, chama o service e monta a resposta HTTP. | `services/`, `utils/` | Todos os funcionais com código |
| `services/` | Regras de negócio e transações. Não recebe `req` nem `res` e não escreve SQL. | `repositories/`, `config/db.js`, `utils/` | `RF-01` a `RF-03`, `RF-07`, `RF-10`, `RF-14`, `RF-18` a `RF-23` |
| `repositories/` | Guarda o SQL de cada tabela e devolve valores simples. Não decide regra nem abre transação. | conexão recebida por parâmetro | `RF-01` a `RF-03`, `RF-07`, `RF-10`, `RF-14`, `RF-18` a `RF-23` |
| `middleware/` | Valida o JWT e o tipo de usuário antes de chegar ao controller. | `utils/` | `RF-03`, `RF-05` |
| `config/db.js` | Pool de conexões MySQL e o helper `comTransacao`. | só a biblioteca `mysql2` | `RNF-06` |

## 2. Registro de decisões

### DP-01: Controllers e services separados das rotas

- **Problema:** o arquivo `routes/doacoes.js` original fazia roteamento, leitura da requisição, regra de negócio e SQL no mesmo lugar.
- **Alternativas:** manter tudo nas rotas para poupar tempo, ou separar em controllers e services.
- **Decisão:** dividir em `routes/`, `controllers/` e `services/`.
- **Justificativa:** cada arquivo passa a ter um propósito. A regra de doação pode ser chamada e testada sem objetos HTTP.
- **Consequências:** o código ficou mais fácil de testar. Em troca, um endpoint simples exige mais arquivos.
- **Código afetado:** `routes/doacoes.js`, `controllers/doacaoController.js`, `services/doacaoService.js`.
- **Issue e commit:** [#21](https://github.com/gigi-zacaroni/tp-eng-software/issues/21) (T-11), [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23) (T-13), [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). Sem PR.

### DP-02: Saldo guardado e trava de linha no banco

- **Problema:** as doações não podem passar do saldo de uma necessidade (`RNF-06`).
- **Alternativas:** calcular o saldo somando as doações a cada consulta, ou guardar o campo `quantidadeFaltante` e validá-lo na transação.
- **Decisão:** guardar `quantidadeFaltante` em `necessidades` e usar `SELECT ... FOR UPDATE` com um `CHECK` no banco.
- **Justificativa:** validar só em memória deixaria duas doações simultâneas passarem do limite. A trava no banco impede isso.
- **Consequências:** o saldo não estoura. Em troca, doações ao mesmo tempo para o mesmo item esperam a trava.
- **Código afetado:** `sql/schema.sql`, `services/doacaoService.js`, `repositories/necessidadeRepository.js`.
- **Issue e commit:** [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23) (T-13), [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). O `FOR UPDATE` existia desde [`d72574c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d72574c4cf49a529badbd6d8858ceec19492998f); na Sprint 4 ele saiu da rota e foi para o service.

### DP-03: Identidade separada dos perfis

- **Problema:** doadores e instituições têm atributos diferentes, mas os dois fazem login.
- **Alternativas:** uma tabela `usuarios` com colunas opcionais para os dois perfis, ou credenciais em `usuarios` e dados nas tabelas `doadores` e `instituicoes`.
- **Decisão:** separar a autenticação dos perfis.
- **Justificativa:** evita colunas vazias e deixa a autenticação independente das regras de cada perfil.
- **Consequências:** o JWT carrega `id`, `tipo` e `perfilId`. Em troca, `POST /cadastro/doador` e `POST /cadastro/instituicao` gravam em mais de uma tabela e precisam de transação, senão sobra usuário sem perfil.
- **Código afetado:** `sql/schema.sql`, `services/authService.js`.
- **Issue e commit:** [#22](https://github.com/gigi-zacaroni/tp-eng-software/issues/22) (T-12), [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0). A separação das tabelas vem da Sprint 3 ([#16](https://github.com/gigi-zacaroni/tp-eng-software/issues/16)).

### DP-04: Camada de repositories (padrão Repository)

- **Problema:** depois da DP-01, os services tinham 11 instruções SQL e o formato de resposta do `mysql2` misturados à regra. A consulta de e-mail existia em duas versões. Detalhes em [`padroes-de-projeto.md`](../padroes/padroes-de-projeto.md#1-problema-recorrente-identificado).
- **Alternativas:** manter o SQL nos services, usar ORM, um único `queries.js`, Active Record ou um repository por entidade. Comparação em [`padroes-de-projeto.md` §5](../padroes/padroes-de-projeto.md#5-alternativas-e-justificativas).
- **Decisão:** criar `src/back/src/repositories/` com um módulo por tabela. A regra e a transação continuam nos services; o repository recebe a conexão por parâmetro.
- **Justificativa:** a regra não conhece SQL, e dá para testá-la com repositories falsos. Não exige dependência nova.
- **Consequências:** services sem SQL (de 11 para 0 instruções) e consulta de e-mail unificada. Em troca, há mais 5 arquivos, e `buscarSaldoComTrava` só é seguro dentro de transação, o que depende de quem chama.
- **Código afetado:** `repositories/*.js`, `services/authService.js`, `services/doacaoService.js`.
- **Issue e commit:** [#25](https://github.com/gigi-zacaroni/tp-eng-software/issues/25) (T-17), [#26](https://github.com/gigi-zacaroni/tp-eng-software/issues/26) (T-18), [`fa515a9`](https://github.com/gigi-zacaroni/tp-eng-software/commit/fa515a9f36ab5306bf0011052301527ba26fae87).

### DP-05: Só a instituição avança o status da doação

- **Problema:** o código tinha a rota `PATCH /doacoes/:id/avancar`, com a qual o doador marcava a própria doação como `Entregue`. Isso contrariava o `RN-04`: quem confirma o recebimento é a instituição.
- **Alternativas:** manter a rota do doador e documentar o desvio, ou remover a rota e deixar as mudanças de status com a instituição.
- **Decisão:** remover a rota do doador. O doador só cancela. A instituição aceita (`A caminho`), recusa (`Cancelada`) e confirma (`Entregue`) por `PATCH /doacoes/:id/aceitar`, `/recusar` e `/receber`.
- **Justificativa:** o status `Entregue` passa a refletir o que a instituição recebeu de fato.
- **Consequências:** a regra fica num lugar só, `atualizarDoacaoDaInstituicao`, que confere se a doação é da instituição do token (403 se não for). O doador depende da instituição para ver a doação avançar.
- **Código afetado:** `routes/doacoes.js`, `controllers/doacaoController.js`, `services/doacaoService.js`.
- **Commit:** [`3ba1f81`](https://github.com/gigi-zacaroni/tp-eng-software/commit/3ba1f81). As rotas da instituição vieram em [`d393149`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d393149).

## 3. Antes e depois

| Aspecto | Antes | Depois | Benefício |
| :--- | :--- | :--- | :--- |
| Autenticação | [`routes/auth.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/43a430aa69b34b841ba76df7a3a064575fc60d82/src/back/src/routes/auth.js) com 168 linhas: HTTP, validação, SQL, hash e JWT juntos. | [`routes/auth.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/routes/auth.js) com 18 linhas. A lógica foi para [`authController.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/controllers/authController.js) e [`authService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/services/authService.js). | As rotas se leem de uma vez, e a regra roda sem subir o Express. |
| Doação | [`routes/doacoes.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/43a430aa69b34b841ba76df7a3a064575fc60d82/src/back/src/routes/doacoes.js) com 56 linhas e a regra do saldo junto de `req` e `res`. | [`doacaoController.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/controllers/doacaoController.js) lê a requisição; [`doacaoService.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/src/back/src/services/doacaoService.js) recebe três números e cuida do saldo. | A regra do saldo é testada com valores simples. |
| Acesso a dados (Sprint 5) | 11 instruções SQL nos services. | 0 instruções nos services; o SQL está em `repositories/`. | A regra do saldo se lê em 5 linhas. Ver [DP-04](#dp-04-camada-de-repositories-padrão-repository). |
| Schema | Dois DDL diferentes ([#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19)). | Fonte única em [`schema.sql`](../../src/back/sql/schema.sql). | Não há dúvida sobre a estrutura que a API espera. |

Commit da refatoração: [`086991a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/086991a9e908c6b4229169ff140e15112611e1a0).

## 4. Análise de coesão, acoplamento e responsabilidade

Estado na entrega final.

| Arquivo | Coesão | Acoplamento | O que ainda pesa |
| :--- | :--- | :--- | :--- |
| [`routes/`](../../src/back/src/routes/) | Alta. Só liga URL a controller. | Depende dos controllers e do middleware. | Nada relevante. |
| [`controllers/`](../../src/back/src/controllers/) | Alta. Lê a requisição, chama o service e responde. | Depende do service e de `utils/`. | `doacaoController` e `instituicaoController` validam ids no controller; no cadastro quem valida é o service. |
| [`services/doacaoService.js`](../../src/back/src/services/doacaoService.js) | Alta. Cinco funções, todas sobre o ciclo da doação: registrar, cancelar, listar e responder. | Recebe números, não objetos HTTP. Usa `necessidadeRepository` e `doacaoRepository`. | Lança `ErroHttp` com status HTTP. |
| [`services/instituicaoService.js`](../../src/back/src/services/instituicaoService.js) | Alta. Consulta de instituições e cadastro de necessidade. | Usa `instituicaoRepository` e `necessidadeRepository`. | Também lança `ErroHttp`. |
| [`services/authService.js`](../../src/back/src/services/authService.js) | Média. Junta validação, hash e JWT. | Depende de `bcryptjs`, `jsonwebtoken`, dos repositories e de `config/db.js`. | O login faz duas consultas para descobrir o perfil. |
| [`middleware/autenticacao.js`](../../src/back/src/middleware/autenticacao.js) | Alta. Só cuida do token e do tipo. | Depende de `jsonwebtoken`. | Responde direto com `res.status`, fora do handler central. |
| [`config/db.js`](../../src/back/src/config/db.js) | Alta. Pool e `comTransacao`. | Nenhum módulo interno. | Nada relevante. |
| [`server.js`](../../src/back/src/server.js) | Média. Monta o Express e trata os erros. | O handler conhece códigos de erro do MySQL. | O servidor fica preso ao MySQL. |

**Resumo:** as camadas resolveram o problema principal, que era a rota fazendo tudo. A DP-04 tirou o SQL dos services. Sobrou acoplamento mais fino: services que conhecem HTTP (`T-15`), validação sem lugar fixo (`T-16`) e servidor que conhece o MySQL.

## 5. Melhorias identificadas

| ID | Melhoria | Por que importa | Situação final |
| :--- | :--- | :--- | :--- |
| `T-15` | Services lançam erro de domínio; só o handler traduz para HTTP. | Tira HTTP dos services e junta os dois caminhos de erro. | Não realizada |
| `T-16` | Um lugar único para validar a entrada. | Hoje cada fluxo valida num lugar diferente. | Não realizada |
| `T-17` | Tirar o SQL dos services. | Os services ficam só com a regra. | Concluída (`DP-04`) |

## 6. Verificação dos princípios

- [x] Cada módulo tem uma responsabilidade identificável.
- [x] Dependências desnecessárias foram reduzidas.
- [x] Os nomes representam o domínio e o comportamento.
- [x] As decisões aparecem no código, não só neste documento.
- [x] O grupo consegue explicar alternativas e consequências.

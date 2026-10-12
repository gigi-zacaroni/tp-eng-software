# Modelagem do sistema

> **Artefato central da Sprint 3 (com atualizações de arquitetura na Sprint 4).** Os modelos devem explicar a estrutura e o comportamento da solução e corresponder aos requisitos e ao código.

Os dois modelos abaixo cobrem o **fluxo de doação** (comportamental) e o **domínio persistido e arquitetural** (estrutural). Eles não repetem a lista de requisitos — essa continua em [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md), e o vínculo requisito → modelo → código está na [matriz de rastreabilidade](../rastreabilidade.md).

## 1. Modelos selecionados

| Modelo | Tipo | Pergunta que ele ajuda a responder | Requisitos relacionados |
|---|---|---|---|
| Fluxo de doação entre doador, aplicação e instituição | Comportamental | Como ocorre uma doação, do pedido do doador até a confirmação de recebimento? | `RF-19`–`RF-24` |
| Modelo de classes (Domínio + Arquitetura) | Estrutural | Como as entidades se relacionam no banco e como o código se organiza para manipulá-las? | `RF-01`, `RF-02`, `RF-18`, `RF-19` |

O comportamental foi escolhido por ser o fluxo que dá nome ao produto e o único que atravessa os dois perfis de usuário. O estrutural (atualizado na Sprint 4) foi escolhido para documentar não apenas as restrições de dados (`RNF-06`), mas também a separação de responsabilidades da aplicação (rotas, controladores e serviços).

## 2. Modelo comportamental

```mermaid
---
config:
  theme: default
---
flowchart LR

    D["DOADOR"]

    subgraph FRONT["FRONT-END"]
        FE["Interface Web<br/><br/>Cadastro / Login<br/>Escolha da necessidade<br/>Promessa de doação<br/>Acompanhamento"]
    end

    subgraph API["API"]
        AP["API REST<br/><br/>Recebe e envia requisições"]
    end

    subgraph BACK["BACK-END"]
        BE["Regras de Negócio<br/><br/>Busca necessidades<br/>Registra doações<br/>Atualiza status<br/>Controla quantidades"]
    end

    subgraph BD["BANCO DE DADOS"]
        B["DOADORES<br/><br/>INSTITUIÇÕES<br/><br/>NECESSIDADES<br/><br/>DOAÇÕES"]
    end

    subgraph INST["PAINEL DA INSTITUIÇÃO"]
        I["Doações a receber<br/><br/>Confirmar recebimento<br/>Resumo das necessidades"]
    end

    D -->|"1. Escolhe necessidade, item e quantidade"| FE
    FE -->|"2. Envia solicitação"| AP
    AP -->|"3. Encaminha"| BE
    BE -->|"4. Consulta necessidade"| B
    B -->|"5. Retorna quantidade disponível"| BE

    BE -->|"6. Registra doação como Prometida"| B
    BE -->|"7. Retorna confirmação"| AP
    AP -->|"8. Exibe doação"| FE
    FE -->|"9. Acompanha status"| D

    I -->|"10. Consulta doações"| AP
    AP -->|"11. Solicita dados"| BE
    BE -->|"12. Consulta"| B
    B -->|"13. Retorna doações"| BE
    BE -->|"14. Exibe doações"| AP
    AP --> I

    D -.->|"15. Atualiza status"| FE
    FE -.-> AP
    AP -.-> BE
    BE -.->|"Atualiza doação"| B

    I -.->|"16. Confirma recebimento"| AP
    AP -.-> BE
    BE -.->|"Atualiza recebimento"| B
```

**Descrição e decisões representadas**

O diagrama mostra a comunicação entre doador, front-end, API, back-end, banco de dados e instituição durante o processo de doação.

O fluxo começa com o doador, que acessa a aplicação para escolher uma necessidade, o item que deseja doar e a quantidade. Essas informações são enviadas pela API REST ao back-end, responsável por aplicar as regras de negócio e consultar o banco para verificar a quantidade ainda necessária. Após a validação, o back-end registra a doação com o status Prometida e retorna a confirmação ao doador.

O doador acompanha a evolução da doação, que pode passar por Prometida → A caminho → Entregue (RN-03). Enquanto estiver nos estados permitidos, a doação pode ser cancelada, devolvendo a quantidade ao saldo da necessidade.

Decisão representada no desenho: as arestas 1 a 14 são contínuas e as 15 e 16 são tracejadas porque marcam a fronteira entre o que está implementado e o que ficou para as seguintes sprints.

## 3. Modelo estrutural

```mermaid
classDiagram
    %% 1. Camada de Controladores (Recebem a requisição)
    class AuthController {
        +cadastrarDoador(req, res)
        +cadastrarInstituicao(req, res)
        +login(req, res)
        +logout(req, res)
    }

    class DoacoesController {
        +criarDoacao(req, res)
    }

    %% 2. Camada de Serviços (Executam a regra de negócio)
    class AuthService {
        +cadastrarDoador(nome, email, senha, confirmarSenha)
        +cadastrarInstituicao(acesso, sobre, necessidadesIniciais)
        +autenticarLogin(email, senha)
    }

    class DoacoesService {
        +registrarDoacao(necessidade_id, quantidade, usuario_id)
    }

    %% 3. Entidades do Banco de Dados 
    class USUARIO {
        +int id
        +string email
        +string senha
        +string papel
    }

    class DOADOR {
        +int id
        +int usuario_id
        +string nome
    }

    class INSTITUICAO {
        +int id
        +int usuario_id
        +string nome
        +string descricao
        +boolean verificada
    }

    class NECESSIDADE {
        +int id
        +int instituicao_id
        +string item
        +int quantidadeTotal
        +int quantidadeFaltante
    }

    class DOACAO {
        +int id
        +int doador_id
        +int necessidade_id
        +int quantidade
        +string status
        +datetime dataPromessa
    }

    %% 4. Relacionamentos Arquiteturais (Baixo Acoplamento)
    AuthController --> AuthService : delega requisição
    DoacoesController --> DoacoesService : delega requisição

    AuthService ..> USUARIO : insere/consulta
    AuthService ..> DOADOR : insere
    AuthService ..> INSTITUICAO : insere
    
    DoacoesService ..> DOACAO : insere
    DoacoesService ..> NECESSIDADE : atualiza saldo
```

**Descrição e decisões representadas**

O diagrama acima evoluiu de um simples modelo Entidade-Relacionamento (ER) para um diagrama de classes completo na Sprint 4, a fim de representar as decisões internas de arquitetura.

`DOACAO` é a entidade associativa entre `DOADOR` e `NECESSIDADE`, registrando a quantidade comprometida, o estado do ciclo (`status`) e o carimbo de data/hora da promessa (`dataPromessa`).

### Quatro decisões de modelagem

1. **Separação de interesses (Controllers e Services)**

    A lógica de negócio foi isolada das rotas HTTP. Os Controllers lidam exclusivamente com os objetos `req` e `res`, enquanto os Services encapsulam as validações, regras de negócio e comunicação com o banco. Isso garante alta coesão e baixo acoplamento (decisão da Sprint 4).

2. **Separação entre identidade e perfil**

    `email` e `senha` ficam em `USUARIO`; `nome`, `descricao` e `verificada` ficam nos perfis. Sem essa separação, uma tabela única teria colunas permanentemente nulas para metade das linhas, e o login precisaria saber de antemão qual perfil consultar.

3. **Armazenamento do saldo, em vez de seu cálculo**

    `quantidadeFaltante` é um campo materializado, em vez de uma soma derivada de `DOACAO`. Isso permite travar a linha da necessidade durante a promessa e sustentar o `RNF-06` no próprio banco.

4. **Modelagem do vínculo como entidade**

    `DOACAO` carrega atributos próprios (`quantidade`, `status`, `dataPromessa`), então não podia ser uma tabela de junção simples.


## 4. Relação entre requisitos e modelos

| Requisito | Elemento do modelo | Como está representado | Alteração provocada no backlog/código |
|---|---|---|---|
| `RF-01` | Entidades `USUARIO` e `DOADOR` | `DOADOR` guarda `nome` e referencia `USUARIO` por `usuario_id`; `email` e `senha` ficam só em `USUARIO`. | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) · Implementado: `POST /cadastro/doador` refatorado para delegar a criação ao `AuthController` e `AuthService`. |
| `RF-02` | `USUARIO`, `INSTITUICAO` e `NECESSIDADE` | A relação de um para muitos obrigatória entre instituição e necessidade exige ao menos uma necessidade inicial; `verificada` nasce `false`. | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) · Implementado parcialmente: `POST /cadastro/instituicao` grava `nome` e `descricao`. Causa, cidade e contato ficaram fora do schema — registrado como pendência. |
| `RF-18` | `NECESSIDADE.quantidadeTotal` e `quantidadeFaltante` | O progresso de uma necessidade é a diferença entre os dois campos. | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) · Os campos existem e são mantidos corretamente, mas não há endpoint que os exponha. |
| `RF-19` | Fluxo comportamental, arestas 1 a 9 | O back-end valida o saldo antes de registrar a doação como `Prometida` e decrementar `quantidadeFaltante`. | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) · Implementado: `POST /doacoes` refatorado para `DoacoesService`, mantendo a transação com `SELECT ... FOR UPDATE`. |
| `RF-20` | `DOACAO.status` e aresta 15 | Ciclo `Prometida` → `A caminho` → `Entregue`. | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) · Não implementado: o campo existe e nasce `Prometida`, mas não há rota de transição. |
| `RF-21` | Aresta 15 + `NECESSIDADE.quantidadeFaltante` | Cancelar devolve a quantidade ao saldo pendente. | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) · Não implementado. Depende da mesma rota de transição de status. |
| `RF-22` | Arestas 10 a 14 (painel da instituição) | Consulta das doações destinadas à instituição, com doador, item, quantidade e status. | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) · Não implementado: depende dos endpoints de consulta. |
| `RF-23` | Aresta 16 | Confirmação de recebimento atualiza `DOACAO.status`. | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) · Não implementado. |
| `RF-24` | `NECESSIDADE` + agregação de `DOACAO` | Resumo por necessidade: desejada, prometida, recebida e percentual. | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) · Não implementado: a agregação é derivável do modelo, mas não há consulta que a produza. |

## 5. Correspondência entre modelo e código

Os caminhos abaixo refletem a refatoração arquitetural aplicada no projeto a partir da Sprint 4.

| Elemento modelado | Arquivo correspondente | Observação |
|---|---|---|
| Modelo estrutural de banco (5 entidades) | [`src/back/sql/schema.sql`](../../src/back/sql/schema.sql) | DDL com as tabelas, FKs, `UNIQUE` e validação `CHECK (quantidadeFaltante <= quantidadeTotal)`. |
| Camada `Controllers` (Recebimento) | [`src/back/src/controllers/authController.js`](../../src/back/src/controllers/authController.js) · [`doacoesController.js`](../../src/back/src/controllers/doacoesController.js) | Responsáveis exclusivos por extrair o payload (`req.body`) e devolver status HTTP (`res.status`). |
| Camada `Services` (Regras de Negócio) | [`src/back/src/services/authService.js`](../../src/back/src/services/authService.js) · [`doacoesService.js`](../../src/back/src/services/doacoesService.js) | Contêm o processamento da validação de regras, criptografia de senha e a persistência efetiva no BD. |
| Roteamento (Endpoints) | [`src/back/src/routes/auth.js`](../../src/back/src/routes/auth.js) · [`doacoes.js`](../../src/back/src/routes/doacoes.js) | Apenas mapeiam a URL (ex: `/cadastro/doador`) para o respectivo Controller. |
| Validações de Acesso | [`src/back/src/middleware/autenticacao.js`](../../src/back/src/middleware/autenticacao.js) | `autenticar` valida o JWT; `exigirTipo` separa doador de instituição. |
| Nó "BANCO DE DADOS" do fluxo | [`src/back/src/config/db.js`](../../src/back/src/config/db.js) | Pool MySQL e o helper `comTransacao`, que concentra `begin`/`commit`/`rollback`. |
| Centralização de Erros | [`src/back/src/server.js`](../../src/back/src/server.js) · [`http.js`](../../src/back/src/utils/http.js) | Configuração do Express com handler centralizado (`ErroHttp`) para blindar o retorno de erros ao front-end. |

### Divergências conhecidas entre modelo e código

| Divergência | Onde |
|---|---|
| `DOACAO.dataPromessa` existe no modelo estrutural, mas **não** na tabela `doacoes` do schema em uso. Sem ela não há como ordenar ou auditar promessas. | [`src/back/sql/schema.sql`](../../src/back/sql/schema.sql) |
| `INSTITUICAO` foi modelada com `nome` e `descricao` apenas; o `RF-02` e o protótipo preveem também causa, cidade e contato. | [`auth.js`](../../src/back/src/routes/auth.js) |
| Existem **dois** arquivos de schema divergentes: `database/schema.sql` (anterior, com `ON DELETE CASCADE` e `dataPromessa`) e `src/back/sql/schema.sql` (em uso). Não há fonte única. | `database/` e `src/back/sql/` |
| As arestas 10 a 16 do fluxo não têm nenhum código correspondente — não existe endpoint de consulta na API. | — |

## 6. Refinamentos identificados

- **Separação de Camadas (Sprint 4).** O código original concentrava a manipulação do banco de dados e a resposta HTTP no mesmo arquivo de rota. Isso foi refatorado criando os módulos de `Controllers` e `Services`, aplicando princípios de responsabilidade única, alta coesão e baixo acoplamento para facilitar a manutenção.
- **Separação das entidades de usuário.** A modelagem estrutural evidenciou a necessidade de isolar `USUARIO` das tabelas de perfil, evitando atributos nulos recorrentes e simplificando o login: o token JWT, agora gerado pelo `AuthService`, passou a carregar `id`, `tipo` e `perfilId` (`RF-03`).
- **Controle transacional no saldo da necessidade.** O diagrama comportamental deixou claro que os passos 4→6 precisam ser atômicos: dois doadores simultâneos poderiam prometer quantidades que, somadas, excedem o saldo. O controle via `SELECT ... FOR UPDATE` e o `CHECK` no banco foram mantidos e isolados no `DoacoesService` (`RF-19`, `RF-21`, `RNF-06`).
- **Isolamento da etapa de acesso.** A verificação dos fluxos levou a rotas dedicadas de cadastro e login, gerando JWT e abstraindo a sessão, verificáveis antes de qualquer doação (`RF-05`).
- **Lacuna descoberta na revisão: o modelo tem leitura, a API não.** As arestas 10 a 14 e os requisitos `RF-06`–`RF-10` descrevem consultas que nenhum endpoint atende. O produto resolve o problema de "descobrir quem ajudar", e essa metade do fluxo não saiu do diagrama. Virou item prioritário do backlog (`T-10`).
- **Lacuna descoberta na revisão: duplicidade de schema.** A existência de dois arquivos DDL divergentes torna ambíguo o que o modelo estrutural representa. Virou item de dívida técnica (`T-09`).

## 7. Histórico de atualização

| Sprint | Modelo alterado | Motivo | Evidência |
|---|---|---|---|
| Sprint 3 | Modelo estrutural — criação | Tradução do domínio para modelo físico MySQL, com a primeira versão da API e do DDL. | [`26b7fd1`](https://github.com/gigi-zacaroni/tp-eng-software/commit/26b7fd135624e5c47428425a190b44c7a0420c23) |
| Sprint 3 | Modelo comportamental — etapa de acesso | Implementação isolada de `RF-01` a `RF-04` para validar cadastro e login antes de integrar o fluxo de doação. | [`f8a059c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/f8a059ce6edf8a187866540f09f167f8134ebca2) · [`2e888a1`](https://github.com/gigi-zacaroni/tp-eng-software/commit/2e888a12a801469910edb78800ee6c6f49f32392) · [`a8c2ff2`](https://github.com/gigi-zacaroni/tp-eng-software/commit/a8c2ff26f4425aa24d986e1c4e7efe630b5d5ff7) · [`0a85290`](https://github.com/gigi-zacaroni/tp-eng-software/commit/0a852902cb4954238172f966bcd244479d22fbf6) |
| Sprint 3 | Ambos — reorganização do back-end | O fluxo completo de doação foi implementado e o código reorganizado em `config/`, `middleware/`, `routes/` e `utils/`, substituindo a primeira versão monolítica. | [`d72574c`](https://github.com/gigi-zacaroni/tp-eng-software/commit/d72574c4cf49a529badbd6d8858ceec19492998f) |
| Sprint 3 | §5 e §6 — correspondência e refinamentos | Revisão final: os caminhos de arquivo citados não existiam mais após a reorganização, e as divergências modelo × código foram registradas explicitamente. | [`ca58383`](https://github.com/gigi-zacaroni/tp-eng-software/commit/ca58383) |
| Sprint 4 | Estrutural (Diagrama de Classes) e §4, §5, §6 | Atualização arquitetural para o padrão Routes/Controllers/Services, refletindo a aplicação dos princípios de responsabilidade única e separação de interesses. | Commits atrelados à tag `sprint-04` no repositório. |
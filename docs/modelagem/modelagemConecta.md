# Modelagem do sistema

> **Artefato central da Sprint 3.** Os modelos devem explicar a estrutura e o comportamento da solução e corresponder aos requisitos e ao código.

## 1. Modelos selecionados

| Modelo | Tipo | Pergunta que ele ajuda a responder | Requisitos relacionados |
|---|---|---|---|
| `[Nome]` | Comportamental | `[Como um fluxo acontece?]` | `RF-XX` |
| `Diagramade classes de Domínio` | Estrutural | `Como as entidades do sistema se relacionam para conectar doadores e necessidades?` | `RF-01, RF-02, RF-18, RF-19` |

## 2. modelo comportamental em Mermaid

> Substitua pelo modelo real. O Mermaid é renderizado pelo GitHub e permanece versionado junto ao projeto.

```mermaid
sequenceDiagram
    actor Usuario
    participant Web as Aplicação Web
    participant API
    participant DB as Banco de dados
    Usuario->>Web: Solicita operação
    Web->>API: Envia dados validados
    API->>DB: Consulta ou persiste dados
    DB-->>API: Retorna resultado
    API-->>Web: Retorna resposta
    Web-->>Usuario: Exibe resultado
```

**Descrição e decisões representadas:** `[PREENCHER]`

## 3. Modelo estrutural em Mermaid

```mermaid
erDiagram
    USUARIO ||--o| DOADOR : "pode ser"
    USUARIO ||--o| INSTITUICAO : "pode ser"
    INSTITUICAO ||--|{ NECESSIDADE : possui
    DOADOR ||--o{ DOACAO : realiza
    NECESSIDADE ||--o{ DOACAO : recebe

    USUARIO {
        int id PK
        string email
        string senha
    }

    DOADOR {
        int id PK
        int usuario_id FK
        string nome
    }

    INSTITUICAO {
        int id PK
        int usuario_id FK
        string nome
        string descricao
        boolean verificada
    }

    NECESSIDADE {
        int id PK
        int instituicao_id FK
        string item
        int quantidadeTotal
        int quantidadeFaltante
    }

    DOACAO {
        int id PK
        int doador_id FK
        int necessidade_id FK
        int quantidade
        string status
        datetime dataPromessa
    }
```

**Descrição e decisões representadas:**  
O modelo representa as principais entidades do sistema e seus relacionamentos. Um `USUARIO` pode atuar como `DOADOR` ou `INSTITUICAO`. Uma instituição pode possuir várias necessidades, enquanto um doador pode realizar várias doações. Cada `DOACAO` relaciona um doador a uma necessidade específica e registra a quantidade, o status e a data da promessa.

**Descrição e decisões representadas:** `[PREENCHER]`

## 4. Relação entre requisitos e modelos

| Requisito | Elemento do modelo | Como está representado | Alteração provocada no backlog/código |
| :--- | :--- | :--- | :--- |
| **RF-01** | Classes `Doador` e `Usuario` | `Doador` possui o atributo `nome` e o método `criarConta()`, herdando `email`, `senha` e `autenticar()` da classe abstrata `Usuario`. | Issue: Criar migration/schema para tabela `Doador` e desenvolver endpoint `POST /doadores` com hash de senha. |
| **RF-02** | Classes `Instituicao` e `Necessidade` | `Instituicao` (herda `Usuario`) possui `descricao` e flag `verificada`. Tem relação de composição (`1..*`) com `Necessidade` para garantir a exigência de itens iniciais. | Issue: Criar schemas de `Instituicao` e `Necessidade`. Desenvolver form multi-step e endpoint `POST /instituicoes` com validação de array de necessidades. |
| **RF-18 e RF-19** | Classe `Doacao` | Entidade associativa que conecta `Doador` e `Necessidade`. Armazena `quantidade`, `status` (ex: "Prometida") e aciona validação pelo método `validarQuantidade()`. | Issue: Criar tabela de vínculo `Doacao`. Implementar endpoint `POST /doacoes` contendo lógica de transação para decrementar `quantidadeFaltante` na Necessidade. |

## 5. Correspondência entre modelo e código

| Elemento modelado | Arquivo/diretório correspondente | Observação |
|---|---|---|
| `[Entidade/componente/fluxo]` | `[link relativo]` | `[PREENCHER]` |

## 6. Refinamentos identificados

- `[Requisito dividido, regra descoberta, entidade adicionada etc.]`

## 7. Histórico de atualização

| Sprint | Modelo alterado | Motivo | Evidência |
|---|---|---|---|
| Sprint 3 | `[PREENCHER]` | `[PREENCHER]` | `[link]` |

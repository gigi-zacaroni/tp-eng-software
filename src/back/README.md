# API back-end

## Organização arquitetural

O back-end usa uma arquitetura em camadas. Cada camada possui uma responsabilidade
única e depende apenas das camadas abaixo dela:

```text
routes -> controllers -> services -> repositories -> MySQL
              |             |             |
          HTTP/Express   regras e       SQL por
                         transações     entidade
```

| Diretório | Responsabilidade |
|---|---|
| `src/routes/` | Declara endpoints, middleware e o controller responsável. |
| `src/controllers/` | Traduz `req`/`res` para chamadas de serviço e respostas HTTP. |
| `src/services/` | Executa validações de domínio e controla transações; não conhece Express nem escreve SQL. |
| `src/repositories/` | Centraliza o SQL de cada tabela e recebe o executor (`pool` ou conexão transacional). |
| `src/config/` | Configura o pool MySQL e o helper de transações. |
| `src/middleware/` | Valida JWT e autorizações antes do controller. |
| `src/utils/` | Helpers compartilhados de validação, erros e execução assíncrona. |

Neste projeto, `repositories/` é a camada equivalente ao acesso aos modelos
persistidos. Não foi criada uma pasta `models/` artificial: não há ORM nem
entidades com comportamento próprio; cada repository corresponde diretamente a
uma tabela do schema.

## Executar



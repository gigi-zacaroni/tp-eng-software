# Testes

Coloque neste diretório os testes automatizados ou a estrutura equivalente da tecnologia utilizada.

A partir da Sprint 7, documente:

- como instalar dependências de teste;
- comando de execução;
- relação entre arquivos de teste e casos `CT-XX`;
- saída ou relatório esperado;
- limitações quando um teste precisar ser manual.

Exemplo de mapeamento:

| Caso | Arquivo de teste | Requisito |
|---|---|---|
| `CT-01` | `tests/test_cadastro...` | `RF-01` |

## Testes do back-end (Sprint 5)

Os testes automatizados do back-end ficam junto do código, em [`src/back/tests/`](../src/back/tests/), porque dependem dos módulos e do `node_modules` de `src/back`. Usam o executor nativo do Node (`node:test`), sem dependência nova, e **não precisam de MySQL**.

```bash
cd src/back
npm install
npm test
```

| Arquivo | O que verifica |
|---|---|
| `caracterizacao.test.js` | Comportamento externo de cadastro, login e doação. Não depende dos repositories, então roda também no código anterior à Sprint 5. |
| `repositories.test.js` | SQL, parâmetros e valores de retorno de cada repository. |
| `services.test.js` | Regras dos services com repositories substituídos por dublês. |
| `helpers/bancoFalso.js` | Banco em memória usado pelos testes de caracterização. |

Limitação: o banco é simulado, então o SQL real só é validado pelo roteiro manual contra o MySQL ([`docs/evidencias/`](../docs/evidencias/README.md)). O mapeamento formal para os casos `CT-XX` fica para a Sprint 7.

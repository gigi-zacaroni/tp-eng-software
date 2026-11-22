# Testes

Os testes automatizados ficam junto do back-end, em [`src/back/tests/`](../src/back/tests/), porque dependem dos módulos e do `node_modules` de `src/back`. Eles usam o executor nativo do Node (`node:test`) e **não precisam de MySQL**.

O planejamento completo está em [`docs/testes/plano-de-testes.md`](../docs/testes/plano-de-testes.md).

## Como executar

```bash
cd src/back
npm install
npm test
```

A saída esperada termina com `# fail 0`. As execuções da Sprint 7 estão salvas em [`docs/testes/evidencias/`](../docs/testes/evidencias/).

## Arquivos

| Arquivo | O que verifica |
|---|---|
| `caracterizacao.test.js` | Cadastro, login e doação de ponta a ponta (controller, service e repository) contra o banco em memória. |
| `repositories.test.js` | SQL, parâmetros e retornos de cada repository. |
| `services.test.js` | Regras dos services com os repositories substituídos por dublês. |
| `helpers/bancoFalso.js` | Banco em memória usado pelos testes de caracterização. |

## Casos de teste × arquivos

| Caso | Arquivo de teste | Requisito |
|---|---|---|
| `CT-01` a `CT-05` | `caracterizacao.test.js`, `services.test.js` | `RF-01`, `RF-02`, `RF-14`, `RNF-03` |
| `CT-06`, `CT-07` | `caracterizacao.test.js`, `services.test.js` | `RF-03` |
| `CT-08` a `CT-10` | `caracterizacao.test.js`, `services.test.js` | `RF-18`, `RF-19`, `RNF-06` |
| `CT-11` | `services.test.js` | `RF-06`, `RF-07`, `RF-10` |
| `CT-12` | `repositories.test.js` | `RF-01`, `RF-02`, `RF-07`, `RF-19`, `RNF-06` |
| `CT-13` | Manual, sem arquivo | `RF-01`, `RF-03`, `RF-19`, `RNF-01`, `RNF-03` |

## Limitações

- O banco é simulado. O SQL real só é validado pelo `CT-13`, que roda manualmente contra o MySQL.
- Os hooks `beforeEach` e `afterEach` precisam ficar dentro de cada `describe`. No Node 18, um hook no nível do arquivo não roda antes dos testes aninhados (defeito DEF-01 da Sprint 7).

# Plano de testes

> **Artefato central da Sprint 7.** Nesta etapa o grupo deve planejar e também apresentar as primeiras execuções verificáveis.

## 1. Objetivos e escopo

O plano valida o fluxo de doações da promessa até o acompanhamento e o
cancelamento. O escopo cobre criação da promessa, vínculo com doador e
necessidade, atualização transacional do saldo, sequência de estados,
cancelamento e rejeição de dados que violam constraints do MySQL.

Fora deste ciclo: cadastro completo de instituição, busca pública, favoritos,
notificações e demais consultas ainda não implementadas.

## 2. Estratégia

| Nível/tipo | Objetivo | Ferramenta/método | Responsável | Evidência esperada |
|---|---|---|---|---|
| Unidade | Regras do service e montagem do SQL dos repositories | Node.js `node:test`, mocks de repositories | Maria Luiza Pestana | 47 testes passando no reteste local |
| Integração | Persistência real, chaves estrangeiras, CHECK e transações | MySQL 8 + `mysql2/promise` em `doacoes-integracao.test.js` | Maria Luiza Pestana | Resultado do arquivo habilitado por `DB_INTEGRATION=1` |
| Sistema/aceitação | Rota Express autenticada e resposta HTTP do fluxo de doação | Banco falso em memória com controllers reais | Arthur Veiga | Casos RF-19 e regras de status passando |

## 3. Riscos e prioridades de teste

| Risco/funcionalidade | Probabilidade | Impacto | Prioridade de teste | Requisitos |
|---|---|---|---|---|
| Promise acima do saldo disponível | Alta | Alta | 1 | `RF-19`, `RN-02` |
| Doador ou necessidade inexistente gravados | Média | Alta | 1 | `RF-19`, `RN-03` |
| Transição de status fora da sequência | Média | Alta | 1 | `RF-20`, `RN-03` |
| Cancelamento não devolve o saldo | Média | Alta | 1 | `RF-21`, `RN-02` |
| Falha de transação deixa promessa sem atualização do saldo | Média | Alta | 1 | `RF-19`, `RNF-06` |
| Dados incompatíveis com os tipos da tabela | Média | Média | 2 | `RF-19`, `RF-20`, `RF-21` |

## 4. Casos de teste

### CT-01 — Registrar promessa válida

- **Requisitos:** `RF-19`, `RN-02`, `RN-03`
- **Pré-condições:** banco resetado e carregado; existe um doador em `doadores` e uma necessidade com `quantidadeFaltante >= 1`.
- **Dados de teste:** doador `id = 1`, necessidade `id = 1`, quantidade `3`.
- **Passos:** chamar `POST /doacoes`; verificar a linha criada e o saldo.
- **Resultado esperado:** resposta `201`; uma doação com `status = "Prometida"`; `quantidadeFaltante` reduzida pela quantidade.
- **Tipo:** automatizado
- **Arquivo de automação:** [`src/back/tests/caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) e [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js)

### CT-02 — Promessa igual ao saldo restante

- **Requisitos:** `RF-19`, `RN-02`
- **Pré-condições:** necessidade com `quantidadeFaltante = 10`.
- **Dados de teste:** necessidade `id = 1`, quantidade `10`.
- **Resultado esperado:** doação criada e `quantidadeFaltante = 0`.
- **Tipo:** automatizado
- **Arquivo:** [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js)

### CT-03 — Rejeitar promessa acima do saldo

- **Requisitos:** `RF-19`, `RN-02`
- **Pré-condições:** necessidade com saldo `10`.
- **Dados de teste:** quantidade `11`.
- **Resultado esperado:** HTTP `400`; nenhuma doação criada; saldo permanece `10`.
- **Tipo:** automatizado
- **Arquivo:** [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js)

### CT-04 — Rejeitar necessidade inexistente

- **Requisitos:** `RF-19`
- **Dados de teste:** `necessidade_id = 99`.
- **Resultado esperado:** HTTP `404`; nenhuma doação criada.
- **Tipo:** automatizado
- **Arquivo:** [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js)

### CT-05 — Rejeitar IDs inexistentes por chave estrangeira

- **Requisitos:** `RF-19`
- **Pré-condições:** banco MySQL real `conectaacao_test`.
- **Dados de teste:** doador `999` ou necessidade `999`.
- **Resultado esperado:** MySQL rejeita com erro de FK; aplicação retorna HTTP `400`.
- **Tipo:** integração automatizada
- **Arquivo:** [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js)

### CT-06 — Validar status e sequência do acompanhamento

- **Requisitos:** `RF-20`, `RN-03`
- **Dados de teste:** doação iniciada como `Prometida`.
- **Passos:** avançar uma vez e depois novamente.
- **Resultado esperado:** `Prometida -> A caminho -> Entregue`; valor fora da lista é rejeitado pelo `CHECK`.
- **Tipo:** automatizado
- **Arquivo:** [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js) e [`services.test.js`](../../src/back/tests/services.test.js)

### CT-07 — Impedir avanço por outro doador

- **Requisitos:** `RF-20`, `RF-21`
- **Pré-condições:** doação pertencente ao doador `id = 1`.
- **Dados de teste:** usuário autenticado com perfil `id = 99`.
- **Resultado esperado:** HTTP `403`; status não muda.
- **Tipo:** automatizado
- **Arquivo:** [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js)

### CT-08 — Cancelar promessa ou doação em trânsito

- **Requisitos:** `RF-21`, `RN-02`
- **Dados de teste:** doação em `Prometida` ou `A caminho`, quantidade `3`.
- **Resultado esperado:** status `Cancelada`; quantidade devolvida ao `quantidadeFaltante`.
- **Tipo:** automatizado
- **Arquivo:** [`services.test.js`](../../src/back/tests/services.test.js) e [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js)

### CT-09 — Não cancelar doação entregue

- **Requisitos:** `RF-21`, `RN-03`
- **Dados de teste:** doação em `Entregue`.
- **Resultado esperado:** HTTP `409`; nenhum valor de saldo é alterado.
- **Tipo:** automatizado
- **Arquivo:** [`services.test.js`](../../src/back/tests/services.test.js)

### CT-10 — Rejeitar quantidade zero ou negativa

- **Requisitos:** `RF-19`
- **Dados de teste:** quantidade `0` e `-1`.
- **Resultado esperado:** controller usa `inteiroPositivo` e responde HTTP `400`; SQL também rejeita quantidade `0` pelo `CHECK`.
- **Tipo:** unitário e integração
- **Arquivo:** [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) e [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js)

### CT-11 — Garantir rollback da transação

- **Requisitos:** `RF-19`, `RNF-06`
- **Pré-condições:** simular falha ao atualizar `necessidades`.
- **Resultado esperado:** doação inserida é desfeita e o saldo permanece original.
- **Tipo:** automatizado
- **Arquivo:** [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) e [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js)

## 5. Critérios de aprovação

- Todos os casos críticos `CT-01` a `CT-11` devem executar sem falha.
- Nenhum defeito crítico ou alto relacionado a FK, saldo, transação ou status
  pode permanecer aberto.
- Os testes unitários devem passar com `npm test`.
- Os testes de integração devem passar no MySQL 8 com `DB_INTEGRATION=1`.
- O resultado deve ser reexecutado após qualquer correção.

## 6. Primeiras execuções da Sprint 7

| Caso | Data/commit | Resultado | Evidência | Defeito relacionado |
|---|---|---|---|---|
| `CT-01` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-02` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-03` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-04` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-05` | 22/11/2026 / MySQL real não configurado | Não executado | DDL e suíte preparados | N/A |
| `CT-06` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-07` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-08` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-09` | 22/11/2026 / branch local sem commit | Aprovado | [`terminal npm test`, 47 testes] | N/A |
| `CT-10` | 22/11/2026 / branch local sem commit | Aprovado em memória | [`terminal npm test`, 47 testes] | Integração pendente no MySQL real |
| `CT-11` | 22/11/2026 / branch local sem commit | Aprovado em memória | [`terminal npm test`, 47 testes] | Integração pendente no MySQL real |

## 7. Comandos de execução

```bash
cd src/back
npm ci
npm test

# Executar integração real no PowerShell
$env:DB_INTEGRATION="1"
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_USER="root"
$env:DB_PASSWORD="sua-senha"
npm test
```

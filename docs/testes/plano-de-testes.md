# Sprint 7: Estratégia de testes e primeira execução verificável

- **Data de entrega:** 16/11/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-07`
- **Responsáveis pela sprint:** Arthur Veiga (@ArtJamis1208) e Karol Guimarães (@KarolGSMiranda)
- **GitHub Project:** [ConectaAção Backlog](https://github.com/users/gigi-zacaroni/projects/1)

## 1. Pergunta que esta sprint deve responder

**Quais riscos e funcionalidades serão testados, como e com quais resultados iniciais?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** planejar os testes dos fluxos já implementados e executar a primeira rodada com evidência salva.

**Resultado alcançado:**

- O plano define 13 casos de teste (`CT-01` a `CT-13`) ligados aos requisitos.
- Os 12 casos automatizados foram executados. A primeira execução revelou um defeito (DEF-01).
- O defeito foi corrigido e o reteste aprovou os 47 testes.
- O caso manual `CT-13` ficou para a Sprint 8.

## 3. Artefato central (0,75 ponto)

- [x] Objetivo, escopo, tipos e níveis de teste definidos.
- [x] Casos com pré-condição, dados, passos e resultado esperado.
- [x] Primeiros resultados registrados.
- [x] Código de testes em `src/back/tests/`, indicado em `tests/README.md`.
- [x] Defeito encontrado, corrigido e retestado.

| Artefato | Link | O que mudou |
|---|---|---|
| Plano de testes | [`plano-de-testes.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/testes/plano-de-testes.md) | Criado nesta sprint. Traz escopo, riscos, casos, matriz, critérios e resultados. |
| Saída antes da correção | [`execucao-sprint-07-antes.txt`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/testes/evidencias/execucao-sprint-07-antes.txt) | 32 testes aprovados e 15 reprovados. |
| Saída após a correção | [`execucao-sprint-07-depois.txt`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/testes/evidencias/execucao-sprint-07-depois.txt) | 47 testes aprovados e nenhum reprovado. |
| Guia de testes | [`tests/README.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/tests/README.md) | Mapeia cada caso CT para um arquivo de teste. |

## 4. Incremento da aplicação web (0,75 ponto)

### O que evoluiu

A suíte automatizada já existia desde a Sprint 5, mas não estava ligada a casos de teste. Nesta sprint, cada teste passou a cobrir um caso CT. A suíte também passou a rodar de forma confiável no Node 18.

**Defeito DEF-01:** no Node 18, os hooks `beforeEach` e `afterEach` declarados no nível do arquivo não rodavam antes dos testes dentro de um `describe`. O banco em memória não era recriado e 15 testes falhavam. A correção registrou os hooks dentro de cada `describe`.

### Como executar

```bash
cd src/back
npm install
npm test
```

A saída deve terminar com `# fail 0`.

| Requisito | Código de teste | Evidência |
|---|---|---|
| `RF-01`, `RF-02`, `RNF-03` | [`caracterizacao.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/src/back/tests/caracterizacao.test.js) | `CT-01` a `CT-05` na [saída](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/testes/evidencias/execucao-sprint-07-depois.txt) |
| `RF-03` | [`caracterizacao.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/src/back/tests/caracterizacao.test.js), [`services.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/src/back/tests/services.test.js) | `CT-06`, `CT-07` |
| `RF-19`, `RNF-06` | [`caracterizacao.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/src/back/tests/caracterizacao.test.js), [`services.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/src/back/tests/services.test.js) | `CT-08` a `CT-10` |
| `RF-06`, `RF-07`, `RF-10` | [`services.test.js`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/src/back/tests/services.test.js) | `CT-11` |

## 5. Scrum e gestão do trabalho (0,50 ponto)

### Sprint Backlog

| Issue | Item | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| [#33](https://github.com/gigi-zacaroni/tp-eng-software/issues/33) | `D-11` Plano de testes | Arthur e Karol | Casos com pré-condição, dados, passos, resultado esperado e requisito. | Concluída |
| [#34](https://github.com/gigi-zacaroni/tp-eng-software/issues/34) | `T-22` Executar a suíte e salvar a saída | Arthur e Karol | Saída salva e ligada aos casos CT. | Concluída |
| [#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35) | `T-23` Corrigir DEF-01 | Arthur e Karol | Reteste com `# fail 0`. | Concluída |
| [#36](https://github.com/gigi-zacaroni/tp-eng-software/issues/36) | `T-24` Executar o caso manual `CT-13` | Arthur e Karol | Fluxo no navegador com MySQL e capturas salvas. | Pendente (Sprint 8) |

### Acompanhamento

- **Reunião:** [ata da reunião assíncrona](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/reunioes/2026-11-15-planejamento-sprint-07.md).
- **Divisão do trabalho:** Arthur e Karol conduziram os testes. Geovana e Maria Luiza já tinham testado as funcionalidades que desenvolveram.
- **Impedimentos:** o caso manual precisa de MySQL instalado.
- **Mudanças de escopo:** nenhuma.

## 6. GitHub, documentação e rastreabilidade (0,50 ponto)

| Evidência | Link | O que comprova |
|---|---|---|
| Primeira execução | [`4b45a50`](https://github.com/gigi-zacaroni/tp-eng-software/commit/4b45a50ff87a8ebddf1df298452ade24203bc50e) | Saída com os 15 testes reprovados. |
| Correção do DEF-01 | [`43ff986`](https://github.com/gigi-zacaroni/tp-eng-software/commit/43ff986139cdc1bda8cb6acc662861231210666c), [`10f2616`](https://github.com/gigi-zacaroni/tp-eng-software/commit/10f2616756103dcb931425f6681883b19f4c045c) | Hooks movidos para dentro de cada `describe`. |
| Reteste | [`61dabb8`](https://github.com/gigi-zacaroni/tp-eng-software/commit/61dabb8bb3f9d44042f2ebef48b4792e38ccd13e) | Saída com os 47 testes aprovados. |
| Plano de testes | [`551154e`](https://github.com/gigi-zacaroni/tp-eng-software/commit/551154e6681ed2f93e26d9ec52ec5baecd1fe454), [`229900f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/229900f9a521716d7126a77ccb28b4c25e6b3840), [`004a94b`](https://github.com/gigi-zacaroni/tp-eng-software/commit/004a94b09d55352076111cf9aff2c20bb1750f14) | Escopo e riscos, depois casos e matriz, depois resultados. |
| Issue do defeito | [#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35) | Registro do DEF-01. |
| Backlog atualizado | [`backlog-produto.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/backlog-produto.md) | Itens `D-11`, `T-22`, `T-23` e `T-24`. |

### Rastreabilidade

| Item | Requisito | Artefato ou código | Evidência |
|---|---|---|---|
| `CT-01` a `CT-05` | `RF-01`, `RF-02`, `RNF-03` | `caracterizacao.test.js`, `services.test.js` | Reteste aprovado |
| `CT-06`, `CT-07` | `RF-03` | `caracterizacao.test.js`, `services.test.js` | Reteste aprovado |
| `CT-08` a `CT-10` | `RF-18`, `RF-19`, `RNF-06` | `caracterizacao.test.js`, `services.test.js` | Reteste aprovado |
| `CT-11` | `RF-06`, `RF-07`, `RF-10` | `services.test.js` | Aprovado |
| `CT-12` | `RF-01`, `RF-02`, `RF-07`, `RF-19`, `RNF-06` | `repositories.test.js` | Aprovado |
| `CT-13` | `RF-01`, `RF-03`, `RF-19`, `RNF-01` | Roteiro manual no plano | Não executado |

## 7. Revisão do incremento

- **Concluído:** plano de testes, execução dos 12 casos automatizados, correção e reteste do DEF-01.
- **Não concluído:** caso manual `CT-13`.
- **Motivo:** o caso depende de MySQL e de navegador, e a sprint priorizou a suíte automatizada.
- **Ajuste necessário:** registrar as Issues da sprint no GitHub Project.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** reaproveitar os testes da Sprint 5 acelerou o plano.
- **Precisa melhorar:** rodar os testes em mais de uma versão do Node. O DEF-01 passou despercebido por isso.
- **Ação para a Sprint 8:** executar o `CT-13` e consolidar os resultados em `evidencias-testes.md`.

## 9. O que não será considerado suficiente

- Listar tipos de teste sem aplicá-los.
- Casos sem resultado esperado.
- Declarar que todos passaram sem evidência.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-07`:** https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-07
- **Este arquivo na tag:** https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-07/docs/sprints/sprint-07.md

## 11. Testes de persistência do fluxo de doações no banco

Os testes abaixo foram incorporados ao arquivo
[`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js).
Eles usam o banco isolado `conectaacao_test`, criado e carregado pelos scripts
[`reset_test.sql`](../../src/back/sql/reset_test.sql) e
[`seed_test.sql`](../../src/back/sql/seed_test.sql), sem alterar os dados da base
`conectaacao_db` usada pela aplicação.

A massa controlada contém dois doadores (`Ana Souza` e `Bruno Lima`), duas
instituições, três necessidades e duas doações prometidas. Os usuários de teste
usam o e-mail indicado no seed e a senha `segredo123`.

| Caso adicional | Requisitos | Pré-condição e dados | Resultado esperado | Automação |
|---|---|---|---|---|
| `CT-14` — Promessa válida | `RF-19`, `RF-18`, `RN-02` | Banco resetado; doador `id=1`; necessidade `id=1` com saldo `80`; quantidade `5` | Inserção em `doacoes` com status `Prometida` e saldo de `necessidades` reduzido de `80` para `75` | Transação real com `SELECT ... FOR UPDATE`, `INSERT` e `UPDATE` |
| `CT-15` — Doador inexistente | `RF-19` | Inserir doação com `doador_id=999` | MySQL rejeita a chave estrangeira `FK doacoes -> doadores` | `assert.rejects` com `ER_NO_REFERENCED_ROW_2` |
| `CT-16` — Necessidade inexistente | `RF-19` | Inserir doação com `necessidade_id=999` | MySQL rejeita a chave estrangeira `FK doacoes -> necessidades` | `assert.rejects` com `ER_NO_REFERENCED_ROW_2` |
| `CT-17` — Estados da doação | `RF-20`, `RN-03` | Inserir uma doação válida e tentar status fora da lista, depois atualizar para `A caminho` | Status inválido é rejeitado pelo `CHECK`; transição válida atualiza a coluna `status` | Constraint `status IN (...)` e atualização SQL |
| `CT-18` — Quantidade inválida | `RF-19`, `RN-02` | Tentar criar uma doação com quantidade `0` e status `Cancelada` | MySQL rejeita a quantidade pelo `CHECK (quantidade > 0)` | `assert.rejects` com erro de constraint |
| `CT-19` — Rollback e cancelamento | `RF-19`, `RF-21`, `RN-02`, `RNF-06` | Inserir promessa e executar rollback; cancelar doação em `A caminho` com quantidade `5` | O rollback não persiste a promessa; o cancelamento muda `status` para `Cancelada` e devolve o saldo de `75` para `80` | Transação real com `beginTransaction`, `commit` e `rollback` |

### Estrutura e tipos utilizados

Os casos consideram a estrutura física implementada no MySQL 8:

| Entidade | Colunas relevantes | Tipo/rule utilizada no teste |
|---|---|---|
| `doadores` | `id`, `usuario_id`, `nome` | `id` e `usuario_id` como `INT UNSIGNED`; `nome` como `VARCHAR(255)` |
| `instituicoes` | `id`, `usuario_id`, `nome`, `descricao`, `verificada` | `descricao` opcional como `TEXT`; `verificada` como `BOOLEAN` |
| `necessidades` | `quantidadeTotal`, `quantidadeFaltante` | `INT UNSIGNED`; constraint impede total menor ou igual a zero e saldo maior que o total |
| `doacoes` | `doador_id`, `necessidade_id`, `quantidade`, `status`, `dataPromessa` | Quantidade positiva; status limitado a `Prometida`, `A caminho`, `Entregue` e `Cancelada`; data gerada pelo banco |

### Como executar a validação no banco real

```sql
SOURCE caminho/absoluto/para/src/back/sql/reset_test.sql;
SOURCE caminho/absoluto/para/src/back/sql/seed_test.sql;
```

```powershell
cd src/back
$env:DB_INTEGRATION="1"
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_USER="root"
$env:DB_PASSWORD="sua-senha"
npm test
```

**Resultado registrado:** a suíte local registrada no plano possui 47 testes
aprovados. O arquivo de integração real foi preparado com os cenários `CT-14` a
`CT-19`, mas a sua execução no MySQL 8 deve ser registrada como evidência após a
configuração das variáveis de conexão e da execução com
`DB_INTEGRATION=1`.

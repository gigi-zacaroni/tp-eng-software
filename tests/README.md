# Testes

Os testes automatizados do **ConectaAção** ficam junto do back-end, em [`src/back/tests/`](../src/back/tests/), porque dependem dos módulos e do `node_modules` de `src/back`. Esta pasta (`tests/`) é o índice: explica como executar, o que cada arquivo verifica e onde estão as evidências.

Os testes usam o executor nativo do Node (`node:test`), sem Jest nem outras dependências de teste, e **não precisam de MySQL**.

## Documentos relacionados

| Documento | Conteúdo |
|---|---|
| [`docs/testes/plano-de-testes.md`](../docs/testes/plano-de-testes.md) | Planejamento completo e casos de teste (`CT-01` a `CT-24`). |
| [`docs/testes/evidencias-testes.md`](../docs/testes/evidencias-testes.md) | Resultados finais da Sprint 8: totais, defeitos e requisitos atendidos. |
| [`docs/testes/evidencias/`](../docs/testes/evidencias/) | Saídas do `npm test` (Sprints 7 e 8) e capturas dos testes manuais. |
| [`docs/sprints/sprint-07.md`](../docs/sprints/sprint-07.md) | Índice da Sprint 7: fluxo coberto, evidências e defeitos corrigidos. |
| [`docs/rastreabilidade.md`](../docs/rastreabilidade.md) | Vínculo requisito → Issue → código → teste → evidência. |

## Como executar

Requer Node.js 18.11 ou superior.

```bash
cd src/back
npm install
npm test
```

A saída esperada termina com `# fail 0`. Para gravar uma saída legível como evidência (Node 20 ou superior):

```bash
node --test --test-reporter=spec > ../../docs/testes/evidencias/npm-test.txt 2>&1
```

### Testes de integração com MySQL real (opcional)

O arquivo `doacoes-integracao.test.js` só roda com `DB_INTEGRATION=1`; sem a variável, ele é ignorado. Ele usa o banco isolado `conectaacao_test`, recriado a cada cenário com `sql/reset_test.sql` e `sql/seed_test.sql`. Os passos estão no [README do back-end](../src/back/README.md).

## Arquivos

| Arquivo (em `src/back/tests/`) | O que verifica |
|---|---|
| `instituicoes-http.test.js` | **Fluxo prioritário da Sprint 7.** Sobe o app Express real em uma porta efêmera e faz requisições HTTP: cadastro de doador e de instituição (201, 400 e 409), listagem e destaques, e detalhe da instituição (200, 400, 401 e 404). |
| `caracterizacao.test.js` | Cadastro, login e doação de ponta a ponta (controller, service e repository) contra o banco em memória. |
| `repositories.test.js` | SQL, parâmetros e retornos de cada repository. |
| `services.test.js` | Regras dos services com os repositories substituídos por dublês. |
| `doacoes-integracao.test.js` | Fluxo de doações contra MySQL real (opcional, ver acima). |
| `telas-http.test.js` | Páginas e chamadas das telas da Sprint 8 (cadastro, listagem, detalhe, doação), na ordem em que o front as faz (`CT-25`). |
| `helpers/bancoFalso.js` | Banco em memória usado pelos testes de caracterização e pelos testes HTTP. |

## Fluxo prioritário da Sprint 7: instituições

Arquivo: `instituicoes-http.test.js`.

| Cenário | Resultado esperado | Requisito |
|---|---|---|
| Cadastro válido de instituição | `201`, instituição não verificada e necessidades com saldo cheio | `RF-02` |
| Nome, acesso, e-mail, senhas ou quantidade inválidos; descrição que não é texto; nome com mais de 255 caracteres; JSON malformado | `400` com mensagem tratada e nada gravado | `RF-02` |
| E-mail já cadastrado | `409` | `RF-02` |
| Cadastro de doador válido, sem nome ou com corpo vazio | `201` / `400` | `RF-01` |
| `GET /instituicoes` sem token ou com token inválido | `401` | `RF-07` |
| Cadastro, login e listagem | `200`, ordenada por necessidades abertas | `RF-07` |
| `GET /instituicoes/destaques` | `200`, público, no máximo 4 itens | `RF-06` |
| `GET /instituicoes/:id` | `200` com percentual prometido; `404` se não existe; `400` se o id é inválido | `RF-10` |

## Casos de teste × arquivos

| Caso | Arquivo de teste | Requisito |
|---|---|---|
| `CT-01` a `CT-05` | `caracterizacao.test.js`, `services.test.js` | `RF-01`, `RF-02`, `RF-14`, `RNF-03` |
| `CT-06`, `CT-07` | `caracterizacao.test.js`, `services.test.js` | `RF-03` |
| `CT-08` a `CT-10` | `caracterizacao.test.js`, `services.test.js` | `RF-18`, `RF-19`, `RNF-06` |
| `CT-11` | `services.test.js`, `instituicoes-http.test.js` | `RF-06`, `RF-07`, `RF-10` |
| `CT-12` | `repositories.test.js` | `RF-01`, `RF-02`, `RF-07`, `RF-19`, `RNF-06` |
| `CT-13` | Manual, sem arquivo | `RF-01`, `RF-03`, `RF-19`, `RNF-01`, `RNF-03` |
| `CT-14` a `CT-19` | `doacoes-integracao.test.js` (MySQL real) | `RF-18` a `RF-21`, `RNF-06` |
| `CT-20` | `instituicoes-http.test.js` | `RF-01`, `RF-02`, `RF-05` a `RF-07`, `RF-10`, `RNF-04` |
| `CT-21` a `CT-23` | Manual, telas do front-end | `RF-05`, `RF-07` a `RF-10`, `RF-18`, `RF-19`, `RNF-01` |
| `CT-24` | `services.test.js`, `caracterizacao.test.js` | `RF-20`, `RF-21` |
| `CT-25` | `telas-http.test.js` | `RF-01`, `RF-02`, `RF-05`, `RF-07`, `RF-10`, `RF-18`, `RF-19` |

## Evidências

| Execução | Arquivo | Resultado |
|---|---|---|
| Sprint 7, antes da correção do DEF-01 | [`execucao-sprint-07-antes.txt`](../docs/testes/evidencias/execucao-sprint-07-antes.txt) | 32 aprovados, 15 falhas |
| Sprint 7, reteste | [`execucao-sprint-07-depois.txt`](../docs/testes/evidencias/execucao-sprint-07-depois.txt) | 47 aprovados, 0 falhas |
| Sprint 8, sem MySQL | [`execucao-sprint-08-unitarios.txt`](../docs/testes/evidencias/execucao-sprint-08-unitarios.txt) | 80 aprovados, 0 falhas, integração MySQL pulada |

O resumo completo da Sprint 8 está em [`evidencias-testes.md`](../docs/testes/evidencias-testes.md).

## Defeitos encontrados pelos testes automatizados

A numeração segue a tabela de defeitos de [`evidencias-testes.md`](../docs/testes/evidencias-testes.md).

| Defeito | Onde | Correção |
|---|---|---|
| `DEF-01`: hooks no nível do arquivo não rodavam dentro de `describe` no Node 18 e 15 testes falhavam (Sprint 7, Issue #35). | `caracterizacao.test.js`, `services.test.js` | Hooks registrados dentro de cada `describe`. |
| `DEF-02`: a suíte `doacaoService.avancarDoacao e cancelarDoacao` ficou sem o hook da conexão falsa, e 4 testes tentavam conectar ao MySQL (`ECONNREFUSED`). | `src/back/tests/services.test.js` | `usarConexaoFalsa()` incluído no `describe`. |
| `DEF-03`: o cadastro de instituição aceitava `descricao` que não é texto e nome com mais de 255 caracteres, respondendo `201` em vez de `400`. | `src/back/src/services/authService.js` | Validação do tipo da descrição e do tamanho do nome (limite da coluna `VARCHAR(255)`). |

## Limitações

- O banco é simulado. O SQL real só é validado pelo `CT-13`, que roda manualmente contra o MySQL, ou pelo `doacoes-integracao.test.js` com `DB_INTEGRATION=1`.
- O banco falso só entende as instruções SQL que a API usa hoje. Se um repository ganhar uma consulta nova, é preciso ensiná-la ao `helpers/bancoFalso.js`, senão o teste falha com "instrução SQL não suportada".
- Os hooks `beforeEach` e `afterEach` precisam ficar dentro de cada `describe`. No Node 18, um hook no nível do arquivo não roda antes dos testes aninhados, e o banco vaza entre os testes. Esse padrão é a origem do `DEF-01`.

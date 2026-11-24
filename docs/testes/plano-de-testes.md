# Plano de testes

> Criado na Sprint 7 e ampliado na Sprint 8. Responsável: Arthur Veiga (@ArtJamis1208), com Karol Guimarães (@KarolGSMiranda) na Sprint 7.
> Última atualização: 23/11/2026.
>
> Este arquivo diz **o que** testar e **como**. Os resultados da Sprint 8 ficam em [`evidencias-testes.md`](evidencias-testes.md).

## 1. Objetivos e escopo

**Objetivo:** verificar que os fluxos implementados cumprem os requisitos e não perdem dados quando algo falha.

**Dentro do escopo (fluxos implementados):**

| Fluxo | Requisitos | Desde |
|---|---|---|
| Cadastro de doador | `RF-01`, `RNF-03` | Sprint 7 |
| Cadastro de instituição com necessidades iniciais | `RF-02`, `RF-14` | Sprint 7 |
| Login de doador e de instituição | `RF-03` | Sprint 7 |
| Consulta de instituições (destaques, lista e detalhe) | `RF-06`, `RF-07`, `RF-10` | Sprint 7 |
| Promessa de doação limitada ao saldo | `RF-18`, `RF-19`, `RNF-06` | Sprint 7 |
| Acesso protegido às telas e à API | `RF-05`, `RNF-04` | Sprint 8 |
| Avançar e cancelar doação (API) | `RF-20`, `RF-21`, `RN-03` | Sprint 8 |
| Telas de listagem com busca, detalhe e doação em 3 passos | `RF-07` a `RF-10`, `RF-18`, `RF-19`, `RNF-01` | Sprint 8 |
| Persistência real no MySQL 8 (chaves, `CHECK`, transações) | `RF-19` a `RF-21`, `RNF-06` | Sprint 8 |

**Fora do escopo:** favoritos, gestão de necessidades pela instituição, confirmação de recebimento, notificações e validação por administrador (`RF-11` a `RF-13`, `RF-15` a `RF-17`, `RF-22` a `RF-27`). Esses requisitos não têm código na versão final. As telas de "Minhas doações" e do painel também não existem: `RF-20` e `RF-21` são testados só pela API.

## 2. Estratégia

| Nível | Objetivo | Ferramenta | Arquivo | Evidência |
|---|---|---|---|---|
| Unidade (repositories) | Conferir o SQL, os parâmetros e os retornos de cada repository. | `node:test` com dublê do `pool` | [`repositories.test.js`](../../src/back/tests/repositories.test.js) | Saída do `npm test` |
| Unidade (services) | Conferir as regras de negócio com os repositories substituídos por dublês. | `node:test` + `mock` | [`services.test.js`](../../src/back/tests/services.test.js) | Saída do `npm test` |
| Integração (banco em memória) | Exercitar controller, service e repository juntos. | `node:test` + [`bancoFalso.js`](../../src/back/tests/helpers/bancoFalso.js) | [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) | Saída do `npm test` |
| Integração HTTP | Subir o Express real em porta efêmera e chamar as rotas, conferindo status e corpo. | `node:test` + `fetch` + banco em memória | [`instituicoes-http.test.js`](../../src/back/tests/instituicoes-http.test.js), [`telas-http.test.js`](../../src/back/tests/telas-http.test.js) | Saída do `npm test` |
| Integração (MySQL real) | Validar chaves estrangeiras, `CHECK` e transações no MySQL 8. | `node:test` + `mysql2`, banco `conectaacao_test` | [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js) | Saída com `DB_INTEGRATION=1` |
| Sistema (manual) | Percorrer as telas no navegador com MySQL real. | Roteiro manual | `CT-13`, `CT-21` a `CT-23` | Capturas em [`evidencias/sprint-08/`](evidencias/sprint-08/) |

Sem `DB_INTEGRATION=1`, a suíte não precisa de MySQL e o arquivo de integração real aparece como pulado (`skipped`).

**Massa de dados dos testes com MySQL:** os scripts [`reset_test.sql`](../../src/back/sql/reset_test.sql) e [`seed_test.sql`](../../src/back/sql/seed_test.sql) recriam o banco isolado `conectaacao_test`, sem tocar no `conectaacao_db`. A massa tem dois doadores (`ana@email.com`, `bruno@email.com`), duas instituições (`Casa Esperança`, verificada, e `Banco de Alimentos Central`, não verificada), três necessidades e duas doações `Prometida`. Todas as contas usam a senha `segredo123`.

## 3. Riscos e prioridades

| Risco | Probabilidade | Impacto | Prioridade | Requisitos | Casos |
|---|---|---|---|---|---|
| Doação acima do que falta na necessidade | Média | Alta | 1 | `RF-19`, `RNF-06` | `CT-08`, `CT-09`, `CT-23` |
| Cadastro ou doação gravados pela metade após uma falha | Média | Alta | 1 | `RF-01`, `RF-02`, `RNF-06` | `CT-05`, `CT-10`, `CT-19` |
| Quebra de integridade referencial ou status inválido no MySQL | Baixa | Alta | 1 | `RF-19`, `RF-20` | `CT-15` a `CT-18` |
| Senha gravada em texto puro | Baixa | Alta | 1 | `RNF-03` | `CT-01`, `CT-13` |
| Visitante acessando dados protegidos | Média | Alta | 1 | `RF-05`, `RNF-04` | `CT-20`, `CT-21` |
| Doação cancelada sem devolver o saldo | Média | Alta | 1 | `RF-21`, `RN-03` | `CT-19`, `CT-24` |
| Login revela se o e-mail existe | Média | Média | 2 | `RF-03` | `CT-07` |
| E-mail duplicado ou dados inválidos aceitos | Média | Média | 2 | `RF-01`, `RF-02` | `CT-02` a `CT-04`, `CT-20` |
| Busca ou filtros escondendo instituições | Média | Média | 2 | `RF-08`, `RF-09` | `CT-21` |
| Consulta de instituições com dados errados | Baixa | Média | 3 | `RF-06`, `RF-07`, `RF-10` | `CT-11`, `CT-22` |

## 4. Casos de teste

Todos os casos automatizados partem da mesma pré-condição: banco em memória vazio, criado antes de cada teste. A coluna "Testes" indica quantos testes do `npm test` cobrem o caso.

### CT-01 Cadastrar doador com dados válidos

- **Requisitos:** `RF-01`, `RNF-03`
- **Dados:** nome `Ana`, e-mail `ANA@Email.com`, senha e confirmação `segredo123`.
- **Passos:** enviar o cadastro de doador.
- **Resultado esperado:** resposta 201; e-mail gravado em minúsculas; senha gravada como hash; transação confirmada.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (2 testes).

### CT-02 Recusar e-mail já cadastrado

- **Requisitos:** `RF-01`
- **Pré-condição extra:** já existe um usuário com `ana@email.com`.
- **Passos:** cadastrar outro doador com o mesmo e-mail.
- **Resultado esperado:** resposta 409; nenhum usuário ou perfil novo.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (2 testes).

### CT-03 Recusar senha e confirmação diferentes

- **Requisitos:** `RF-01`
- **Dados:** senha `segredo123`, confirmação `outra`.
- **Resultado esperado:** resposta 400 sem abrir transação no banco.
- **Automação:** `caracterizacao.test.js` (1 teste).

### CT-04 Cadastrar instituição com necessidades iniciais

- **Requisitos:** `RF-02`, `RF-14`
- **Dados:** instituição `Abrigo Esperança` com as necessidades `Cobertor` (10) e `Arroz 5kg` (4).
- **Resultado esperado:** instituição criada como não verificada; cada necessidade começa com o saldo igual à quantidade total; descrição vazia vira `null`; necessidade inválida devolve 400 e nada é gravado.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (4 testes).

### CT-05 Desfazer cadastro quando uma gravação falha

- **Requisitos:** `RF-01`, `RF-02`
- **Dados:** falha simulada ao gravar o perfil ou uma necessidade.
- **Resultado esperado:** rollback; não sobra usuário nem instituição órfã.
- **Automação:** `caracterizacao.test.js` (2 testes).

### CT-06 Entrar como doador ou instituição

- **Requisitos:** `RF-03`
- **Pré-condição extra:** conta cadastrada.
- **Resultado esperado:** o token contém `id`, `tipo` e `perfilId`; a instituição recebe o campo `verificada`; o login do doador não consulta a tabela de instituições.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (4 testes).

### CT-07 Recusar login inválido sem revelar o e-mail

- **Requisitos:** `RF-03`
- **Dados:** senha errada para um e-mail existente; e-mail inexistente.
- **Resultado esperado:** as duas tentativas recebem a mesma resposta 401. Um usuário sem perfil recebe 500.
- **Automação:** `caracterizacao.test.js` (2 testes).

### CT-08 Prometer doação dentro do saldo

- **Requisitos:** `RF-18`, `RF-19`
- **Pré-condição extra:** necessidade com saldo 10.
- **Dados:** quantidade 3 e depois quantidade 10, igual ao saldo.
- **Resultado esperado:** doação criada como `Prometida`; o saldo diminui na mesma transação; doar o saldo exato zera a necessidade.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (4 testes).

### CT-09 Recusar doação acima do saldo ou inválida

- **Requisitos:** `RF-19`, `RNF-06`
- **Dados:** quantidade 11 com saldo 10; necessidade 99, que não existe; id `abc` e quantidade -2.
- **Resultado esperado:** 400 acima do saldo e com entrada inválida; 404 para necessidade inexistente; saldo zerado não é confundido com inexistente; nada é gravado.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (6 testes).

### CT-10 Desfazer doação quando a redução do saldo falha

- **Requisitos:** `RNF-06`
- **Dados:** falha simulada ao reduzir o saldo.
- **Resultado esperado:** rollback; a doação inserida é removida e o saldo não muda.
- **Automação:** `caracterizacao.test.js` e `services.test.js` (2 testes).

### CT-11 Consultar instituições

- **Requisitos:** `RF-06`, `RF-07`, `RF-10`
- **Resultado esperado:** os destaques trazem no máximo 4 instituições; a lista não tem limite; o detalhe calcula o total prometido de cada necessidade; instituição inexistente devolve 404.
- **Automação:** `services.test.js` (4 testes).

### CT-12 Conferir o SQL dos repositories

- **Requisitos:** `RF-01`, `RF-02`, `RF-07`, `RF-19`, `RNF-06`
- **Resultado esperado:** cada repository envia o SQL e os parâmetros corretos. A busca de saldo usa `FOR UPDATE` e devolve 0, não `null`, quando o saldo está zerado.
- **Automação:** `repositories.test.js` (14 testes).

### CT-13 Fluxo completo no navegador (manual)

- **Requisitos:** `RF-01`, `RF-03`, `RF-19`, `RNF-01`, `RNF-03`
- **Pré-condições:** banco `conectaacao_test` recriado com `reset_test.sql` e `seed_test.sql`; API rodando com `DB_NAME=conectaacao_test`.
- **Dados:** doador novo `Carla Teste`, e-mail `carla@email.com`, senha `segredo123`; necessidade `Cobertores` (saldo 40) da `Casa Esperança`; quantidade `5`.
- **Passos:**
  1. Abrir `http://localhost:3000`, clicar em "Criar conta" e cadastrar o doador.
  2. Entrar com a conta criada.
  3. Abrir "Instituições", depois `Casa Esperança`.
  4. Clicar em "Quero doar" em `Cobertores`, informar `5`, clicar em "Revisar" e em "Confirmar doação".
  5. No MySQL, consultar `usuarios`, `doacoes` e `necessidades`.
- **Resultado esperado:** a tela "Doação registrada como Prometida" aparece; a doação é gravada como `Prometida`; o saldo de `Cobertores` cai de 40 para 35; a senha de `carla@email.com` está como hash bcrypt (`$2a$...`); do botão "Quero doar" até a confirmação são 3 ações (`RNF-01`).
- **Automação:** não aplicável. O teste depende de navegador e banco real.

### CT-14 a CT-19 Persistência do fluxo de doações no MySQL 8

Casos escritos por Maria Luiza Pestana (@Malupestana) e automatizados em [`doacoes-integracao.test.js`](../../src/back/tests/doacoes-integracao.test.js). Cada caso parte da massa recriada por `reset_test.sql` e `seed_test.sql`.

| Caso | Requisitos | Dados | Resultado esperado |
|---|---|---|---|
| `CT-14` Promessa válida | `RF-18`, `RF-19`, `RN-02` | Doador `id=1`; necessidade `id=1` com saldo `80`; quantidade `5` | Linha em `doacoes` com status `Prometida`; saldo cai de `80` para `75` na mesma transação (`SELECT ... FOR UPDATE`) |
| `CT-15` Doador inexistente | `RF-19` | `doador_id=999` | MySQL rejeita com `ER_NO_REFERENCED_ROW_2` (chave `doacoes -> doadores`) |
| `CT-16` Necessidade inexistente | `RF-19` | `necessidade_id=999` | MySQL rejeita com `ER_NO_REFERENCED_ROW_2` (chave `doacoes -> necessidades`) |
| `CT-17` Estados da doação | `RF-20`, `RN-03` | Status fora da lista; depois `A caminho` | O `CHECK` rejeita o status inválido; a transição válida é gravada |
| `CT-18` Quantidade inválida | `RF-19`, `RN-02` | Quantidade `0` | O `CHECK (quantidade > 0)` rejeita a linha |
| `CT-19` Rollback e cancelamento | `RF-19`, `RF-21`, `RN-02`, `RNF-06` | Promessa seguida de `rollback`; cancelamento de doação `A caminho` com quantidade `5` | O rollback não deixa a promessa; o cancelamento grava `Cancelada` e devolve o saldo de `75` para `80` |

### CT-20 Rotas HTTP de cadastro e consulta

- **Requisitos:** `RF-01`, `RF-02`, `RF-05`, `RF-06`, `RF-07`, `RF-10`, `RNF-04`
- **Pré-condição:** app Express real em porta efêmera, com o banco em memória.
- **Resultado esperado:**
  - Cadastro válido: 201.
  - Dados inválidos, nome com mais de 255 caracteres ou descrição numérica: 400, sem gravar nada.
  - E-mail repetido: 409.
  - `GET /instituicoes` sem token ou com token inválido: 401.
  - Destaques: públicos, no máximo 4.
  - Detalhe: 404 para id inexistente e 400 para id inválido.
- **Automação:** [`instituicoes-http.test.js`](../../src/back/tests/instituicoes-http.test.js) (20 testes), escrito por Geovana Zacaroni (@gigi-zacaroni).

### CT-21 Listagem, busca e acesso protegido (manual)

- **Requisitos:** `RF-05`, `RF-07`, `RF-08`, `RF-09`
- **Pré-condições:** as mesmas do `CT-13`; navegador sem sessão.
- **Passos e resultado esperado:**
  1. Sem login, abrir `/pages/instituicoes.html`. **Esperado:** vai para o login; depois de entrar como `ana@email.com`, volta para a listagem.
  2. Ver a listagem. **Esperado:** 2 instituições cadastradas, cada uma com o link "Ver detalhe".
  3. Buscar `esperanca`, sem acento. **Esperado:** só `Casa Esperança`.
  4. Limpar a busca e marcar "Só verificadas". **Esperado:** só `Casa Esperança`.
  5. Buscar `xyz`. **Esperado:** estado vazio "Nenhuma instituição com esses filtros"; o botão "Limpar filtros" restaura as 2.
- **Automação:** não aplicável.

### CT-22 Detalhe com progresso das necessidades (manual)

- **Requisitos:** `RF-10`, `RF-18`
- **Pré-condições:** as mesmas do `CT-13`; logado como `ana@email.com`.
- **Passos:** abrir o detalhe da `Casa Esperança`.
- **Resultado esperado:** selo "Verificada"; `Arroz 5kg` com "20 de 100 prometidos", 20% e status `Parcial`; `Cobertores` com "0 de 40 prometidos", 0% e status `Aberta`; abrir `/pages/instituicao.html?id=999` mostra "Instituição não encontrada.".
- **Automação:** não aplicável.

### CT-23 Doação pela interface limitada ao saldo (manual)

- **Requisitos:** `RF-19`, `RN-02`, `RNF-01`, `RNF-06`
- **Pré-condições:** as mesmas do `CT-22`.
- **Passos e resultado esperado:**
  1. Em `Arroz 5kg` (falta 80), clicar em "Quero doar" e digitar `81`. **Esperado:** erro "O máximo para este item é 80." e o botão "Revisar" desabilitado.
  2. Digitar `0`. **Esperado:** erro de número inteiro maior que zero.
  3. Digitar `10`, revisar e confirmar. **Esperado:** tela de confirmação com item, quantidade e número da doação. Voltando ao detalhe, falta `70`.
  4. Entrar como a instituição `esperanca@email.com` e abrir o próprio detalhe. **Esperado:** nenhum botão "Quero doar" (só doador doa).
- **Automação:** não aplicável. A mesma regra no servidor é coberta por `CT-09` e `CT-14`.

### CT-24 Avançar e cancelar doação pela API

- **Requisitos:** `RF-20`, `RF-21`, `RN-03`
- **Dados:** doação `Prometida` do próprio doador; doação de outro doador; doação `Entregue`.
- **Resultado esperado:** avançar segue `Prometida -> A caminho -> Entregue` e depois devolve 409; outro doador recebe 403; cancelar grava `Cancelada` e devolve o saldo; doação `Entregue` não pode ser cancelada (409).
- **Automação:** `services.test.js` e `caracterizacao.test.js` (6 testes), escritos por Maria Luiza Pestana.

### CT-25 Páginas e chamadas das telas novas

- **Requisitos:** `RF-01`, `RF-02`, `RF-05`, `RF-07`, `RF-10`, `RF-18`, `RF-19`, `RN-02`
- **Pré-condição:** app Express real em porta efêmera, com o banco em memória.
- **Dados:** os mesmos que as telas enviam. Instituição `Casa Esperança` com `Cobertores` (quantidade `"40"`), doador `carla@email.com` e doações de `41` e `5`.
- **Resultado esperado:**
  - Páginas e módulos JS: 200.
  - Cadastros: 201. O login devolve `tipo` e `perfil.nome`.
  - Listagem: 401 sem token. Com token, traz os campos dos cards.
  - Doar 41: 400. Doar 5: 201, e o detalhe passa a mostrar falta `35` e 13%.
  - Instituição: consulta o detalhe, mas recebe 403 ao tentar doar.
- **Automação:** [`telas-http.test.js`](../../src/back/tests/telas-http.test.js) (5 testes). Não substitui o `CT-21` a `CT-23`, que olham a tela no navegador.

## 5. Matriz requisito × caso de teste

| Requisito | Casos |
|---|---|
| `RF-01` | CT-01, CT-02, CT-03, CT-05, CT-12, CT-13, CT-20, CT-25 |
| `RF-02` | CT-04, CT-05, CT-12, CT-20, CT-25 |
| `RF-03` | CT-06, CT-07, CT-13 |
| `RF-05` | CT-20, CT-21, CT-25 |
| `RF-06` | CT-11, CT-20 |
| `RF-07` | CT-11, CT-12, CT-20, CT-21, CT-25 |
| `RF-08`, `RF-09` | CT-21 |
| `RF-10` | CT-11, CT-20, CT-22, CT-25 |
| `RF-14` | CT-04 |
| `RF-18` | CT-08, CT-14, CT-22, CT-25 |
| `RF-19` | CT-08, CT-09, CT-12, CT-13, CT-14 a CT-16, CT-18, CT-19, CT-23, CT-25 |
| `RF-20` | CT-17, CT-24 |
| `RF-21` | CT-19, CT-24 |
| `RNF-01` | CT-13, CT-23 |
| `RNF-03` | CT-01, CT-13 |
| `RNF-04` | CT-20 |
| `RNF-06` | CT-09, CT-10, CT-12, CT-19, CT-23 |

## 6. Critérios de aprovação

- **Entrada:** `npm install` sem erro; para os casos com MySQL, `reset_test.sql` e `seed_test.sql` aplicados antes da execução.
- **Caso automatizado:** aprovado quando todos os seus testes passam.
- **Caso manual:** aprovado quando todos os resultados esperados dos passos aparecem e ficam registrados em captura.
- **Saída da sprint:** todos os casos de prioridade 1 aprovados e nenhum defeito crítico aberto.
- Um caso reprovado gera uma Issue com a label `bug` e só volta a ser aprovado após o reteste.

## 7. Histórico: primeiras execuções da Sprint 7

Os resultados da Sprint 8 estão em [`evidencias-testes.md`](evidencias-testes.md).

| Caso | 1ª execução | Reteste após DEF-01 |
|---|---|---|
| CT-01 | Aprovado | Aprovado |
| CT-02 | Reprovado | Aprovado |
| CT-03 | Reprovado | Aprovado |
| CT-04 | Reprovado | Aprovado |
| CT-05 | Reprovado | Aprovado |
| CT-06 | Aprovado | Aprovado |
| CT-07 | Reprovado | Aprovado |
| CT-08 | Reprovado | Aprovado |
| CT-09 | Reprovado | Aprovado |
| CT-10 | Reprovado | Aprovado |
| CT-11 | Aprovado | Aprovado |
| CT-12 | Aprovado | Aprovado |
| CT-13 | Não executado | Planejado para a Sprint 8 |

**Totais:** a 1ª execução teve 32 testes aprovados e 15 reprovados ([saída](evidencias/execucao-sprint-07-antes.txt)). O reteste teve 47 aprovados e nenhum reprovado ([saída](evidencias/execucao-sprint-07-depois.txt)). Ambiente: Node 18.16.1, base no commit `01f10c2`.

### Defeito DEF-01: estado vazando entre testes no Node 18

- **Sintoma:** 15 testes falharam com "Já existe uma conta com este e-mail".
- **Causa:** os hooks `beforeEach` e `afterEach` estavam no nível do arquivo. No Node 18, aceito pelo `package.json` (`>=18.11`), esses hooks não rodam antes dos testes dentro de um `describe`. O banco em memória não era recriado e um teste via os dados do anterior.
- **Correção:** registrar os hooks dentro de cada `describe` em [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) e [`services.test.js`](../../src/back/tests/services.test.js).
- **Severidade:** alta para a confiabilidade da suíte. O código da aplicação não tinha defeito.
- **Issue:** [#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35).

## 8. Comandos de execução

```bash
cd src/back
npm install
npm test
```

O resultado esperado é `# fail 0` ao final da saída.

Para incluir o MySQL real (`CT-14` a `CT-19`), aplique os scripts e rode a suíte com a variável de ambiente:

```powershell
mysql -u root -p < src/back/sql/reset_test.sql
mysql -u root -p < src/back/sql/seed_test.sql
cd src/back
$env:DB_INTEGRATION="1"; npm test
```

Para os casos manuais (`CT-13`, `CT-21` a `CT-23`), suba a API apontando para o banco de teste (`DB_NAME=conectaacao_test` no `.env`) com `npm start` e abra `http://localhost:3000`.

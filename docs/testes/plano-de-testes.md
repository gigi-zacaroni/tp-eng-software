# Plano de testes

> Artefato central da Sprint 7. Responsáveis: Arthur Veiga (@ArtJamis1208) e Karol Guimarães (@KarolGSMiranda).
> Última atualização: 16/11/2026.

## 1. Objetivos e escopo

**Objetivo:** verificar que os fluxos já implementados cumprem os requisitos e não perdem dados quando algo falha.

**Dentro do escopo (fluxos implementados):**

| Fluxo | Requisitos |
|---|---|
| Cadastro de doador | `RF-01`, `RNF-03` |
| Cadastro de instituição com necessidades iniciais | `RF-02`, `RF-14` |
| Login de doador e de instituição | `RF-03` |
| Consulta de instituições (destaques, lista e detalhe) | `RF-06`, `RF-07`, `RF-10` |
| Promessa de doação limitada ao saldo | `RF-18`, `RF-19`, `RNF-06` |

**Fora do escopo neste ciclo:** favoritos, gestão de necessidades, acompanhamento de doações e notificações (`RF-12`, `RF-13`, `RF-15` a `RF-17`, `RF-20` a `RF-27`). Esses requisitos ainda não têm código. Os RNFs de interface (`RNF-02`, `RNF-08` a `RNF-10`) ficam para a Sprint 8.

## 2. Estratégia

| Nível | Objetivo | Ferramenta | Arquivo | Evidência |
|---|---|---|---|---|
| Unidade (repositories) | Conferir o SQL, os parâmetros e os retornos de cada repository. | `node:test` com dublê do `pool` | [`repositories.test.js`](../../src/back/tests/repositories.test.js) | Saída do `npm test` |
| Unidade (services) | Conferir as regras de negócio com os repositories substituídos por dublês. | `node:test` + `mock` | [`services.test.js`](../../src/back/tests/services.test.js) | Saída do `npm test` |
| Integração | Exercitar controller, service e repository juntos contra um banco em memória. | `node:test` + [`bancoFalso.js`](../../src/back/tests/helpers/bancoFalso.js) | [`caracterizacao.test.js`](../../src/back/tests/caracterizacao.test.js) | Saída do `npm test` |
| Sistema (manual) | Percorrer o fluxo completo no navegador com MySQL real. | Roteiro manual | `CT-13` deste plano | Capturas em [`evidencias/`](evidencias/) |

Os testes automatizados não precisam de MySQL. O SQL real só é validado no teste de sistema.

## 3. Riscos e prioridades

| Risco | Probabilidade | Impacto | Prioridade | Requisitos | Casos |
|---|---|---|---|---|---|
| Doação acima do que falta na necessidade | Média | Alta | 1 | `RF-19`, `RNF-06` | `CT-08`, `CT-09` |
| Cadastro ou doação gravados pela metade após uma falha | Média | Alta | 1 | `RF-01`, `RF-02`, `RNF-06` | `CT-05`, `CT-10` |
| Senha gravada em texto puro | Baixa | Alta | 1 | `RNF-03` | `CT-01` |
| Login revela se o e-mail existe | Média | Média | 2 | `RF-03` | `CT-07` |
| E-mail duplicado ou dados inválidos aceitos | Média | Média | 2 | `RF-01`, `RF-02` | `CT-02` a `CT-04` |
| Consulta de instituições com dados errados | Baixa | Média | 3 | `RF-06`, `RF-07`, `RF-10` | `CT-11` |

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
- **Pré-condições:** MySQL com o [`schema.sql`](../../src/back/sql/schema.sql) aplicado; API rodando; uma instituição com necessidade aberta.
- **Passos:**
  1. Abrir `http://localhost:3000` e criar uma conta de doador.
  2. Entrar com a conta criada.
  3. Prometer uma doação para a necessidade aberta.
  4. Consultar a tabela `usuarios` no MySQL.
- **Resultado esperado:** a doação aparece como `Prometida`; o saldo diminui; a senha está como hash; o passo 3 usa no máximo 3 ações.
- **Automação:** não aplicável. O teste depende de navegador e banco real.

## 5. Matriz requisito × caso de teste

| Requisito | Casos |
|---|---|
| `RF-01` | CT-01, CT-02, CT-03, CT-05, CT-12, CT-13 |
| `RF-02` | CT-04, CT-05, CT-12 |
| `RF-03` | CT-06, CT-07, CT-13 |
| `RF-06`, `RF-07`, `RF-10` | CT-11 (e CT-12 para `RF-07`) |
| `RF-14` | CT-04 |
| `RF-18` | CT-08 |
| `RF-19` | CT-08, CT-09, CT-12, CT-13 |
| `RNF-01` | CT-13 |
| `RNF-03` | CT-01, CT-13 |
| `RNF-06` | CT-09, CT-10, CT-12 |

## 6. Critérios de aprovação

- Um caso é aprovado quando todos os seus testes passam.
- A sprint é aprovada quando todos os casos de prioridade 1 passam e não há defeito crítico aberto.
- Um caso reprovado gera uma Issue com a label `bug` e só volta a ser aprovado após o reteste.

## 8. Comandos de execução

```bash
cd src/back
npm install
npm test
```

O resultado esperado é `# fail 0` ao final da saída.

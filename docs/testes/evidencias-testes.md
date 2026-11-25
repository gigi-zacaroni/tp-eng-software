# Evidências e resultados finais dos testes

> Artefato central da Sprint 8, atualizado na entrega final. Responsável: Arthur Veiga (@ArtJamis1208).
> Última atualização: 25/11/2026. Versão testada: `main` em `e65bceb`. Node 22.17.1.
>
> O plano (o que testar e como) está em [`plano-de-testes.md`](plano-de-testes.md). Este arquivo registra o que foi executado e o resultado.

## 1. Resumo

**Por caso de teste:**

| Total planejado | Executado | Aprovado | Reprovado | Não executado |
|---:|---:|---:|---:|---:|
| 26 | 16 | 16 | 0 | 10 |

**Por teste automatizado (`npm test`):**

| Testes na suíte | Aprovados | Reprovados |
|---:|---:|---:|
| 88 | 88 | 0 |

- A suíte do MySQL real (`CT-14` a `CT-19`) aparece como pulada (`SKIP`). Ela só roda com `DB_INTEGRATION=1`. Saída: [`execucao-final-unitarios.txt`](evidencias/execucao-final-unitarios.txt).
- O `CT-13` e os casos de tela (`CT-21` a `CT-23`) são manuais e dependem do MySQL. O `CT-25` confere, sem navegador, todas as chamadas que as telas fazem à API.
- Tudo o que foi executado passou. Faltam o SQL real e a revisão das telas no navegador.

## 2. Resultados por caso

As saídas estão em [`execucao-sprint-08-unitarios.txt`](evidencias/execucao-sprint-08-unitarios.txt) (23/11, Sprint 8) e [`execucao-final-unitarios.txt`](evidencias/execucao-final-unitarios.txt) (25/11, entrega final).

| Caso | Requisito | Resultado | Última execução | Observação |
|---|---|---|---|---|
| `CT-01` Cadastro de doador válido | `RF-01`, `RNF-03` | Aprovado | 25/11 | Senha gravada como hash. |
| `CT-02` E-mail repetido | `RF-01` | Aprovado | 25/11 | Reprovado na 1ª execução da Sprint 7 (DEF-01). |
| `CT-03` Senhas diferentes | `RF-01` | Aprovado | 25/11 | |
| `CT-04` Instituição com necessidades | `RF-02`, `RF-14` | Aprovado | 25/11 | |
| `CT-05` Rollback do cadastro | `RF-01`, `RF-02` | Aprovado | 25/11 | |
| `CT-06` Login | `RF-03` | Aprovado | 25/11 | |
| `CT-07` Login inválido | `RF-03` | Aprovado | 25/11 | Mesma resposta 401 para senha errada e e-mail inexistente. |
| `CT-08` Doação dentro do saldo | `RF-18`, `RF-19` | Aprovado | 25/11 | |
| `CT-09` Doação acima do saldo | `RF-19`, `RNF-06` | Aprovado | 25/11 | |
| `CT-10` Rollback da doação | `RNF-06` | Aprovado | 25/11 | |
| `CT-11` Consulta de instituições | `RF-06`, `RF-07`, `RF-10` | Aprovado | 25/11 | |
| `CT-12` SQL dos repositories | `RF-01`, `RF-02`, `RF-07`, `RF-19`, `RNF-06` | Aprovado | 25/11 | 17 testes. |
| `CT-13` Fluxo completo no navegador | `RF-01`, `RF-03`, `RF-19`, `RNF-01`, `RNF-03` | Não executado | | Manual, depende do MySQL (Issue #36). |
| `CT-14` a `CT-19` Persistência no MySQL 8 | `RF-18` a `RF-21`, `RNF-06` | Não executado | | Código pronto em `doacoes-integracao.test.js`; falta rodar com `DB_INTEGRATION=1`. Conta como 6 casos. |
| `CT-20` Rotas HTTP de cadastro e consulta | `RF-01`, `RF-02`, `RF-05` a `RF-07`, `RF-10`, `RNF-04` | Aprovado | 25/11 | 20 testes. Revelou o DEF-03. |
| `CT-21` Listagem, busca e filtros no navegador | `RF-05`, `RF-07` a `RF-09` | Não executado | | Manual, depende do MySQL. |
| `CT-22` Detalhe no navegador | `RF-10`, `RF-18` | Não executado | | Manual, depende do MySQL. |
| `CT-23` Doação pela interface | `RF-19`, `RN-02`, `RNF-01` | Não executado | | Manual. A regra de saldo no servidor é coberta por `CT-09` e `CT-25`. |
| `CT-24` Cancelar doação e respostas da instituição | `RF-20` a `RF-23`, `RN-03`, `RN-04` | Aprovado | 25/11 | 10 testes. Revelou o DEF-02. |
| `CT-25` Front servido e chamadas das telas | `RF-01`, `RF-02`, `RF-05`, `RF-07`, `RF-10`, `RF-14`, `RF-18` a `RF-23` | Aprovado | 25/11 | 7 testes. Revelou o DEF-07. |
| `CT-26` Cadastrar necessidade pela instituição | `RF-14` | Aprovado | 25/11 | |

**Histórico:** na Sprint 7, a 1ª execução teve 32 aprovados e 15 reprovados ([saída](evidencias/execucao-sprint-07-antes.txt)). O reteste teve 47 aprovados ([saída](evidencias/execucao-sprint-07-depois.txt)). Na Sprint 8 a suíte chegou a 80 testes executados. Na entrega final chegou a 88:

- `instituicoes-http.test.js`, da Geovana;
- `doacoes-integracao.test.js`, os testes de cancelar doação e os de recebidas, aceitar, recusar e nova necessidade, da Maria Luiza;
- `telas-http.test.js`, do Arthur, ampliado na entrega final para minhas doações e o painel da instituição.

## 3. Defeitos encontrados

| Defeito | Severidade | Como foi achado | Situação | Correção | Reteste |
|---|---|---|---|---|---|
| `DEF-01` Hooks de teste não rodavam no Node 18 e 15 testes falhavam ([#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35)) | Alta | 1ª execução da Sprint 7 | Corrigido | [`43ff986`](https://github.com/gigi-zacaroni/tp-eng-software/commit/43ff986), [`10f2616`](https://github.com/gigi-zacaroni/tp-eng-software/commit/10f2616) | Aprovado |
| `DEF-02` 4 testes de doação tentavam usar o MySQL (`ECONNREFUSED`) ([#38](https://github.com/gigi-zacaroni/tp-eng-software/issues/38)) | Média | `CT-24` | Corrigido | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f) | Aprovado |
| `DEF-03` Cadastro de instituição aceitava descrição numérica e nome com mais de 255 caracteres ([#39](https://github.com/gigi-zacaroni/tp-eng-software/issues/39)) | Média | `CT-20` | Corrigido | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f) | Aprovado |
| `DEF-04` Plano de testes sobrescrito pelo texto do `sprint-07.md` ([#40](https://github.com/gigi-zacaroni/tp-eng-software/issues/40)) | Média | Revisão de QA | Corrigido | [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a) | Aprovado |
| `DEF-05` Landing sem destaques e login sem estilo ([#41](https://github.com/gigi-zacaroni/tp-eng-software/issues/41)) | Alta | Revisão de QA | Corrigido e depois substituído | [`8959059`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8959059), [`2ef61ff`](https://github.com/gigi-zacaroni/tp-eng-software/commit/2ef61ff) | As telas antigas saíram na entrega final. A home e o login do `app.js` são cobertos pelo `CT-25`. Falta conferir no navegador. |
| `DEF-06` Senha real do MySQL no `.env.example` ([#42](https://github.com/gigi-zacaroni/tp-eng-software/issues/42)) | Alta | Revisão de QA | Corrigido no arquivo | [`c646b42`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c646b42) | Falta trocar a senha no MySQL, porque ela continua no histórico do Git. |
| `DEF-07` O `index.html` carregava `js/backend-integration.js`, que nunca foi versionado (404) | Média | `CT-25` ampliado na entrega final | Corrigido | [`4eff1f4`](https://github.com/gigi-zacaroni/tp-eng-software/commit/4eff1f4) | Aprovado |

Notas:

- A Geovana achou e corrigiu o DEF-02 e o DEF-03. A saída com as falhas não foi salva. A evidência é o commit e o reteste.
- O DEF-04 veio do commit `5e1ca6c`. O DEF-05 e o DEF-06 vieram do commit `4c29f80`. O DEF-07 veio do commit `d393149`.

## 4. Requisitos × resultado final

**Legenda:** *Atendido*: implementado e com teste aprovado. *Parcial*: só parte do requisito existe. *Não atendido*: sem código na versão final. *Não verificado*: depende de medição que não foi feita. "No navegador" indica dado guardado no `localStorage`, sem teste automatizado.

| Requisito | Situação | Casos | Observação |
|---|---|---|---|
| `RF-01` Cadastro de doador | Atendido | `CT-01` a `CT-03`, `CT-05`, `CT-20`, `CT-25` | |
| `RF-02` Cadastro de instituição | Atendido | `CT-04`, `CT-05`, `CT-20`, `CT-25` | Necessidade inicial opcional. |
| `RF-03` Login | Atendido | `CT-06`, `CT-07`, `CT-25` | |
| `RF-04` Encerrar sessão | Atendido | Sem caso automatizado | O front descarta o token. O JWT continua válido até expirar (8 h). |
| `RF-05` Acesso restrito | Atendido | `CT-20`, `CT-25` | A API devolve 401 sem token; o front manda para "Entrar". |
| `RF-06` Página inicial pública | Atendido | `CT-11`, `CT-20`, `CT-25` | Destaques vêm de `GET /instituicoes/destaques`. |
| `RF-07` Listar instituições | Atendido | `CT-11`, `CT-20`, `CT-25` | Causa e cidade no navegador. |
| `RF-08` Buscar | Atendido | `CT-21` não executado | Busca no navegador. |
| `RF-09` Filtrar | Atendido | `CT-21` não executado | Filtros e dados no navegador. |
| `RF-10` Detalhe da instituição | Atendido | `CT-11`, `CT-20`, `CT-25` | Contato no navegador. |
| `RF-11` Selo "Verificada" | Não atendido | | Sem administrador nem selo na tela. |
| `RF-12`, `RF-13` Favoritos | Não atendido | | Fora do escopo final. |
| `RF-14` Cadastrar necessidade | Atendido | `CT-04`, `CT-25`, `CT-26` | Item e quantidade no banco; tipo, categoria, prioridade e descrição no navegador. |
| `RF-15` a `RF-17` Editar, excluir e pausar necessidade | Não atendido | | Sem rotas nem telas. |
| `RF-18` Progresso da necessidade | Atendido | `CT-08`, `CT-25` | Desejado, prometido, falta e percentual. |
| `RF-19` Prometer doação | Atendido | `CT-08` a `CT-10`, `CT-12`, `CT-25` | Persistência real (`CT-14`) e teste manual (`CT-23`) pendentes. |
| `RF-20` Acompanhar doações | Atendido | `CT-24`, `CT-25` | Tela "Minhas doações" com `GET /doacoes/minhas`. |
| `RF-21` Cancelar doação | Atendido | `CT-24`, `CT-25` | Devolve o saldo. |
| `RF-22` Doações recebidas | Atendido | `CT-25` | Tela "Doações recebidas" com `GET /doacoes/recebidas`. |
| `RF-23` Responder e confirmar doação | Atendido | `CT-24`, `CT-25` | Aceitar, recusar e confirmar recebimento. |
| `RF-24` Resumo por necessidade | Parcial | `CT-25` | Sem o total recebido. |
| `RF-25` a `RF-27` Notificações | Não atendido | | Sem rotas nem telas. |
| `RNF-01` Doação em até 3 passos | Atendido | `CT-23` não executado | O fluxo tem 3 passos: "Quero ajudar", preencher e confirmar. Sem execução manual registrada. |
| `RNF-02` Responsividade | Não verificado | | Sem teste em 390 px. |
| `RNF-03` Senha com hash | Atendido | `CT-01` | bcrypt. |
| `RNF-04` Privacidade do contato | Atendido | `CT-20`, `CT-25` | O contato só aparece em telas que exigem login. |
| `RNF-05` Sem pagamento | Atendido | Revisão das telas | Nenhum formulário pede dados de pagamento. |
| `RNF-06` Integridade do saldo | Atendido | `CT-09`, `CT-10`, `CT-12`, `CT-25` | `SELECT ... FOR UPDATE` na transação. MySQL real (`CT-19`) pendente. |
| `RNF-07` Excluir necessidade preserva doações | Não se aplica | | Não existe exclusão (`RF-16`). |
| `RNF-08` Listagem em até 2 s | Não verificado | | Sem medição. |
| `RNF-09` Chrome, Firefox e Edge | Não verificado | | Sem teste em vários navegadores. |
| `RNF-10` Acessibilidade | Não verificado | | Sem auditoria de contraste nem de teclado. |

**Totais:** 27 RF, sendo 17 atendidos, 1 parcial e 9 não atendidos. 10 RNF, sendo 5 atendidos, 1 que não se aplica e 4 não verificados. Os números batem com o [documento de requisitos](../requisitos/requisitos.md).

## 5. Arquivos de evidência

| Arquivo | O que mostra | Casos |
|---|---|---|
| [`execucao-final-unitarios.txt`](evidencias/execucao-final-unitarios.txt) | Suíte da entrega final: 88 aprovados, 0 falhas, MySQL real pulado | `CT-01` a `CT-12`, `CT-20`, `CT-24` a `CT-26` |
| [`execucao-sprint-08-unitarios.txt`](evidencias/execucao-sprint-08-unitarios.txt) | Suíte da Sprint 8: 80 aprovados, 0 falhas, 7 pulados | `CT-01` a `CT-12`, `CT-20`, `CT-24`, `CT-25` |
| [`execucao-sprint-07-antes.txt`](evidencias/execucao-sprint-07-antes.txt) | 1ª execução da Sprint 7, com o DEF-01 | `CT-01` a `CT-12` |
| [`execucao-sprint-07-depois.txt`](evidencias/execucao-sprint-07-depois.txt) | Reteste da Sprint 7 após o DEF-01 | `CT-01` a `CT-12` |

Ainda não há capturas de tela dos casos manuais.

## 6. Como fechar os casos pendentes

Quem tem o MySQL configurado roda, na raiz do repositório:

```powershell
mysql -u root -p < src/back/sql/reset_test.sql
mysql -u root -p < src/back/sql/seed_test.sql
cd src/back
$env:DB_INTEGRATION="1"; node --test --test-reporter=spec > ../../docs/testes/evidencias/execucao-final-integracao.txt
```

O resultado esperado é `fail 0` e nenhum teste pulado. Isso fecha `CT-14` a `CT-19`.

Depois:

1. Rode o `seed_test.sql` de novo, porque os testes de integração alteram a massa.
2. Suba a API com `DB_NAME=conectaacao_test` no `src/back/.env`.
3. Siga os roteiros do `CT-13` e do `CT-21` a `CT-23` no [plano](plano-de-testes.md).
4. Salve uma captura por passo em `evidencias/`.
5. Atualize as linhas desses casos neste arquivo.

## 7. Limitações conhecidas e trabalho futuro

**Limitações:**

- **SQL real:** o `bancoFalso.js` não valida tipos, `CHECK` nem chaves estrangeiras. Isso só fica coberto quando o `CT-14` a `CT-19` rodarem.
- **Telas:** o `CT-25` confere as chamadas à API, mas não o layout, o foco nem as mensagens na tela.
- **Dados no navegador:** cidade, causa, tipo, prioridade, descrição da necessidade e contato da instituição ficam no `localStorage`. Outro navegador não vê esses dados.
- **Sem código:** favoritos, editar, excluir e pausar necessidade, total recebido, notificações e administrador.
- **Senha exposta (DEF-06):** ainda precisa ser trocada no MySQL.
- **Desempenho, navegadores e acessibilidade:** sem medição (`RNF-02`, `RNF-08` a `RNF-10`).

**Trabalho futuro, em ordem:**

1. Rodar os casos pendentes.
2. Levar para o banco os dados que hoje ficam no navegador.
3. Registrar o total recebido por necessidade (`RF-24`, `RN-05`).
4. Editar, excluir e pausar necessidade (`RF-15` a `RF-17`).

## 8. Conclusão da validação

O fluxo principal funciona de ponta a ponta pela API e pelas telas. O doador se cadastra, entra, encontra uma necessidade, promete uma doação limitada ao saldo, acompanha e cancela. A instituição publica necessidades, aceita, recusa e confirma o recebimento. A suíte tem 88 testes, todos aprovados. Os sete defeitos encontrados foram corrigidos. Só falta trocar a senha exposta (DEF-06).

A solução ainda não está completa:

- 10 casos dependem do MySQL ou do navegador e não foram executados. O roteiro está na seção 6.
- 10 dos 27 requisitos funcionais estão parciais ou sem código.

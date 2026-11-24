# Evidências e resultados finais dos testes

> Artefato central da Sprint 8. Responsável: Arthur Veiga (@ArtJamis1208).
> Última atualização: 23/11/2026. Versão testada: branch `sprint-08/validacao-front`, sobre o `main` em `5b1cf4f`. Node 18.16.1.
>
> O plano (o que testar e como) está em [`plano-de-testes.md`](plano-de-testes.md). Este arquivo registra o que foi executado e o resultado.

## 1. Resumo executivo

**Por caso de teste:**

| Total planejado | Executado | Aprovado | Reprovado | Não executado |
|---:|---:|---:|---:|---:|
| 25 | 15 | 15 | 0 | 10 |

**Por teste automatizado (`npm test`):**

| Testes na suíte | Aprovados | Reprovados | Pulados |
|---:|---:|---:|---:|
| 87 | 80 | 0 | 7 |

- Os 7 pulados são os testes de MySQL real (`CT-14` a `CT-19`). Eles só rodam com `DB_INTEGRATION=1`, e o MySQL ficou com a Geovana. Saída: [`execucao-sprint-08-unitarios.txt`](evidencias/execucao-sprint-08-unitarios.txt).
- O `CT-13` e os casos de tela (`CT-21` a `CT-23`) também dependem do MySQL. O `CT-25` já confere, sem navegador, as chamadas que essas telas fazem à API.
- **Leitura:** tudo o que foi executado passou. Regras de negócio e rotas HTTP estão bem cobertas. Faltam o SQL real e a revisão das telas no navegador.

## 2. Resultados por caso

| Caso | Requisito | Resultado | Data/commit | Evidência | Observação |
|---|---|---|---|---|---|
| `CT-01` Cadastro de doador válido | `RF-01`, `RNF-03` | Aprovado | 23/11, [`7e95ea4`](https://github.com/gigi-zacaroni/tp-eng-software/commit/7e95ea4) | [saída](evidencias/execucao-sprint-08-unitarios.txt) | Senha gravada como hash. |
| `CT-02` E-mail repetido | `RF-01` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | Era reprovado na 1ª execução da Sprint 7 (DEF-01). |
| `CT-03` Senhas diferentes | `RF-01` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-04` Instituição com necessidades | `RF-02`, `RF-14` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-05` Rollback do cadastro | `RF-01`, `RF-02` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-06` Login | `RF-03` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-07` Login inválido | `RF-03` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | Mesma resposta 401 para senha errada e e-mail inexistente. |
| `CT-08` Doação dentro do saldo | `RF-18`, `RF-19` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-09` Doação acima do saldo | `RF-19`, `RNF-06` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-10` Rollback da doação | `RNF-06` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-11` Consulta de instituições | `RF-06`, `RF-07`, `RF-10` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-12` SQL dos repositories | `RF-01`, `RF-02`, `RF-07`, `RF-19`, `RNF-06` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | |
| `CT-13` Fluxo completo no navegador | `RF-01`, `RF-03`, `RF-19`, `RNF-01`, `RNF-03` | Não executado | | | Depende do MySQL (Issue #36). Ver seção 6. |
| `CT-14` a `CT-19` Persistência no MySQL 8 | `RF-18` a `RF-21`, `RNF-06` | Não executado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) (suíte `skipped`) | Código pronto em `doacoes-integracao.test.js`; falta rodar com `DB_INTEGRATION=1`. Conta como 6 casos. |
| `CT-20` Rotas HTTP de cadastro e consulta | `RF-01`, `RF-02`, `RF-05` a `RF-07`, `RF-10`, `RNF-04` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | 20 testes. Revelou o DEF-03. |
| `CT-21` Listagem e busca no navegador | `RF-05`, `RF-07` a `RF-09` | Não executado | | | Depende do MySQL. |
| `CT-22` Detalhe no navegador | `RF-10`, `RF-18` | Não executado | | | Depende do MySQL. |
| `CT-23` Doação pela interface | `RF-19`, `RN-02`, `RNF-01` | Não executado | | | Depende do MySQL. A regra de saldo no servidor está coberta por `CT-09` e `CT-25`. |
| `CT-24` Avançar e cancelar doação | `RF-20`, `RF-21` | Aprovado | 23/11, `7e95ea4` | [saída](evidencias/execucao-sprint-08-unitarios.txt) | Revelou o DEF-02. |
| `CT-25` Páginas e chamadas das telas | `RF-01`, `RF-02`, `RF-05`, `RF-07`, `RF-10`, `RF-18`, `RF-19` | Aprovado | 23/11, [`111f6c8`](https://github.com/gigi-zacaroni/tp-eng-software/commit/111f6c8) | [saída](evidencias/execucao-sprint-08-unitarios.txt) | 5 testes. Criado nesta sprint junto com as telas. |

**Histórico:** na Sprint 7, a 1ª execução teve 32 aprovados e 15 reprovados ([saída](evidencias/execucao-sprint-07-antes.txt)). O reteste teve 47 aprovados ([saída](evidencias/execucao-sprint-07-depois.txt)). Na Sprint 8, a suíte chegou a 87 testes:

- `instituicoes-http.test.js`, da Geovana;
- `doacoes-integracao.test.js` e os testes de avançar e cancelar, da Maria Luiza;
- `telas-http.test.js`, do Arthur.

## 3. Defeitos encontrados

| Defeito | Severidade | Como foi achado | Situação | Correção | Reteste |
|---|---|---|---|---|---|
| `DEF-01` Hooks de teste não rodavam no Node 18 e 15 testes falhavam ([#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35)) | Alta | 1ª execução da Sprint 7 | Corrigido | [`43ff986`](https://github.com/gigi-zacaroni/tp-eng-software/commit/43ff986), [`10f2616`](https://github.com/gigi-zacaroni/tp-eng-software/commit/10f2616) | Aprovado |
| `DEF-02` 4 testes de avançar e cancelar doação tentavam usar o MySQL (`ECONNREFUSED`) | Média | `CT-24` | Corrigido | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f) | Aprovado |
| `DEF-03` Cadastro de instituição aceitava descrição numérica e nome com mais de 255 caracteres | Média | `CT-20` | Corrigido | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f) | Aprovado |
| `DEF-04` Plano de testes sobrescrito pelo texto do `sprint-07.md` | Média | Revisão de QA | Corrigido | [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a) | Aprovado |
| `DEF-05` Landing sem destaques e login sem estilo | Alta | Revisão de QA | Corrigido | [`8959059`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8959059), [`2ef61ff`](https://github.com/gigi-zacaroni/tp-eng-software/commit/2ef61ff) | `CT-25` aprovado. Falta conferir no navegador (`CT-21`). |
| `DEF-06` Senha real do MySQL no `.env.example` | Alta | Revisão de QA | Corrigido no arquivo | [`c646b42`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c646b42) | Falta trocar a senha, que ainda aparece no histórico do Git. |

Notas:

- A Geovana achou e corrigiu o DEF-02 e o DEF-03. A saída com as falhas não foi salva. A evidência é o commit e o reteste desta sprint.
- O DEF-04 veio do commit `5e1ca6c`. O DEF-05 e o DEF-06 vieram do commit `4c29f80`.
- A Karol abre as Issues do DEF-02 ao DEF-06 e atualiza a #36.

## 4. Requisitos × resultado final

**Legenda:** *Atendido*: implementado e com teste aprovado. *Parcial*: parte do requisito existe, ou existe sem verificação completa. *Não atendido*: sem código na versão final. *Não verificado*: depende de medição que não foi feita.

| Requisito | Situação | Casos/evidências | Justificativa ou limitação |
|---|---|---|---|
| `RF-01` Cadastro de doador | Atendido | `CT-01` a `CT-03`, `CT-05`, `CT-20`, `CT-25` | Tela `pages/cadastro.html` e API. |
| `RF-02` Cadastro de instituição | Atendido | `CT-04`, `CT-05`, `CT-20`, `CT-25` | |
| `RF-03` Login | Atendido | `CT-06`, `CT-07` | |
| `RF-04` Encerrar sessão | Parcial | Sem caso de teste | Botão "Sair" e rota `/logout` existem, mas nenhum teste cobre. O JWT continua válido até expirar (8 h). |
| `RF-05` Acesso restrito | Atendido | `CT-20`, `CT-25` | API devolve 401 sem token; telas mandam ao login. Revisão no navegador pendente (`CT-21`). |
| `RF-06` Landing pública | Atendido | `CT-11`, `CT-20`, `CT-25` | Restaurada pelo DEF-05. |
| `RF-07` Listar instituições | Parcial | `CT-11`, `CT-20`, `CT-25` | Lista nome, resumo, selo e necessidades abertas. Causa e cidade não existem no banco. |
| `RF-08` Buscar instituições | Parcial | `CT-21` não executado | Busca por nome e descrição implementada na tela; falta a execução manual. |
| `RF-09` Filtrar instituições | Parcial | `CT-21` não executado | Há filtros "Só verificadas" e "Com necessidades abertas" e o estado vazio com "Limpar filtros". Faltam causa, tipo e cidade, que não existem no banco. |
| `RF-10` Detalhe da instituição | Parcial | `CT-11`, `CT-20`, `CT-25` | Mostra sobre e necessidades. Formas de contribuição e contato não existem no banco. |
| `RF-11` Selo "Verificada" | Parcial | `CT-04`, `CT-11` | O selo segue a coluna `verificada`, mas não há tela de administrador para validar. |
| `RF-12`, `RF-13` Favoritos | Não atendido | | Fora do escopo final. |
| `RF-14` Cadastrar necessidade | Parcial | `CT-04` | Só as necessidades iniciais, no cadastro da instituição, sem tipo e unidade. |
| `RF-15` a `RF-17` Editar, excluir, pausar necessidade | Não atendido | | Sem rotas nem telas. |
| `RF-18` Progresso da necessidade | Parcial | `CT-08`, `CT-25` | Mostra desejado, prometido e percentual. O "recebido" não existe porque depende de `RF-23`. |
| `RF-19` Prometer doação | Atendido | `CT-08`, `CT-09`, `CT-10`, `CT-12`, `CT-25` | API e modal em 2 passos com confirmação. Persistência real (`CT-14`) e teste manual (`CT-23`) pendentes. |
| `RF-20` Acompanhar doações | Parcial | `CT-24` | Avançar status funciona na API. Não há tela "Minhas doações" nem rota para listar as doações do doador. |
| `RF-21` Cancelar doação | Parcial | `CT-24` | Funciona na API e devolve o saldo. Sem tela. |
| `RF-22` a `RF-24` Painel da instituição | Não atendido | | Sem rotas nem telas. |
| `RF-25` a `RF-27` Notificações | Não atendido | | Sem rotas nem telas. |
| `RNF-01` Doação em até 3 passos | Parcial | `CT-23` não executado | O fluxo tem exatamente 3 passos (escolher, revisar, confirmar), mas sem execução manual registrada. |
| `RNF-02` Responsividade e alvos de 44 px | Parcial | Revisão do CSS | Alvos de 44 px e layout fluido no `style.css`. Não houve teste em 390 px. |
| `RNF-03` Senha com hash | Atendido | `CT-01` | bcrypt. A conferência no MySQL real faz parte do `CT-13`. |
| `RNF-04` Privacidade de contato | Atendido | `CT-20`, `CT-25` | Rotas de listagem e detalhe exigem token. |
| `RNF-05` Sem pagamento | Atendido | Revisão das telas | Nenhum formulário pede dados de pagamento. |
| `RNF-06` Integridade do saldo | Atendido | `CT-09`, `CT-10`, `CT-12`, `CT-25` | Checagem com `SELECT ... FOR UPDATE` na transação. A validação no MySQL real (`CT-19`) está pendente. |
| `RNF-07` Excluir necessidade preserva doações | Não atendido | | Depende de `RF-16`, que não existe. |
| `RNF-08` Listagem em até 2 s | Não verificado | | Sem medição com volume representativo. |
| `RNF-09` Chrome, Firefox e Edge | Não verificado | | Sem teste em vários navegadores. |
| `RNF-10` Acessibilidade | Parcial | Revisão do código | Foco visível, rótulos e `<dialog>` nativo. Não houve auditoria de contraste nem de navegação por teclado. |

**Totais (27 RF e 10 RNF):** 10 atendidos (6 RF e 4 RNF), 13 parciais (10 RF e 3 RNF), 12 não atendidos (11 RF e 1 RNF) e 2 não verificados (RNF). Cada linha agrupada conta todos os requisitos que reúne.

## 5. Evidências visuais e relatórios

| Arquivo | O que mostra | Casos |
|---|---|---|
| [`execucao-sprint-08-unitarios.txt`](evidencias/execucao-sprint-08-unitarios.txt) | Saída legível da suíte completa na Sprint 8: 80 aprovados, 0 falhas, 7 pulados | `CT-01` a `CT-12`, `CT-20`, `CT-24`, `CT-25`; `CT-14` a `CT-19` pulados |
| [`execucao-sprint-07-antes.txt`](evidencias/execucao-sprint-07-antes.txt) | 1ª execução da Sprint 7, com o DEF-01 | `CT-01` a `CT-12` |
| [`execucao-sprint-07-depois.txt`](evidencias/execucao-sprint-07-depois.txt) | Reteste da Sprint 7 após o DEF-01 | `CT-01` a `CT-12` |
| `evidencias/sprint-08/ct-13-*.png`, `ct-21-*.png`, `ct-22-*.png`, `ct-23-*.png` | Capturas das telas | A criar quando o MySQL estiver disponível |

## 6. Como fechar os casos pendentes

Quem tem o MySQL configurado (Geovana) roda, na raiz do repositório:

```powershell
mysql -u root -p < src/back/sql/reset_test.sql
mysql -u root -p < src/back/sql/seed_test.sql
cd src/back
$env:DB_INTEGRATION="1"; node --test --test-reporter=spec > ../../docs/testes/evidencias/execucao-sprint-08-integracao.txt
```

O resultado esperado é `fail 0` e nenhum teste pulado. Isso fecha `CT-14` a `CT-19`.

Depois:

1. Rode o `seed_test.sql` de novo, porque os testes de integração alteram a massa.
2. Suba a API com `DB_NAME=conectaacao_test` no `src/back/.env`.
3. Siga os roteiros do `CT-13` e do `CT-21` a `CT-23` no [plano](plano-de-testes.md).
4. Salve uma captura por passo em `evidencias/sprint-08/`.
5. Atualize as linhas desses casos neste arquivo.

## 7. Limitações conhecidas e trabalho futuro

**Limitações:**

- **SQL real:** o `bancoFalso.js` não valida tipos, `CHECK` nem chaves estrangeiras. Isso só fica coberto quando o `CT-14` a `CT-19` rodarem.
- **Telas:** o `CT-25` confere as chamadas à API, mas não o layout, o foco nem as mensagens na tela.
- **Modelo de dados:** faltam causa, cidade, contato, tipo e unidade da necessidade e a quantidade recebida. Por isso `RF-07`, `RF-09`, `RF-10`, `RF-14` e `RF-18` estão parciais.
- **Sem código:** favoritos, gestão de necessidades, painel da instituição, recebimento e notificações.
- **Acompanhamento:** `RF-20` e `RF-21` funcionam só pela API. Falta a tela "Minhas doações".
- **Senha exposta (DEF-06):** ainda precisa ser trocada no MySQL.
- **Desempenho e navegadores:** sem medição (`RNF-08`, `RNF-09`).

**Trabalho futuro, em ordem:**

1. Rodar os casos pendentes.
2. Criar `GET /doacoes` e a tela "Minhas doações".
3. Incluir causa e cidade no modelo, para completar busca e filtros.
4. Fazer o painel da instituição com o recebido (`RF-22` a `RF-24`).

## 8. Conclusão da validação

O fluxo do doador funciona de ponta a ponta: cadastro, login, consulta de instituições e promessa de doação com limite de saldo. Ele passa em 80 testes automatizados, sem falhas. Os seis defeitos encontrados foram corrigidos. Só falta trocar a senha exposta (DEF-06).

A solução ainda não está completa:

- 10 casos dependem do MySQL e não foram executados. O roteiro está na seção 6.
- 21 dos 27 requisitos funcionais estão parciais ou sem código. A gestão pela instituição fica para trabalho futuro.

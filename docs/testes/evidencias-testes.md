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

- Os 7 pulados são a suíte de MySQL real (`CT-14` a `CT-19`). Ela só roda com `DB_INTEGRATION=1`, e o ambiente MySQL desta sprint ficou com Geovana. Saída: [`execucao-sprint-08-unitarios.txt`](evidencias/execucao-sprint-08-unitarios.txt).
- Os 3 casos manuais de tela (`CT-21` a `CT-23`) e o `CT-13` também dependem do MySQL e não foram executados no navegador. O contrato entre essas telas e a API foi verificado pelo `CT-25`, que é automatizado.
- **Leitura:** tudo o que foi executado passou. A confiança é alta para regras de negócio e rotas HTTP. Para o SQL real e para a aparência das telas, a confiança é média, porque esses dois pontos ainda não têm execução registrada.

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

**Histórico:** na Sprint 7, a 1ª execução teve 32 testes aprovados e 15 reprovados ([saída](evidencias/execucao-sprint-07-antes.txt)), e o reteste teve 47 aprovados ([saída](evidencias/execucao-sprint-07-depois.txt)). Entre a Sprint 7 e a Sprint 8, a suíte passou de 47 para 87 testes: entraram `instituicoes-http.test.js` (Geovana), `doacoes-integracao.test.js` e os testes de avanço e cancelamento (Maria Luiza) e `telas-http.test.js` (Arthur).

## 3. Defeitos encontrados

| Defeito | Severidade | Como foi achado | Situação | Correção | Reteste |
|---|---|---|---|---|---|
| `DEF-01` Hooks de teste não rodavam dentro de `describe` no Node 18; 15 testes falhavam ([#35](https://github.com/gigi-zacaroni/tp-eng-software/issues/35)) | Alta | 1ª execução da Sprint 7 | Corrigido | [`43ff986`](https://github.com/gigi-zacaroni/tp-eng-software/commit/43ff986), [`10f2616`](https://github.com/gigi-zacaroni/tp-eng-software/commit/10f2616) | Aprovado (Sprint 7 e Sprint 8) |
| `DEF-02` A suíte de avançar/cancelar doação ficou sem o hook da conexão falsa; 4 testes tentavam abrir conexão com o MySQL (`ECONNREFUSED`) | Média | `CT-24`, execução da Geovana | Corrigido | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f) (`services.test.js`) | Aprovado nesta execução |
| `DEF-03` Cadastro de instituição aceitava descrição que não é texto e nome com mais de 255 caracteres (201 em vez de 400) | Média | `CT-20`, execução da Geovana | Corrigido | [`5b1cf4f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/5b1cf4f) (`authService.js`) | Aprovado nesta execução |
| `DEF-04` `plano-de-testes.md` sobrescrito com o texto do `sprint-07.md` no commit `5e1ca6c` | Média | Revisão de QA da Sprint 8 | Corrigido | [`675203a`](https://github.com/gigi-zacaroni/tp-eng-software/commit/675203a) | Aprovado (conferência do conteúdo contra `3bd9496`) |
| `DEF-05` Landing e login quebrados: o commit `4c29f80` trocou `index.html` e `style.css` por uma versão de página única. `landing.js` deixou de carregar e `login.html` ficou sem estilo | Alta | Revisão de QA da Sprint 8 | Corrigido | [`8959059`](https://github.com/gigi-zacaroni/tp-eng-software/commit/8959059), [`2ef61ff`](https://github.com/gigi-zacaroni/tp-eng-software/commit/2ef61ff) | `CT-25` aprovado (páginas servidas); revisão visual pendente com `CT-21` |
| `DEF-06` Senha real do MySQL publicada no `src/back/.env.example` desde `4c29f80` | Alta | Revisão de QA da Sprint 8 | Corrigido no arquivo, pendente no MySQL | [`c646b42`](https://github.com/gigi-zacaroni/tp-eng-software/commit/c646b42) | A senha continua no histórico do Git e deve ser trocada no MySQL de quem a usa |

DEF-02 e DEF-03 foram achados e corrigidos pela Geovana. A saída da execução que mostrou as falhas não foi salva no repositório, então a evidência é o commit de correção mais o reteste desta sprint.

As Issues dos defeitos `DEF-02` a `DEF-06` e o fechamento da #36 ficam com Karol, que cuida do GitHub Project.

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

Quem tiver o MySQL configurado (Geovana) executa, a partir da raiz do repositório:

```powershell
mysql -u root -p < src/back/sql/reset_test.sql
mysql -u root -p < src/back/sql/seed_test.sql
cd src/back
$env:DB_INTEGRATION="1"; node --test --test-reporter=spec > ../../docs/testes/evidencias/execucao-sprint-08-integracao.txt
```

O resultado esperado é `fail 0` e nenhum teste pulado. Isso fecha `CT-14` a `CT-19`.

Depois, rode `seed_test.sql` de novo (os testes de integração mexem na massa) e suba a API com `DB_NAME=conectaacao_test` no `src/back/.env`. Siga os roteiros do `CT-13` e do `CT-21` a `CT-23` no [plano](plano-de-testes.md) e salve uma captura por passo em `evidencias/sprint-08/`. Por fim, atualize as linhas desses casos neste arquivo.

## 7. Limitações conhecidas e trabalho futuro

- **SQL real sem execução registrada:** o `bancoFalso.js` imita o MySQL, mas não valida tipos, `CHECK` nem chaves estrangeiras. Até o `CT-14` a `CT-19` rodarem, esses pontos só têm verificação no código.
- **Telas sem revisão visual registrada:** o `CT-25` garante que as telas chamam a API do jeito certo, mas não verifica layout, foco nem mensagens na tela.
- **Modelo de dados menor que os requisitos:** não existem causa, cidade, contato, tipo e unidade da necessidade, nem quantidade recebida. Isso deixa `RF-07`, `RF-09`, `RF-10`, `RF-14` e `RF-18` parciais.
- **Funcionalidades sem código:** favoritos, gestão de necessidades, painel da instituição, confirmação de recebimento e notificações (`RF-12`, `RF-13`, `RF-15` a `RF-17`, `RF-22` a `RF-27`).
- **Acompanhamento só pela API:** `RF-20` e `RF-21` precisam de uma rota `GET` das doações do doador e da tela "Minhas doações".
- **Senha no histórico do Git (DEF-06):** trocar a senha do MySQL que apareceu no `.env.example`.
- **Sem medição de desempenho nem teste em vários navegadores** (`RNF-08`, `RNF-09`).
- **Trabalho futuro sugerido, em ordem:** rodar os casos pendentes; criar `GET /doacoes` e a tela "Minhas doações"; incluir causa e cidade no modelo para completar busca e filtros; implementar o painel da instituição com o recebido (`RF-22` a `RF-24`).

## 8. Conclusão da validação

Os fluxos centrais (cadastro, login, consulta de instituições e promessa de doação com limite de saldo) estão implementados e passam em 80 testes automatizados, sem falhas. Todos os defeitos encontrados (DEF-01 a DEF-06) foram corrigidos. O DEF-06 ainda exige trocar a senha exposta.

A solução ainda não pode ser considerada completa por dois motivos. Primeiro, a persistência no MySQL real e as telas no navegador não têm execução registrada: são 10 casos pendentes, com roteiro e comandos prontos na seção 6. Segundo, 21 dos 27 requisitos funcionais estão parciais ou sem código. A versão final é estável e demonstrável para o fluxo do doador, de ponta a ponta. A gestão pela instituição fica como trabalho futuro.

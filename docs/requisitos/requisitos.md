# Requisitos da aplicação

Artefato central da Sprint 2, atualizado na entrega final com a situação de cada requisito no código.

## 1. Método de levantamento

Os requisitos vieram de quatro fontes:

- a análise do problema da Sprint 1: conectar pessoas dispostas a ajudar às instituições que precisam de apoio. A visão do produto está em [`visao-geral.md`](../visao-geral.md);
- o [protótipo navegável](../prototipo/README.md), de onde saíram os fluxos, as telas, os estados e as regras de negócio;
- a discussão do grupo para priorizar o que entra na primeira versão;
- o refinamento do backlog iniciado na Sprint 1 ([`backlog-produto.md`](../backlog-produto.md)).

O protótipo refinou a ideia da Sprint 1. O usuário não apenas "demonstra interesse em ajudar": ele promete uma doação para uma necessidade e acompanha o status até a entrega.

## 2. Atores e perfis

| Ator | Objetivo | Permissões e limites |
|---|---|---|
| `Visitante` | Conhecer a proposta e criar conta | Vê a página inicial, o "Como funciona" e as instituições em destaque. Não vê a lista completa, as necessidades nem os contatos. |
| `Doador` | Encontrar necessidades, prometer e acompanhar doações | Busca e filtra; promete doações; acompanha e cancela as próprias doações. Não muda o status para "A caminho" ou "Entregue". |
| `Instituição` | Divulgar necessidades e receber doações | Cadastra necessidades; vê as doações recebidas; aceita, recusa e confirma o recebimento. Não promete doações. |

O perfil de administrador previsto na Sprint 2 não foi implementado (ver `RF-11` e a seção 7).

## 3. Requisitos funcionais

Prioridade: **Alta** (essencial à primeira versão), **Média** (importante), **Baixa** (desejável).

Situação final: **Atendido**, **Parcial** ou **Não atendido**. "No navegador" indica dado guardado no `localStorage` do navegador, e não no banco (ver [`src/front/README.md`](../../src/front/README.md)).

| ID | Nome | Descrição verificável | Prioridade | História/Issue | Situação final |
|---|---|---|---|---|---|
| `RF-01` | Cadastro de doador | O visitante cria uma conta de doador com nome, e-mail, senha e confirmação de senha. | Alta | [`US-01 / #2`](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | Atendido |
| `RF-02` | Cadastro de instituição | O visitante cadastra uma instituição com acesso (e-mail e senha), nome, descrição e, se quiser, uma necessidade inicial. | Alta | [`US-02 / #5`](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | Atendido |
| `RF-03` | Login | Doador e instituição entram com e-mail e senha. | Alta | [`US-03 / #3`](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Atendido |
| `RF-04` | Encerrar sessão | O usuário autenticado encerra a sessão. | Baixa | [`US-03 / #3`](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Atendido. O front descarta o token; o servidor não guarda sessão. |
| `RF-05` | Acesso restrito | A lista de instituições, as necessidades e os contatos só aparecem para usuários autenticados. | Alta | [`US-03 / #3`](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Atendido |
| `RF-06` | Página inicial pública | A página inicial mostra a proposta, o "Como funciona" e as instituições em destaque. | Média | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Atendido |
| `RF-07` | Listar instituições | A lista mostra nome, causa, cidade, resumo e número de necessidades abertas. | Alta | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Atendido. Causa e cidade no navegador. |
| `RF-08` | Buscar | O usuário busca instituições e necessidades por texto. | Média | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Atendido. A busca roda no navegador. |
| `RF-09` | Filtrar | O usuário filtra instituições por causa e necessidades por tipo, cidade e prioridade, e pode limpar os filtros. | Média | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Atendido. Filtros e dados no navegador. |
| `RF-10` | Detalhe da instituição | O detalhe mostra a descrição, o contato e as necessidades com progresso. | Alta | [`US-05 / #7`](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Atendido. Contato no navegador. |
| `RF-11` | Selo "Verificada" | O selo aparece nas instituições validadas por um administrador. | Média | [`US-05 / #7`](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Não atendido. O banco tem a coluna `verificada`, mas não há administrador nem tela que mostre o selo. |
| `RF-12` | Favoritar instituição | O doador favorita e desfavorita uma instituição. | Baixa | [`US-06 / #8`](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | Não atendido |
| `RF-13` | Listar favoritos | O doador vê a lista de favoritos. | Baixa | [`US-06 / #8`](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | Não atendido |
| `RF-14` | Cadastrar necessidade | A instituição cadastra uma necessidade com item e quantidade desejada. Tipo, categoria, prioridade, descrição, prazo e local de recebimento são opcionais. | Alta | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Atendido. Item e quantidade no banco; os opcionais no navegador. |
| `RF-15` | Editar necessidade | A instituição edita uma necessidade. | Média | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Não atendido |
| `RF-16` | Excluir necessidade | A instituição exclui uma necessidade sem apagar as doações dela. | Média | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Não atendido |
| `RF-17` | Pausar necessidade | A instituição pausa e reativa uma necessidade. | Baixa | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Não atendido |
| `RF-18` | Progresso da necessidade | Cada necessidade mostra quantidade desejada, prometida, quanto falta e percentual prometido. | Alta | [`US-08 / #10`](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Atendido. O total recebido e o status Aberta/Parcial/Atendida não existem. |
| `RF-19` | Prometer doação | O doador promete uma quantidade para uma necessidade, limitada ao que falta. A doação nasce como "Prometida". | Alta | [`US-08 / #10`](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Atendido |
| `RF-20` | Acompanhar doações | O doador vê suas doações e o status de cada uma (Prometida, A caminho, Entregue ou Cancelada). | Média | [`US-09 / #11`](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | Atendido |
| `RF-21` | Cancelar doação | O doador cancela uma doação em "Prometida" ou "A caminho", e a quantidade volta para a necessidade. | Média | [`US-09 / #11`](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | Atendido |
| `RF-22` | Doações recebidas | O painel da instituição lista as doações com doador, item, quantidade, data e status. | Alta | [`US-10 / #12`](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | Atendido |
| `RF-23` | Responder e confirmar doação | A instituição aceita (A caminho), recusa (Cancelada, com devolução do saldo) e confirma o recebimento (Entregue). | Alta | [`US-10 / #12`](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | Atendido. Não há total recebido por necessidade. |
| `RF-24` | Resumo por necessidade | O painel mostra, por necessidade, desejado, prometido, recebido e percentual. | Média | [`US-10 / #12`](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | Parcial. Mostra desejado, prometido e percentual, sem o recebido. |
| `RF-25` | Notificar instituição | A instituição é notificada quando recebe ou perde uma doação. | Média | [`US-11 / #13`](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Não atendido |
| `RF-26` | Notificar doador | O doador é notificado sobre mudanças nas suas doações. | Baixa | [`US-11 / #13`](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Não atendido |
| `RF-27` | Central de notificações | O usuário vê as notificações e marca como lidas. | Média | [`US-11 / #13`](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Não atendido |

**Resumo:** 17 atendidos, 1 parcial (`RF-24`) e 9 não atendidos (`RF-11` a `RF-13`, `RF-15` a `RF-17` e `RF-25` a `RF-27`).

## 4. Requisitos não funcionais

| ID | Categoria | Descrição verificável | Como avaliar | Issue | Situação final |
|---|---|---|---|---|---|
| `RNF-01` | Usabilidade | Prometer uma doação leva no máximo 3 passos: "Quero ajudar", preencher a quantidade e confirmar. | Contagem de passos no fluxo (`CT-23`). | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Atendido no fluxo. Sem teste manual registrado. |
| `RNF-02` | Responsividade | A interface funciona de 390 px a 1440 px, com alvos de toque de pelo menos 44 px. | Emulação de dispositivos no navegador. | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Não verificado |
| `RNF-03` | Segurança | As senhas são gravadas com hash bcrypt, nunca em texto puro. | Inspeção do banco e do código (`CT-01`). | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | Atendido |
| `RNF-04` | Privacidade | O contato das instituições só aparece para usuários autenticados. | Acesso ao detalhe sem login (`CT-20`, `CT-25`). | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Atendido |
| `RNF-05` | Restrição de negócio | A plataforma não coleta nem processa dados de pagamento. | Revisão das telas e formulários. | Todo o produto | Atendido |
| `RNF-06` | Integridade | O total prometido de uma necessidade nunca passa da quantidade desejada. | Tentativa de doar acima do que falta (`CT-09`, `CT-25`). | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Atendido |
| `RNF-07` | Consistência | Excluir uma necessidade não remove as doações dela. | Exclusão de necessidade com doação. | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Não se aplica: não existe exclusão (`RF-16`). |
| `RNF-08` | Desempenho | A lista de instituições carrega em até 2 segundos com dezenas de instituições. | Medição no navegador. | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Não verificado |
| `RNF-09` | Compatibilidade | A aplicação funciona nas versões atuais de Chrome, Firefox e Edge. | Teste manual em cada navegador. | Todo o produto | Não verificado |
| `RNF-10` | Acessibilidade | Cadastro, login e doação têm foco visível, contraste adequado e navegação por teclado. | Checklist WCAG básico. | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Não verificado |

## 5. Regras de negócio

| ID | Regra | Justificativa | Requisitos | Situação final |
|---|---|---|---|---|
| `RN-01` | Só usuários autenticados veem a lista de instituições, as necessidades e os contatos. | Proteger os contatos das organizações. | `RF-05`, `RF-07`, `RF-10` | Atendido |
| `RN-02` | A quantidade doada é limitada ao que falta na necessidade. | Evitar doação acima do necessário. | `RF-18`, `RF-19` | Atendido |
| `RN-03` | A doação nasce em "Prometida". A instituição a passa para "A caminho" e depois "Entregue", ou a recusa. O doador pode cancelar em "Prometida" ou "A caminho". Recusa e cancelamento devolvem a quantidade. | Fluxo de acompanhamento do protótipo. | `RF-19` a `RF-23` | Atendido |
| `RN-04` | Só a instituição confirma o recebimento. | O status "Entregue" deve refletir o que chegou de fato. | `RF-20`, `RF-23` | Atendido |
| `RN-05` | O status da necessidade é derivado do recebido: Aberta, Parcial ou Atendida. | Padronizar a leitura do progresso. | `RF-18` | Não atendido |
| `RN-06` | Necessidade pausada some da página pública e mantém as doações. | Suspender pedidos sem perder histórico. | `RF-16`, `RF-17` | Não atendido |
| `RN-07` | A plataforma não intermedia dinheiro; a entrega é combinada entre doador e instituição. | Restrição central do produto (Sprint 1). | `RF-10`, `RF-19` | Atendido |
| `RN-08` | O selo "Verificada" só aparece após validação de um administrador. | Gerar confiança nos doadores. | `RF-11` | Não atendido |

## 6. Histórias de usuário e critérios de aceitação

Cada história traz a verificação final: o caso de teste do [plano de testes](../testes/plano-de-testes.md) que cobre cada critério e o resultado.

### US-01: Criar conta de doador

Como **visitante**, quero **criar uma conta de doador** para **ver as instituições e prometer doações**.

**Requisitos:** `RF-01`, `RNF-03`, `RNF-10`

1. **Dado que** estou no cadastro de doador, **quando** preencho nome, e-mail, senha e confirmação válidos, **então** a conta é criada e eu entro no sistema.
2. **Dado que** a senha e a confirmação são diferentes, **quando** tento concluir, **então** vejo uma mensagem de erro e a conta não é criada.
3. **Dado que** o e-mail já existe, **quando** tento concluir, **então** o cadastro é recusado com o motivo.

**Verificação:** critério 1 por `CT-01` e `CT-25`, critério 2 por `CT-03` e critério 3 por `CT-02`. Todos aprovados.

**Issue:** [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2)

### US-02: Cadastrar instituição

Como **responsável por uma instituição**, quero **cadastrar minha organização** para **divulgar necessidades e receber doações**.

**Requisitos:** `RF-02`, `RF-14`, `RNF-03`

1. **Dado que** preencho acesso, nome e, se quiser, uma necessidade inicial, **quando** concluo, **então** a instituição é criada e eu entro no painel.
2. **Dado que** deixo um campo obrigatório em branco ou com valor inválido, **quando** tento concluir, **então** o cadastro é recusado e nada é gravado.
3. **Dado que** a instituição acabou de ser criada, **quando** consulto o banco, **então** ela está como não verificada.

**Verificação:** critério 1 por `CT-04`, `CT-20` e `CT-25`, critério 2 por `CT-05` e `CT-20` e critério 3 por `CT-04`. Todos aprovados.

**Issue:** [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5)

### US-03: Entrar e acesso protegido

Como **usuário cadastrado**, quero **entrar com e-mail e senha** para **usar as funções do meu perfil**. Como **plataforma**, quero **mostrar dados sensíveis só a quem está logado**.

**Requisitos:** `RF-03`, `RF-04`, `RF-05`, `RN-01`, `RNF-04`

1. **Dado que** informo credenciais válidas, **quando** entro, **então** vou para a área do meu perfil (doador ou instituição).
2. **Dado que** informo credenciais inválidas, **quando** tento entrar, **então** o acesso é recusado sem dizer qual campo está errado.
3. **Dado que** não estou logado, **quando** tento abrir a lista de instituições ou um detalhe, **então** o sistema pede login.
4. **Dado que** estou logado, **quando** clico em "Sair da conta", **então** a sessão é encerrada.

**Verificação:** critério 1 por `CT-06`, critério 2 por `CT-07` e critério 3 por `CT-20` e `CT-25`, todos aprovados. O critério 4 é feito pelo front, que descarta o token; não tem caso automatizado.

**Issue:** [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3)

### US-04: Encontrar instituições

Como **doador**, quero **buscar e filtrar instituições e necessidades** para **achar rápido quem posso ajudar**.

**Requisitos:** `RF-06` a `RF-09`, `RNF-08`

1. **Dado que** estou logado, **quando** abro "Instituições", **então** vejo cards com nome, causa, cidade, resumo e necessidades abertas.
2. **Dado que** aplico filtros (causa em Instituições; tipo, cidade e prioridade em Explorar), **quando** a lista atualiza, **então** só aparecem os itens correspondentes.
3. **Dado que** os filtros não trazem resultado, **quando** a lista atualiza, **então** vejo um estado vazio com o botão "Limpar filtros".

**Verificação:** critério 1 por `CT-11`, `CT-20` e `CT-25`, aprovado. Os critérios 2 e 3 dependem do `CT-21` (manual), não executado. Causa, cidade, tipo e prioridade ficam no navegador.

**Issue:** [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6)

### US-05: Ver o detalhe de uma instituição

Como **doador**, quero **ver a página de uma instituição** para **entender o trabalho dela e o que ela precisa**.

**Requisitos:** `RF-10`, `RF-18`, `RNF-04`

1. **Dado que** escolho uma instituição, **quando** abro o detalhe, **então** vejo a descrição, o contato e as necessidades com progresso.

**Verificação:** `CT-11`, `CT-20` e `CT-25` aprovados; `CT-22` (manual) não executado. Os critérios do selo "Verificada" e da necessidade pausada saíram da história, porque `RF-11` e `RF-17` não foram implementados.

**Issue:** [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7)

### US-06: Favoritar instituições

Como **doador**, quero **favoritar instituições** para **encontrá-las depois**.

**Requisitos:** `RF-12`, `RF-13`

**Situação:** não implementada. Os critérios da Sprint 2 (favoritar, desfavoritar e ver a lista) ficam como trabalho futuro.

**Issue:** [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8)

### US-07: Gerenciar necessidades

Como **instituição**, quero **cadastrar minhas necessidades** para **mostrar aos doadores o que preciso**.

**Requisitos:** `RF-14` a `RF-17`, `RN-06`, `RNF-07`

1. **Dado que** estou no painel, **quando** publico uma necessidade com item e quantidade, **então** ela aparece para os doadores.
2. **Dado que** deixo o item vazio ou informo quantidade inválida, **quando** tento publicar, **então** nada é salvo e vejo o erro.

**Verificação:** critérios 1 e 2 por `CT-26`, aprovados. Editar, excluir e pausar (`RF-15` a `RF-17`) não foram implementados e os critérios correspondentes saíram da história.

**Issue:** [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9)

### US-08: Prometer uma doação

Como **doador**, quero **prometer uma doação para uma necessidade** para **ajudar exatamente no que a instituição precisa**.

**Requisitos:** `RF-18`, `RF-19`, `RN-02`, `RNF-01`, `RNF-06`

1. **Dado que** estou numa necessidade, **quando** clico em "Quero ajudar", informo a quantidade e confirmo, **então** a doação é registrada como "Prometida".
2. **Dado que** informo mais do que falta, **quando** tento confirmar, **então** a doação é recusada.
3. **Dado que** a doação foi registrada, **quando** volto à necessidade, **então** o progresso mostra o novo total prometido.

**Verificação:** critério 1 por `CT-08` e `CT-25`, critério 2 por `CT-09` e `CT-25` e critério 3 por `CT-08` e `CT-25`. Todos aprovados. O teste manual (`CT-23`) não foi executado. A notificação da instituição, prevista na Sprint 2, não existe (`RF-25`).

**Issue:** [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10)

### US-09: Acompanhar e cancelar doações

Como **doador**, quero **acompanhar minhas doações e cancelá-las quando preciso** para **ter controle do que prometi**.

**Requisitos:** `RF-20`, `RF-21`, `RN-03`, `RN-04`

1. **Dado que** tenho doações, **quando** abro "Minhas doações", **então** vejo cada uma com instituição, item, data e status.
2. **Dado que** a instituição aceitou ou confirmou a doação, **quando** abro os detalhes, **então** a linha do tempo mostra "A caminho" ou "Entregue".
3. **Dado que** a doação está em "Prometida" ou "A caminho", **quando** cancelo, **então** a quantidade volta para a necessidade.
4. **Dado que** a doação está em "Entregue" ou "Cancelada", **quando** abro os detalhes, **então** não há opção de cancelar.

**Verificação:** critérios 1 e 3 por `CT-24` e `CT-25`, critério 4 por `CT-24`. Aprovados. O critério 2 depende da ação da instituição, coberta por `CT-24`. O doador não muda o status sozinho (`RN-04`).

**Issue:** [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11)

### US-10: Receber e confirmar doações

Como **instituição**, quero **ver as doações prometidas e responder a cada uma** para **organizar o que vou receber**.

**Requisitos:** `RF-22`, `RF-23`, `RF-24`, `RN-03`, `RN-04`

1. **Dado que** um doador prometeu uma doação, **quando** abro "Doações recebidas", **então** vejo doador, item, quantidade, data e status.
2. **Dado que** a doação está "Prometida", **quando** clico em "Aceitar" ou "Recusar", **então** ela passa para "A caminho" ou "Cancelada". A recusa devolve a quantidade.
3. **Dado que** a doação está "A caminho", **quando** clico em "Confirmar recebimento", **então** ela passa para "Entregue".

**Verificação:** critérios 1 a 3 por `CT-24` e `CT-25`, aprovados. O total recebido por necessidade e o status "Atendida" não existem (`RF-24`, `RN-05`).

**Issue:** [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12)

### US-11: Receber notificações

Como **usuário autenticado**, quero **ser notificado sobre minhas doações** para **não perder atualizações**.

**Requisitos:** `RF-25`, `RF-26`, `RF-27`

**Situação:** não implementada. Fica como trabalho futuro.

**Issue:** [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)

## 7. Fora do escopo

| Item | Motivo | Possível trabalho futuro |
|---|---|---|
| Pagamentos | O produto conecta doações sem intermediar dinheiro (`RN-07`). O tipo "Financeira" é só uma promessa combinada direto com a instituição. | Integração com meio de pagamento. |
| Transporte das doações | A entrega é combinada entre doador e instituição. | Pontos de coleta. |
| Fiscalização do uso das doações | A plataforma não tem como auditar as organizações. | Nenhum. |
| Aplicativo mobile nativo | A primeira versão é web responsiva (`RNF-02`). | PWA ou aplicativo nativo. |
| Chat entre doador e instituição | O contato usa os dados do perfil da instituição. | Mensagens internas. |
| Administração e selo "Verificada" | Não coube no prazo (`RF-11`, `RN-08`). | Módulo de administração. |
| Favoritos e notificações | Não couberam no prazo (`RF-12`, `RF-13`, `RF-25` a `RF-27`). | Retomar `US-06` e `US-11`. |
| Editar, excluir e pausar necessidade | Não couberam no prazo (`RF-15` a `RF-17`). | Retomar `US-07`. |
| Guardar no banco cidade, causa, contato e detalhes da necessidade | Hoje ficam só no navegador onde foram salvos. | Novas colunas e rotas de edição. |

## 8. Histórico de alterações

| Sprint | Requisito alterado | Alteração | Motivo | Issue/commit |
|---|---|---|---|---|
| Sprint 2 | `RF-01` a `RF-27`, `RNF-01` a `RNF-10`, `RN-01` a `RN-08` | Criação do documento a partir da visão do produto e do protótipo. | Transformar a visão da Sprint 1 em comportamento verificável. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1), [`69b636f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/69b636f) |
| Sprint 2 | `RF-19`, `RF-20`, `RF-21` | "Demonstrar interesse em ajudar" virou "prometer doação e acompanhar até a entrega". | O protótipo detalhou o fluxo e o tornou testável. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) |
| Sprint 2 | `RF-12`, `RF-13`, `RF-25` a `RF-27` | Inclusão de favoritos e notificações. | Identificados no protótipo. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) |
| Sprint 2 | `RF-01` a `RF-27` | Vínculo dos requisitos às Issues [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) e [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13). | Rastreabilidade requisito, história e Issue. | [`rastreabilidade.md`](../rastreabilidade.md) |
| Sprint 2 | `RF-11`, `RF-17`, `RF-19`, `RF-21` | Registro das lacunas entre os critérios e o protótipo. | Os critérios reprovaram o protótipo em quatro pontos. | [Sprint 2](../sprints/sprint-02.md) |
| Sprint 8 | `US-01` a `US-05`, `US-08`, `US-09` | Linha de verificação em cada história, com o caso de teste e o resultado. | Ligar os critérios aos casos do plano de testes. | [`plano-de-testes.md`](../testes/plano-de-testes.md) |
| Entrega final | Todos | Coluna "Situação final" preenchida para RF, RNF e RN. | Registrar o que foi atendido, parcial e não atendido. | [`evidencias-testes.md`](../testes/evidencias-testes.md) |
| Entrega final | `RF-02`, `RF-09`, `RF-10`, `RF-14`, `RF-18`, `RF-20`, `RF-23` | Descrições ajustadas ao código final. Saíram unidade e situação da necessidade, formas de contribuição, total recebido e a ação do doador de avançar o status. Necessidade inicial passou a ser opcional. | O código final é a referência da entrega. | Commits `3ba1f81` e `e65bceb` |
| Entrega final | `RN-03`, `RN-04` | A instituição aceita, recusa e confirma; o doador só cancela. | Integração das telas com a API e remoção da rota `PATCH /doacoes/:id/avancar`. | `3ba1f81` |
| Entrega final | `US-02`, `US-05`, `US-07`, `US-09`, `US-10` | Critérios ajustados ao comportamento final. | O código final é a referência da entrega. | Esta revisão |
| Entrega final | Atores | Perfil de administrador retirado da lista de atores. | Não existe no código. | Esta revisão |

# Requisitos da aplicação

> **Artefato central da Sprint 2.** Não repita apenas o problema; descreva o comportamento e as condições que o sistema deverá atender.

## 1. Método de levantamento

Os requisitos do ConectaAção foram identificados a partir de quatro fontes:

- **análise do problema** delimitado na Sprint 1 — a dificuldade de conectar pessoas dispostas a ajudar às instituições que precisam de apoio — e da visão do produto registrada em `docs/visao-geral.md`;
- **análise do [protótipo navegável](../prototipo/README.md)** do ConectaAção, do qual foram derivados os fluxos, as telas, os estados e as regras de negócio da aplicação — o vínculo entre cada tela, seus requisitos e seus critérios de aceitação está documentado em [`docs/prototipo/README.md`](../prototipo/README.md);
- **discussão do grupo** para priorização dos itens e definição do que entra na primeira versão;
- **refinamento do backlog** iniciado na Sprint 1 (`docs/backlog-produto.md`).

A partir do protótipo, o entendimento da Sprint 1 de que o usuário apenas "demonstra interesse em ajudar" foi refinado para um fluxo completo e verificável: o doador **promete uma doação** para uma necessidade específica e **acompanha o status** até a entrega (ver seção 8).

## 2. Atores e perfis

| Ator/perfil | Objetivo no sistema | Permissões ou limitações principais |
|---|---|---|
| `Visitante` (não autenticado) | Conhecer a proposta e decidir se cria conta | Vê a landing page e a seção "Como funciona". **Não** vê a lista de instituições, as necessidades nem os dados de contato. |
| `Doador` (autenticado) | Encontrar instituições e prometer/acompanhar doações | Busca, filtra e favorita instituições; promete doações; acompanha e cancela as próprias doações. Não gerencia necessidades. |
| `Instituição` (autenticada) | Divulgar necessidades e receber doações | Gerencia o próprio perfil e suas necessidades (cadastrar, editar, excluir, pausar); vê as doações prometidas e confirma o recebimento. Não promete doações. |
| `Administrador/Moderador` | Manter a integridade e a confiança da plataforma | Valida instituições (concede o selo "Verificada") e modera cadastros. O painel administrativo completo está previsto como trabalho futuro (ver seção 7). |

## 3. Requisitos funcionais

Prioridade: **Alta** (essencial à primeira versão), **Média** (importante), **Baixa** (desejável).

| ID | Nome | Descrição verificável | Prioridade | História/Issue | Situação final |
|---|---|---|---|---|---|
| `RF-01` | Cadastro de doador | O sistema deve permitir que um visitante crie uma conta de doador informando nome, e-mail, senha e confirmação de senha. | Alta | [`US-01 / #2`](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | Planejado |
| `RF-02` | Cadastro de instituição | O sistema deve permitir que um visitante cadastre uma instituição em três seções: identificação/acesso, sobre a instituição e necessidades iniciais. | Alta | [`US-02 / #5`](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | Planejado |
| `RF-03` | Autenticação (login) | O sistema deve permitir que doador e instituição acessem a conta com o e-mail e a senha cadastrados. | Alta | [`US-03 / #3`](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Planejado |
| `RF-04` | Encerrar sessão | O sistema deve permitir que o usuário autenticado encerre a sessão (logout). | Baixa | [`US-03 / #3`](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Planejado |
| `RF-05` | Acesso restrito a autenticados | O sistema deve exibir a lista de instituições, suas necessidades e seus dados de contato apenas para usuários autenticados. | Alta | [`US-03 / #3`](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) | Planejado |
| `RF-06` | Landing page pública | O sistema deve apresentar uma página inicial pública com a proposta de valor, a explicação "Como funciona" e instituições em destaque. | Média | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Planejado |
| `RF-07` | Listar instituições | O sistema deve listar as instituições cadastradas exibindo nome, causa, cidade, resumo e número de necessidades abertas. | Alta | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Planejado |
| `RF-08` | Buscar instituições | O sistema deve permitir buscar instituições por texto (nome ou palavra-chave). | Média | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Planejado |
| `RF-09` | Filtrar instituições | O sistema deve permitir filtrar instituições por causa, por tipo de necessidade e por cidade, com opção de limpar os filtros. | Média | [`US-04 / #6`](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | Planejado |
| `RF-10` | Detalhe da instituição | O sistema deve exibir a página de detalhe da instituição com "sobre", formas de contribuição, contato e a lista de necessidades com progresso. | Alta | [`US-05 / #7`](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Planejado |
| `RF-11` | Selo "Verificada" | O sistema deve exibir o selo "Verificada" nas instituições validadas por um administrador. | Média | [`US-05 / #7`](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | Planejado |
| `RF-12` | Favoritar instituição | O sistema deve permitir que o doador favorite e desfavorite uma instituição. | Baixa | [`US-06 / #8`](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | Planejado |
| `RF-13` | Listar favoritos | O sistema deve exibir ao doador a lista das instituições que ele favoritou. | Baixa | [`US-06 / #8`](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) | Planejado |
| `RF-14` | Cadastrar necessidade | O sistema deve permitir que a instituição cadastre uma necessidade com item, tipo, quantidade desejada, unidade, observação opcional e situação (Aberta/Pausada). | Alta | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Planejado |
| `RF-15` | Editar necessidade | O sistema deve permitir que a instituição edite uma necessidade já cadastrada. | Média | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Planejado |
| `RF-16` | Excluir necessidade | O sistema deve permitir que a instituição exclua uma necessidade, preservando as doações já registradas para ela. | Média | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Planejado |
| `RF-17` | Pausar/reativar necessidade | O sistema deve permitir alternar a situação da necessidade entre Aberta e Pausada; a necessidade Pausada não aparece na página pública. | Baixa | [`US-07 / #9`](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | Planejado |
| `RF-18` | Progresso da necessidade | O sistema deve calcular e exibir o progresso de cada necessidade (quantidade desejada, prometida, recebida e percentual) e derivar seu status: Aberta, Parcial ou Atendida. | Alta | [`US-08 / #10`](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Planejado |
| `RF-19` | Prometer doação | O sistema deve permitir que o doador prometa uma doação a uma necessidade, escolhendo o item e a quantidade, limitada ao que ainda falta; a doação é registrada com status "Prometida". | Alta | [`US-08 / #10`](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | Planejado |
| `RF-20` | Acompanhar doações | O sistema deve permitir que o doador acompanhe suas doações e avance o status na ordem Prometida → A caminho → Entregue. | Média | [`US-09 / #11`](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | Planejado |
| `RF-21` | Cancelar doação | O sistema deve permitir que o doador cancele uma doação enquanto ela estiver em "Prometida" ou "A caminho", devolvendo a quantidade à necessidade. | Média | [`US-09 / #11`](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | Planejado |
| `RF-22` | Doações a receber | O sistema deve exibir, no painel da instituição, as doações prometidas com doador, item, quantidade e status. | Alta | [`US-10 / #12`](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | Planejado |
| `RF-23` | Confirmar recebimento | O sistema deve permitir que a instituição marque uma doação como recebida, atualizando o total recebido da necessidade. | Alta | [`US-10 / #12`](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | Planejado |
| `RF-24` | Resumo por necessidade | O sistema deve exibir, no painel da instituição, um resumo por necessidade com desejado, prometido, recebido e percentual. | Média | [`US-10 / #12`](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) | Planejado |
| `RF-25` | Notificar instituição | O sistema deve notificar a instituição quando uma doação for prometida ou cancelada para uma de suas necessidades. | Média | [`US-11 / #13`](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Planejado |
| `RF-26` | Notificar doador | O sistema deve notificar o doador sobre atualizações relevantes das suas doações. | Baixa | [`US-11 / #13`](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Planejado |
| `RF-27` | Central de notificações | O sistema deve listar as notificações do usuário e permitir marcá-las como lidas, exibindo um contador de não lidas. | Média | [`US-11 / #13`](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | Planejado |

## 4. Requisitos não funcionais

Evite termos vagos. Sempre que possível, inclua condição ou métrica.

| ID | Categoria | Descrição verificável | Como será avaliado | Issue |
|---|---|---|---|---|
| `RNF-01` | Usabilidade | O fluxo de prometer uma doação (`RF-19`) deve ser concluído em no máximo 3 passos: escolher item → definir quantidade → confirmar. | Teste de tarefa com contagem de passos no fluxo. | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) |
| `RNF-02` | Responsividade | A interface deve funcionar de 390 px (mobile) a 1440 px (desktop), com alvos de toque de no mínimo 44 px, em todas as telas dos `RF-06` a `RF-27`. | Inspeção com emulação de dispositivos no navegador. | Aplica-se a todas as histórias de interface ([#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)) |
| `RNF-03` | Segurança | As senhas cadastradas em `RF-01` e `RF-02` e verificadas em `RF-03` devem ser armazenadas com hash (ex.: bcrypt) e nunca em texto puro. | Inspeção do banco de dados e do código de autenticação. | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) |
| `RNF-04` | Privacidade | Os dados de contato das instituições exibidos em `RF-10` devem ser visíveis apenas a usuários autenticados, conforme `RF-05`. | Teste de acesso à página de detalhe sem estar logado. | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) |
| `RNF-05` | Restrição de negócio | A plataforma não deve coletar nem processar dados de pagamento em nenhum fluxo. | Revisão de escopo, telas e formulários. | Restrição de escopo: aplica-se a todo o produto, sem história específica |
| `RNF-06` | Integridade | A soma de quantidade prometida + recebida de uma necessidade nunca deve exceder a quantidade desejada (`RF-18`, `RF-19`). | Teste de limite no fluxo de doação, tentando doar acima do que falta. | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) |
| `RNF-07` | Consistência | Excluir uma necessidade (`RF-16`) não pode remover doações já registradas para ela. | Teste de exclusão de necessidade que possui doação associada. | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) |
| `RNF-08` | Desempenho | A listagem de instituições (`RF-07`) deve carregar em até 2 segundos para o volume esperado (dezenas de instituições). | Medição do tempo de carregamento no navegador. | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) |
| `RNF-09` | Compatibilidade | A aplicação deve funcionar nas versões atuais de Chrome, Firefox e Edge. | Teste manual multi-navegador dos fluxos prioritários. | Aplica-se a todo o produto, sem história específica |
| `RNF-10` | Acessibilidade | Os fluxos principais (`RF-01`, `RF-03`, `RF-19`) devem ter foco visível, contraste adequado e navegação completa por teclado. | Checklist WCAG básico e navegação sem mouse. | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) |

## 5. Regras de negócio

| ID | Regra | Origem/justificativa | Requisitos afetados |
|---|---|---|---|
| `RN-01` | Apenas usuários autenticados acessam a lista de instituições, suas necessidades e seus contatos. | Proteger os dados de contato das organizações (visão do produto). | `RF-05`, `RF-07`, `RF-10` |
| `RN-02` | A quantidade a doar é limitada ao que ainda falta na necessidade (desejado − prometido − recebido). | Evitar doações acima do necessário e desperdício de recursos. | `RF-18`, `RF-19` |
| `RN-03` | Toda doação nasce em "Prometida" e segue Prometida → A caminho → Entregue; pode ser cancelada enquanto estiver em "Prometida" ou "A caminho". | Modelo de acompanhamento definido no protótipo navegável. | `RF-19`, `RF-20`, `RF-21` |
| `RN-04` | O recebimento é confirmado pela instituição; a quantidade confirmada passa a compor o total "recebido" da necessidade. | Garantir que o progresso exibido reflita o que realmente chegou. | `RF-18`, `RF-23` |
| `RN-05` | O status da necessidade é derivado do progresso: Aberta (nada recebido), Parcial (parte recebida) e Atendida (recebido ≥ desejado). | Padronizar a leitura do progresso para doadores e instituições. | `RF-18` |
| `RN-06` | Necessidade "Pausada" não aparece na página pública, mas mantém as doações já registradas. | Permitir suspender pedidos temporariamente sem perder o histórico. | `RF-16`, `RF-17` |
| `RN-07` | A plataforma não intermedia dinheiro; a entrega é combinada diretamente entre doador e instituição. | Restrição central do produto, já definida na Sprint 1. | `RF-10`, `RF-19` |
| `RN-08` | O selo "Verificada" só é exibido após a validação da instituição por um administrador. | Gerar confiança nos doadores quanto à idoneidade da organização. | `RF-11` |

## 6. Histórias de usuário e critérios de aceitação

### US-01 — Criar conta de doador

Como **visitante**, quero **criar uma conta de doador**, para **poder ver as instituições e prometer doações**.

**Requisitos relacionados:** `RF-01`, `RNF-03`, `RNF-10`

**Critérios de aceitação:**

1. **Dado que** estou na tela de cadastro de doador, **quando** preencho nome, e-mail, senha e confirmação válidos, **então** minha conta é criada e passo a estar autenticado.
2. **Dado que** informo senha e confirmação diferentes, **quando** tento concluir, **então** o sistema exibe mensagem de erro e não cria a conta.
3. **Dado que** informo um e-mail já cadastrado, **quando** tento concluir, **então** o sistema impede o cadastro e informa o motivo.

**Issue:** [#2 — US-01 — Criar conta de doador](https://github.com/gigi-zacaroni/tp-eng-software/issues/2)

### US-02 — Cadastrar instituição

Como **responsável por uma instituição**, quero **cadastrar minha organização**, para **divulgar nossas necessidades e receber doações**.

**Requisitos relacionados:** `RF-02`, `RF-11`, `RNF-03`

**Critérios de aceitação:**

1. **Dado que** preencho as três seções (identificação/acesso, sobre a instituição e ao menos uma necessidade inicial), **quando** concluo o cadastro, **então** o perfil da instituição é publicado.
2. **Dado que** deixo um campo obrigatório em branco, **quando** tento avançar, **então** o sistema sinaliza o campo e impede a publicação.
3. **Dado que** o perfil foi recém-criado, **quando** ele é publicado, **então** ele aparece **sem** o selo "Verificada" até a validação de um administrador.

**Issue:** [#5 — US-02 — Cadastrar instituição](https://github.com/gigi-zacaroni/tp-eng-software/issues/5)

### US-03 — Entrar e acesso protegido

Como **usuário cadastrado**, quero **entrar com e-mail e senha**, para **acessar as funcionalidades do meu perfil**; e como **plataforma**, quero **restringir dados sensíveis a quem está logado**.

**Requisitos relacionados:** `RF-03`, `RF-04`, `RF-05`, `RN-01`, `RNF-04`

**Critérios de aceitação:**

1. **Dado que** informo credenciais válidas, **quando** faço login, **então** sou direcionado à área correspondente ao meu perfil (doador ou instituição).
2. **Dado que** informo credenciais inválidas, **quando** tento entrar, **então** o sistema recusa o acesso e informa o erro sem revelar qual campo está incorreto.
3. **Dado que** não estou autenticado, **quando** tento acessar a lista de instituições ou uma página de detalhe, **então** o sistema solicita login antes de exibir os dados.
4. **Dado que** estou autenticado, **quando** clico em "Sair", **então** a sessão é encerrada.

**Issue:** [#3 — US-03 — Entrar e acesso protegido](https://github.com/gigi-zacaroni/tp-eng-software/issues/3)

### US-04 — Encontrar instituições

Como **doador**, quero **buscar e filtrar instituições**, para **encontrar rapidamente quem eu posso ajudar**.

**Requisitos relacionados:** `RF-06`, `RF-07`, `RF-08`, `RF-09`, `RNF-08`

**Critérios de aceitação:**

1. **Dado que** estou autenticado, **quando** abro a lista de instituições, **então** vejo os cards com nome, causa, cidade, resumo e número de necessidades abertas.
2. **Dado que** aplico filtros por causa, tipo de necessidade ou cidade, **quando** confirmo, **então** a lista mostra apenas as instituições correspondentes.
3. **Dado que** os filtros não retornam resultados, **quando** a busca é executada, **então** o sistema exibe um estado vazio com a opção de limpar os filtros.

**Issue:** [#6 — US-04 — Encontrar instituições](https://github.com/gigi-zacaroni/tp-eng-software/issues/6)

### US-05 — Ver o detalhe de uma instituição

Como **doador**, quero **ver a página de uma instituição**, para **entender o trabalho dela e o que ela precisa**.

**Requisitos relacionados:** `RF-10`, `RF-11`, `RF-18`, `RN-08`, `RNF-04`

**Critérios de aceitação:**

1. **Dado que** escolho uma instituição, **quando** abro o detalhe, **então** vejo o "sobre", as formas de contribuição, o contato e a lista de necessidades com seu progresso.
2. **Dado que** a instituição foi validada por um administrador, **quando** vejo o detalhe, **então** o selo "Verificada" é exibido.
3. **Dado que** uma necessidade está pausada, **quando** abro o detalhe da instituição, **então** essa necessidade não aparece na lista.

**Issue:** [#7 — US-05 — Ver o detalhe de uma instituição](https://github.com/gigi-zacaroni/tp-eng-software/issues/7)

### US-06 — Favoritar instituições

Como **doador**, quero **favoritar instituições**, para **encontrá-las depois com facilidade**.

**Requisitos relacionados:** `RF-12`, `RF-13`

**Critérios de aceitação:**

1. **Dado que** vejo um card ou o detalhe de uma instituição, **quando** clico no ícone de favorito, **então** ela é adicionada aos meus favoritos.
2. **Dado que** uma instituição já está favoritada, **quando** clico novamente no ícone, **então** ela é removida dos meus favoritos.
3. **Dado que** não tenho favoritos, **quando** abro a página "Favoritos", **então** vejo um estado vazio orientando como favoritar.

**Issue:** [#8 — US-06 — Favoritar instituições](https://github.com/gigi-zacaroni/tp-eng-software/issues/8)

### US-07 — Gerenciar necessidades

Como **instituição**, quero **cadastrar, editar e excluir minhas necessidades**, para **manter meus pedidos sempre atualizados**.

**Requisitos relacionados:** `RF-14`, `RF-15`, `RF-16`, `RF-17`, `RN-06`, `RNF-07`

**Critérios de aceitação:**

1. **Dado que** estou no meu painel, **quando** cadastro uma necessidade com item, tipo, quantidade desejada e unidade, **então** ela passa a aparecer na minha página pública como "Aberta".
2. **Dado que** deixo um campo obrigatório vazio, **quando** tento salvar, **então** o sistema sinaliza o erro e não salva a necessidade.
3. **Dado que** excluo uma necessidade que já tinha doações, **quando** confirmo a exclusão, **então** ela sai da página pública, mas as doações já registradas permanecem em "Doações a receber".
4. **Dado que** marco uma necessidade como "Pausada", **quando** salvo, **então** ela deixa de aparecer na página pública e volta a aparecer se eu reativá-la.

**Issue:** [#9 — US-07 — Gerenciar necessidades](https://github.com/gigi-zacaroni/tp-eng-software/issues/9)

### US-08 — Prometer uma doação

Como **doador**, quero **prometer uma doação para uma necessidade**, para **ajudar exatamente naquilo que a instituição precisa**.

**Requisitos relacionados:** `RF-18`, `RF-19`, `RN-02`, `RN-05`, `RNF-01`, `RNF-06`

**Critérios de aceitação:**

1. **Dado que** estou no detalhe de uma instituição, **quando** clico em "Quero doar", escolho o item, defino a quantidade e confirmo, **então** a doação é registrada com status "Prometida".
2. **Dado que** informo uma quantidade maior do que a que ainda falta, **quando** tento confirmar, **então** o sistema não permite e limita a quantidade ao que falta.
3. **Dado que** a doação foi confirmada, **quando** ela é registrada, **então** o progresso da necessidade é atualizado e a instituição é notificada.

**Issue:** [#10 — US-08 — Prometer uma doação](https://github.com/gigi-zacaroni/tp-eng-software/issues/10)

### US-09 — Acompanhar e cancelar doações

Como **doador**, quero **acompanhar o status das minhas doações e cancelá-las quando necessário**, para **ter controle do que prometi**.

**Requisitos relacionados:** `RF-20`, `RF-21`, `RF-26`, `RN-03`

**Critérios de aceitação:**

1. **Dado que** tenho doações registradas, **quando** abro "Minhas doações", **então** vejo cada uma com a instituição, o item, a quantidade e o status atual.
2. **Dado que** uma doação está em "Prometida", **quando** avanço o status, **então** ela passa para "A caminho" e, em seguida, pode ir para "Entregue".
3. **Dado que** uma doação está em "Prometida" ou "A caminho", **quando** eu a cancelo, **então** a quantidade volta a ficar pendente na necessidade e a instituição é avisada.
4. **Dado que** uma doação já está em "Entregue", **quando** abro suas ações, **então** a opção de cancelar não está disponível.

**Issue:** [#11 — US-09 — Acompanhar e cancelar doações](https://github.com/gigi-zacaroni/tp-eng-software/issues/11)

### US-10 — Receber e confirmar doações

Como **instituição**, quero **ver as doações prometidas e confirmar o recebimento**, para **acompanhar o que estou recebendo**.

**Requisitos relacionados:** `RF-22`, `RF-23`, `RF-24`, `RN-04`

**Critérios de aceitação:**

1. **Dado que** um doador prometeu uma doação, **quando** abro "Doações a receber", **então** vejo o doador, o item, a quantidade e o status.
2. **Dado que** recebi fisicamente uma doação, **quando** clico em "Marcar recebida", **então** o status muda para "Recebida" e o total recebido da necessidade é atualizado.
3. **Dado que** o total recebido atinge a quantidade desejada, **quando** a confirmação é registrada, **então** a necessidade passa a exibir o status "Atendida".

**Issue:** [#12 — US-10 — Receber e confirmar doações](https://github.com/gigi-zacaroni/tp-eng-software/issues/12)

### US-11 — Receber notificações

Como **usuário autenticado**, quero **ser notificado sobre eventos relevantes**, para **não perder atualizações das doações**.

**Requisitos relacionados:** `RF-25`, `RF-26`, `RF-27`

**Critérios de aceitação:**

1. **Dado que** uma doação é prometida para a minha instituição, **quando** o evento ocorre, **então** recebo uma notificação e o contador de não lidas aumenta.
2. **Dado que** tenho notificações, **quando** marco uma como lida, **então** ela deixa de contar como não lida.
3. **Dado que** não tenho notificações, **quando** abro a central, **então** vejo um estado vazio e o contador zerado.

**Issue:** [#13 — US-11 — Receber notificações](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)

## 7. Fora do escopo

| Item | Motivo | Possível trabalho futuro |
|---|---|---|
| Processamento e gestão de pagamentos ou doações financeiras | O produto conecta doações de itens, não dinheiro — restrição central definida na Sprint 1 (`RN-07`). | Integração opcional com gateways de pagamento. |
| Transporte e logística de entrega das doações | A entrega é combinada diretamente entre doador e instituição. | Parcerias com transportadoras ou pontos de coleta. |
| Fiscalização do uso das doações pelas instituições | Já definido como fora do escopo na Sprint 1; a plataforma não tem meios de auditar as organizações. | — |
| Gerenciamento financeiro das instituições | Foge do problema de conexão entre doador e instituição. | — |
| Aplicativo mobile nativo | O foco da primeira versão é uma aplicação web responsiva (`RNF-02`). | Evolução para PWA ou aplicativo nativo. |
| Chat ou mensagens em tempo real entre doador e instituição | O contato ocorre pelos dados fornecidos no perfil da instituição. | Mensageria interna na plataforma. |
| Painel administrativo completo de verificação e moderação | O selo "Verificada" (`RF-11`) existe, mas o fluxo administrativo detalhado não cabe no prazo da primeira versão. | Módulo de administração e moderação. |
| Emissão de recibos ou relatórios fiscais | Fora do foco acadêmico do projeto e dependente de dados financeiros. | Geração de comprovantes de doação. |

## 8. Histórico de alterações

| Sprint | Requisito alterado | Alteração | Motivo | Issue/commit |
|---|---|---|---|---|
| Sprint 2 | `RF-01` a `RF-27`, `RNF-01` a `RNF-10`, `RN-01` a `RN-08` | Criação do documento de requisitos a partir da visão do produto e do protótipo navegável. | Transformar a visão da Sprint 1 em comportamento verificável, conforme a pergunta da Sprint 2. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) · [`69b636f`](https://github.com/gigi-zacaroni/tp-eng-software/commit/69b636f) |
| Sprint 2 | `RF-19`, `RF-20`, `RF-21` | Refino de "demonstrar interesse em ajudar" (Sprint 1) para "prometer doação e acompanhar até a entrega" (Prometida → A caminho → Entregue). | O protótipo detalhou o fluxo de doação, tornando o comportamento mensurável e testável. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) |
| Sprint 2 | `RF-12`, `RF-13`, `RF-25`, `RF-26`, `RF-27` | Inclusão de favoritos e da central de notificações, que não constavam no escopo inicial da Sprint 1. | Funcionalidades identificadas no protótipo como apoio à recorrência de uso e ao acompanhamento das doações. | [PR #1](https://github.com/gigi-zacaroni/tp-eng-software/pull/1) |
| Sprint 2 | `RF-01` a `RF-27` | Vínculo de todos os requisitos às onze Issues ([#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5)–[#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13)), cada uma com os critérios de aceitação no corpo e a label de prioridade. | Fechar a rastreabilidade requisito → história → Issue exigida pela disciplina. | [Issues #2–#13](https://github.com/gigi-zacaroni/tp-eng-software/issues) · [`rastreabilidade.md`](../rastreabilidade.md) |
| Sprint 2 | `docs/visao-geral.md` | Seção 4 (escopo inicial) atualizada para refletir o fluxo de doação refinado, os favoritos e as notificações; seção 2 ajustada na mesma linha. | Manter a visão do produto coerente com os requisitos definidos nesta sprint. | **Concluído** — [`visao-geral.md`](../visao-geral.md) · [ata de 12/09](../reunioes/2026-09-12-refinamento-requisitos.md) |
| Sprint 2 | `RF-11`, `RF-17`, `RF-19`, `RF-21` | Registro das lacunas entre os critérios de aceitação e o comportamento do protótipo (limite de quantidade, devolução de saldo ao cancelar, ocultação de necessidade pausada e condição do selo "Verificada"). | Os critérios reprovaram o protótipo em quatro pontos; as pendências passam à implementação em vez de serem corrigidas no protótipo, que é descartável. | [seção 7 da Sprint 2](../sprints/sprint-02.md) · [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10), [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) |

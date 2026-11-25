# Protótipo navegável do ConectaAção

> **Incremento da Sprint 2.** Este protótipo validou os fluxos e a visão do produto antes das decisões técnicas. Ele não é a aplicação final. Na Sprint 2 a stack prevista era Next.js com React e Java com Spring Boot; na Sprint 3 o grupo passou para Node.js, Express e MySQL. A aplicação final está em [`src/`](../../src/README.md), com telas que vieram de um protótipo de alta fidelidade feito depois.

Este documento liga cada tela do protótipo a um requisito e a um critério de aceitação, como a Sprint 2 pede.

## 1. Como executar

O protótipo tem dois arquivos que precisam ficar na mesma pasta (`ConectaAcao Prototipo.dc.html` carrega `./support.js`).

```bash
python -m http.server 8000 --directory docs/prototipo
```

Depois abra:

```
http://localhost:8000/ConectaAcao%20Prototipo.dc.html
```

Também funciona abrindo o `.dc.html` direto no navegador, desde que o `support.js` esteja ao lado. As fontes vêm do Google Fonts; sem internet, o protótipo usa a fonte padrão do sistema.

## 2. Como demonstrar cada perfil

O protótipo tem dois parâmetros na seção **"Ponto de vista"**:

| Parâmetro | Valores | Para que serve |
|---|---|---|
| `perfilInicial` | `visitante`, `doador` ou `instituicao` | Abre o protótipo no ponto de vista escolhido |
| `nomeDoador` | texto livre (padrão: `Camila Souza`) | Nome exibido como doador autenticado |

Sem alterar nada, o protótipo abre como **visitante**, e dá para percorrer o cadastro e o login.

## 3. Dados de exemplo

Cinco instituições: **Patinhas Sem Teto** (proteção animal, Campinas), **Banco de Alimentos Mãos Cheias** (combate à fome, São Paulo), **Casa Bem Viver** (apoio a idosos, Porto Alegre), **Instituto Semear** (educação infantil, Recife) e **Abrigo Nova Rota** (população em situação de rua, Curitiba).

As necessidades da Patinhas Sem Teto cobrem os estados de progresso do `RF-18` e do `RN-05`:

| Necessidade | Desejado | Prometido | Recebido | Status derivado |
|---|---:|---:|---:|---|
| Ração seca para cães adultos | 120 kg | 60 | 0 | **Parcial** |
| Areia sanitária para gatos | 25 sacos | 10 | 5 | **Parcial** |
| Antipulgas (dose única) | 40 un | 0 | 0 | **Aberta** |
| Mantas de tecido resistente | 30 un | 0 | 30 | **Atendida** |

Há 7 doações cobrindo os status Prometida, A caminho, Entregue, Cancelada e Recebida.

## 4. Mapa: tela → requisito → história

| Tela do protótipo | Requisitos demonstrados | História e Issue |
|---|---|---|
| `landing`: página pública, "Como funciona" e destaques | `RF-06` | [`US-04` / #6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) |
| `login`: e-mail, senha e validação | `RF-03`, `RF-05` | [`US-03` / #3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) |
| `escolhaConta` → `cadDoador` | `RF-01` | [`US-01` / #2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) |
| `cadInst`: cadastro em 3 seções | `RF-02` | [`US-02` / #5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) |
| `listagem`: cards, busca, filtros e estado vazio | `RF-07`, `RF-08`, `RF-09` | [`US-04` / #6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) |
| `detalhe`: sobre, contato e necessidades com progresso | `RF-10`, `RF-18` | [`US-05` / #7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) |
| `favoritos`: lista e estado vazio | `RF-12`, `RF-13` | [`US-06` / #8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) |
| modal de doação em 2 passos → `confirmacao` | `RF-19`, `RNF-01` | [`US-08` / #10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) |
| `minhasDoacoes`: linha do tempo e ações | `RF-20`, `RF-21` | [`US-09` / #11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) |
| `painel`: aba "Minhas necessidades" | `RF-14`, `RF-15`, `RF-16` | [`US-07` / #9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) |
| `painel`: aba "Doações a receber" e resumo | `RF-22`, `RF-23`, `RF-24` | [`US-10` / #12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) |
| sino de notificações com contador | `RF-25`, `RF-26`, `RF-27` | [`US-11` / #13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) |

As telas `listagem`, `detalhe`, `favoritos`, `minhasDoacoes` e `painel` são protegidas (`RF-05`, `RN-01`). O visitante vai para o login e volta ao destino depois de entrar.

## 5. Roteiro de verificação dos critérios de aceitação

Cada roteiro percorre um critério de aceitação da Sprint 2, registrado em [`requisitos.md`](../requisitos/requisitos.md) e na Issue correspondente.

### `US-03` CA-3: acesso protegido (`RF-05`, `RN-01`)

1. Abra o protótipo como `visitante`.
2. Clique em **"Instituições"** no menu.
3. **Esperado:** aparece a tela de login. Depois de entrar, você vai direto para a listagem.

### `US-04` CA-2 e CA-3: busca e estado vazio (`RF-08`, `RF-09`)

1. Logado, abra **"Instituições"**.
2. Aplique a causa **"Proteção animal"**. Só a Patinhas Sem Teto fica.
3. Combine com a cidade **"Recife, PE"**. Nenhum resultado.
4. **Esperado:** estado vazio com o botão **"Limpar filtros"**, que restaura a lista.

### `US-08` CA-1 e `RNF-01`: doar em 3 passos (`RF-19`)

1. Abra o detalhe da **Patinhas Sem Teto**.
2. Clique em **"Quero doar"**. No *Passo 1 de 2*, escolha o item e a quantidade.
3. Avance para o *Passo 2 de 2*, a revisão.
4. Confirme.
5. **Esperado:** tela "Doação registrada como Prometida"; o progresso sobe e a instituição recebe uma notificação no sino. São 3 ações (escolher, revisar e confirmar), como pede o `RNF-01`.

### `US-05` CA-1 e `US-10` CA-2 e CA-3: progresso e confirmação (`RF-18`, `RF-23`, `RN-04`, `RN-05`)

1. Como **instituição** (`perfilInicial = instituicao`), abra **Painel → Doações a receber**.
2. Em "Areia sanitária para gatos" (25 desejados, 10 prometidos, 5 recebidos), clique em **"Marcar recebida"** numa doação.
3. **Esperado:** o status vira "Recebida", o prometido cai e o recebido sobe na mesma quantidade. O status derivado acompanha (`Aberta`, `Parcial`, `Atendida`).
4. "Mantas de tecido resistente" (30 de 30 recebidos) já aparece como **Atendida** (`RN-05`).

### `US-07` CA-3: excluir necessidade preserva doações (`RF-16`, `RNF-07`)

1. Como instituição, vá em **Painel → Minhas necessidades**.
2. Exclua **"Ração seca para cães adultos"**, que tem doações, e confirme.
3. **Esperado:** a necessidade some da lista, mas as doações dela continuam em "Doações a receber" (`RNF-07`).

### `US-09` CA-2 e CA-4: avançar e cancelar (`RF-20`, `RF-21`, `RN-03`)

1. Como **doador**, abra **"Minhas doações"**.
2. Na doação "Prometida", clique em avançar. Ela vira "A caminho" e depois "Entregue".
3. **Esperado:** a doação "Entregue" não oferece mais a opção de cancelar (`RN-03`).

Na aplicação final, quem avança o status é a instituição, e não o doador (`RN-04`).

### `US-11` CA-1 e CA-2: notificações (`RF-25`, `RF-27`)

1. Depois de confirmar uma doação, abra o **sino** no cabeçalho.
2. **Esperado:** a notificação nova aparece e o contador mostra as não lidas; ao marcar como lida, o contador diminui.

## 6. Limitações conhecidas do protótipo

O protótipo guarda tudo em memória. Recarregar a página restaura os dados de exemplo. Não há back-end, banco nem persistência.

Os critérios abaixo não eram demonstráveis no protótipo e ficaram como pendência para a implementação:

| Critério ou requisito | O que o protótipo faz | O que faltava | Situação na aplicação final |
|---|---|---|---|
| `US-08` CA-2, `RN-02`, `RNF-06` | Informa "ainda faltam N", mas não bloqueia quantidade maior | Limitar a quantidade ao saldo | Atendido |
| `US-09` CA-3, `RN-03` | Cancelar muda o status para "Cancelada" | Devolver a quantidade ao saldo | Atendido |
| `US-05` CA-3, `RF-17`, `RN-06` | A necessidade pausada mostra o selo "Pausada" | Ocultar necessidades pausadas | Não atendido: não existe pausa |
| `RF-11`, `RN-08` | O selo "Verificada" é ilustrativo | Selo só após validação de administrador | Não atendido |
| `RNF-03` | Sem autenticação real | Hash de senha com bcrypt | Atendido |
| `RNF-08` | Dados em memória | Medir com volume representativo | Não verificado |

Essas lacunas foram registradas na seção 7 do [`sprint-02.md`](../sprints/sprint-02.md). A situação final de cada requisito está em [`requisitos.md`](../requisitos/requisitos.md).

## 7. Arquivos

| Arquivo | Descrição |
|---|---|
| `ConectaAcao Prototipo.dc.html` | Protótipo completo: 10 telas, modais e navegação |
| `support.js` | Runtime necessário para renderizar o protótipo |

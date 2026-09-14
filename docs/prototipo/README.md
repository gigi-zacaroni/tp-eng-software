# Protótipo navegável do ConectaAção

> **Incremento da Sprint 2.** Este protótipo existe para validar os fluxos e a visão do produto antes de decisões técnicas. Ele **não é a versão final**: telas, navegação e linguagens usadas aqui (HTML/CSS/JS) são demonstrativas. A aplicação real será construída com o stack definido pelo grupo — **Next.js/React** no front e **Java/Spring Boot** no back.

Este documento existe para cumprir o que a Sprint 2 exige do incremento: **relacionar cada tela a um requisito e a um critério de aceitação**. Telas sem esse vínculo não caracterizam entrega.

## 1. Como executar

O protótipo é composto por dois arquivos que precisam ficar lado a lado (`ConectaAcao Prototipo.dc.html` referencia `./support.js` por caminho relativo).

```bash
python -m http.server 8000 --directory docs/prototipo
```

Depois abra no navegador:

```
http://localhost:8000/ConectaAcao%20Prototipo.dc.html
```

Também funciona abrindo o arquivo `.dc.html` diretamente no navegador (duplo clique), desde que o `support.js` esteja na mesma pasta. As fontes vêm do Google Fonts; sem internet o protótipo funciona igual, apenas com a fonte padrão do sistema.

## 2. Como demonstrar cada perfil

O protótipo tem dois parâmetros editáveis, na seção **"Ponto de vista"**:

| Parâmetro | Valores | Para que serve |
|---|---|---|
| `perfilInicial` | `visitante` · `doador` · `instituicao` | Abre o protótipo já no ponto de vista escolhido |
| `nomeDoador` | texto livre (padrão: `Camila Souza`) | Nome exibido como doador autenticado |

Sem alterar nada, o protótipo abre como **visitante** e é possível percorrer todo o fluxo de cadastro e login normalmente.

## 3. Dados de exemplo

Cinco instituições semeadas: **Patinhas Sem Teto** (proteção animal, Campinas), **Banco de Alimentos Mãos Cheias** (combate à fome, São Paulo), **Casa Bem Viver** (apoio a idosos, Porto Alegre), **Instituto Semear** (educação infantil, Recife) e **Abrigo Nova Rota** (população em situação de rua, Curitiba).

As necessidades da Patinhas Sem Teto foram semeadas para cobrir os quatro estados de progresso do `RF-18`/`RN-05`:

| Necessidade | Desejado | Prometido | Recebido | Status derivado |
|---|---:|---:|---:|---|
| Ração seca para cães adultos | 120 kg | 60 | 0 | **Parcial** |
| Areia sanitária para gatos | 25 sacos | 10 | 5 | **Parcial** |
| Antipulgas (dose única) | 40 un | 0 | 0 | **Aberta** |
| Mantas de tecido resistente | 30 un | 0 | 30 | **Atendida** |

Há 7 doações semeadas cobrindo todos os status do `RN-03`: Prometida, A caminho, Entregue, Cancelada e Recebida.

## 4. Mapa: tela → requisito → história

| Tela do protótipo | Requisitos demonstrados | História / Issue |
|---|---|---|
| `landing` — hero público, "Como funciona", destaques | `RF-06` | [`US-04` / #6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) |
| `login` — e-mail, senha e validação | `RF-03`, `RF-05` | [`US-03` / #3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) |
| `escolhaConta` → `cadDoador` | `RF-01` | [`US-01` / #2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) |
| `cadInst` — 3 seções de cadastro | `RF-02` | [`US-02` / #5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) |
| `listagem` — cards, busca, filtros, estado vazio | `RF-07`, `RF-08`, `RF-09` | [`US-04` / #6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) |
| `detalhe` — sobre, contato, necessidades com progresso | `RF-10`, `RF-18` | [`US-05` / #7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) |
| `favoritos` — lista e estado vazio | `RF-12`, `RF-13` | [`US-06` / #8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) |
| modal de doação (2 passos) → `confirmacao` | `RF-19`, `RNF-01` | [`US-08` / #10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) |
| `minhasDoacoes` — timeline e ações | `RF-20`, `RF-21` | [`US-09` / #11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) |
| `painel` — aba "Minhas necessidades" | `RF-14`, `RF-15`, `RF-16` | [`US-07` / #9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) |
| `painel` — aba "Doações a receber" + resumo | `RF-22`, `RF-23`, `RF-24` | [`US-10` / #12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) |
| sino de notificações (dropdown + contador) | `RF-25`, `RF-26`, `RF-27` | [`US-11` / #13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) |

Guardas de acesso (`RF-05`, `RN-01`) estão em toda a navegação: as telas `listagem`, `detalhe`, `favoritos`, `minhasDoacoes` e `painel` são protegidas — o visitante é redirecionado ao login e devolvido ao destino pretendido depois de autenticar.

## 5. Roteiro de verificação dos critérios de aceitação

Cada roteiro abaixo percorre um critério de aceitação registrado em [`docs/requisitos/requisitos.md`](../requisitos/requisitos.md) e na Issue correspondente.

### `US-03` CA-3 — acesso protegido (`RF-05`, `RN-01`)

1. Abra o protótipo como `visitante`.
2. Clique em **"Instituições"** no menu.
3. **Esperado:** em vez da lista, aparece a tela de login. Após entrar, você cai direto na listagem — o destino pretendido foi preservado.

### `US-04` CA-2 e CA-3 — busca e estado vazio (`RF-08`, `RF-09`)

1. Autenticado, abra **"Instituições"**.
2. Aplique o filtro de causa **"Proteção animal"** → apenas Patinhas Sem Teto permanece.
3. Combine com a cidade **"Recife, PE"** → nenhum resultado.
4. **Esperado:** estado vazio com o botão **"Limpar filtros"**, que restaura a lista.

### `US-08` CA-1 e `RNF-01` — doar em 3 passos (`RF-19`)

1. Abra o detalhe da **Patinhas Sem Teto**.
2. Clique em **"Quero doar"** → *Passo 1 de 2*: escolha o item e ajuste a quantidade.
3. Avance → *Passo 2 de 2*: revisão.
4. Confirme.
5. **Esperado:** tela "Doação registrada como Prometida"; o progresso da necessidade sobe e a instituição recebe notificação no sino. São exatamente **3 passos**, cumprindo a métrica do `RNF-01`.

### `US-05` CA-1 + `US-10` CA-2 e CA-3 — progresso e confirmação (`RF-18`, `RF-23`, `RN-04`, `RN-05`)

1. Como **instituição** (`perfilInicial = instituicao`), abra o **Painel → Doações a receber**.
2. Em "Areia sanitária para gatos" (25 desejados, 10 prometidos, 5 recebidos), clique em **"Marcar recebida"** numa doação.
3. **Esperado:** o status vira "Recebida", o total prometido diminui e o recebido aumenta na mesma quantidade — o progresso da necessidade se atualiza e o status derivado acompanha (`Aberta` → `Parcial` → `Atendida`).
4. A necessidade "Mantas de tecido resistente" (30 de 30 recebidos) já aparece como **Atendida**, comprovando `RN-05`.

### `US-07` CA-3 — excluir necessidade preserva doações (`RF-16`, `RNF-07`)

1. Como instituição, vá em **Painel → Minhas necessidades**.
2. Exclua **"Ração seca para cães adultos"**, que possui doações associadas, e confirme no modal.
3. **Esperado:** a necessidade some da lista, mas as doações dela **permanecem** em "Doações a receber". É a verificação direta do `RNF-07`.

### `US-09` CA-2 e CA-4 — avançar e cancelar (`RF-20`, `RF-21`, `RN-03`)

1. Como **doador**, abra **"Minhas doações"**.
2. Na doação em "Prometida", clique em avançar → vira "A caminho"; avance de novo → "Entregue".
3. **Esperado:** a doação em **"Entregue"** não oferece mais a opção de cancelar, comprovando o `RN-03`.

### `US-11` CA-1 e CA-2 — notificações (`RF-25`, `RF-27`)

1. Após confirmar uma doação, abra o **sino** no cabeçalho.
2. **Esperado:** a notificação nova aparece e o contador de não lidas reflete a quantidade; ao marcar como lida, o contador diminui.

## 6. Limitações conhecidas do protótipo

O protótipo mantém todo o estado **em memória** — recarregar a página restaura os dados de exemplo. Não há back-end, banco de dados nem persistência.

Além disso, os critérios abaixo **não são demonstráveis nesta versão** e ficam registrados como pendência para a implementação:

| Critério / requisito | O que o protótipo faz hoje | O que falta |
|---|---|---|
| `US-08` CA-2 · `RN-02`, `RNF-06` | O modal **informa** "ainda faltam N", mas não bloqueia quantidade acima do que falta | Validar e limitar a quantidade ao saldo da necessidade |
| `US-09` CA-3 · `RN-03` | Cancelar muda o status para "Cancelada" | Devolver a quantidade cancelada ao saldo pendente da necessidade |
| `US-05` CA-3 · `RF-17`, `RN-06` | A necessidade pausada exibe o selo "Pausada" | Ocultar necessidades pausadas da página pública |
| `RF-11` · `RN-08` | O selo "Verificada" aparece de forma ilustrativa | Condicionar o selo à validação por um administrador |
| `RNF-03` | Sem autenticação real | Hash de senha (bcrypt) no back-end |
| `RNF-08` | Dados em memória, volume mínimo | Medição de carga com volume representativo |

Essas lacunas estão registradas na seção 7 de [`docs/sprints/sprint-02.md`](../sprints/sprint-02.md) e serão endereçadas nas sprints de implementação.

## 7. Arquivos

| Arquivo | Descrição |
|---|---|
| `ConectaAcao Prototipo.dc.html` | Protótipo completo — 10 telas, modais e navegação |
| `support.js` | Runtime necessário para renderizar o protótipo |

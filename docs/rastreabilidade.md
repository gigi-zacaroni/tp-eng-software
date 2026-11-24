# Matriz de rastreabilidade

> Atualize esta tabela ao longo do semestre. Células vazias devem ser justificadas; não invente links ou evidências.

**Estado em: Sprint 8 (23/11/2026).** Nesta sprint a matriz recebeu os casos de teste reais, a evidência de execução e a situação final de cada requisito. Os mesmos dados estão na seção 4 de [`evidencias-testes.md`](testes/evidencias-testes.md). A coluna *Código / protótipo* agora aponta para as telas de `src/front/` quando elas existem. Os casos de teste estão descritos em [`plano-de-testes.md`](testes/plano-de-testes.md).

Legenda da situação:

- **Atendido**: implementado e com teste aprovado.
- **Parcial**: parte do requisito existe, ou existe sem verificação completa. O motivo aparece na própria célula.
- **Não atendido**: sem código na versão final.
- **Não verificado**: depende de medição que não foi feita.

## Requisitos funcionais

| Requisito | História/Issue | Modelo ([`modelagem.md`](modelagem/modelagem.md)) | Decisão/padrão/arquitetura | Código / protótipo | Caso de teste | Resultado/evidência | Situação final |
|---|---|---|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) — `US-01` | §3 — `USUARIO` + `DOADOR` | [DP-01](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-03](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-04](projeto/decisoes-de-projeto.md#dp-04--camada-de-repositories-padrão-repository) · [PP-01](padroes/padroes-de-projeto.md#3-padrão-aplicado) | [`services/authService.js`](../src/back/src/services/authService.js) · [`usuarioRepository.js`](../src/back/src/repositories/usuarioRepository.js) · [`doadorRepository.js`](../src/back/src/repositories/doadorRepository.js) | `CT-01` a `CT-03`, `CT-05`, `CT-20`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Atendido** |
| `RF-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) — `US-02` | §3 — `INSTITUICAO` + `NECESSIDADE` (um para muitos obrigatório) | [DP-01](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-03](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-04](projeto/decisoes-de-projeto.md#dp-04--camada-de-repositories-padrão-repository) · [PP-01](padroes/padroes-de-projeto.md#3-padrão-aplicado) | [`services/authService.js`](../src/back/src/services/authService.js) · [`instituicaoRepository.js`](../src/back/src/repositories/instituicaoRepository.js) · [`necessidadeRepository.js`](../src/back/src/repositories/necessidadeRepository.js) | `CT-04`, `CT-05`, `CT-20`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Atendido** |
| `RF-03` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | §3 — `USUARIO` · §6 separação de perfis | [DP-03](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-04](projeto/decisoes-de-projeto.md#dp-04--camada-de-repositories-padrão-repository) · [PP-01](padroes/padroes-de-projeto.md#3-padrão-aplicado) | [`services/authService.js`](../src/back/src/services/authService.js) · [`usuarioRepository.js`](../src/back/src/repositories/usuarioRepository.js) | `CT-06`, `CT-07` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Atendido** |
| `RF-04` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | — não modelado: o logout é stateless e não altera o domínio | [DP-01](projeto/decisoes-de-projeto.md#2-registro-de-decisões) | [`services/authService.js`](../src/back/src/services/authService.js) | sem caso | sem evidência | **Parcial**: botão "Sair" e rota `/logout` sem teste. O JWT vale até expirar |
| `RF-05` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3) — `US-03` | §2 — etapa de acesso que precede o passo 1 | sem decisão local nesta sprint | [`middleware/autenticacao.js`](../src/back/src/middleware/autenticacao.js) | `CT-20`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Atendido**. Falta a revisão no navegador (`CT-21`) |
| `RF-06` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | sem decisão local nesta sprint | [`index.html`](../src/front/index.html) | `CT-11`, `CT-20`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Atendido** |
| `RF-07` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | sem decisão local nesta sprint | [`pages/instituicoes.html`](../src/front/pages/instituicoes.html) | `CT-11`, `CT-20`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: sem causa e cidade |
| `RF-08` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | sem decisão local nesta sprint | [`pages/instituicoes.html`](../src/front/pages/instituicoes.html) | `CT-21` | não executado | **Parcial**: busca na tela, sem execução manual |
| `RF-09` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) — `US-04` | — não modelado; lacuna registrada na §6 | sem decisão local nesta sprint | [`pages/instituicoes.html`](../src/front/pages/instituicoes.html) | `CT-21` | não executado | **Parcial**: sem filtros de causa, tipo e cidade |
| `RF-10` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | — não modelado; lacuna registrada na §6 | sem decisão local nesta sprint | [`pages/instituicao.html`](../src/front/pages/instituicao.html) | `CT-11`, `CT-20`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: sem contato e formas de contribuição |
| `RF-11` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) — `US-05` | §3 — `INSTITUICAO.verificada` | sem decisão local nesta sprint | campo existe no [schema](../src/back/sql/schema.sql), sem fluxo de verificação · protótipo: selo ilustrativo | `CT-04`, `CT-11` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: sem tela de administrador |
| `RF-12` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | — favoritos fora do escopo dos dois modelos desta sprint | sem decisão local nesta sprint | protótipo: ação favoritar | sem caso | sem evidência | **Não atendido** |
| `RF-13` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8) — `US-06` | — favoritos fora do escopo dos dois modelos desta sprint | sem decisão local nesta sprint | protótipo: `favoritos` | sem caso | sem evidência | **Não atendido** |
| `RF-14` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | §3 — `NECESSIDADE` | [DP-03](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-04](projeto/decisoes-de-projeto.md#dp-04--camada-de-repositories-padrão-repository) · [PP-01](padroes/padroes-de-projeto.md#3-padrão-aplicado) | criação só no cadastro inicial, em [`services/authService.js`](../src/back/src/services/authService.js) (SQL em [`necessidadeRepository.js`](../src/back/src/repositories/necessidadeRepository.js)) · protótipo: `painel` | `CT-04` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: só no cadastro inicial |
| `RF-15` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | §3 — `NECESSIDADE` | sem decisão local nesta sprint | protótipo: `painel` → editar | sem caso | sem evidência | **Não atendido** |
| `RF-16` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | §3 — FK `DOACAO` → `NECESSIDADE` preserva as doações | sem decisão local nesta sprint | protótipo: `painel` → excluir | sem caso | sem evidência | **Não atendido** |
| `RF-17` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) — `US-07` | — a situação Aberta/Pausada não foi representada no modelo estrutural | sem decisão local nesta sprint | protótipo: situação no formulário | sem caso | sem evidência | **Não atendido** |
| `RF-18` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | §3 — `quantidadeTotal` e `quantidadeFaltante` | [DP-02](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-04](projeto/decisoes-de-projeto.md#dp-04--camada-de-repositories-padrão-repository) · [PP-01](padroes/padroes-de-projeto.md#3-padrão-aplicado) | [`pages/instituicao.html`](../src/front/pages/instituicao.html) | `CT-08`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: sem quantidade recebida |
| `RF-19` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) — `US-08` | §2 — arestas 1 a 9 · §3 — `DOACAO` | [DP-01](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-02](projeto/decisoes-de-projeto.md#2-registro-de-decisões) · [DP-04](projeto/decisoes-de-projeto.md#dp-04--camada-de-repositories-padrão-repository) · [PP-01](padroes/padroes-de-projeto.md#3-padrão-aplicado) | [`services/doacaoService.js`](../src/back/src/services/doacaoService.js) · [`necessidadeRepository.js`](../src/back/src/repositories/necessidadeRepository.js) · [`doacaoRepository.js`](../src/back/src/repositories/doacaoRepository.js) | `CT-08` a `CT-10`, `CT-12`, `CT-25` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Atendido**. `CT-14` e `CT-23` pendentes |
| `RF-20` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | §2 — aresta 15 · §3 — `DOACAO.status` | sem decisão local nesta sprint | [`services/doacaoService.js`](../src/back/src/services/doacaoService.js) | `CT-24` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: só na API, sem tela |
| `RF-21` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) — `US-09` | §2 — aresta 15, devolução ao saldo | [DP-02](projeto/decisoes-de-projeto.md#2-registro-de-decisões) | [`services/doacaoService.js`](../src/back/src/services/doacaoService.js) | `CT-24` | [saída](testes/evidencias/execucao-sprint-08-unitarios.txt) | **Parcial**: só na API, sem tela |
| `RF-22` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | §2 — arestas 10 a 14 | sem decisão local nesta sprint | sem endpoint de consulta · protótipo: `painel` → Doações a receber | sem caso | sem evidência | **Não atendido** |
| `RF-23` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | §2 — aresta 16 | sem decisão local nesta sprint | sem rota de confirmação · protótipo: "Marcar recebida" | sem caso | sem evidência | **Não atendido** |
| `RF-24` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12) — `US-10` | §2 — painel · §3 — agregação de `DOACAO` por `NECESSIDADE` | sem decisão local nesta sprint | sem consulta de agregação · protótipo: Resumo por necessidade | sem caso | sem evidência | **Não atendido** |
| `RF-25` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | — notificações fora do escopo dos dois modelos desta sprint | sem decisão local nesta sprint | protótipo: sino de notificações | sem caso | sem evidência | **Não atendido** |
| `RF-26` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | — notificações fora do escopo dos dois modelos desta sprint | sem decisão local nesta sprint | protótipo: sino (perfil doador) | sem caso | sem evidência | **Não atendido** |
| `RF-27` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) — `US-11` | — notificações fora do escopo dos dois modelos desta sprint | sem decisão local nesta sprint | protótipo: dropdown + contador | sem caso | sem evidência | **Não atendido** |

> **Por que 14 dos 27 requisitos aparecem sem modelo.** Os dois modelos desta sprint cobrem o fluxo de doação e o domínio persistido. As funcionalidades de descoberta (`RF-06`–`RF-10`), favoritos (`RF-12`, `RF-13`) e notificações (`RF-25`–`RF-27`) não foram modeladas — no caso da descoberta, isso se revelou uma lacuna relevante, registrada na [§6 de `modelagem.md`](modelagem/modelagem.md#6-refinamentos-identificados) e transformada no item `T-10` do backlog.

## Requisitos não funcionais

| Requisito | História/Issue | Caso de teste | Situação na Sprint 8 |
|---|---|---|---|
| `RNF-01` Doação em até 3 passos | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `CT-23` (não executado) | **Parcial**: o fluxo tem 3 passos, sem execução manual registrada |
| `RNF-02` 390 px a 1440 px, toque de 44 px | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | revisão do CSS | **Parcial**: sem teste em 390 px |
| `RNF-03` Senha com hash | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `CT-01` | **Atendido** |
| `RNF-04` Contato só para autenticados | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | `CT-20`, `CT-25` | **Atendido** |
| `RNF-05` Sem dados de pagamento | restrição de escopo | revisão das telas | **Atendido** |
| `RNF-06` Prometido + recebido ≤ desejado | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `CT-09`, `CT-10`, `CT-12`, `CT-25` | **Atendido**. `CT-19` no MySQL real pendente |
| `RNF-07` Excluir necessidade preserva doações | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | sem caso | **Não atendido**: depende do `RF-16` |
| `RNF-08` Listagem em até 2 s | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | sem caso | **Não verificado** |
| `RNF-09` Chrome, Firefox e Edge | todo o produto | sem caso | **Não verificado** |
| `RNF-10` Acessibilidade | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | revisão do código | **Parcial**: sem auditoria de contraste e teclado |

**Totais (27 RF e 10 RNF):** 10 atendidos, 13 parciais, 12 não atendidos e 2 não verificados.

## Como preencher

- **Requisito:** identificador existente em `docs/requisitos/requisitos.md`.
- **História/Issue:** link direto para a Issue no GitHub.
- **Modelo:** seção, diagrama ou arquivo que representa o requisito.
- **Decisão/padrão/arquitetura:** identificador da decisão técnica pertinente.
- **Código:** link para o arquivo ou diretório na tag da sprint.
- **Caso de teste:** identificador definido no plano de testes.
- **Resultado/evidência:** relatório, captura, log ou execução documentada.
- **Situação final:** atendido, parcialmente atendido, não atendido ou retirado do escopo com justificativa.

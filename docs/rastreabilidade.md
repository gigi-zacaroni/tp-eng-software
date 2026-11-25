# Matriz de rastreabilidade

**Estado em: entrega final (25/11/2026).** A matriz liga cada requisito à Issue, ao modelo, à decisão técnica, ao código, ao caso de teste e à situação final. A mesma situação aparece em [`requisitos.md`](requisitos/requisitos.md) e na seção 4 de [`evidencias-testes.md`](testes/evidencias-testes.md). Os casos de teste estão em [`plano-de-testes.md`](testes/plano-de-testes.md).

Legenda:

- **Atendido**: implementado e com teste aprovado.
- **Parcial**: só parte do requisito existe. O motivo aparece na célula.
- **Não atendido**: sem código na versão final.
- **Não verificado**: depende de medição que não foi feita.
- **No navegador**: dado guardado no `localStorage` pelo [`app.js`](../src/front/app.js), e não no banco.

Atalhos usados na coluna de decisões: [DP-01 a DP-03](projeto/decisoes-de-projeto.md#2-registro-de-decisões), [DP-04](projeto/decisoes-de-projeto.md#dp-04-camada-de-repositories-padrão-repository), [PP-01](padroes/padroes-de-projeto.md#2-padrão-aplicado). Todas as evidências automatizadas estão em [`execucao-final-unitarios.txt`](testes/evidencias/execucao-final-unitarios.txt).

## Requisitos funcionais

| Requisito | Issue e história | Modelo ([`modelagem.md`](modelagem/modelagem.md)) | Decisão | Código | Caso de teste | Situação final |
|---|---|---|---|---|---|---|
| `RF-01` | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), `US-01` | §3: `USUARIO` e `DOADOR` | DP-01, DP-03, DP-04, PP-01 | [`authService.js`](../src/back/src/services/authService.js), [`usuarioRepository.js`](../src/back/src/repositories/usuarioRepository.js), [`doadorRepository.js`](../src/back/src/repositories/doadorRepository.js), tela "Criar conta" do `app.js` | `CT-01` a `CT-03`, `CT-05`, `CT-20`, `CT-25` | **Atendido** |
| `RF-02` | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5), `US-02` | §3: `INSTITUICAO` e `NECESSIDADE` | DP-01, DP-03, DP-04, PP-01 | [`authService.js`](../src/back/src/services/authService.js), [`instituicaoRepository.js`](../src/back/src/repositories/instituicaoRepository.js), [`necessidadeRepository.js`](../src/back/src/repositories/necessidadeRepository.js), tela "Criar conta" | `CT-04`, `CT-05`, `CT-20`, `CT-25` | **Atendido** |
| `RF-03` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), `US-03` | §3: `USUARIO` | DP-03, DP-04, PP-01 | [`authService.js`](../src/back/src/services/authService.js), tela "Entrar" | `CT-06`, `CT-07`, `CT-25` | **Atendido** |
| `RF-04` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), `US-03` | Não modelado: o logout não altera o domínio | DP-01 | [`authController.js`](../src/back/src/controllers/authController.js), botão "Sair da conta" | sem caso | **Atendido**. O front descarta o token. |
| `RF-05` | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), `US-03` | §2: acesso antes do passo 1 | DA-03 | [`autenticacao.js`](../src/back/src/middleware/autenticacao.js), `navigate()` no `app.js` | `CT-20`, `CT-25` | **Atendido** |
| `RF-06` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6), `US-04` | Não modelado | DA-02 | [`routes/instituicoes.js`](../src/back/src/routes/instituicoes.js), tela inicial | `CT-11`, `CT-20`, `CT-25` | **Atendido** |
| `RF-07` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6), `US-04` | Não modelado | DP-04 | [`instituicaoService.js`](../src/back/src/services/instituicaoService.js), tela "Instituições" | `CT-11`, `CT-20`, `CT-25` | **Atendido**. Causa e cidade no navegador. |
| `RF-08` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6), `US-04` | Não modelado | DA-02 | telas "Instituições" e "Explorar" | `CT-21` (não executado) | **Atendido**. Busca no navegador. |
| `RF-09` | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6), `US-04` | Não modelado | DA-02 | telas "Instituições" e "Explorar" | `CT-21` (não executado) | **Atendido**. Filtros e dados no navegador. |
| `RF-10` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7), `US-05` | Não modelado | DP-04 | [`instituicaoService.js`](../src/back/src/services/instituicaoService.js), tela da instituição | `CT-11`, `CT-20`, `CT-25` | **Atendido**. Contato no navegador. |
| `RF-11` | [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7), `US-05` | §3: `INSTITUICAO.verificada` | nenhuma | coluna no [schema](../src/back/sql/schema.sql), sem fluxo | sem caso | **Não atendido** |
| `RF-12`, `RF-13` | [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8), `US-06` | Não modelado | nenhuma | sem código | sem caso | **Não atendido** |
| `RF-14` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9), `US-07` | §3: `NECESSIDADE` | DP-03, DP-04, PP-01 | `POST /instituicoes/necessidades` em [`instituicaoService.js`](../src/back/src/services/instituicaoService.js), tela "Nova necessidade" | `CT-04`, `CT-25`, `CT-26` | **Atendido**. Opcionais no navegador. |
| `RF-15` a `RF-17` | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9), `US-07` | §3: `NECESSIDADE` | nenhuma | sem código | sem caso | **Não atendido** |
| `RF-18` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10), `US-08` | §3: `quantidadeTotal` e `quantidadeFaltante` | DP-02, DP-04, PP-01 | `detalhar()` em [`instituicaoService.js`](../src/back/src/services/instituicaoService.js), barras de progresso | `CT-08`, `CT-25` | **Atendido** |
| `RF-19` | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10), `US-08` | §2: arestas 1 a 9; §3: `DOACAO` | DP-01, DP-02, DP-04, PP-01 | [`doacaoService.js`](../src/back/src/services/doacaoService.js), [`doacaoRepository.js`](../src/back/src/repositories/doacaoRepository.js), tela de doação | `CT-08` a `CT-10`, `CT-12`, `CT-25` | **Atendido**. `CT-14` e `CT-23` pendentes. |
| `RF-20` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11), `US-09` | §2: aresta 15; §3: `DOACAO.status` | DP-04 | `GET /doacoes/minhas` em [`routes/doacoes.js`](../src/back/src/routes/doacoes.js), tela "Minhas doações" | `CT-24`, `CT-25` | **Atendido** |
| `RF-21` | [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11), `US-09` | §2: aresta 15 | DP-02 | `cancelarDoacao()` em [`doacaoService.js`](../src/back/src/services/doacaoService.js), botão "Cancelar doação" | `CT-24`, `CT-25` | **Atendido** |
| `RF-22` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12), `US-10` | §2: arestas 10 a 14 | DP-04 | `GET /doacoes/recebidas`, tela "Doações recebidas" | `CT-25` | **Atendido** |
| `RF-23` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12), `US-10` | §2: aresta 16 | DP-02 | `atualizarDoacaoDaInstituicao()` em [`doacaoService.js`](../src/back/src/services/doacaoService.js), botões "Aceitar", "Recusar" e "Confirmar recebimento" | `CT-24`, `CT-25` | **Atendido** |
| `RF-24` | [#12](https://github.com/gigi-zacaroni/tp-eng-software/issues/12), `US-10` | §3: soma de `DOACAO` por `NECESSIDADE` | nenhuma | painel da instituição | `CT-25` | **Parcial**: sem o total recebido |
| `RF-25` a `RF-27` | [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13), `US-11` | Não modelado | nenhuma | sem código | sem caso | **Não atendido** |

Os modelos cobrem o fluxo de doação e o domínio persistido. Descoberta (`RF-06` a `RF-10`), favoritos e notificações não foram modelados. A falta de modelo da descoberta foi registrada na [§6 de `modelagem.md`](modelagem/modelagem.md#6-refinamentos-identificados) e virou o item `T-10` do backlog. "DA" aponta para as decisões de [`arquitetura.md`](arquitetura/arquitetura.md).

## Requisitos não funcionais

| Requisito | Issue | Caso de teste | Situação final |
|---|---|---|---|
| `RNF-01` Doação em até 3 passos | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `CT-23` (não executado) | **Atendido** no fluxo, sem execução manual |
| `RNF-02` 390 px a 1440 px | [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) a [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) | sem caso | **Não verificado** |
| `RNF-03` Senha com hash | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `CT-01` | **Atendido** |
| `RNF-04` Contato só para autenticados | [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#7](https://github.com/gigi-zacaroni/tp-eng-software/issues/7) | `CT-20`, `CT-25` | **Atendido** |
| `RNF-05` Sem dados de pagamento | todo o produto | revisão das telas | **Atendido** |
| `RNF-06` Prometido não passa do desejado | [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `CT-09`, `CT-10`, `CT-12`, `CT-25` | **Atendido**. `CT-19` no MySQL real pendente. |
| `RNF-07` Excluir necessidade preserva doações | [#9](https://github.com/gigi-zacaroni/tp-eng-software/issues/9) | sem caso | **Não se aplica**: não existe exclusão |
| `RNF-08` Listagem em até 2 s | [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) | sem caso | **Não verificado** |
| `RNF-09` Chrome, Firefox e Edge | todo o produto | sem caso | **Não verificado** |
| `RNF-10` Acessibilidade | [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2), [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | sem caso | **Não verificado** |

**Totais:** 27 RF, sendo 17 atendidos, 1 parcial e 9 não atendidos. 10 RNF, sendo 5 atendidos, 1 que não se aplica e 4 não verificados.

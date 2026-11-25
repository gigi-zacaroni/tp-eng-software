# Sprint 4: Princípios de projeto e decisões locais

- Data de entrega: 13/10/2026
- Pontuação: 2,5 pontos
- Tag obrigatória: `sprint-04`
- Responsável por conferir este arquivo: Arthur Veiga (@ArtJamis1208)

## 1. Pergunta que esta sprint deve responder

Como responsabilidades, módulos e interfaces locais serão organizados e justificados?

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** separar o back-end em rotas, controllers e services, isolar as regras de negócio e manter a autenticação JWT.

**Resultado alcançado:** o back-end foi dividido em camadas. Os fluxos de cadastro e doação foram testados no Postman, e as decisões foram registradas em `decisoes-de-projeto.md`.

## 3. Checklist do artefato central (0,75 ponto)

Entrega esperada: [`decisoes-de-projeto.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/docs/projeto/decisoes-de-projeto.md), com a decomposição e as decisões sobre coesão, acoplamento, responsabilidade e testabilidade.

- [x] Responsabilidades dos módulos identificadas.
- [x] Alternativas consideradas e decisão justificada.
- [x] Trade-offs e consequências registrados.
- [x] Código afetado linkado.
- [x] Backlog atualizado com as tarefas descobertas (`T-15`, `T-16`, `T-17`).

### Links dos artefatos

| Artefato | Link na tag da sprint | O que mudou |
|---|---|---|
| `decisoes-de-projeto.md` | [tag `sprint-04`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/docs/projeto/decisoes-de-projeto.md) | Criação do documento com as decisões DP-01 a DP-03 e a análise de coesão e acoplamento. |
| `modelagem.md` | [tag `sprint-04`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/docs/modelagem/modelagem.md) | O modelo estrutural virou diagrama de classes com controllers e services. |

## 4. Incremento da aplicação web (0,75 ponto)

### O que foi implementado

O back-end passou a separar o roteamento HTTP (`routes`), a leitura de requisições e respostas (`controllers`) e as regras de negócio com transações (`services`). Os fluxos de cadastro de doador e instituição e de doação com controle de saldo foram validados (`RF-01`, `RF-02`, `RF-19`).

### Como executar e verificar

```bash
cd src/back
npm install
# Criar o .env a partir do .env.example
node src/server.js
```

| Requisito/Issue | Código | Evidência |
|---|---|---|
| `RF-01`, `RF-02` / #2, #5 | `src/back/src/services/authService.js` | [Cadastro no Postman](../evidencias/sprint-04/cadastro-instituicao.png) |
| `RF-03` / #3 | `src/back/src/services/authService.js` | [Login no Postman](../evidencias/sprint-04/login.png) |
| `RF-19` / #10 | `src/back/src/services/doacaoService.js` | [Doação no Postman](../evidencias/sprint-04/doacoes.png) |

## 5. Scrum e gestão do trabalho (0,50 ponto)

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de conclusão | Situação |
|---|---|---|---|---|
| [#21](https://github.com/gigi-zacaroni/tp-eng-software/issues/21) | `T-11` Reestruturação em camadas (routes, controllers, services) | @Malupestana | Código separado e validado no Postman | Concluída |
| [#22](https://github.com/gigi-zacaroni/tp-eng-software/issues/22) | `T-12` Segurança e autenticação JWT | @Malupestana | Geração do token e middleware funcionando | Concluída |
| [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23) | `T-13` Regra de negócio de doações isolada | @Malupestana | Trava de concorrência e chave estrangeira validadas | Concluída |
| [#24](https://github.com/gigi-zacaroni/tp-eng-software/issues/24) | `T-14` Variáveis de ambiente (`.env`) | @Malupestana | Credenciais fora do código, via `dotenv` | Concluída |
| [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19) | `T-09` Remover a API legada `src/server.js` e consolidar o schema | @Malupestana | Arquivo legado removido e DDL único | Concluída |

### Acompanhamento

- GitHub Project: [ConectaAção: Backlog](https://github.com/users/gigi-zacaroni/projects/1)
- Reunião: alinhamento em 10/10/2026 com Arthur Veiga, Karol Guimarães, Geovana Zacaroni e Maria Luiza Pestana. [Pauta no Google Docs](https://docs.google.com/document/d/14Y1gf8f7pjqbBQHvbMYr9fVZQDtJzDMAMNzbx1ArIMk/edit?usp=sharing).
- Impedimentos: agendas divergentes na semana do saco cheio.
- Mudanças de escopo: nenhuma.

## 6. GitHub, documentação e rastreabilidade (0,50 ponto)

| Evidência | Link | O que comprova |
|---|---|---|
| Issues | [#19](https://github.com/gigi-zacaroni/tp-eng-software/issues/19), [#21](https://github.com/gigi-zacaroni/tp-eng-software/issues/21), [#22](https://github.com/gigi-zacaroni/tp-eng-software/issues/22), [#23](https://github.com/gigi-zacaroni/tp-eng-software/issues/23), [#24](https://github.com/gigi-zacaroni/tp-eng-software/issues/24) | Tarefas técnicas da sprint |
| Pull Request | Não houve: commits direto na `main` | |
| Commits | [`sprint-03...sprint-04`](https://github.com/gigi-zacaroni/tp-eng-software/compare/sprint-03...sprint-04) | Implementação das decisões de projeto |
| Código | [`controllers/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-04/src/back/src/controllers), [`services/`](https://github.com/gigi-zacaroni/tp-eng-software/tree/sprint-04/src/back/src/services) | Regras de negócio isoladas do HTTP |
| Capturas | [`evidencias/sprint-04/`](../evidencias/sprint-04/) | API e trava de saldo verificadas no Postman |

### Rastreabilidade resumida

| Requisito | Issue | Decisão | Código | Evidência |
|---|---|---|---|---|
| `RF-01`, `RF-02` | #2, #5, #22 | DP-03 | `services/authService.js` | [Cadastro](../evidencias/sprint-04/cadastro-instituicao.png) |
| `RF-03` | #3, #22 | DP-03 | `services/authService.js`, `middleware/autenticacao.js` | [Login](../evidencias/sprint-04/login.png) |
| `RF-19` | #10, #23 | DP-02 | `services/doacaoService.js`, `sql/schema.sql` | [Doação](../evidencias/sprint-04/doacoes.png) |

## 7. Revisão do incremento

- **O que foi demonstrado:** o back-end em camadas, com as regras de cadastro e doação separadas do HTTP. Também a remoção da API legada e o schema único (#19).
- **Critérios atendidos:** decisões documentadas com trade-offs (DP-01 a DP-03), código separado e validado e controle de concorrência nas doações.
- **Itens não concluídos:** nenhum do Sprint Backlog.
- **Feedback e ajustes:** havia dois schemas em conflito, um deles com exclusão em cascata das doações. O grupo manteve só `src/back/sql/schema.sql`.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** a separação em camadas deixou claro onde fica a validação e onde fica o acesso ao banco. As dívidas técnicas viraram Issues.
- **Precisa melhorar:** evitar arquivos duplicados no repositório, como aconteceu com o `schema.sql` e o `server.js` legado.
- **Ação para a próxima sprint:** criar as rotas de consulta (#20) e preparar o front-end para usar a API com JWT.

## 9. O que não será considerado suficiente

- Apenas listar princípios de projeto.
- Descrever a arquitetura global em vez das decisões locais.
- Decisão sem alteração ou evidência no código.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-04`:** [release `sprint-04`](https://github.com/gigi-zacaroni/tp-eng-software/releases/tag/sprint-04)
- **Este arquivo na tag:** [`sprint-04.md`](https://github.com/gigi-zacaroni/tp-eng-software/blob/sprint-04/docs/sprints/sprint-04.md)

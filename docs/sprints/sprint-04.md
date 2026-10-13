# Sprint 4 — Princípios de projeto e decisões locais

- Data de entrega: 13/10/2026
- Pontuação: 2,5 pontos
- Tag obrigatória: sprint-04
- Responsável por conferir este arquivo: Arthur Veiga

## 1. Pergunta que esta sprint deve responder
Como responsabilidades, módulos e interfaces locais serão organizados e justificados?

## 2. Objetivo e resultado da sprint
Objetivo planejado: Refatorar a arquitetura interna do back-end para separar responsabilidades (padrão Routes-Controllers-Services), isolar regras de negócio e garantir a segurança de dados e autenticação JWT.
Resultado efetivamente alcançado: Refatoração concluída com sucesso. O código foi modularizado, o fluxo de cadastro e doação foi testado e validado, e a documentação de decisões foi formalizada.

## 3. Checklist do artefato central — 0,75 ponto
Entrega esperada: docs/projeto/decisoes-de-projeto.md, decomposição e decisões relacionadas a coesão, acoplamento, responsabilidade e testabilidade.
- [x] Responsabilidades de módulos/componentes locais identificadas.
- [x] Alternativas consideradas e decisão justificada.
- [x] Trade-offs ou consequências registrados.
- [x] Código afetado linkado.
- [x] Backlog atualizado com débitos ou tarefas descobertas.

### Links dos artefatos
| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| `docs/projeto/decisoes-de-projeto.md` | [link para a tag sprint-04] | Criação do documento detalhando as decisões de coesão, acoplamento e refatoração. |
| `docs/projeto/modelagem.md` | [link para a tag sprint-04] | Atualização do modelo estrutural para diagrama de classes e inclusão das camadas de Controller/Service. |

## 4. Incremento da aplicação web — 0,75 ponto
Incremento mínimo esperado: Implementação/refatoração que demonstre a decisão, com comparação ou vínculo claro entre documento e código.

### O que foi implementado ou evoluído
Implementação da arquitetura em camadas no back-end em Node.js. O sistema agora separa o roteamento HTTP (`routes`), a manipulação de requisições/respostas (`controllers`) e o processamento de regras de negócio e persistência transacional (`services`). Foram validados os fluxos de cadastro de doadores/instituições e a criação de doações com controle concorrente de saldo (`RF-01`, `RF-02`, `RF-19`).

### Como executar e verificar
```bash
cd src/back
npm install
# Configurar o arquivo .env baseado no .env.example
node src/server.js
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| RF-01 / #2 | `src/back/src/services/authService.js` | [Print de sucesso do cadastro] |
| RF-19 / #10 | `src/back/src/services/doacoesService.js` | [Print da doação registrada] |

## 5. Scrum e gestão do trabalho - 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| #11 | Reestruturação Arquitetural em Camadas (Routes, Controllers, Services) | @malupestana | Código desacoplado e validado no Postman | Concluída |
| #12 | Implementação de Segurança e Autenticação JWT | @malupestana | Geração de token e middleware funcionando | Concluída |
| #13 | Isolamento da Regra de Negócio de Doações | @malupestana | Trava de concorrência e chave estrangeira validadas | Concluída |
| #14 | Configuração de Variáveis de Ambiente (.env) | @malupestana | Credenciais protegidas via `dotenv` | Concluída |
| #19 | T-09 — Remover a API legada src/server.js e consolidar o schema | @malupestana | Arquivo legado removido, DDL único consolidado e credencial inativa confirmada | Concluída |

### Acompanhamento

- GitHub Project: [Visão da Sprint no GitHub Projects]
- Reuniões/decisões: [ Reunião de alinhamento com Arthur Veiga, Karol Guimarães, Geovana Zacaroni e Maria Luiza Pestana (10/10/2026)]. Pautas: [https://docs.google.com/document/d/14Y1gf8f7pjqbBQHvbMYr9fVZQDtJzDMAMNzbx1ArIMk/edit?usp=sharing]
- Impedimentos: Divergência de agendas devido a semana do saco cheio.
- Mudanças de escopo: Nenhuma.

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | [https://github.com/gigi-zacaroni/tp-eng-software/issues/19] [https://github.com/gigi-zacaroni/tp-eng-software/issues/21] [https://github.com/gigi-zacaroni/tp-eng-software/issues/22] [https://github.com/gigi-zacaroni/tp-eng-software/issues/23] [https://github.com/gigi-zacaroni/tp-eng-software/issues/24] | Rastreabilidade das tarefas técnicas e refatorações da Sprint 4 ( issues # 9, #11, #12, #13, #14) |
| Pull Request | N/A (commits feitos direto na main) | Revisão de código da reestruturação arquitetural em camadas e consolidação do DDL |
| Commit | [https://github.com/gigi-zacaroni/tp-eng-software/compare/sprint-03...sprint-04] | Implementação das decisões de projeto e entrega oficial atrelada à tag `sprint-04` |
| Código/arquivo | [https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/src/controllers] [https://github.com/gigi-zacaroni/tp-eng-software/tree/main/src/back/src/services]| Aplicação concreta do isolamento de regras de negócio e coesão  |
| Teste/captura/relatório | [../evidencias/sprint-04] | Validação prática do funcionamento da API e da trava transacional no banco via Postman/DBeaver |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-01` | `#2`, `#12` | `docs/projeto/decisoes-de-projeto.md` (DP-03) | `src/back/src/services/authService.js` | [Teste Cadastro Postman](../evidencias/sprint-04/cadastro-instituicao.png) |
| `RF-02` | `#3`, `#12` | `docs/projeto/decisoes-de-projeto.md` (DP-03) | `src/back/src/services/authService.js` e `middleware/autenticacao.js` | [Teste Login Postman](../evidencias/sprint-04/login.png) |
| `RF-19` | `#10`, `#13` | `docs/projeto/decisoes-de-projeto.md` (DP-02) | `src/back/src/services/doacoesService.js` e `src/back/sql/schema.sql` | [Teste Doação Postman](../evidencias/sprint-04/doacoes.png) |

## 7. Revisão do incremento

- **O que foi demonstrado:** A separação limpa da arquitetura do back-end em camadas (Routes, Controllers, Services), garantindo que as regras de negócio de cadastro e doação estejam isoladas da lógica HTTP. Também foi demonstrada a resolução de dívida técnica com a remoção da API legada e a consolidação do arquivo único de schema do banco de dados (Issue #19).
- **Critérios atendidos:** Arquitetura local documentada com trade-offs (DP-01, DP-02, DP-03), código desacoplado e validado, controle de concorrência em doações garantido, e rastreabilidade total via commits na tag `sprint-04`.
- **Itens não concluídos:** Nenhum do escopo ativamente planejado (Sprint Backlog 4) ficou pendente.
- **Motivo das pendências:** N/A – Todas as issues técnicas da Sprint 4 (#11, #12, #13, #14 e #19) foram entregues.
- **Feedback recebido e ajustes:** A identificação de redundâncias e conflitos no banco de dados, que gerou a necessidade de consolidar os schemas (excluindo a versão que conflitava com as regras de exclusão em cascata das doações).

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** A modularização ajudou a separar claramente as responsabilidades de validação de dados e comunicação com o banco, além do controle eficiente de dívidas técnicas via GitHub Issues.
- **Precisa melhorar:** A prevenção de criação de arquivos duplicados no repositório (como ocorreu com o `schema.sql` e o arquivo `server.js` legado), garantindo que as regras fiquem centralizadas desde a criação.
- **Ação concreta para a próxima sprint:** Iniciar a implementação das rotas de consulta (GET / endpoints de listagem do Issue #20)[cite: 1] para permitir a integração, e preparar o front-end para consumir a API com o novo padrão JWT[cite: 2].

## 9. O que não será considerado suficiente

- Apenas listar princípios de projeto.
- Descrever arquitetura global em vez de decisões locais.
- Decisão sem alteração ou evidência no código.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-04`:** [https://github.com/gigi-zacaroni/tp-eng-software/releases/tag/sprint-04]
- **Este arquivo na tag:** [https://github.com/gigi-zacaroni/tp-eng-software/blob/main/docs/sprints/sprint-04.md]
- **Observação adicional:** Refatoração arquitetural (Routes/Controllers/Services) concluída com sucesso. Dívidas técnicas do banco de dados e arquivos legados foram devidamente tratadas, e o fluxo validado localmente via Postman.
# Sprint 3 — Modelagem e rastreabilidade dos requisitos

- **Data de entrega:** 28/09/2026
- **Pontuação:** 2,5 pontos
- **Tag obrigatória:** `sprint-03`
- **Responsável por conferir este arquivo:** Arthur Veiga (@ArtJamis1208)

## 1. Pergunta que esta sprint deve responder

**Como a estrutura e os principais fluxos do sistema são representados?**

## 2. Objetivo e resultado da sprint

**Objetivo planejado:** Elaborar e documentar os modelos comportamentais (fluxo de doações) e estruturais (Modelo ER relacional) do ConectaAção, mediante a 
ferramenta Mermaid, estabelecendo a rastreabilidade completa e verificável entre Requisitos Funcionais (`RF-01` a `RF-24`), diagramas, código-fonte da API REST e 
banco de dados MySQL.

**Resultado efetivamente alcançado:** Documento [`docs/modelagem/modelagemConecta.md`](docs/modelagem/modelagemConecta.md) finalizado com diagramas Mermaid versionados, matriz de rastreabilidade preenchida, 
schema SQL do banco de dados instanciado e endpoints do fluxo de cadastro, login e promessa de doação testados e operacionais.

## 3. Checklist do artefato central — 0,75 ponto

**Entrega esperada:** `docs/modelagem/modelagem.md`, ao menos um modelo comportamental e um estrutural, descrições e vínculo com requisitos.

- [ ] Modelos legíveis e versionados no repositório.
- [ ] Descrição textual da finalidade e decisões de cada modelo.
- [ ] Requisitos ligados aos elementos dos modelos.
- [ ] Backlog/requisitos refinados quando a modelagem revelar mudanças.
- [ ] Links entre elementos modelados e código existente.

### Links dos artefatos

| Artefato criado/atualizado | Link na tag da sprint | O que mudou |
|---|---|---|
| ``docs/modelagem/modelagemConecta.md`` | [ver na tag](docs/modelagem/modelagemConecta.md) | Criação do artefato central com diagramas Mermaid, explicações e matriz de rastreabilidade. |
| ``src/back/sql/schema.sql`` | [ver na tag](database/schema.sql) | Criação das tabelas relacionais com PKs, FKs, `UNIQUE` e constraints para o Modelo Estrutural ER. |
| ``docs/rastreabilidade.md`` | [ver na tag](docs/rastreabilidade.md) | Atualização do escopo e arquitetura técnica alinhada com as descobertas da modelagem. |
| ``src/back/src e src/front`` | [ver na tag](src) | Refinamento das Issues técnicas de modelagem, endpoints e banco de dados. |

## 4. Incremento da aplicação web — 0,75 ponto

**Incremento mínimo esperado:** Evolução de um fluxo modelado, estrutura de dados/classes coerente e evidência de correspondência entre modelo e código.

### O que foi implementado ou evoluído

Foi implementado no backend (Node.js + Express + MySQL) o fluxo **cadastro → login → promessa de doação**, em que cada etapa é um endpoint que pode ser chamado e verificado.

- **Cadastro de doador (RF-01):** cria o usuário e o perfil de doador em uma única transação. Valida e normaliza o e-mail, exige confirmação de senha e bloqueia e-mail duplicado (409). A senha é guardada com hash bcrypt.
- **Cadastro de instituição (RF-02):** cria o usuário, a instituição (`verificada = false`) e as necessidades iniciais na mesma transação. Rejeita necessidades com item vazio ou quantidade que não seja um inteiro maior que zero.
- **Login (RF-03):** identifica se o usuário é doador ou instituição consultando as tabelas de perfil e devolve um token JWT com `id`, `tipo` e `perfilId`.
- **Logout (RF-04):** como o token não fica guardado no servidor, o endpoint orienta o cliente a descartá-lo.
- **Prometer doação (RF-19):** `POST /doacoes` só aceita doador autenticado e usa o doador do token, nunca um id enviado no corpo. Em uma transação com `SELECT ... FOR UPDATE`, confere se a necessidade existe e se a quantidade cabe no que falta. Depois grava a doação como `Prometida` e reduz `quantidadeFaltante`. Se qualquer passo falhar, nada é alterado.

**Estrutura de dados** (database/schema.sql): cinco tabelas ligadas por chaves estrangeiras. `usuarios` se relaciona com `doadores` e com `instituicoes` (um perfil por usuário); `instituicoes` tem várias `necessidades`; e `doacoes` liga `doadores` a `necessidades`. Um `UNIQUE` em `usuarios.email` e um `CHECK (quantidadeFaltante <= quantidadeTotal)` reforçam as regras no próprio banco.

**Organização do código:** `config/` (conexão e transações), `middleware/` (autenticação e permissão por tipo), `routes/` (os fluxos) e `utils/` (validação e erros).

### Como executar e verificar

```bash
# 1. Banco: no MySQL Workbench, abra e execute src/back/sql/schema.sql

# 2. Dependências e configuração
cd src/back
npm install
copy .env.example .env      # preencha DB_PASSWORD e JWT_SECRET no .env

# 3. Subir a API
npm start

# 4. Conferir a conexão com o banco
#    abrir no navegador: http://localhost:3000/teste-conexao

# 5. Verificação dos endpoints (Thunder Client / Postman), nesta ordem:
#    POST /cadastro/instituicao  -> 201
#    POST /cadastro/doador       -> 201
#    POST /login                 -> 200 (retorna o token)
#    POST /doacoes (header Authorization: Bearer <token>) -> 201
#    body: { "necessidade_id": 1, "quantidade": 4 }
```

Conferência no banco (Workbench):

```sql
SELECT id, item, quantidadeTotal, quantidadeFaltante FROM necessidades;
SELECT * FROM doacoes;
```

| Requisito/Issue | Código ou protótipo | Evidência de execução |
|---|---|---|
| `RF-01` Cadastro de doador | [Abrir arquivo](../../src/back/src/routes/auth.js) |  [Abrir arquivo](../../docs/evidencias/cadastro_doador)
| `RF-02` Cadastro de instituição |[Abrir arquivo ](../../src/back/src/routes/auth.js) |  [Abrir arquivo](../../docs/evidencias/cadastro_instituicao.png)
| `RF-03` Login | [Abrir arquivo](../../src/back/src/routes/auth.js) |  [Abrir arquivo](../../docs/evidencias/login.png)
| `RF-19` Prometer doação | [Abrir arquivo](../../src/back/src/routes/doacoes.js) - [Abrir arquivo](../../src/back/src/middleware/autenticacao.js) | [Abrir arquivo](../../docs/evidencias/doacao)

## 5. Scrum e gestão do trabalho — 0,50 ponto

### Sprint Backlog

| Issue | Descrição | Responsável | Critério de aceitação/conclusão | Situação |
|---|---|---|---|---|
| [#2](https://github.com/gigi-zacaroni/tp-eng-software/issues/2) | `Cadastro e autenticação de Doador` | `@Malupestana` | `Tabela doadores criada e rota POST /cadastro/doador funcional com JWT` | Concluída |
| [#5](https://github.com/gigi-zacaroni/tp-eng-software/issues/5) | `Cadastro de Instituição e Necessidades` | `@Malupestana` | `Tabela instituicoes / necessidades com transação SQL` | Concluída |
| [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10) | `Modelo Comportamental do Fluxo de Doação` | `@KarolGSMiranda` | `Diagrama Mermaid do ciclo de doação no modelagem.md` | Concluída |
| [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) | `Matriz de Rastreabilidade e Modelo ER` | `@ArtJamis1208` | `Mapeamento Requisito x Diagrama x Código-fonte no modelagem.md` | Concluída |

### Acompanhamento

- **GitHub Project:** [ConectaAção — Backlog](https://github.com/users/gigi-zacaroni/projects/1) — onde os itens da sprint são acompanhados
- **Reuniões/decisões:** `[links para docs/reunioes/]`
- **Impedimentos:** Não houve nenhum impedimento externo durante a realização da Sprint 3.  
- **Mudanças de escopo:** `[PREENCHER ou Nenhuma]`

## 6. GitHub, documentação e rastreabilidade — 0,50 ponto

| Tipo de evidência | Link | O que comprova |
|---|---|---|
| Issue | `[link]` | `[PREENCHER]` |
| Pull Request | `[link]` | `[PREENCHER]` |
| Commit | `[link]` | `[PREENCHER]` |
| Código/arquivo | `[link]` | `[PREENCHER]` |
| Teste/captura/relatório | `[link]` | `[PREENCHER]` |

### Rastreabilidade resumida

| Requisito | Issue | Artefato/modelo/decisão | Código | Teste/evidência |
|---|---|---|---|---|
| `RF-XX` | `#XX` | `[link]` | `[link]` | `[link ou ainda não aplicável]` |

## 7. Revisão do incremento

- **O que foi demonstrado:** A execução de ponta a ponta do fluxo backend do **ConectaAção** (Node.js + Express + MySQL), validando a arquitetura relacional e a lógica de negócios da aplicação web através da verificação prática dos endpoints de API via clientes HTTP (Thunder Client / Postman) e inspeção direta de estado no MySQL Workbench:
  1. **Cadastro e Gestão de Contas (`RF-01`, `RF-02`):** Demonstração do registro idempotente de doadores e instituições em uma única transação SQL. Provou-se que senhas são armazenadas exclusivamente sob hash Bcrypt e que a tentativa de cadastrar e-mails duplicados resulta em bloqueio com status HTTP `409 Conflict`. No caso da instituição, comprovou-se a inserção atômica de suas necessidades iniciais vinculadas, além da atribuição automática do atributo `verificada = false`.
  2. **Autenticação e Controle de Acesso (`RF-03`, `RF-04`, `RF-05`):** Demonstração do login com validação de credenciais, emissão do token JWT contendo `id`, `tipo` e `perfilId` no payload, e a atuação do middleware de segurança na rejeição de acessos não autorizados (status HTTP `401 Unauthorized` / `403 Forbidden`) em rotas restritas.
  3. **Ciclo de Vida e Regra de Integridade da Doação (`RF-19`):** Execução do endpoint `POST /doacoes` utilizando o token do doador autenticado. Demonstrou-se a execução de transações SQL seguras (`START TRANSACTION` ... `SELECT ... FOR UPDATE` ... `COMMIT`), garantindo o bloqueio de concorrência. Comprovou-se que a gravação do registro em status `Prometida` decrementa o valor de `quantidadeFaltante` na tabela `necessidades` em tempo real e bloqueia tentativas de doação cujas quantidades excedam o saldo pendente.
- **Critérios atendidos:** Todos os critérios de aceitação definidos para o artefato técnico da Sprint 3 e para as Issues de desenvolvimento backend foram 100% atendidos:
  - **Requisitos de Negócio:** `RF-01`, `RF-02`, `RF-03`, `RF-04`, `RF-05` e `RF-19` totalmente operacionais no backend.
  - **Integridade de Dados:** Validação do contrato do banco relacional com chaves primárias/estrangeiras e constraints ativas (`UNIQUE` em e-mails e `CHECK (quantidadeFaltante <= quantidadeTotal)` na tabela de necessidades).
  - **Segurança de Código:** Autenticação via JWT, hashing de senha com Bcrypt e isolamento do ID do doador a partir das claims do token (impedindo *IDOR* / falsificação do ID do doador no payload da requisição).
  - **Modelagem Rastreável:** Total correspondência entre o modelo ER, o diagrama comportamental em Mermaid no `docs/modelagem/modelagem.md` e os arquivos do código-fonte em `src/back/`.
- **Itens não concluídos:** Nenhum item do escopo planejado para a Sprint 3 ficou pendente no back-end. A modelagem teórica, o schema físico e os endpoints prioritários do fluxo de doações foram concluídos e validados.
- **Motivo das pendências:** Não houve pendências nesta Sprint 3.
- **Feedback recebido e ajustes:** Durante os testes de estresse no fluxo de doação (`RF-19`), identificou-se o risco de *race condition* (condição de corrida) em acessos simultâneos de dois doadores para a mesma necessidade. Como ajuste arquitetural, adotou-se o isolamento por transação no comando (`SELECT ... FOR UPDATE`) no MySQL, garantindo a integridade matemática da quantidade pendente antes de efetivar o `COMMIT` ou realizar o `ROLLBACK` da transação.

## 8. Retrospectiva e próxima sprint

- **Funcionou bem:** A divisão clara de responsabilidades entre a documentação em Mermaid e a escrita das rotas no Node.js.
- **Precisa melhorar:** Agilização nos testes locais de banco de dados por todos os membros da equipe.
- **Ação concreta para a próxima sprint:** Aplicar princípios de projeto (modularização, coesão e baixo acoplamento) nos controladores do back-end na Sprint 4.

## 9. O que não será considerado suficiente

- Diagramas sem explicação.
- Imagens externas sem versão no repositório.
- Modelo genérico que não corresponde aos requisitos ou ao código.

## 10. Links enviados no UFLA Virtual

- **Tag `sprint-03`:** https://github.com/johnatan-si/tp-eng-software/releases/tag/sprint-03
- **Este arquivo na tag:** `[COLAR LINK]`
- **Observação adicional:** `[quando necessária]`

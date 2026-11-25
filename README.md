# ConectaAção

Trabalho final de Engenharia de Software, 2026/2.

## 1. Identificação do projeto

| Campo | Informação |
|---|---|
| Nome do projeto | **ConectaAção** |
| Problema escolhido | Dificuldade de conexão entre pessoas dispostas a ajudar e instituições de caridade que precisam de apoio |
| Turma e semestre | Engenharia de Software, 2026/2 |
| Professor | Prof. Johnatan Oliveira |
| GitHub Project | [ConectaAção: Backlog](https://github.com/users/gigi-zacaroni/projects/1) |
| Aplicação publicada | Pendente. Ver [`entrega-final.md`](docs/entrega-final.md). |
| Vídeo final | Pendente. Ver [`entrega-final.md`](docs/entrega-final.md). |

### Integrantes

| Nome | GitHub | Responsabilidade principal | Outras contribuições |
|---|---|---|---|
| Geovana Oliveira Zacaroni | @gigi-zacaroni | Desenvolvimento da aplicação | Requisitos e testes |
| Maria Luiza Pestana | @Malupestana | Modelagem e banco de dados | Desenvolvimento, interface, documentação e testes |
| Karol Guimarães | @KarolGSMiranda | Gestão do projeto e documentação | Requisitos e testes |
| Arthur Veiga | @ArtJamis1208 | Qualidade | Desenvolvimento, plano de testes e evidências |

## 2. Resumo da solução

**Problema:** muitas pessoas querem ajudar instituições de caridade, mas não sabem quais existem, do que precisam ou como contribuir. As instituições têm dificuldade para divulgar suas necessidades. Sem um lugar central, oportunidades de ajuda se perdem.

**Solução:** o ConectaAção é uma aplicação web que liga doadores a necessidades concretas. A instituição publica o que precisa e quanto. O doador encontra a necessidade, promete uma quantidade limitada ao que falta e acompanha a doação. A instituição aceita, recusa e confirma o recebimento.

**Público:** pessoas que querem doar e instituições que querem divulgar suas necessidades.

**Funcionalidades entregues:**

- Cadastro e login de doador e de instituição (`RF-01` a `RF-05`).
- Página inicial pública, lista de instituições, busca e filtros (`RF-06` a `RF-10`).
- Cadastro de necessidades e progresso de cada uma (`RF-14`, `RF-18`).
- Promessa, acompanhamento e cancelamento de doações (`RF-19` a `RF-21`).
- Painel da instituição com aceitar, recusar e confirmar recebimento (`RF-22`, `RF-23`).

A situação de cada requisito está em [`requisitos.md`](docs/requisitos/requisitos.md), e a matriz completa em [`rastreabilidade.md`](docs/rastreabilidade.md).

**Tecnologias:**

| Camada | Tecnologia |
|---|---|
| Front-end | HTML, CSS e JavaScript, sem framework |
| Back-end | Node.js e Express |
| Banco de dados | MySQL 8.0.16 ou superior |
| Testes | `node:test`, sem dependência extra |

Até a Sprint 2 a stack prevista era Next.js com React e Java com Spring Boot ([ata de 12/09](docs/reunioes/2026-09-12-refinamento-requisitos.md)). Nenhuma linha foi escrita nela. No [planejamento da Sprint 3](docs/reunioes/2026-09-22-planejamento-sprint-03.md), o grupo passou para Node.js, Express e MySQL, que já dominava. Nenhum requisito mudou.

A interface final partiu do protótipo de alta fidelidade da equipe e foi ligada à API na entrega final. O [protótipo navegável da Sprint 2](docs/prototipo/README.md) continua no repositório como registro da validação dos requisitos.

## 3. Como executar

Requisitos: Node.js 18.11 ou superior e MySQL 8.0.16 ou superior.

```bash
# 1. Dependências
cd src/back
npm install

# 2. Banco e tabelas
mysql -u root -p < sql/schema.sql

# 3. Configuração: copie o exemplo e preencha DB_PASSWORD e JWT_SECRET
cp .env.example .env

# 4. Subir a aplicação (API e front-end na mesma porta)
npm start
```

Abra `http://localhost:3000`. A rota `/teste-conexao` confirma a ligação com o banco.

**Dados de teste (opcional):** os scripts `sql/reset_test.sql` e `sql/seed_test.sql` criam o banco `conectaacao_test` com dois doadores (`ana@email.com`, `bruno@email.com`), duas instituições (`esperanca@email.com`, `alimentos@email.com`), três necessidades e duas doações. A senha de todos é `segredo123`. Para usar esse banco, ponha `DB_NAME=conectaacao_test` no `.env`.

**Roteiro rápido no navegador:**

1. Em "Entrar", aba "Criar conta", cadastre uma instituição com uma necessidade inicial.
2. Saia e cadastre um doador.
3. Em "Explorar necessidades", abra a necessidade, clique em "Quero ajudar" e confirme uma quantidade.
4. Veja a doação em "Minhas doações".
5. Entre como a instituição, abra "Doações recebidas", aceite e confirme o recebimento.

**Testes automatizados:**

```bash
cd src/back
npm test
```

São 88 testes, todos sem MySQL. Os testes com MySQL real rodam com `DB_INTEGRATION=1`. Detalhes em [`tests/README.md`](tests/README.md) e no [README do back-end](src/back/README.md).

## 4. Estrutura do repositório

```text
.
├── README.md, GUIA_RAPIDO.md, CONTRIBUTING.md, CHECKLIST_ENTREGA_FINAL.md
├── docs/
│   ├── visao-geral.md, backlog-produto.md, rastreabilidade.md, uso-de-ia.md
│   ├── requisitos/   modelagem/   projeto/   padroes/   arquitetura/
│   ├── testes/       (plano, evidências e saídas do npm test)
│   ├── prototipo/    (protótipo navegável da Sprint 2)
│   ├── reunioes/     evidencias/
│   ├── sprints/      (sprint-01.md a sprint-08.md)
│   └── entrega-final.md
├── slides/
├── src/
│   ├── back/         (API Node.js, SQL e testes)
│   └── front/        (index.html, app.js, style.css)
├── tests/            (índice dos testes)
└── scripts/validar_repositorio.py
```

## 5. Cronograma e pontuação

| Etapa | Data | Entrega central | Pontos | Tag |
|---|---:|---|---:|---|
| Sprint 1 | 24/08/2026 | Problema, visão do produto, Scrum, GitHub e backlog inicial | 2,5 | `sprint-01` |
| Sprint 2 | 14/09/2026 | Requisitos verificáveis e escopo | 2,5 | `sprint-02` |
| Sprint 3 | 28/09/2026 | Modelagem e rastreabilidade | 2,5 | `sprint-03` |
| Sprint 4 | 13/10/2026 | Princípios de projeto e decisões locais | 2,5 | `sprint-04` |
| Sprint 5 | 26/10/2026 | Padrões de projeto aplicados ao código | 2,5 | `sprint-05` |
| Sprint 6 | 09/11/2026 | Arquitetura global | 2,5 | `sprint-06` |
| Sprint 7 | 16/11/2026 | Plano de testes e primeiras execuções | 2,5 | `sprint-07` |
| Sprint 8 | 23/11/2026 | Validação final e estabilização | 2,5 | `sprint-08` |
| Entrega final | 30/11/2026 | GitHub consolidado, slides e vídeo | 5,0 | `versao-final` |
| **Total** | | | **25,0** | |

Cada sprint vale 2,5 pontos: artefato central (0,75), incremento da aplicação (0,75), Scrum e gestão (0,50) e GitHub, documentação e rastreabilidade (0,50). O arquivo de cada sprint funciona como índice dos artefatos produzidos ([mapa das sprints](docs/sprints/README.md)).

## 6. Rastreabilidade

O caminho seguido em todo o projeto é:

```text
Problema → requisito → Issue → sprint → modelo ou decisão → código → teste → evidência
```

A tabela central está em [`rastreabilidade.md`](docs/rastreabilidade.md).

## 7. Entrega final

Os itens da entrega final (tag `versao-final`, slides, vídeo de até 10 minutos e link da aplicação) estão em [`entrega-final.md`](docs/entrega-final.md).


# Trabalho Final de Engenharia de Software - Modelo Oficial 2026/2

## 1. Identificação do projeto

| Campo                       | Informação                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Nome do projeto             | **ConectaAção**                                                                                              |
| Problema escolhido          | **Dificuldade de conexão entre pessoas dispostas a ajudar e instituições de caridade que precisam de apoio** |
| Turma/semestre              | Engenharia de Software — 2026/2                                                                              |
| Professor                   | Prof. Johnatan Oliveira                                                                                      |
| Link do GitHub Project      | [ConectaAção — Backlog](https://github.com/users/gigi-zacaroni/projects/1)                                    |
| Link da aplicação publicada | `[COLAR LINK DA APLICAÇÃO]`                                                                                  |
| Link do vídeo final         | `[PREENCHER NA ENTREGA FINAL]`                                                                               |

### Integrantes
         

| Nome completo                 | Usuário no GitHub | Responsabilidade principal       | Outras contribuições                              |
| ----------------------------- | ----------------- | -------------------------------- | ------------------------------------------------- |
| **Geovana Oliveira Zacaroni** | @gigi-zacaroni  | Desenvolvimento da aplicação     | Desenvolvimento, requisitos e testes|
| **Maria Luiza Pestana**       | @Malupestana       | Modelagem e banco de dados       | Desenvolvimento, documentação e testes            |
| **Karol Guimarães**           | @KarolGSMiranda       | Gestão do projeto e documentação |Levantamento de requisitos, documentação e testes|
| **Arthur Veiga**              | @ArtJamis1208     | Analista de qualidade            | Desenvolvimento, análise e testes                 |

> As responsabilidades podem ser alteradas de acordo com a divisão real do grupo.

## 2. Resumo da solução

**Problema:**
Muitas pessoas têm interesse em ajudar instituições de caridade, mas não sabem quais organizações existem, quais são suas necessidades ou como podem contribuir. Ao mesmo tempo, instituições de caridade podem ter dificuldade para divulgar suas necessidades e alcançar pessoas dispostas a ajudar. A falta de uma plataforma centralizada dificulta essa conexão e pode fazer com que oportunidades de ajuda sejam perdidas.

**Solução proposta:**
O **ConectaAção** será uma aplicação web que funcionará como uma ponte entre pessoas que desejam ajudar e instituições de caridade que precisam de apoio. A plataforma permitirá que instituições divulguem informações sobre seu trabalho e suas necessidades, enquanto os usuários poderão pesquisar organizações e identificar diferentes formas de contribuir. Dessa forma, a aplicação busca tornar o processo de encontrar e oferecer ajuda mais simples e acessível.

**Público principal:**
Pessoas interessadas em realizar doações ou contribuir com instituições de caridade e instituições que buscam divulgar suas necessidades e encontrar pessoas dispostas a ajudar.

**Funcionalidades prioritárias:**

* Cadastro e visualização de instituições de caridade — `RF-01`, `RF-02`, `RF-07`, `RF-10`.
* Busca e consulta das necessidades das instituições — `RF-08`, `RF-09`, `RF-14`, `RF-18`.
* Promessa e acompanhamento de doações até a entrega — `RF-19` a `RF-24`.
* Divulgação de formas de contribuição e contato com as instituições — `RF-10`.

Os requisitos identificados estão em [`docs/requisitos/requisitos.md`](docs/requisitos/requisitos.md) e a matriz completa em [`docs/rastreabilidade.md`](docs/rastreabilidade.md).

**Tecnologias definidas pelo grupo:**

| Camada | Tecnologia |
|---|---|
| Front-end | Next.js / React |
| Back-end | Java / Spring Boot |

> O [protótipo navegável](docs/prototipo/README.md) entregue na Sprint 2 foi construído em HTML/CSS/JS apenas para validar fluxos e a visão do produto. Ele **não** é a versão final nem define o stack da aplicação.

## 3. Comece por aqui

1. Leia o [Guia rápido de uso](GUIA_RAPIDO.md).
2. Preencha este `README.md` e o documento de [visão geral](docs/visao-geral.md).
3. Crie o GitHub Project e registre os itens como Issues.
4. Consulte o [mapa das oito entregas](docs/sprints/README.md).
5. Em cada prazo, atualize o arquivo da sprint, crie a tag correspondente e envie os links no UFLA Virtual.
6. Antes da entrega final, execute o [validador da estrutura](scripts/validar_repositorio.py) e o [checklist final](CHECKLIST_ENTREGA_FINAL.md).

## 4. Cronograma e pontuação

| Etapa         |       Data | Entrega central                                             |   Pontos | Tag obrigatória |
| ------------- | ---------: | ----------------------------------------------------------- | -------: | --------------- |
| Sprint 1      | 24/08/2026 | Problema, visão do produto, Scrum, GitHub e backlog inicial |      2,5 | `sprint-01`     |
| Sprint 2      | 14/09/2026 | Requisitos verificáveis e escopo da aplicação               |      2,5 | `sprint-02`     |
| Sprint 3      | 28/09/2026 | Modelagem e rastreabilidade                                 |      2,5 | `sprint-03`     |
| Sprint 4      | 13/10/2026 | Princípios de projeto e decisões locais                     |      2,5 | `sprint-04`     |
| Sprint 5      | 26/10/2026 | Padrões de projeto aplicados ao código                      |      2,5 | `sprint-05`     |
| Sprint 6      | 09/11/2026 | Arquitetura global da aplicação                             |      2,5 | `sprint-06`     |
| Sprint 7      | 16/11/2026 | Plano de testes e primeiras execuções                       |      2,5 | `sprint-07`     |
| Sprint 8      | 23/11/2026 | Validação final e estabilização                             |      2,5 | `sprint-08`     |
| Entrega final | 30/11/2026 | GitHub consolidado, slides e vídeo no YouTube               |      5,0 | `versao-final`  |
| **Total**     |            |                                                             | **25,0** |                 |

## 5. Como cada sprint é avaliada

Cada sprint vale **2,5 pontos**:

| Dimensão                               | Pontos | O que deve estar verificável                                               |
| -------------------------------------- | -----: | -------------------------------------------------------------------------- |
| Artefato central da disciplina         |   0,75 | Documento específico da etapa, tecnicamente consistente e completo         |
| Incremento da aplicação web            |   0,75 | Código, protótipo, teste ou funcionalidade que demonstre evolução concreta |
| Scrum e gestão do trabalho             |   0,50 | Issues, Sprint Backlog, responsáveis, critérios de aceitação e revisão     |
| GitHub, documentação e rastreabilidade |   0,50 | Commits, links, tag, organização e relação entre artefatos e código        |

> Criar apenas o arquivo `docs/sprints/sprint-0X.md` não caracteriza a entrega. Ele deve funcionar como **índice**, contendo links para tudo que foi realmente produzido.

## 6. Estrutura do repositório

```text
.
├── README.md
├── GUIA_RAPIDO.md
├── CONTRIBUTING.md
├── CHECKLIST_ENTREGA_FINAL.md
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── visao-geral.md
│   ├── backlog-produto.md
│   ├── rastreabilidade.md
│   ├── uso-de-ia.md
│   ├── requisitos/requisitos.md
│   ├── modelagem/modelagem.md
│   ├── projeto/decisoes-de-projeto.md
│   ├── padroes/padroes-de-projeto.md
│   ├── arquitetura/arquitetura.md
│   ├── testes/
│   │   ├── plano-de-testes.md
│   │   └── evidencias-testes.md
│   ├── reunioes/
│   ├── evidencias/
│   ├── sprints/sprint-01.md ... sprint-08.md
│   └── entrega-final.md
├── slides/
├── src/
├── tests/
└── scripts/validar_repositorio.py
```

## 7. Execução

### Protótipo navegável (incremento da Sprint 2)

```bash
python -m http.server 8000 --directory docs/prototipo
```

Abra `http://localhost:8000/ConectaAcao%20Prototipo.dc.html`. O protótipo cobre as dez telas das funcionalidades prioritárias; o mapa tela → requisito → critério de aceitação está em [`docs/prototipo/README.md`](docs/prototipo/README.md).

### Aplicação

```bash
python -m http.server 8000 --directory src
```

A pasta `src/` contém a página inicial estática do projeto. A aplicação real, em Next.js/React e Java/Spring Boot, será construída a partir das decisões técnicas das Sprints 3 e 4.

## 8. Regra de ouro da rastreabilidade

Sempre que possível, deve ser possível seguir este caminho:

```text
Problema → requisito → Issue → sprint → modelo/decisão → código → teste → evidência
```

A tabela central desse vínculo deve ser mantida em [`docs/rastreabilidade.md`](docs/rastreabilidade.md).

## 9. Entrega final

Até **30/11/2026**, o repositório deve estar consolidado na tag `versao-final` e conter:

* código-fonte e instruções de execução;
* todos os artefatos atualizados;
* slides utilizados, dentro de `slides/`;
* link do vídeo no YouTube, público ou não listado;
* vídeo de no máximo **10 minutos**;
* explicação inicial da documentação e da organização do repositório;
* demonstração das principais funcionalidades;
* compartilhamento legível da tela com a execução do sistema;
* pelo menos um aluno visível no vídeo. Não é necessário que todos apresentem.

Leia os detalhes em [`docs/entrega-final.md`](docs/entrega-final.md).

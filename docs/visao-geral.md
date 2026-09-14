
# Visão geral do produto

> **Criado na Sprint 1 e atualizado sempre que o problema ou escopo mudar.**

## 1. Problema escolhido

**Título:** Dificuldade de conexão entre pessoas dispostas a ajudar e instituições de caridade

**Descrição concreta:**
Muitas pessoas têm interesse em realizar doações ou ajudar instituições de caridade, mas não sabem quais instituições precisam de ajuda, quais tipos de doações são necessárias ou como entrar em contato com essas organizações. Ao mesmo tempo, instituições de caridade enfrentam dificuldades para divulgar suas necessidades e alcançar pessoas dispostas a contribuir. Atualmente, essas informações podem estar espalhadas em diferentes redes sociais e canais de comunicação, dificultando a conexão entre quem deseja ajudar e quem precisa de ajuda. Como consequência, doações podem deixar de acontecer e instituições podem ter dificuldades para conseguir os recursos necessários para manter suas atividades.

**Evidências ou exemplos do problema:**

* Pessoas interessadas em fazer uma doação muitas vezes não sabem quais instituições existem ou quais estão precisando de determinados recursos.
* Instituições de caridade podem divulgar suas necessidades em diferentes redes sociais, dificultando que potenciais doadores encontrem informações atualizadas.
* A falta de uma plataforma centralizada pode dificultar a identificação do tipo de ajuda necessária e o contato entre doadores e instituições.

> O problema não é a falta de pessoas dispostas a ajudar, mas a dificuldade de **conectar essas pessoas às instituições que realmente precisam de ajuda**.

## 2. Público e stakeholders

| Stakeholder                  | Necessidade/interesse                                                                          | Como será envolvido ou representado                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Usuário/doador**           | Encontrar instituições confiáveis e descobrir quais tipos de ajuda ou doações são necessários. | Poderá consultar instituições, visualizar suas necessidades, prometer doações e acompanhar o status até a entrega. |
| **Instituições de caridade** | Divulgar seu trabalho e suas necessidades para alcançar mais pessoas dispostas a ajudar.       | Poderão possuir um perfil com informações sobre a instituição e cadastrar suas necessidades.  |
| **Administrador do sistema** | Garantir a organização e o funcionamento adequado da plataforma.                               | Será responsável pelo gerenciamento e pela moderação das informações cadastradas.             |

## 3. Visão do produto

**Nome da solução:** ConectaAção

**Proposta de valor:**
Para pessoas que desejam ajudar instituições de caridade, o ConectaAção é uma plataforma que facilita a descoberta e o contato com organizações que precisam de apoio, tornando mais simples encontrar onde e como contribuir.

**Objetivo geral:**
Criar uma plataforma que facilite a conexão entre pessoas dispostas a ajudar e instituições de caridade, centralizando informações sobre as organizações e suas principais necessidades.

**Objetivos específicos:**

* Facilitar a busca e a descoberta de instituições de caridade.
* Permitir que as instituições divulguem suas necessidades e formas de receber ajuda.
* Facilitar o contato entre usuários e instituições.
* Incentivar a participação da comunidade em ações de solidariedade.
* Tornar mais acessível a informação sobre diferentes formas de contribuir.

## 4. Escopo inicial

### Dentro do escopo

> **Atualizado na Sprint 2.** O escopo abaixo foi revisado após a definição dos requisitos e a construção do protótipo navegável. A correspondência item a item com os requisitos identificados está em [`docs/requisitos/requisitos.md`](requisitos/requisitos.md).

* Cadastro e gerenciamento de usuários (doador e instituição) — `RF-01`, `RF-02`.
* Autenticação e restrição do conteúdo sensível a usuários logados — `RF-03` a `RF-05`.
* Perfil das instituições contendo informações básicas sobre seu trabalho — `RF-10`.
* Divulgação e gerenciamento das necessidades das instituições, com quantidade desejada e progresso — `RF-14` a `RF-18`.
* Busca, filtro e visualização de instituições — `RF-06` a `RF-09`.
* Identificação dos tipos de ajuda ou doações solicitadas — `RF-14`, `RF-18`.
* **Fluxo de doação:** o usuário promete uma doação para uma necessidade específica e acompanha o status até a entrega (Prometida → A caminho → Entregue), podendo cancelá-la enquanto não for entregue — `RF-19` a `RF-21`.
* Confirmação do recebimento pela instituição, atualizando o progresso da necessidade — `RF-22` a `RF-24`.
* Favoritar instituições para reencontrá-las depois — `RF-12`, `RF-13`.
* Notificações sobre os eventos relevantes das doações — `RF-25` a `RF-27`.
* Informações de contato e formas de contribuição das instituições — `RF-10`.

### Fora do escopo

* Processamento ou gerenciamento direto de pagamentos e doações financeiras.
* Transporte ou entrega das doações.
* Gerenciamento financeiro das instituições.
* Garantia ou fiscalização completa da utilização das doações.
* Atendimento direto aos beneficiários das instituições.
* Integração com sistemas externos de pagamento na primeira versão.

## 5. Restrições e premissas

| Tipo          | Item                                                                           | Impacto no projeto                                                                                    |
| ------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Restrição** | Prazo limitado para desenvolvimento do projeto.                                | Será necessário priorizar as funcionalidades essenciais para a primeira versão.                       |
| **Restrição** | Recursos e equipe de desenvolvimento limitados.                                | O sistema terá um escopo inicial reduzido e poderá receber novas funcionalidades posteriormente.      |
| **Restrição** | Necessidade de utilizar as tecnologias disponíveis para a equipe.              | A implementação será definida de acordo com os conhecimentos e ferramentas disponíveis.               |
| **Premissa**  | As instituições terão interesse em divulgar suas necessidades pela plataforma. | A participação das instituições será fundamental para manter as informações relevantes e atualizadas. |
| **Premissa**  | Usuários utilizarão a plataforma para encontrar formas de ajudar.              | Espera-se que a facilidade de encontrar instituições incentive novas ações de solidariedade.          |
| **Premissa**  | As informações fornecidas pelas instituições serão verdadeiras e atualizadas.  | A qualidade das informações será importante para gerar confiança nos usuários.                        |

## 6. Diferenciais da solução

A proposta se diferencia de um formulário ou CRUD genérico porque não tem como objetivo apenas cadastrar e exibir informações. O foco da aplicação é **resolver um problema específico de conexão entre pessoas e instituições de caridade**.

A plataforma organiza as instituições e suas necessidades de forma que o usuário consiga identificar com maior facilidade **quem precisa de ajuda, qual tipo de ajuda é necessária e como contribuir**. Dessa forma, a aplicação atua como uma ponte entre os dois públicos, facilitando o processo de encontrar oportunidades de contribuição e permitindo que as instituições tenham maior visibilidade.

## 7. Histórico de mudanças

| Data/sprint | Mudança                                                                 | Motivo                                                                                                   | Issue/decisão relacionada |
| ----------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| Sprint 1    | Criação da visão inicial do produto.                                    | Definição do problema, público e proposta inicial da solução.                                            | Item `D-01` do [backlog](backlog-produto.md) · commit [`32c0ac7`](https://github.com/gigi-zacaroni/tp-eng-software/commit/32c0ac7) |
| Sprint 1    | Definição do foco na conexão entre usuários e instituições de caridade. | Delimitação do problema para evitar que o projeto se tornasse apenas uma plataforma genérica de doações. | Item `T-01` do [backlog](backlog-produto.md) · [`sprint-01.md`](sprints/sprint-01.md) |
| Sprint 1    | Definição do escopo inicial e das funcionalidades principais.           | Estabelecer quais funcionalidades serão desenvolvidas na primeira versão.                                | Item `T-05` do [backlog](backlog-produto.md) · [`sprint-01.md`](sprints/sprint-01.md) |
| Sprint 2    | Revisão da seção 4 (escopo): "demonstrar interesse em ajudar" passou a **prometer doação e acompanhar até a entrega**. | A ação do usuário estava descrita de forma vaga, sem comportamento verificável. O protótipo detalhou o ciclo de vida da doação, tornando-a mensurável. | `RF-19`–`RF-21` · [#10](https://github.com/gigi-zacaroni/tp-eng-software/issues/10), [#11](https://github.com/gigi-zacaroni/tp-eng-software/issues/11) · [ata de 12/09](reunioes/2026-09-12-refinamento-requisitos.md) |
| Sprint 2    | Inclusão de favoritos e da central de notificações no escopo.           | Funcionalidades identificadas no protótipo como apoio à recorrência de uso e ao acompanhamento das doações. | `RF-12`, `RF-13`, `RF-25`–`RF-27` · [#8](https://github.com/gigi-zacaroni/tp-eng-software/issues/8), [#13](https://github.com/gigi-zacaroni/tp-eng-software/issues/13) |
| Sprint 2    | Separação entre landing page pública (`RF-06`) e listagem protegida (`RF-07`). | A landing precisa ser pública para atrair doadores, mas os dados de contato das instituições permanecem restritos a usuários autenticados. | `RN-01`, `RNF-04` · [#3](https://github.com/gigi-zacaroni/tp-eng-software/issues/3), [#6](https://github.com/gigi-zacaroni/tp-eng-software/issues/6) |



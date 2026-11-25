# Visão geral do produto

Criada na Sprint 1, revisada na Sprint 2 e na entrega final.

## 1. Problema escolhido

**Título:** dificuldade de conexão entre pessoas dispostas a ajudar e instituições de caridade.

**Descrição:** muitas pessoas querem doar ou ajudar instituições, mas não sabem quais precisam de ajuda, que tipo de doação é necessária ou como falar com elas. As instituições, por sua vez, têm dificuldade para divulgar o que precisam e alcançar quem quer contribuir. Essas informações ficam espalhadas em redes sociais e outros canais. Com isso, doações deixam de acontecer e instituições ficam sem os recursos de que precisam.

**Exemplos do problema:**

- Quem quer doar muitas vezes não sabe quais instituições existem ou do que estão precisando.
- As instituições divulgam suas necessidades em várias redes sociais, e o doador não encontra informação atualizada.
- Sem uma plataforma central, fica difícil saber o tipo de ajuda necessária e falar com a instituição.

O problema não é a falta de pessoas dispostas a ajudar. É a dificuldade de **conectar essas pessoas às instituições que precisam de ajuda**.

## 2. Público e stakeholders

| Stakeholder | Necessidade | Como participa do sistema |
|---|---|---|
| Doador | Encontrar instituições e saber que tipo de ajuda elas precisam. | Consulta instituições e necessidades, promete doações, acompanha e cancela. |
| Instituição de caridade | Divulgar seu trabalho e suas necessidades. | Tem um perfil, publica necessidades e responde às doações recebidas. |
| Administrador | Manter a plataforma confiável. | Previsto na Sprint 2 para validar instituições. Não foi implementado. |

## 3. Visão do produto

**Nome da solução:** ConectaAção

**Proposta de valor:** para quem quer ajudar instituições de caridade, o ConectaAção mostra quem precisa de quê e permite prometer a doação direto na necessidade escolhida.

**Objetivo geral:** facilitar a conexão entre pessoas dispostas a ajudar e instituições de caridade, reunindo num só lugar as instituições e suas necessidades.

**Objetivos específicos:**

- Facilitar a busca de instituições e necessidades.
- Permitir que as instituições divulguem suas necessidades.
- Permitir que o doador prometa uma doação e acompanhe até a entrega.
- Facilitar o contato entre doador e instituição.

## 4. Escopo

### Entregue na versão final

A situação de cada requisito está em [`requisitos.md`](requisitos/requisitos.md).

- Cadastro de doador e de instituição, login e logout (`RF-01` a `RF-04`).
- Conteúdo sensível só para usuários logados (`RF-05`).
- Página inicial pública com "Como funciona" e instituições em destaque (`RF-06`).
- Lista de instituições, busca e filtros (`RF-07` a `RF-09`). Causa, cidade, tipo e prioridade ficam guardados no navegador.
- Perfil da instituição com descrição, contato e necessidades (`RF-10`).
- Cadastro de necessidade com item e quantidade, e progresso de cada uma (`RF-14`, `RF-18`).
- Fluxo de doação: o doador promete uma quantidade limitada ao que falta, acompanha o status (Prometida, A caminho, Entregue) e pode cancelar antes da entrega (`RF-19` a `RF-21`).
- Painel da instituição: doações recebidas, aceitar, recusar e confirmar recebimento (`RF-22`, `RF-23`).

### Previsto e não entregue

- Selo "Verificada" e administrador (`RF-11`).
- Favoritos (`RF-12`, `RF-13`).
- Editar, excluir e pausar necessidade (`RF-15` a `RF-17`).
- Total recebido por necessidade (`RF-24`).
- Notificações (`RF-25` a `RF-27`).

### Fora do escopo

- Pagamentos ou doações financeiras intermediadas pela plataforma.
- Transporte ou entrega das doações.
- Gestão financeira das instituições.
- Fiscalização do uso das doações.
- Atendimento direto aos beneficiários.

## 5. Restrições e premissas

| Tipo | Item | Impacto no projeto |
|---|---|---|
| Restrição | Prazo do semestre. | O grupo priorizou o fluxo de doação. |
| Restrição | Equipe pequena. | Favoritos, notificações e a gestão completa de necessidades ficaram de fora. |
| Restrição | Tecnologias que a equipe domina. | Node.js, Express, MySQL e front-end em HTML, CSS e JavaScript. |
| Premissa | As instituições querem divulgar suas necessidades. | Sem instituições ativas, a plataforma não tem conteúdo. |
| Premissa | Os doadores usam a plataforma para encontrar onde ajudar. | A busca e os filtros precisam ser simples. |
| Premissa | As instituições informam dados verdadeiros. | A confiança do doador depende disso, já que não há verificação. |

## 6. Diferenciais da solução

O ConectaAção não é um cadastro genérico. Ele resolve um problema de conexão: mostra **quem precisa de ajuda, de que ajuda e quanto ainda falta**. O doador promete uma quantidade exata, e o sistema não deixa passar do que a instituição pediu. A instituição confirma o que recebeu, e o doador acompanha cada etapa.

## 7. Histórico de mudanças

| Data ou sprint | Mudança | Motivo | Referência |
|---|---|---|---|
| Sprint 1 | Criação da visão do produto. | Definir problema, público e proposta. | `D-01` no [backlog](backlog-produto.md), [`32c0ac7`](https://github.com/gigi-zacaroni/tp-eng-software/commit/32c0ac7) |
| Sprint 1 | Foco na conexão entre doadores e instituições. | Evitar uma plataforma genérica de doações. | `T-01`, [`sprint-01.md`](sprints/sprint-01.md) |
| Sprint 1 | Escopo inicial e funcionalidades principais. | Definir a primeira versão. | `T-05`, [`sprint-01.md`](sprints/sprint-01.md) |
| Sprint 2 | "Demonstrar interesse em ajudar" virou "prometer doação e acompanhar até a entrega". | A ação estava vaga e sem comportamento verificável. | `RF-19` a `RF-21`, [ata de 12/09](reunioes/2026-09-12-refinamento-requisitos.md) |
| Sprint 2 | Favoritos e notificações entram no escopo. | Identificados no protótipo. | `RF-12`, `RF-13`, `RF-25` a `RF-27` |
| Sprint 2 | Página inicial pública separada da lista protegida. | Atrair doadores sem expor contatos. | `RN-01`, `RNF-04` |
| Entrega final | Seção 4 dividida em entregue, previsto e não entregue, e fora do escopo. Administrador marcado como não implementado. | Alinhar a visão ao código final. | [`requisitos.md`](requisitos/requisitos.md) |

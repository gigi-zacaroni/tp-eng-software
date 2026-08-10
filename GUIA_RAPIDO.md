# Guia rápido para utilizar este repositório

## O que deve ser atualizado em toda sprint

Em todas as etapas, o grupo deve:

1. selecionar e atualizar as Issues da sprint no GitHub Project;
2. produzir o artefato técnico específico da etapa;
3. desenvolver ou evoluir parte verificável da aplicação;
4. atualizar os documentos anteriores afetados pelas novas decisões;
5. preencher `docs/sprints/sprint-0X.md` com links diretos;
6. revisar os critérios de aceitação e registrar o resultado;
7. criar a tag da sprint somente depois de conferir a entrega;
8. enviar no UFLA Virtual o link da tag e o link do arquivo da sprint naquela tag.

## O que o arquivo da sprint deve fazer

O arquivo da sprint **não substitui** os outros documentos. Ele deve responder:

- O que foi planejado?
- O que foi concluído?
- Qual conteúdo da disciplina foi aplicado?
- Quais documentos foram criados ou atualizados?
- Qual parte da aplicação evoluiu?
- Quais Issues, PRs e commits comprovam a evolução?
- O que foi demonstrado na revisão?
- O que ficou pendente e por quê?

## Como criar uma tag

Depois de finalizar e revisar a sprint:

```bash
git checkout main
git pull
git tag -a sprint-01 -m "Entrega da Sprint 1"
git push origin sprint-01
```

Substitua `sprint-01` pela sprint correspondente. A entrega final deve usar `versao-final`.

> Não mova nem recrie a tag depois do prazo sem autorização do professor. A tag identifica exatamente a versão corrigida.

## Como escrever boas evidências

**Fraco:** “Implementamos o cadastro.”

**Adequado:** “O fluxo de cadastro referente ao `RF-01` foi implementado na Issue `#12`, revisado no PR `#18`, validado pelo caso `CT-01` e pode ser encontrado em `src/...`.”

## O que não será considerado evidência suficiente

- imagem sem explicação e sem vínculo com um item da sprint;
- link para arquivo externo que poderia estar versionado no repositório;
- título de Issue sem descrição ou critério de aceitação;
- vários arquivos enviados apenas no último dia, sem evolução no histórico;
- documento que descreve algo diferente do código existente;
- “todos os testes passaram” sem comando, saída ou relatório verificável;
- commits genéricos como `alterações`, `trabalho`, `final` ou `coisas`.

## Convenção de identificadores

| Item | Exemplo |
|---|---|
| Requisito funcional | `RF-01` |
| Requisito não funcional | `RNF-01` |
| Regra de negócio | `RN-01` |
| História de usuário | `US-01` |
| Decisão de projeto | `DP-01` |
| Padrão de projeto | `PP-01` |
| Caso de teste | `CT-01` |
| Defeito | Issue com label `bug` |

## Dúvida frequente: documento novo ou atualização?

- O arquivo indicado como **novo artefato** deve ser criado naquela sprint.
- Os documentos anteriores devem ser atualizados quando a nova etapa modificar requisitos, modelos, decisões ou escopo.
- Não duplique o mesmo conteúdo em vários arquivos. Use links relativos entre eles.

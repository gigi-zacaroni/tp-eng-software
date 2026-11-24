# Reunião assíncrona: fechamento da Sprint 8

- **Data:** 23/11/2026
- **Formato:** assíncrona, por mensagens
- **Participantes:** Arthur Veiga, Geovana Zacaroni, Karol Guimarães e Maria Luiza Pestana
- **Sprint:** 8
- **Objetivo:** fechar a validação final, registrar os defeitos e preparar a tag `sprint-08`.

## Decisões

1. Os defeitos DEF-02 a DEF-06 viram Issues com a label `bug` e o milestone Sprint 8.
2. As Issues do DEF-02, DEF-03 e DEF-04 são fechadas, porque o reteste foi aprovado.
3. As Issues do DEF-05 e do DEF-06 ficam abertas. O DEF-05 espera a conferência no navegador (`CT-21`). O DEF-06 espera a troca da senha do MySQL.
4. Os casos que dependem do MySQL (`CT-13` a `CT-19` e `CT-21` a `CT-23`) ficam com a Geovana, que tem o banco configurado. A Issue #36 continua aberta.
5. As telas de listagem, detalhe e confirmação entram nesta sprint, porque os endpoints `GET` já existiam sem interface.

## Tarefas e responsáveis

| Tarefa | Responsável | Prazo |
|---|---|---|
| Evidências finais dos testes e telas novas | Arthur | 23/11/2026 |
| Correção do DEF-02 e do DEF-03 | Geovana | 23/11/2026 |
| Persistência do fluxo de doações e instruções do banco | Maria Luiza | 22/11/2026 |
| Issues, backlog, requisitos, rastreabilidade, `sprint-08.md` e tag | Karol | 23/11/2026 |
| Executar os casos com MySQL e trocar a senha exposta | Geovana | Entrega final (30/11/2026) |

## Impedimentos

- Só a Geovana tem o MySQL configurado. Por isso 10 casos não foram executados.

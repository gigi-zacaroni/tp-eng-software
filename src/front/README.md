# Front-end ConectaAção

Página única servida pelo Express a partir desta pasta, na mesma origem da API. As telas vêm do protótipo de alta fidelidade da equipe e foram ligadas à API na entrega final.

## Arquivos

- `index.html`: casca da página. Carrega `style.css` e `app.js`.
- `app.js`: estado, navegação, chamadas à API e todas as telas.
- `style.css`: identidade visual e estilos responsivos.

## Telas

| Tela (`state.view`) | O que faz | Requisitos | Acesso | API |
|---|---|---|---|---|
| `home` | Proposta, "Como funciona" e instituições em destaque | `RF-06` | Pública | `GET /instituicoes/destaques` |
| `auth` | Entrar e criar conta de doador ou instituição | `RF-01` a `RF-03` | Pública | `POST /login`, `POST /cadastro/doador`, `POST /cadastro/instituicao` |
| `explore` | Necessidades com busca, filtros e ordenação | `RF-08`, `RF-09` | Logado | `GET /instituicoes` e `GET /instituicoes/:id` |
| `institutions` | Lista de instituições com busca e filtro por causa | `RF-07` a `RF-09` | Logado | `GET /instituicoes` |
| `institution` | Perfil da instituição, contato e necessidades | `RF-10`, `RF-18` | Logado | `GET /instituicoes/:id` |
| `need` | Detalhe da necessidade e progresso | `RF-18` | Logado | `GET /instituicoes/:id` |
| `donate` | Promessa de doação limitada ao que falta | `RF-19`, `RN-02`, `RNF-01` | Doador | `POST /doacoes` |
| `tracking` | Minhas doações, linha do tempo e cancelamento | `RF-20`, `RF-21` | Doador | `GET /doacoes/minhas`, `PATCH /doacoes/:id/cancelar` |
| `donorProfile` | Perfil do doador e contagens | `RF-20` | Doador | `GET /doacoes/minhas` |
| `dashboard` | Painel: necessidades, progresso e doações recentes | `RF-22`, `RF-24` | Instituição | `GET /instituicoes/:id`, `GET /doacoes/recebidas` |
| `manage` | Doações recebidas: aceitar, recusar e confirmar | `RF-22`, `RF-23` | Instituição | `GET /doacoes/recebidas`, `PATCH /doacoes/:id/aceitar`, `/recusar`, `/receber` |
| `create` | Nova necessidade | `RF-14` | Instituição | `POST /instituicoes/necessidades` |
| `instProfile`, `instEdit` | Perfil da instituição e edição dos dados extras | `RF-10` | Instituição | `GET /instituicoes/:id` |

Um visitante que abre uma tela protegida vai para "Entrar". Depois do login, o doador volta para a necessidade que queria apoiar, e a instituição vai para o painel. A instituição não acessa as telas de doador, e o doador não acessa o painel.

## Sessão e dados guardados no navegador

O `app.js` usa duas chaves do `localStorage`:

- `conectaacao.sessao`: token JWT, tipo de usuário, perfil e e-mail. Uma resposta 401 apaga a sessão.
- `conectaacao.extras`: dados que o banco não guarda, ligados ao id real vindo da API.
  - Instituição: cidade, causa, CNPJ, telefone, e-mail de contato e endereço.
  - Necessidade: tipo de doação, categoria, prioridade, descrição, prazo e local de recebimento.
  - Doação: telefone, forma de entrega e detalhes.

Busca, filtros e ordenação rodam no navegador sobre os dados da API e esses extras. Os extras valem só para o navegador onde foram salvos. Sem valor salvo, a tela mostra "Não informado" ou um valor padrão (categoria "Outros", prioridade "Moderada", tipo "Itens").

## Segurança

Todo texto vindo da API ou do usuário passa pela função `esc()` antes de entrar no HTML. Os ids usados nos botões são números.

## Execução

Suba a API conforme o [`README do back-end`](../back/README.md) e abra `http://localhost:3000`. Não abra o `index.html` direto pelo sistema de arquivos, porque as chamadas à API dependem de HTTP.

Para testar com dados prontos, use o banco `conectaacao_test` (`DB_NAME=conectaacao_test` no `.env`, depois de rodar `reset_test.sql` e `seed_test.sql`). As contas usam a senha `segredo123`: doadores `ana@email.com` e `bruno@email.com`; instituições `esperanca@email.com` e `alimentos@email.com`.

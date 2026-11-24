# Front-end ConectaAção

O front-end é servido pelo Express a partir desta pasta, na mesma origem da API. Cada tela é uma página HTML com um módulo JavaScript próprio. O visual segue o [protótipo navegável](../../docs/prototipo/README.md).

## Telas

| Página | Tela do protótipo | Requisitos | Acesso |
|---|---|---|---|
| `index.html` | `landing` | `RF-06` | Pública |
| `pages/login.html` | `login` | `RF-03`, `RF-05` | Pública |
| `pages/cadastro.html` | `escolhaConta`, `cadDoador`, `cadInst` | `RF-01`, `RF-02`, `RF-14` | Pública |
| `pages/instituicoes.html` | `listagem` | `RF-07`, `RF-08`, `RF-09` | Doador e instituição |
| `pages/instituicao.html?id=N` | `detalhe` e modal "Quero doar" | `RF-10`, `RF-18`, `RF-19`, `RN-02` | Doador e instituição (só o doador doa) |
| `pages/confirmacao.html` | `confirmacao` | `RF-19`, `RNF-01` | Doador |

Uma tela protegida aberta sem sessão manda o visitante para o login e, depois de entrar, devolve-o para a tela pedida (`?volta=`).

Ainda não existem as telas `favoritos`, `minhasDoacoes` e `painel`. No menu elas aparecem como "em breve".

## Arquivos

- `js/api.js`: único ponto de comunicação HTTP (`fetch`) com a API e gerenciamento da sessão (`exigirSessao` protege as telas).
- `js/cabecalho.js`: adapta navegação, identificação e ações conforme o perfil, e destaca a página atual (`<body data-pagina>`).
- `js/cards.js`: card de instituição usado na landing e na listagem.
- `js/landing.js`, `js/login.js`, `js/cadastro.js`, `js/instituicoes.js`, `js/instituicao.js`, `js/confirmacao.js`: um módulo por tela.
- `style.css`: identidade visual e estilos responsivos. Alvos de toque de 44 px (`RNF-02`) e foco visível (`RNF-10`).
- `img/`: imagens utilizadas pelas telas.

Os dados vindos da API entram na página sempre por `textContent`, nunca por `innerHTML`.

## Execução

Inicie a API conforme as instruções de `src/back/README.md` e acesse `http://localhost:3000` (ou a porta configurada no ambiente). Não abra os HTMLs diretamente pelo sistema de arquivos: os módulos e as chamadas à API dependem de serem servidos por HTTP.

Para testar com dados prontos, use o banco `conectaacao_test` (`DB_NAME=conectaacao_test` no `.env`, depois de rodar `reset_test.sql` e `seed_test.sql`). As contas de teste usam a senha `segredo123`: doadores `ana@email.com` e `bruno@email.com`; instituições `esperanca@email.com` e `alimentos@email.com`.

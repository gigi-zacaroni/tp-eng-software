# Front-end ConectaAção

O front-end é servido pelo Express a partir desta pasta, na mesma origem da API.

## Estrutura

- `index.html`: landing page pública e instituições em destaque.
- `pages/login.html`: formulário de autenticação para doadores e instituições.
- `js/api.js`: único ponto de comunicação HTTP (`fetch`) com a API e gerenciamento da sessão.
- `js/landing.js`: consulta os destaques e monta os cards da landing.
- `js/login.js`: valida e envia o formulário de login.
- `js/cabecalho.js`: adapta navegação, identificação e ações conforme o perfil.
- `style.css`: identidade visual e estilos responsivos.
- `img/`: imagens utilizadas pelo protótipo.

## Execução

Inicie a API conforme as instruções de `src/back/README.md` e acesse `http://localhost:3000` (ou a porta configurada no ambiente). Não abra os HTMLs diretamente pelo sistema de arquivos: os módulos e as chamadas à API dependem de serem servidos por HTTP.

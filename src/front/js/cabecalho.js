// Cabeçalho comum às páginas. O estado vem da sessão salva no login (js/api.js):
// visitante vê "Entrar"; doador e instituição veem nome, papel, menu do perfil e "Sair".
import { logout, obterSessao } from './api.js';

const PAPEIS = { doador: 'Doador', instituicao: 'Instituição' };

export function montarCabecalho() {
  const sessao = obterSessao();
  const tipo = sessao ? sessao.tipo : 'visitante';

  document.querySelector('#acoes-visitante').hidden = Boolean(sessao);
  document.querySelector('#acoes-logado').hidden = !sessao;

  // Itens do menu marcados com data-perfil aparecem só para aquele perfil.
  document.querySelectorAll('[data-perfil]').forEach((item) => {
    item.hidden = item.dataset.perfil !== tipo;
  });

  if (sessao) {
    const nome = sessao.perfil.nome;
    const avatar = document.querySelector('#avatar');
    avatar.textContent = nome.trim().charAt(0).toUpperCase();
    avatar.dataset.tipo = tipo;
    document.querySelector('#usuario-nome').textContent = nome;
    document.querySelector('#usuario-papel').textContent = PAPEIS[tipo];
  }
}

document.querySelector('#sair').addEventListener('click', async () => {
  await logout().catch(() => {});
  window.location.href = '/index.html';
});

montarCabecalho();

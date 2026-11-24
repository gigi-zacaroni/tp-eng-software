// Card de instituição usado na landing (RF-06) e na listagem (RF-07).
// Sempre textContent: os dados vêm do cadastro das instituições.

export function texto(tag, classe, conteudo) {
  const el = document.createElement(tag);
  el.className = classe;
  el.textContent = conteudo;
  return el;
}

export function textoAbertas(n) {
  return n === 1 ? '1 necessidade aberta' : `${n} necessidades abertas`;
}

// Com `link`, o rodapé ganha "Ver detalhe" apontando para a tela de detalhe.
export function criarCard(inst, { link = false } = {}) {
  const card = document.createElement('article');
  card.className = 'card';
  card.append(texto('div', 'card-foto', 'foto da instituição'));

  const corpo = document.createElement('div');
  corpo.className = 'card-corpo';
  corpo.append(texto('div', 'card-nome', inst.nome));
  if (inst.verificada) corpo.append(texto('div', 'card-selo', '✓ Verificada'));
  corpo.append(texto('p', 'card-resumo', inst.resumo || 'Esta instituição ainda não escreveu uma descrição.'));

  const rodape = document.createElement('div');
  rodape.className = 'card-rodape';
  rodape.append(texto('span', '', textoAbertas(inst.necessidadesAbertas)));
  if (link) {
    const ver = texto('a', 'card-link', 'Ver detalhe →');
    ver.href = `/pages/instituicao.html?id=${encodeURIComponent(inst.id)}`;
    ver.setAttribute('aria-label', `Ver detalhe de ${inst.nome}`);
    rodape.append(ver);
  }
  corpo.append(rodape);
  card.append(corpo);
  return card;
}

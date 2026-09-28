// Erro com status HTTP: as rotas lançam, o handler central responde.
class ErroHttp extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.status = status;
  }
}

// Express 4 não captura rejeições de handlers async; este wrapper encaminha ao next().
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { ErroHttp, asyncHandler };

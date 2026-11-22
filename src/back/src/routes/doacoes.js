const express = require('express');
const { autenticar, exigirTipo } = require('../middleware/autenticacao');
const { asyncHandler } = require('../utils/http');
const doacaoController = require('../controllers/doacaoController');

const router = express.Router();

// Receber uma nova doação (RF-19). Só doadores autenticados; o doador é
// sempre o do token — nunca um id enviado no corpo da requisição.
router.post(
  '/', 
  autenticar, 
  exigirTipo('doador'), 
  asyncHandler(doacaoController.criarDoacao)
);

router.patch(
  '/:id/avancar',
  autenticar,
  exigirTipo('doador'),
  asyncHandler(doacaoController.avancarDoacao)
);

router.patch(
  '/:id/cancelar',
  autenticar,
  exigirTipo('doador'),
  asyncHandler(doacaoController.cancelarDoacao)
);

module.exports = router;
const express = require('express');
const { autenticar } = require('../middleware/autenticacao');
const { asyncHandler } = require('../utils/http');
const instituicaoController = require('../controllers/instituicaoController');

const router = express.Router();

// RF-06: destaques da landing. Público, por isso vem antes de /:id e sem token.
router.get('/destaques', asyncHandler(instituicaoController.destaques));

// RF-05 e RNF-04: listagem e detalhe só para usuários autenticados.
router.get('/', autenticar, asyncHandler(instituicaoController.listar));
router.get('/:id', autenticar, asyncHandler(instituicaoController.detalhar));

module.exports = router;

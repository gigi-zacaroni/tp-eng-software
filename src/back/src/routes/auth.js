const express = require('express');
const { asyncHandler } = require('../utils/http');
const authController = require('../controllers/authController');

const router = express.Router();

// RF-01: Cadastro de doador
router.post('/cadastro/doador', asyncHandler(authController.cadastrarDoador));

// RF-02: Cadastro de instituição
router.post('/cadastro/instituicao', asyncHandler(authController.cadastrarInstituicao));

// RF-03: Login
router.post('/login', asyncHandler(authController.login));

// RF-04: Encerrar sessão
router.post('/logout', authController.logout); // Não precisa de asyncHandler pois é síncrono

module.exports = router;
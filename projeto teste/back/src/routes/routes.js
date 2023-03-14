const express = require('express')

const router = express.Router()

const users = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/createUser', users.create)
router.post('/loginUser', users.login)
router.get('/listaUsers', users.read)

const motorista = require('../controllers/controllerMotorista')

router.post('/createMotorista', middleware.autenticacao, motorista.create)
router.get('/readMotorista', motorista.read)
router.delete('/deleteMotorista/:id', middleware.autenticacao, motorista.del)
router.put('/putMotorista/:id/:cpf', middleware.autenticacao, motorista.update)

const frota = require('../controllers/controllerVeiculo')

router.post('/createVeiculo', middleware.autenticacao, frota.create)
router.get('/readVeiculo', frota.read)
router.delete('/deleteVeiculo/:id', middleware.autenticacao, frota.del)
router.put('/putVeiculo/:id/:placa', middleware.autenticacao, frota.update)

const manutencao = require('../controllers/constrollerManutencoes')

router.post('/createManutencao', middleware.autenticacao, manutencao.create)
router.get('/readManutencao', manutencao.read)
router.delete('/deleteManutencao/:id', middleware.autenticacao, manutencao.del)
router.put('/putManutencao/:id', middleware.autenticacao, manutencao.update)
// router.put('/Manutencao/:id',  manutencao.updateManutencaoServico)

// router.put('/manutencaoVeiculo', manutencao.updateManutencaoServico)

const operacao = require('../controllers/controllerOperacoes')

router.post("/createOperacao", middleware.autenticacao, operacao.create)
router.get("/readOperacao", operacao.read)
router.put("/putOperacao/:id", middleware.autenticacao, operacao.update)
// router.put("/operacao/:id_veiculo", operacao.updateServico)
router.delete("/deleteOperacao/:id", middleware.autenticacao, operacao.del)

module.exports = router
const express = require('express')

const router = express.Router()

const users = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/createUser',users.create)
router.post('/loginUser',users.login)
router.get('/listaUsers',users.read)

const motorista = require('../controllers/controllerMotorista')

router.post('/createMotorista',motorista.create)
router.get('/readMotorista', motorista.read)
router.delete('/deleteMotorista/:id',middleware.autenticacao, motorista.del)
router.put('/putMotorista/:id',middleware.autenticacao, motorista.update)

const frota = require('../controllers/controllerVeiculo')

router.post('/createVeiculo', frota.create)
router.get('/readVeiculo',frota.read)
router.delete('/deleteVeiculo/:id', middleware.autenticacao, frota.del)
router.put('/putVeiculo/:id', middleware.autenticacao, frota.update)

const manutencao = require('../controllers/constrollerManutencoes')

router.post('/createManutencao', manutencao.create)
router.get('/readManutencao', manutencao.read)
router.delete('/deleteManutencao/:id' , middleware.autenticacao, manutencao.del)
router.put('/putManutencao/:id', middleware.autenticacao, manutencao.update)

const operacao = require('../controllers/controllerOperacoes')

router.post("/createOperacao", operacao.create)
router.get("/readOperacao", operacao.read)
router.put("/putOperacao/:id", middleware.autenticacao, operacao.update)
router.delete("/deleteOperacao/:id", middleware.autenticacao, operacao.del)

module.exports = router
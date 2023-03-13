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
router.delete('/deleteMotorista/:id', motorista.del)
router.put('/putMotorista/:id/:cpf', motorista.update)

const frota = require('../controllers/controllerVeiculo')

router.post('/createVeiculo', frota.create)
router.get('/readVeiculo',frota.read)
router.delete('/deleteVeiculo/:id',  frota.del)
router.put('/putVeiculo/:id/:placa',  frota.update)

const manutencao = require('../controllers/constrollerManutencoes')

router.post('/createManutencao', manutencao.create)
router.get('/readManutencao', manutencao.read)
router.delete('/deleteManutencao/:id' ,  manutencao.del)
router.put('/putManutencao/:id',  manutencao.update)
    // router.put('/Manutencao/:id',  manutencao.updateManutencaoServico)

// router.put('/manutencaoVeiculo', manutencao.updateManutencaoServico)

const operacao = require('../controllers/controllerOperacoes')

router.post("/createOperacao", operacao.create)
router.get("/readOperacao", operacao.read)
router.put("/putOperacao/:id", operacao.update)
// router.put("/operacao/:id_veiculo", operacao.updateServico)
router.delete("/deleteOperacao/:id",  operacao.del)

module.exports = router
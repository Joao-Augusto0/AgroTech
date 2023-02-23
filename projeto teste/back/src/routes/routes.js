const express = require('express')

const router = express.Router()

const users = require('../controllers/controllerUsuario')
const middleware = require('../middleware/middleware')

router.post('/createUser',users.create)
router.post('/loginUser',users.login)

const motorista = require('../controllers/controllerMotorista')

router.post('/createMotorista',middleware.autenticacao, motorista.create)
router.get('/readMotorista', motorista.read)
router.delete('/deleteMotorista/:id',middleware.autenticacao, motorista.del)
router.put('/putMotorista/:id',middleware.autenticacao, motorista.update)

const frota = require('../controllers/controllerVeiculo')

router.post('/createVeiculo', middleware.autenticacao, frota.create)
router.get('/readVeiculo',frota.read)
router.delete('/deleteVeiculo/:id', middleware.autenticacao, frota.del)
router.put('/putVeiculo/:id', middleware.autenticacao, frota.update)

module.exports = router
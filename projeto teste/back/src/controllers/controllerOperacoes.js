const { PrismaClient } = require('@prisma/client')
const Motorista = require('../controllers/controllerMotorista')
const Veiculo = require('../controllers/controllerVeiculo')

const prisma = new PrismaClient()

const create = async (req, res) => {

    if (req.body.descricao.length > 0 && req.body.id_motorista != undefined && req.body.id_veiculo != undefined) {

        try {
            let motorista = await prisma.motorista.findUnique({
                where: {
                    id_motorista: req.body.id_motorista
                },
                select: {
                    ocupado: true,
                    Servico: true
                }
            })

            if (motorista.Servico.length != 0) {
                motorista.ocupado = true
            }

            if (motorista.ocupado == true) {
                return res.status(200).json({ 'menssagem': "Motorista Ocupado" }).end()
            }

        } catch (error) {
            return res.status(400).send({ menssagem: "Motorista não encontrado" }).end()
        }

        try {
            let veiculo = await prisma.frota.findUnique({
                where: {
                    id: req.body.id_veiculo
                },
                select: {
                    ocupado: true,
                    Manutencao: true,
                    Servico: true
                }
            })

            if (veiculo.Manutencao.length != 0) {
                veiculo.ocupado = true
            }

            if (veiculo.Servico.length != 0) {
                veiculo.ocupado = true
            }

            if (veiculo.ocupado == true) {
                return res.status(200).json({ 'menssagem': "Veiculo Ocupado" }).end()
            }
        } catch (error) {
            return res.status(400).send({ menssagem: "Veiculo Não encontrado" }).end()
        }

        let servico = await prisma.servico.create({
            data: req.body
        })

        Veiculo.updateIndisponivel(req.body.id_veiculo)
        Motorista.updateIndisponivel(req.body.id_motorista)

        res.status(200).json(servico).end()
    } else {
        res.status(400).send({ menssagem: 'campo vazio' }).end()
    }
}

const read = async (req, res) => {
    let servico = await prisma.servico.findMany({
        select: {
            id: true,
            data_saida: true,
            data_retorno: true,
            descricao: true,
            veiculo: {
                select: {
                    placa: true,
                    Manutencao: {
                        select: {
                            descricao: true
                        }
                    }
                }
            },
            motorista: {
                select: {
                    cpf: true
                }
            }
        }
    })
    res.status(200).json(servico).end()
}

const update = async (req, res) => {
    var info = req.body
    let servico = await prisma.servico.update({
        where: {
            id: Number(req.params.id)
        },
        data: info
    })

    if (info.data_retorno != null) {
        Veiculo.updateDisponivel(req.body.id_veiculo)
        Motorista.updateDisponivel(req.body.id_motorista)
    }

    res.status(200).json(servico).end()
}

const updateServico = async (info, req, res) => {
    const timeElapsed = Date.now();

    const today = new Date(timeElapsed);

    if (info.Servico[0] != undefined) {
        let servico = await prisma.servico.update({
            where: {
                id: Number(info.Servico[0].id)
            },
            data: { descricao: "foi levado para manutenção", data_retorno: today }
        })
    }
}



const del = async (req, res) => {
    let servico = await prisma.servico.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(servico).end()
}

module.exports = {
    create,
    read,
    update,
    del,
    updateServico
}
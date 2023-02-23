const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res, next) => {
    let motorista = await prisma.motorista.create({
        data: req.body
    })
    res.status(201).end()
}

const read = async (req, res) => {
    let motorista = await prisma.motorista.findMany({
        select: {
            id_motorista: true,
            nome: true,
            Servico: {
                select: {
                    data_saida: true,
                    data_retorno: true,
                    descricao: true
                }
            }
        }
    })
    res.status(200).json(motorista).end()
}

const update = async (req, res) => {
    let motorista = await prisma.motorista.update({
        where:{
            id_motorista: Number(req.params.id)
        },
        data:req.body
    })
    res.status(200).json(motorista).end()
}

const del = async (req, res) => {
    let motorista = await prisma.motorista.delete({
        where: {
            id_motorista: Number(req.params.id)
        }
    })
    res.status(200).json(motorista).end()
}

module.exports = {
    create,
    read,
    update,
    del
}
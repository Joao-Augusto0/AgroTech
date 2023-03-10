const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    if (req.body.nome.length > 0 && req.body.cpf.length > 0 && req.body.cnh.length > 0) {
        try {
            let motorista = await prisma.motorista.create({
                data: req.body
            })
            res.status(201).json(motorista).end()
        } catch (error) {
            res.status(400).json(error).end()
        }
    } else {
        res.status(400).json({ 'erro': 'campo vazio' }).end()
    }

}

const read = async (req, res) => {
    let motorista = await prisma.motorista.findMany({
        select: {
            id_motorista: true,
            nome: true,
            cpf: true,
            cnh: true,
            ocupado: true,
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
        where: {
            id_motorista: Number(req.params.id)
        },
        data: req.body
    })
    res.status(200).json(motorista).end()
}

const updateDisponivel = async (id) => {
    let motorista = await prisma.motorista.update({
        where: {
            id_motorista: Number(id)
        },
        data: { ocupado: false }
    })
}

const updateIndisponivel = async (id) => {
    let motorista = await prisma.motorista.update({
        where: {
            id_motorista: Number(id)
        },
        data: { ocupado: true }
    })
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
    del,
    updateDisponivel,
    updateIndisponivel
}
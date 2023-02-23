const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    let servico = await prisma.servico.create({
        data: req.body
    })
    res.status(200).end()
}

const read = async (req, res) => {
    let servico = await prisma.servico.findMany({
        select: {
            id:true,
            data_saida:true,   
            data_retorno:true,
            descricao:true,
            id_motorista:true,
            id_veiculo:true
        }
    })
    res.status(200).json(servico).end()
}

const update = async (req,res) => {
    let servico = await prisma.servico.update({
        where: {
            id: Number(req.params.id)
        },
        data:req.body
    })
    res.status(200).json(servico).end()
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
    del
}
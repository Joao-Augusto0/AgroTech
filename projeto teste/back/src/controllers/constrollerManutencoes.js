const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    info.id_veiculo = Number(req.body.id_veiculo)
    let manutencao = await prisma.manutencao.create({
        data: info
    })
    res.status(201).end()
}

const read = async (req, res) => {
    let manutencao = await prisma.manutencao.findMany({
        select:{
            id:true,
            descricao:true,
            valor:true,
            data_inicio:true,
            data_fim:true,
            id_veiculo:true
        }
    })
    res.status(200).json(manutencao).end()
}

const update = async (req, res) => {
    let manutencao = await prisma.manutencao.update({
        where:{
            id: Number(req.params.id)
        },
        data:req.body
    })
    res.status(200).json(manutencao).end()
}

const del = async (req, res) => {
    let manutencao = await prisma.manutencao.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(manutencao).end()
}


module.exports = {
    create,
    read,
    update,
    del
}
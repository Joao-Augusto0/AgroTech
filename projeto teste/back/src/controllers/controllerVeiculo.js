const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    let veiculo = await prisma.frota.create({
        data: req.body
    })
    res.status(201).end()
}

const read = async (req, res) => {
    let veiculo = await prisma.frota.findMany({
        select: {
            id: true,
            modelo: true,
            marca:true,
            Servico: {
                select: {
                    data_saida: true,
                    data_retorno: true,
                    descricao: true
                }
            },
            Manutencao: {
                select:{
                    data_inicio:true,
                    data_fim:true,
                    valor:true,
                    descricao:true

                }
            }
        }
    })
    res.status(200).json(veiculo).end()
}

const update = async (req, res) => {
    let veiculo = await prisma.frota.update({
        where:{
            id: Number(req.params.id)
        },
        data:req.body
    })
    res.status(200).json(veiculo).end()
}

const del = async (req, res) => {
    let veiculo = await prisma.frota.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(veiculo).end()
}

module.exports = {
    create,
    read,
    update,
    del
}
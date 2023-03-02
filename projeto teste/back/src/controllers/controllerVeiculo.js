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
            marca: true,
            placa:true,
            Servico: {
                select: {
                    data_saida: true,
                    data_retorno: true,
                    descricao: true
                }
            },
            Manutencao: {
                select: {
                    data_inicio: true,
                    data_fim: true,
                    valor: true,
                    descricao: true
                }
            }
        }
    })

    veiculo.forEach(element => {
        if (element.Manutencao.length == 0) {
            element.Manutencao = "não esta sendo feita nenhuma manutenção"
        }
        if (element.Servico.length == 0) {
            element.Servico = "não esta fazendo nenhum serviço"
        }
    });

    res.status(200).json(veiculo).end()
}

const update = async (req, res) => {
    let veiculo = await prisma.frota.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
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
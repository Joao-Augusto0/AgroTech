const { PrismaClient } = require('@prisma/client')
const Veiculo = require('../controllers/controllerVeiculo')
const Operacao = require('../controllers/controllerOperacoes')


const prisma = new PrismaClient()

const create = async (req, res) => {
    let veiculo = await prisma.frota.findUnique({
        where: {
            id: req.body.id_veiculo
        },
        select: {
            ocupado: true,
            Servico: true,
            id: true
        }
    })

    var info = req.body
    info.id_veiculo = Number(req.body.id_veiculo)
    let manutencao = await prisma.manutencao.create({
        data: info
    })

    Operacao.updateServico(veiculo)
    res.status(201).end()
}

const read = async (req, res) => {
    let manutencao = await prisma.manutencao.findMany({
        select: {
            id: true,
            descricao: true,
            valor: true,
            data_inicio: true,
            data_fim: true,
            id_veiculo: true,
            veiculo: {
                select: {
                    placa: true
                }
            }
        }
    })
    res.status(200).json(manutencao).end()
}

const update = async (req, res) => {
    info = req.body
    info.valor = Number(req.body.valor)
    let manutencao = await prisma.manutencao.update({
        where: {
            id: Number(req.params.id)
        },
        data: info
    })

    if (info.data_fim != null) {
        Veiculo.updateDisponivel(req.body.id_veiculo)
    }

    res.status(200).json(manutencao).end()
}

const updateManutencaoServico = async () => {

    let manutencao = await prisma.manutencao.update({
        data: { descricao: 'em manutenção' }
    })
    console.log(Operacao.updateServico(req.params.id))


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
    del,
    updateManutencaoServico
}
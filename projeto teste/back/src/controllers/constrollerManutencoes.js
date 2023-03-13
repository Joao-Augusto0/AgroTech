const { PrismaClient } = require('@prisma/client')
const Veiculo = require('../controllers/controllerVeiculo')
const Operacao = require('../controllers/controllerOperacoes')


const prisma = new PrismaClient()

const create = async (req, res) => {

    try {
        let veiculo = await prisma.frota.findUnique({
            where: {
                placa: req.body.placa
            },
            select: {
                ocupado: true,
                Servico: true,
                id_frota: true,
                placa: true,
                Manutencao: true
            }
        })
        if (veiculo) {
            if (veiculo.Manutencao.length == 0) {
                try {
                    let info = req.body
                    info.valor = Number(req.body.valor)
                    let manutencao = await prisma.manutencao.create({
                        data: info
                    })
                    console.log(manutencao)
                    if (manutencao) {
                        Veiculo.updateIndisponivel(req.body.placa)
                        Operacao.updateServico(veiculo)
                    }
                    res.status(201).end()
                } catch (error) {
                    res.status(400).send(error).end()
                }
            } else {
                res.status(400).send({ menssagem: 'veiculo ja esta em manutenção' }).end()
            }
        } else {
            res.status(400).send({ menssagem: 'veiculo não existe' })
        }
    } catch (error) {
        res.status(400).send(error).end()
    }
}

const read = async (req, res) => {
    let manutencao = await prisma.manutencao.findMany({
        select: {
            id_manutencao: true,
            descricao: true,
            valor: true,
            data_inicio: true,
            data_fim: true,
            placa: true
        }
    })
    res.status(200).json(manutencao).end()
}

const update = async (req, res) => {
    info = req.body
    info.valor = Number(req.body.valor)
    let manutencao = await prisma.manutencao.update({
        where: {
            id_manutencao: Number(req.params.id)
        },
        data: info
    })

    if (info.data_fim != null) {
        Veiculo.updateDisponivel(req.body.placa)
    }

    res.status(200).json(manutencao).end()
}

const updateManutencaoServico = async () => {

    let manutencao = await prisma.manutencao.update({
        data: { descricao: 'em manutenção' }
    })


    res.status(200).json(manutencao).end()

}

const del = async (req, res) => {
    let manutencao = await prisma.manutencao.delete({
        where: {
            id_manutencao: Number(req.params.id)
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
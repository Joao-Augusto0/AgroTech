const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {

    let info = req.body
    if (req.body.modelo.length > 0 && req.body.marca.length > 0 && req.body.placa.length > 0 && req.body.tipo.length > 0) {
        try {
            let veiculo = await prisma.frota.create({
                data: info
            })
            res.status(201).end()
        } catch (error) {
            res.status(400).send(error).end()
        }
    } else {
        res.status(400).send({ message: 'campo vazio' }).end()
    }
}

const read = async (req, res) => {
    let veiculo = await prisma.frota.findMany({
        select: {
            id_frota: true,
            modelo: true,
            marca: true,
            placa: true,
            ocupado: true,
            tipo: true,
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
    try {
        const frotaIdPlaca = {
            id_frota: Number(req.params.id),
            placa: req.params.placa
        }

        let veiculo = await prisma.frota.update({
            where: {
                id_frota_placa: frotaIdPlaca
            },
            data: req.body
        })
        res.status(200).send({ menssagem: 'veiculo atualizado com sucesso' }).end()
    } catch (error) {
        res.status(400).send({ error })
    }
}

const updateDisponivel = async (placa) => {
    let veiculo = await prisma.frota.update({
        where: {
            placa: placa
        },
        data: { ocupado: false }
    })
}

const updateIndisponivel = async (placa) => {
    let veiculo = await prisma.frota.update({
        where: {
            placa: placa
        },
        data: { ocupado: true }
    })
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
    del,
    updateDisponivel,
    updateIndisponivel
}
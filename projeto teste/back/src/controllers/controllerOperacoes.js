const { PrismaClient } = require('@prisma/client')
const Motorista = require('../controllers/controllerMotorista')
const Veiculo = require('../controllers/controllerVeiculo')

const prisma = new PrismaClient()

const create = async (req, res) => {

    if (req.body.descricao.length > 0 && req.body.cpf.length > 0 && req.body.placa.length > 0) {

        try {
            let motorista = await prisma.motorista.findUnique({
                where: {
                    cpf: req.body.cpf
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
                    placa: req.body.placa
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
            data: req.body,
            select: {
                veiculo: {
                    select: {
                        tipo: true
                    }
                }
            }
        })

        Veiculo.updateIndisponivel(req.body.placa)
        Motorista.updateIndisponivel(req.body.cpf)

        res.status(200).json(servico).end()
    } else {
        res.status(400).send({ menssagem: 'campo vazio' }).end()
    }
}

const read = async (req, res) => {
    let servico = await prisma.servico.findMany({
        select: {
            id_servico: true,
            data_saida: true,
            data_retorno: true,
            descricao: true,
            veiculo: {
                select: {
                    placa: true,
                    tipo: true,
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
    try {

        var info = req.body

        let servico = await prisma.servico.update({
            where: {
                id_servico: Number(req.params.id)
            },
            data: info
        })

        if (servico.data_retorno != null) {
            Veiculo.updateDisponivel(servico.placa)
            Motorista.updateDisponivel(servico.cpf)
        }
        res.status(200).json(servico).end()

    } catch (error) {
        res.status(400).send({ error }).end()
    }
}

const updateServico = async (info, req, res) => {
    const data = new Date();

    try {
        let servico = await prisma.servico.update({
            where: {
                id_servico: info.Servico[0].id_servico
            },
            data: { data_retorno: data, descricao: 'Levado para manutenção' }
        })
    } catch (error) {
        res.status(400).send(error).end()
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
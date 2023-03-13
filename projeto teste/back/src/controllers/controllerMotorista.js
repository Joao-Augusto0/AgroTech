const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {

    let info = req.body 
    info.cnh = Number(req.body.cnh)
    if (info.nome.length > 0 && info.cpf.length > 0 && info.cnh != undefined) {
        try {
            let motorista = await prisma.motorista.create({
                data: info
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
    
    try {
        const motoristaIdCpf = {
            id_motorista: Number(req.params.id),
            cpf: req.params.cpf
        }
        let motorista = await prisma.motorista.update({
    
            where: {
                id_motorista_cpf: motoristaIdCpf
            },
            data: req.body
        })

        res.status(200).send({menssagem:'Motorista Atualizado com sucesso'}).end()
    } catch (error) {
        res.status(400).send({error}).end()
    }
   
}

const updateDisponivel = async (cpf) => {
    let motorista = await prisma.motorista.update({
        where: {
            cpf: cpf
        },
        data: { ocupado: false }
    })
}

const updateIndisponivel = async (cpf) => {
    let motorista = await prisma.motorista.update({
        where: {
            cpf: cpf
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
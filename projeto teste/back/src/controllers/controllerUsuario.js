const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// criação de usuario para teste

const create = async (req, res) => {
    var info = req.body

    //criptografando senha
    info.senha = await bcrypt.hash(req.body.senha, 10)

    let user = await prisma.usuario.create({
        data: info
    })

    res.status(201).json(user).end()
}

// listar usuarios
const read = async (req, res) => {
    let user = await prisma.usuario.findMany({
        select: {
            email: true,
            senha: true
        }
    })
    res.status(201).json(user).end()
}

// login de usuario

const login = async (req, res) => {

    const user = await prisma.usuario.findFirst({

        where: { email: req.body.email }

    }).catch(err => {

        console.log(err)
    })

    if (user) {
        //comparando a senha que o usuario digitou com a senha criptgrafada
        if (await bcrypt.compare(req.body.senha, user.senha)) {
            var result = user

            jwt.sign(result, process.env.KEY, { expiresIn: '10h' }, function (err, token) {

                if (err == null) {
                    // adicionando um token quando o usuário logar
                    result["token"] = token
                    res.status(200).json({ result }).end()
                } else {
                    res.status(404).json(err).end()
                }
            })
        }
    } else {
        res.status(404).json({ "mensagem": "usuario não encontrado" }).end()
    }
}




module.exports = {
    create,
    login,
    read
}
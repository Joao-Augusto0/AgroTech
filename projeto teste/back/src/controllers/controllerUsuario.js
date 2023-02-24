const jwt = require('jsonwebtoken');
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// criação de usuario para teste

const create = async (req, res) => {
    let user = await prisma.usuario.create({
        data: req.body
    })
    res.status(201).end()
}

// login de usuario

const login = async (req, res) => {
    const user = await prisma.usuario.findFirst({
        where: {
            AND: [
                { email: req.body.email },
                { senha: req.body.senha }
            ]
        }

    }).catch(err => {
        console.log(err)
    })

    if (user) {
        var result = user
        jwt.sign(result, process.env.KEY, { expiresIn: '10h' }, function (err, token) {

            console.log(err)
            if (err == null) {
                console.log(result)
                result["token"] = token
                res.status(200).json({ result }).end()
            } else {
                res.status(404).json(err).end()
            }
        })
    }else{
        res.status(404).json({"mensagem":"usuario não encontrado"}).end()
    }
}




module.exports = {
    create,
    login
}
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

    })

    if (user.erro == null) {
        var result = user

        jwt.sign(result, process.env.KEY, { expiresIn: '10h' }, function (err, token) {

            console.log(err)
            if (err == null) {
                console.log(result)
                result["token"] = token
                res.status(200).json({result}).end()
            } else {
                res.status(404).json(err).end()
            }
        })
    }
    // res.status(202).json(user).end()




    // console.log(result)

    // jwt.sign((result[0]), process.env.KEY, { expiresIn: '10h' }, function (err, token) {
    //     if (err == null) {

    //         result[0]["token"] = token
    //         res.status(202).json(result[0]).end()
    //     } else {
    //         res.status(404).json(err).end()
    //     }
    // })
}




module.exports = {
    create,
    login
}
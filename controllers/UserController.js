const User = require('../models/User')
const PasswordToken = require('../models/PasswordToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = 'asdihsaasdasd1as35d4e5g4sd3h1gfj35vc4s3c1a658d'

class UserController {
    async index(req, res) {
        let users = await User.findAll()
        res.json(users)
    }

    async findUser(req, res) {
        let id = req.params.id
        let user = await User.findById(id)

        if(user == undefined) {
            res.status(404)
            res.send("Usuario não encontrado")
        } else {
            res.status(200)
            res.json(user)
        }
    }

    async create(req, res) {
        let {email, name, password} = req.body

        if(email == undefined || email == '' || email == ' ') {
            res.status(400) //requisição invalida
            res.json({err: "O email é inválido!"})
        } else if(name == undefined || name == '' || name == ' ') {
            res.status(400)
            res.json({err: "O usuario é inválido!"})
        } else if(password == undefined || password == '' || password == ' ') {
            res.status(400)
            res.json({err: "A senha é inválida!"})
        } else {
            let emailExists = await User.findEmail(email)
            
            if(emailExists) { // verifica se o email existe no database
                res.status(406)
                res.json({err: "Email já cadastrado!"})
            } else {
                await User.new(email, password, name) // cria um novo usuario

                res.status(200)
                res.send('Tudo OK')
            }           
        }
    }

    async edit(req, res) {
        let {id, name, email, role} = req.body
        let result = await User.update(id, name, email, role)

        if(result != undefined) {
            if(result.status) {
                res.status(200)
                res.send('tudo OK')
            } else {
                res.status(406)
                res.send(result.err)
            }
        } else {
            res.status(406)
            res.send('Ocorreu um erro no servidor!')
        }
    }

    async remove(req, res) {
        let id = req.params.id

        let result = await User.delete(id)

        if(result.status) {
            res.status(200)
            res.send('OK')
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async recoverPassword(req, res) {
        let email = req.body.email
        let result = await PasswordToken.create(email)

        if(result.status) {
            res.status(200)
            res.send('' + result.token)
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req, res) {
        let token = req.body.token
        let password = req.body.password // nova senha que vai ser passada

        let isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status) {
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.send('Senha alterada!')
        } else {
            res.status(406)
            res.send('Token inválido!')
        }
    }

    async login(req, res) {
        let {email, password} = req.body
        let user = await User.findByEmail(email)

        if(user != undefined) {
            let result = await bcrypt.compare(password, user.password)

            if(result) {
                let token = jwt.sign({email: user.email, role: user.role}, secret)
                res.status(200)
                res.json({token: token})
            } else {
                res.status(406)
                res.send('Senha incorreta')
            }
        } else {
            res.json({status: false})
        }
    }
    
}

module.exports = new UserController()
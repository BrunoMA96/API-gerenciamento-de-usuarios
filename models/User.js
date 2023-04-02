const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const PasswordToken = require('./PasswordToken')

class User {
    async findAll() {
        try {
            let userList = await knex.select(['id', 'name', 'email', 'role']).table('users')
            return userList
        } catch(err) {
            console.log(err)
            return []
        }
    }

    async findById(id) {
        try {
            let userById = await knex.select(['id', 'name', 'email', 'role']).where({id: id}).table('users')

            if(userById.length > 0) {
                return userById[0]
            } else {
                return undefined
            }
        } catch(err) {
            console.log(err)
            return undefined
        }
    }

    async findByEmail(email) {
        try {
            let userByEmail = await knex.select(['id', 'name', 'email', 'password', 'role']).where({email: email}).table('users')

            if(userByEmail.length > 0) {
                return userByEmail[0]
            } else {
                return undefined
            }
        } catch(err) {
            console.log(err)
            return undefined
        }
    }

    async new(email, password, name) {
        try {
            let hash = await bcrypt.hash(password, 10) // gera um hash para a senha do usuario
            await knex.insert({email, password: hash, name, role: 0}).table('users')
        } catch(err) {
            console.log(err)
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select('*').from('users').where({email: email}) // vai retornar um array com email ja esxistente ou vazio
            
            if(result.length > 0) { // verifica se o array contem ou não um email
                return true
            } else {
                return false
            }
        } catch(err) {
            console.log(err)
            return false
        }
    }

    async update(id, name, email, role) {
        let user = await this.findById(id)
        if(user != undefined) {
            let editUser = {}
            
            if(email != undefined && email != user.email) {
                let result = await this.findEmail(email)

                if(result == false) {
                    editUser.email = email
                } else {
                    return {status: false, err: 'Email já cadastrado!'}
                }
            }
            if(name != undefined) {
                editUser.name = name
            }
            if(role != undefined) {
                editUser.role = role
            }
            try {
                await knex.update(editUser).where({id: id}).table('users')
                return {status: true}
            } catch(err) {
                return {status: false, err: err}
            }
        } else {
            return {status: false, err: 'O usuario não existe!'}
        }
    }

    async delete(id) {
        let user = await this.findById(id)

        if(user != undefined) {
            try {
                await knex.delete().where({id: id}).table('users')
                return {status: true}
            } catch(err) {
                return {status: false, err: err}
            }
        } else {
            return {status: false, err: 'O usuario não existe!'}
        }
    }

    async changePassword(newPassword, id, token) {
        let hash = await bcrypt.hash(newPassword, 10)
        await knex.update({password: hash}).where({id: id}).table('users')
        await PasswordToken.setUsed(token)
    }
}

module.exports = new User()
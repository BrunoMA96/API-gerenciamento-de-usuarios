const knex = require('../database/connection')
const User = require('./User')

class PasswordToken {
    async create(email) {
        let user = await User.findByEmail(email)
        if(user != undefined) {
            try {
                let token = Date.now()
                await knex.insert({                  
                    user_id: user.id,
                    used: 0,
                    token: token // preferiveu usar UUID
                }).table('token')
                return {status: true, token: token}
            } catch(err) {
                console.log(err)
                return {status: false, err: err}
            }
        } else {
            return {status: false, err: 'Email não cadastrado!'}
        }
    }

    async validate(token) {
        try {
            let result = await knex.select().where({token: token}).table('token')
        
            if(result.length > 0) {
                let tk = result[0]

                if(tk.used) {
                    return {status: false}
                } else {
                    return {status: true, token: tk}
                }
            }else {
                return false
            }
        } catch(err) {
            console.log(err)
            return false
        }
    }

    async setUsed(token) {
        await knex.update({used: 1}).where({token: token}).table('token')
    }
}

module.exports = new PasswordToken()
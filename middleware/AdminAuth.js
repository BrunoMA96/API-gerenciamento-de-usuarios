const jwt = require('jsonwebtoken')

const secret = 'asdihsaasdasd1as35d4e5g4sd3h1gfj35vc4s3c1a658d'

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        let token = bearer[1]
        try {
            let decoded = jwt.verify(token, secret)

            if(decoded.role == 1) {
                next()
            } else {
                res.status(403)
            res.send('Você não é um administrador..')
            return
            }
        } catch {
            res.status(403)
            res.send('Você não está autenticado(a).')
            return
        }
    } else {
        res.status(403)
        res.send('Você não está autenticado(a).')
        return
    }
}
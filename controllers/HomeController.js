class HomeController{
    async index(req, res){
        res.send("API Gerenciamento de usuarios!");
    }

}

module.exports = new HomeController()
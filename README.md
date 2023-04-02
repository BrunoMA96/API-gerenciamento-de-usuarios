# API para gerenciamento de usuarios.

#### Projeto de uma API para genrenciamento de usuarios usando banco de dados MySQL.

### Funções dessa API:

#### É possivel criar, editar e deletar usuarios, logar, alterar senha e recuperar senha.

### Para se conectar com o banco de dados é necessario editar o arquivo connection.js na pasta database.
~~~javascript
const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1', //tipo de host: localhost.
      user : 'root', // nome do usuario.
      password : '147258369', // senha do usuario.
      database : 'user_list' // nome do banco de dados.
    }
  });

module.exports = knex
~~~

### Para alterar a porta de conecção é necessário editar o arquivo index.js na raiz do projeto.
~~~javascript
app.listen(8080,() => { // substitua o numero 8080 pelo numero da porta que deseja usar.
    console.log("Servidor rodando...")
});
~~~

### Para tornar uma rota restrita apenas para usuarios logados é necessário editar o arquivo routes.js na pasta routes.
~~~javascript
router.get('/', HomeController.index);
router.post('/user', UserController.create)
router.get('/user', AdminAuth, UserController.index) // é necessario inserir AdminAuth entre a rota e o controller como no exemplo dessa linha.
router.get('/user/:id', UserController.findUser)
router.put('/user', UserController.edit)
router.delete('/user/:id', UserController.remove)
router.post('/recoverpassword', UserController.recoverPassword)
router.post('/changepassword', UserController.changePassword)
router.post('/login', UserController.login)
~~~

### Executando a API.

#### É necessario ter o Node.js instalado na sua maquina, caso não tenha faça o download da versão LTS no link:

[Download Node.js](https://nodejs.org/en)

#### Abra o terminal na pasta do projeto e execute os comandos:

´´´
npm install
´´´

´´´
node index.js
´´´
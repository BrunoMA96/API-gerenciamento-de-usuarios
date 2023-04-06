# API para gerenciamento de usuários.

#### Projeto de API para genrenciamento de usuários usando Node.js, express, MySQL e Knex.js.

### OBS: Os passos a seguir são para OS Windows.

### Funções de API:

* Criar usuário;
* Editar usuário;
* deletar usuário;
* Login/Autenticação;
* Alterar senha;
* Recuperar senha.

### Faça o download e instale o Node.js e MySQL Server, caso não tenha eles instalados na sua máquina.
[Download Node.js - Versão LTS(recomendado)](https://nodejs.org/en)

[Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Configuração do MySQL.

### Após instalar o MySQL Server, abra o CMD e execute o comando:
```
mysql_secure_installation
```
#### Siga as instruções do assistente de segurança para concluir as configurações.

## Crie o banco de dados e importe o arquivo de tabelas.

### Faça o download do arquivo de tabelas para o banco de dados.
[Tabelas MySQL](https://drive.google.com/file/d/1v_p1zCJLCzwnrWYY5liocei6LqxjAwNw/view?usp=share_link)
#### O arquivo pode ficar na pasta de sua escolha mas recomendo colocar no desktop para facilitar a busca pelo CMD.

### Abra o CMD e execute os comandos:
```
cd desktop
```
```
mysql -u seu_usuario -p
```
#### Digite a senha de usuario que foi criada durante a configuração do MySQL.
```
CREATE DATABASE nome_do_banco_de_dados;
```
```
USE nome_do_banco_de_dados;
```
```
exit
```
```
mysql -u seu_usuario -p nome_do_banco_de_dados < backup_file.sql
```

## Para se conectar com o banco de dados é necessário editar o arquivo **connection.js** na pasta **database**.
~~~javascript
const knex = require('knex')({
    client: 'mysql2', // tipo de banco de dados.
    connection: {
      host : '127.0.0.1', // tipo de host: localhost.
      user : 'root', // nome do usuário.
      password : 'password', // senha do usuário.
      database : 'user_list' // nome do banco de dados.
    }
  });

module.exports = knex
~~~

## Para alterar a porta de conecção é necessário editar o arquivo **index.js** na raiz do projeto.
~~~javascript
app.listen(8080,() => { // substitua o número 8080 pelo numero da porta que deseja usar.
    console.log("Servidor rodando...")
});
~~~

## Para tornar uma rota restrita apenas para usuários que sejam Admin é necessário editar o arquivo **routes.js** na pasta **routes**.
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

## Para tornar um usuario Admin abra o CMD e execute o comando:
```
mysql -u seu_usuario -p
```
```
USE nome_do_banco_de_dados;
```
### Para dar o cargo de admin mude o valor de role de 0 para 1.
### Para remover o cargo de admin mude o valor de role de 1 para 0.
### Em id coloque o numero do id que representa o usuario que vai ter o cargo alterado.
```
UPDATE users SET role = 0 WHERE id = 1;
```

## Executando a API.

### Abra o CMD na pasta do projeto e execute os comandos:
```
npm install
```
```
node index.js
```

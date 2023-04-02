const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1', //localhost
      user : 'root',
      password : '147258369',
      database : 'user_list'
    }
  });

module.exports = knex
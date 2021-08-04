const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    // Configuração do BD
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    // Conecta ao BD
    mongoose.connect(DB_HOST);
    // Log se ocorrer algum erro de conexão
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'MongoDB erro de conexão.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
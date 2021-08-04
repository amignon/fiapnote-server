const mongoose = require('mongoose');

// Define o schema da base de dados Nota
const notaSchema = new mongoose.Schema(
  {
    conteudo: {
      type: String,
      required: true
    },
    // referencia o ID do autor
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    contadorFavorito: {
      type: Number,
      default: 0
    },
    favoritadoPor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      }
    ]
  },
  {
    // Atribui os campos createdAt and updatedAt com o tipo Date
    timestamps: true
  }
);

// Define o modelo Nota
const Nota = mongoose.model('Nota', notaSchema);
// Export the module
module.exports = Nota;
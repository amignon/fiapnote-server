const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
  {
    nomeUsuario: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    senha: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;
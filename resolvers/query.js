module.exports = {
  notas: async (parent, args, { modelos }) => {
    return await modelos.Nota.find()
  },
  nota: async (parent, args, { modelos }) => {
    return await modelos.Nota.findById(args.id);
  },
  usuario: async (parent, args, { modelos }) => {
    return await modelos.Usuario.findOne({ nomeUsuario: args.nomeUsuario });
  },
  usuarios: async (parent, args, { modelos }) => {
    return await modelos.Usuario.find({});
  },
  eu: async (parent, args, { modelos, usuario }) => {
    return await modelos.Usuario.findById(usuario.id);
  }
};
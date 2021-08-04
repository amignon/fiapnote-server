module.exports = {
  // Resolve a lista de notas para um usuario
  notas: async (usuario, args, { modelos }) => {
    return await modelos.Nota.find({ autor: usuario._id }).sort({ _id: -1 });
  },
  // Resolve a lista de favoritos para um usuario
  favoritos: async (usuario, args, { modelos }) => {
    return await modelos.Nota.find({ favoritadoPor: usuario._id }).sort({ _id: -1 });
  }
};
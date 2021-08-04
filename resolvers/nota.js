module.exports = {
  // Resolve a informação do autor para uma nota
  autor: async (nota, args, { modelos }) => {
    return await modelos.Usuario.findById(nota.autor);
  },
  // Resolve a informação de favoritadoPor para uma nota
  favoritadoPor: async (nota, args, { modelos }) => {
    return await modelos.Usuario.find({ _id: { in: nota.favoritadoPor } });
  }
};
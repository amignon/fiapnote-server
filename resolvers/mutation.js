const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

module.exports = {
  novaNota: async (parent, args, { modelos, usuario }) => {
    if (!usuario) {
      throw new AuthenticationError('Você precisa estar logado para criar uma nota.');
    }
    return await modelos.Nota.create({
      conteudo: args.conteudo,
      autor: mongoose.Types.ObjectId(usuario.id),
      favoritadoPor: 0
    });
  },
  excluiNota: async (parent, { id }, { modelos, usuario }) => {
    if (!usuario) {
      throw new AuthenticationError('Você precisa estar logado para excluir uma nota.');
    }

    // busca a nota
    const nota = await modelos.Nota.findById(id);
    if (nota && String(nota.autor) !== usuario.id) {
      throw new ForbiddenError("Você não tem permissão para excluir a nota");
    }

    try {
      await nota.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  atualizaNota: async (parent, { conteudo, id }, { modelos, usuario }) => {
    if (!usuario) {
      throw new AuthenticationError('Você precisa estar logado para excluir uma nota.');
    }

    // busca a nota
    const nota = await modelos.Nota.findById(id);
    // if the note owner and current user don't match, throw a forbidden error
    if (nota && String(nota.autor) !== usuario.id) {
      throw new ForbiddenError("Você não tem permissão para atualizar a nota");
    }
    try {
      return await modelos.Nota.findOneAndUpdate(
        {
          _id: id
        },
        {
          set: {
            conteudo
          }
        },
        {
          new: true
        }
      );
    } catch (err) {
      throw new Error('Erro ao atualizar a nota.');
    }
  },
  inscrever: async (parent, { nomeUsuario, email, senha }, { modelos }) => {
    email = email.trim().toLowerCase();
    // encripta a senha
    const hashed = await bcrypt.hash(senha, 10);
    try {
      const usuario = await modelos.Usuario.create({
        nomeUsuario,
        email,
        senha: hashed
      });

      // cria e retorna o json web token
      return jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Erro ao criar a conta');
    }
  },
  entrar: async (parent, { nomeUsuario, email, senha }, { modelos }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const usuario = await models.User.findOne({
      or: [{ email }, { username }]
    });

    // if no user is found, throw an authentication error
    if (!usuario) {
      throw new AuthenticationError('Error ao entrar.');
    }

    // se as senhas não combinam
    const valid = await bcrypt.compare(senha, usuario.senha);
    if (!valid) {
      throw new AuthenticationError('Senha Inválida');
    }

    // cria e retorna json web token
    return jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
  },
  alternarFavorito: async (parent, { id }, { modelos, usuario }) => {
    if (!usuario) {
      throw new AuthenticationError();
    }

    // verifica se o usuario ja favoritou a nota
    let notaCheck = await modelos.Note.findById(id);
    const temUsuario = notaCheck.favoritedBy.indexOf(user.id);

    // se o usuario já favoritou, retira da lista e 
    // decrementa o contadorFavorito em 1
    if (temUsuario >= 0) {
      return await modelos.Nota.findByIdAndUpdate(
        id,
        {
          pull: {
            favoritadoPor: mongoose.Types.ObjectId(user.id)
          },
          inc: {
            contadorFavorito: -1
          }
        },
        {
          new: true
        }
      );
    } else {
      // Adiciona o usuario na lista e incrementa o contadorFavorito em 1
      return await modelos.Nota.findByIdAndUpdate(
        id,
        {
          push: {
            favoritadoPor: mongoose.Types.ObjectId(user.id)
          },
          inc: {
            contadorFavorito: 1
          }
        },
        {
          new: true
        }
      );
    }
  }
};
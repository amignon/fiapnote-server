const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  type Nota {
    id: ID!
    conteudo: String!
    autor: Usuario!
    contadorFavorito: Int!
    favoritadoPor: [Usuario!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Usuario {
    id: ID!
    nomeUsuario: String!
    email: String!
    notas: [Nota!]!
    favoritos: [Nota!]!
  }
  
  type Query {
    notas: [Nota!]!
    nota(id: ID): Nota!
    usuario(nomeUsuario: String!): Usuario
    usuarios: [Usuario!]!
    eu: Usuario!
  }
  type Mutation {
    novaNota(conteudo: String!): Nota
    atualizaNota(id: ID!, conteudo: String!): Nota!
    excluiNota(id: ID!): Boolean!
    alternarFavorito(id: ID!): Nota!
    inscrever(nomeUsuario: String!, email: String!, senha: String!): String!
    entrar(nomeUsuario: String, email: String, senha: String!): String!
  }
`;
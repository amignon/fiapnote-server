const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const modelos = require('./modelos')
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Roda o servidor em uma porta especificada em .env ou na porta 4000
const port = process.env.PORT || 4000;
// Armazena o valor de DB_HOST como uma variável
const DB_HOST = process.env.DB_HOST;
// Conecta ao BD
db.connect(DB_HOST);

// Obter aw informação do usuário do JWT
const obterUsuario = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Sessão Inválida');
    }
  }
};

// Chama a função para iniciar o servidor
iniciaServidorApollo(typeDefs, resolvers);

// Função para iniciar o servidor Apollo
async function iniciaServidorApollo(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // obtém o token do headers
      const token = req.headers.authorization;
      const usuario = obterUsuario(token);
      return { modelos, usuario };
    }
  });

  // Lógica para integração com o Express
  const app = express();
  app.use(cors());
  await server.start();
  server.applyMiddleware({
    app,
    path: '/'
  });
  await new Promise(resolve => app.listen({ port }, resolve));
  console.log(`🚀 Server pronto em  http://localhost:${port}${server.graphqlPath}`);
}
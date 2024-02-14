/* istanbul ignore file */
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { json } from 'body-parser';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function setup() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: `#graphql
      scalar Upload
      
      input CreateMeInput {
        field: String
        file: Upload
      }

      type Me {
        field: String
      }
      type Query {
        version: String
      }
      type Mutation {
        createMe(input: CreateMeInput!): Me!
      }
    `,
    resolvers: {
      Query: { version: () => '1' },
      Mutation: {
        createMe: (_, { input }) => {
          // console.error('Throwing error ...', input);
          console.log(input);
          return { field: 'hello' };
          // throw new GraphQLError('Validation error');
        },
      },
    },
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  const frontendAppUrl = 'http://localhost:4200';
  app.use(
    '/graphql',
    cors({ origin: frontendAppUrl }),
    (req, ...params) => {
      if (!req.is('multipart/form-data')) {
        json()(req, ...params);
      } else {
        graphqlUploadExpress({ overrideSendResponse: false })(req, ...params);
      }
    },
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3001 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:3001/graphql`);
}

setup();

import './tracer';
import 'reflect-metadata';
import 'dotenv/config';
import { buildFederatedSchema } from '@outside-interactive/gql-utils.build-federated-schema';
import { checkHeaders } from '@outside-interactive/gql-utils.plugins.check-headers';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { readFileSync } from 'fs';
import { user, cache } from './config';
import { GaiaAPI } from './datasources/gaia';
import customAuthZ from './authZ/index';
import { User } from '@outside-interactive/gql-utils.authz.knowledge-base/dist/models/user';
//import { Env } from './config/constants';
import { HikeReferenceResolver as Hike } from './Hike/referenceResolvers';

export type DataSources = { gaiaApi: GaiaAPI };

let apiVersion = 'unknown';
try {
  apiVersion = readFileSync('./version.txt').toString().split('\n')[0];
} catch (exc) {
  console.log('Unable to read version.txt.');
}
console.log('VERSION: ', apiVersion);

async function bootstrap(): Promise<void> {
  let apiVersion = 'unknown';
  try {
    apiVersion = readFileSync('./version.txt').toString().split('\n')[0];
  } catch (e) {
    console.log('Unable to read version.txt.');
  }
  console.log('VERSION: ', apiVersion);

  const server = new ApolloServer({
    cache,
    context: ({ res, req }): { user: User | undefined } => {
      res.header('X-ApiVersion', apiVersion);
      // * If there is a user in the headers, use it, otherwise, use a basic user with 'guest' as a role
      const userData = req.headers.user
        ? JSON.parse(req.headers.user as string)
        : user;
      return { user: userData };
    },
    dataSources: (): DataSources => ({
      gaiaApi: new GaiaAPI()
    }),
    plugins: [
      checkHeaders,
      responseCachePlugin(),
      ApolloServerPluginCacheControl({ defaultMaxAge: 900 })
    ],
    schema: await buildFederatedSchema(
      {
        resolvers: [__dirname + '/**/resolvers.{ts,js}'],
        emitSchemaFile: true,
        authChecker: customAuthZ
      },
      { Hike }
    )
  });

  const PORT = process.env.PORT || 8000;

  const { url } = await server.listen(PORT);
  console.log(`Server is listening on port ${url}.`);
}

bootstrap().catch(console.error);

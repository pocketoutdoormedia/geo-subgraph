import './tracer';
import 'reflect-metadata';
import { buildFederatedSchema } from '@outside-interactive/gql-utils.build-federated-schema';
import { checkHeaders } from '@outside-interactive/gql-utils.plugins.check-headers';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { readFileSync } from 'fs';
import { app, cache, Context } from './config';
import customAuthZ from './core/authZ';

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
    context: ({ res, req }): Context => {
      res.header('X-ApiVersion', apiVersion);
      // * If there is a use in the headers, use it, otherwise, use a basic user with 'guest' as a role
      const userData = req.headers.user
        ? JSON.parse(req.headers.user as string)
        : { sub: 'user 1' };

      return { app, user: userData };
    },
    plugins: [
      checkHeaders,
      responseCachePlugin(),
      ApolloServerPluginCacheControl({ defaultMaxAge: 900 })
    ],
    schema: await buildFederatedSchema({
      resolvers: [__dirname + '/**/resolvers.{ts,js}'],
      emitSchemaFile: true,
      authChecker: customAuthZ
    })
  });

  const PORT = process.env.PORT || 8000;

  const { url } = await server.listen(PORT);
  console.log(`Server is listening on port ${url}.`);
}

bootstrap().catch(console.error);

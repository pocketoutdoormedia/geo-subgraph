import { BaseRedisCache } from 'apollo-server-cache-redis';
import GraphQLServerOptions from 'apollo-server-core/dist/graphqlOptions';
import Redis from 'ioredis';
import { ExampleApp } from '../core/app';
import { Env } from './constants';

export const app = {
  exampleApp: new ExampleApp()
};

export const context = {
  app
};

export const cache: GraphQLServerOptions['cache'] =
  process.env.NODE_ENV !== Env.Development
    ? new BaseRedisCache({
        client: new Redis({
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT
        })
      })
    : undefined;

export { Context } from './types';

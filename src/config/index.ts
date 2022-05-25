import { BaseRedisCache } from 'apollo-server-cache-redis';
import GraphQLServerOptions from 'apollo-server-core/dist/graphqlOptions';
import Redis from 'ioredis';
import { Env } from './constants';

export const user = {
  aud: '',
  exp: '',
  iat: '',
  sub: '',
  jti: '',
  authenticationType: '',
  email: '',
  email_verified: false,
  preferred_username: '',
  applicationId: '',
  scope: '',
  // ! THIS IS A STUB FOR NOW UNTIL AUTH IS ACTUALLY IN PLACE
  roles: []
};
export const context = {
  user
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

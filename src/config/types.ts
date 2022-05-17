import { ExampleApp } from '../core/app';

export type Context = {
  app: {
    exampleApp: ExampleApp;
  };
  user?: {
    aud: string;
    exp: string;
    iat: string;
    sub: string;
    jti: string;
    authenticationType: string;
    email: string;
    email_verified: boolean;
    preferred_username: string;
    applicationId: string;
    scope: string;
    roles: string[];
  };
};

declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_HOST: string;
    REDIS_PORT: number;
    NODE_ENV: import('./constants').Env;
  }
}

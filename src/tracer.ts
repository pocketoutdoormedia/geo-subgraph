import tracer from 'dd-trace';
import { Env } from './config/constants';

const IS_DEVELOPMENT = process.env.NODE_ENV !== Env.Production;

// Turn on DataDog APM when in production environment.

if (!IS_DEVELOPMENT) {
  tracer.init(); // initialized in a different file to avoid hoisting.
}

export default tracer;

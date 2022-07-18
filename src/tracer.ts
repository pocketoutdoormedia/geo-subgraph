import tracer from 'dd-trace';
import { Env } from './config/constants';

// Turn on DataDog APM when DD_ENV is stage or prod.
let DD_ENV = process.env.DD_ENV;
if (DD_ENV === 'stage' || DD_ENV === 'prod') {
  tracer.init();
}

export default tracer;

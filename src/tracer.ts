import tracer from 'dd-trace';
import { Env } from './config/constants';

// Turn on DataDog APM when DD_ENV is stage or prod.
const DATADOG_ENVS = ['stage', 'prod'];
if (DATADOG_ENVS.indexOf(process.env.DD_ENV) >= 0) {
  tracer.init();
}

export default tracer;

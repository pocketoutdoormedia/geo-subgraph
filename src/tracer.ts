import tracer from 'dd-trace';

// Turn on DataDog APM when DD_ENV is stage or prod.
const ENV = process.env.Environment;

if (ENV === 'stage' || ENV === 'prod') {
  tracer.init();
}

export default tracer;

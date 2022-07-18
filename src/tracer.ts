import tracer from 'dd-trace';

// Turn on DataDog APM when DD_ENV is stage or prod.
const ENV = process.env.Environment;

if (ENV === 'stage' || ENV === 'prod') {
  tracer.init();
  console.log('Datadog tracer configured for DD_ENV: ' + process.env.DD_ENV);
}
else
{
  console.log('Datadog tracer is not configured for Environment ' + process.env.Environment);
}

export default tracer;

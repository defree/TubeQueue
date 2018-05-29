import * as Hapi from 'hapi';
import * as Bell from 'bell';

import config from './config';

import loginRoute from './routes/loginRoute';

const isProd = process.env.NODE_ENV ? true : false;

// Create a server with a host and port
const server = new Hapi.Server({
  host: config.host,
  port: config.port
});

// Start the server
const start = async () => {
  await server.register(Bell);

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: config.googleAuth.bellPassword,
    clientId: config.googleAuth.googleClientID,
    clientSecret: config.googleAuth.googleSecret,
    isSecure: isProd
  });

  try {
    loginRoute(server);
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();

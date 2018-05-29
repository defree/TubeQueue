import config from './config';
import * as Hapi from 'hapi';

import loginRoute from './routes/loginRoute';

// Create a server with a host and port
const server = new Hapi.Server({
  host: config.host,
  port: config.port
});

// Start the server
const start = async () => {
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

import * as hapi from 'hapi';
import * as bell from 'bell';
import * as mysql from 'mysql';

import config from './config';

import loginRoute from './routes/loginRoute';

const isProd = process.env.NODE_ENV ? true : false;

const dbConn = mysql.createConnection({
  host: config.host,
  user: config.db.user,
  password: config.db.pass,
  database: config.mysqlDB
})

// Create a server with a host and port
const server = new hapi.Server({
  host: config.host,
  port: config.port
});

// Start the server
const start = async () => {
  await server.register(bell);

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: config.googleAuth.bellPassword,
    clientId: config.googleAuth.googleClientID,
    clientSecret: config.googleAuth.googleSecret,
    isSecure: isProd
  });

  try {
    loginRoute(server, dbConn);
    await server.start();
    dbConn.end();
  }
  catch (err) {
    dbConn.end();
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();

import * as hapi from 'hapi';
import * as yar from 'yar';
import * as bell from 'bell';
import * as mysql from 'promise-mysql';

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

const sessionOptions = {
  cookieOptions: {
    password: config.cookiePassword,
    isSecure: isProd
  }
};

// Google authentication settings
const googleAuth = {
  provider: 'google',
  password: config.googleAuth.bellPassword,
  clientId: config.googleAuth.googleClientID,
  clientSecret: config.googleAuth.googleSecret,
  isSecure: isProd
}

// Start the server
const start = async () => {
  try {
    await server.register([
      { plugin: yar, options: sessionOptions },
      bell
    ]);
    server.auth.strategy('google', 'bell', googleAuth);
    dbConn.then(async (conn) => {
      loginRoute(server, conn);
      await server.start();
      // conn.end();
    });
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();

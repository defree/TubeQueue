import * as hapi from 'hapi';
import * as mysql from 'promise-mysql';

import { checkSession, newSession } from '../auth/session';

interface IGoogleCred {
  profile: {
    id: number;
    displayName: string;
    email: string;
  }
}

const loginRoute = (server: hapi.Server, dbConn: mysql.Connection) => {
  server.route({
    method: 'GET',
    path: '/login',
    options: {
      auth: 'google',
      handler: async (req, h) => {
        if (!req.auth.isAuthenticated) {
          return `Authentication failed due to: ${req.auth.error.message}`;
        }
        const credentials = req.auth.credentials as IGoogleCred;
        //console.log(credentials.profile.id);

        if (await checkSession(credentials.profile.id, req, dbConn)) {
          console.log('session exists');
          return h.redirect('http://localhost:15556/');
        }
        console.log('creating session');
        await newSession(credentials.profile.id, req, dbConn);
        return h.redirect('http://localhost:15556/');
      }
    }
  });
};

export default loginRoute;

import * as hapi from 'hapi';
import * as mysql from 'mysql';

import { checkSession } from '../auth/session';

interface IGoogleCred {
  profile: {
    id: string;
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
      handler: (req, h) => {
          if (!req.auth.isAuthenticated) {
              return `Authentication failed due to: ${req.auth.error.message}`;
          }
          const credentials = req.auth.credentials as IGoogleCred;
          console.log(credentials.profile.id);



          return h.redirect('http://localhost:15556/');
      }
    }
  });
};

export default loginRoute;

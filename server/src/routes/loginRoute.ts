import * as Hapi from 'hapi';

interface IGoogleCred {
  profile: {
    id: string;
    displayName: string;
    email: string;
  }
}

const loginRoute = (server: Hapi.Server) => {
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

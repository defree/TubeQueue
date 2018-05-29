import * as Hapi from 'hapi';
// Add the route
const loginRoute = (server: Hapi.Server) => {
  server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hellfffffo world';
    }
  });
};

export default loginRoute;

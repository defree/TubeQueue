/**
 * Default configs for the server.
 * Anything needed for production is added/overwritten later.
 */
const config = {
  host: 'localhost',
  port: 15556,
  filePaths: {
    dev: 'C:/ProgramData/TubeQueue/serverConfig.json',
    prod: ''
  }
};

export default config;

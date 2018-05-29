/**
 * Config loader
 * Loads the development configs and replaces when needed from 'outofproject' configs
 * Loads secrets and passwords from there as well, so they are not included in the repo
 */
import config from './development';
import { readFileSync } from 'fs';

const isProd = process.env.NODE_ENV ? true : false;

const fullConfig = Object.assign(
  config,
  JSON.parse(readFileSync(isProd ? config.filePaths.prod : config.filePaths.dev, 'utf-8'))
);

export default fullConfig;

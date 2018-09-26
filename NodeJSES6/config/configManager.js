'use strict';

let  configPath;

if (process.env.name) {
  configPath = `./config-${process.env.name}.json`;
} else {
  let  configPath = './config.json';
}
const config = require(configPath)

export default config;

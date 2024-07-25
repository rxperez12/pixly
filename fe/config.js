import prod from './configs/prod.config.json'
import dev from './configs/dev.config.json'

let config = {};

console.log('hostname', window.location.hostname)

switch (window.location.hostname) {
  case "pixly-rperez.netlify.app":
    config = prod;
    break;
  case "localhost":
    config = dev;
    break;
  default:
    config = dev;
}

export default config;
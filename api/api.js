import Express from 'express';

import config from '../src/config';

require('pretty-error').start();

const app = new Express();

if(config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if(err) {
      console.error(err);
    }
    console.info('API running on port %s', config.apiPort);
  });
}

import React from 'react';
import ReactDOM from 'react-dom/server';
// import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import Express from 'express';
import httpProxy from 'http-proxy';
import compression from 'compression';
import path from 'path';
import http from 'http';
import { createMemoryHistory } from 'history';

import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { App } from 'containers';
import routes from 'routes';
import createStore from './redux/create';
import Html from './helpers/Html';
import config from './config';

require('pretty-error').start();

const apiUrl = `http://${config.apiHost}:${config.apiPort}`;
const app = new Express();
const server = new http.Server(app);
const apiProxy = httpProxy.createProxyServer({
  target: apiUrl,
  ws: true
});

app.use(compression());

app.use('/assets', Express.static(path.join(__dirname, '../dist/assets'), {
  dotfiles: 'ignore',
  etag: true,
  index: false,
  maxAge: 86400000
}));

app.use('/api', (req, res) => {
  apiProxy.web(req, res, { target: apiUrl });
});

app.use('/ws', (req, res) => {
  apiProxy.web(req, res, { target: `${apiUrl}/ws` });
});

server.on('upgrade', (req, socket, head) => {
  apiProxy.ws(req, socket, head);
});

apiProxy.on('error', (error, req, res) => {
  if(error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if(!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }
  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use(async (req, res) => {
  if(__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }
  const hydrateOnClient = () => {
    const html = ReactDOM.renderToStaticMarkup(<Html assets={webpackIsomorphicTools.assets()} />);
    res.send(`<!doctype html>\n${html}`);
  };

  if(__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  const memoryHistory = createMemoryHistory();
  const store = createStore(memoryHistory);
  const context = {};

  const rootContainer = (
    <Provider store={store} key="provider">
      <StaticRouter location={req.url} history={memoryHistory} context={context}>
        <App>
          { routes }
        </App>
      </StaticRouter>
    </Provider>
  );
  // Currently this doesn't work for some reason
  if(context.url) {
    res.redirect(302, context.url);
  }
  else {
    const html = ReactDOM.renderToStaticMarkup(<Html assets={webpackIsomorphicTools.assets()} component={rootContainer} store={store} />);
    res.send(`<!doctype html>\n${html}`);
  }
});

if(config.port) {
  server.listen(config.port, (err) => {
    if(err) {
      console.error(err);
    }
    console.info('%s is running using API server at %s', config.app.title, config.apiPort);
    console.info('Open http://%s:%s in a browser to view the app', config.host, config.port);
  });
}
else {
  console.error('ERROR: no PORT environment variable was specified in the config file');
}

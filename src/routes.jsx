import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Home, NotFound } from 'components/pages/index';

export default (
  <Switch>
    <Redirect exact from="/redirect" to="/" />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);


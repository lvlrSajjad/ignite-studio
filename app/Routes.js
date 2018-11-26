import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import OpenedProject from './containers/OpenedProjectPage';
import NewProject from './containers/NewProjectPage';
import NewProjectOptions from './containers/NewProjectOptions';

export default () => (
  <App>
    <Switch>
      <Route path={routes.OPTIONS} component={NewProjectOptions} />
      <Route path={routes.NEW} component={NewProject} />
      <Route path={routes.OPENED} component={OpenedProject} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);

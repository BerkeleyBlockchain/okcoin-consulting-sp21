import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardView from './views/DashboardView';

function App() {
  return (
    <Switch>
      <Route path="/" component={DashboardView} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}

export default App;

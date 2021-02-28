import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import LandingPageView from './views/LandingPageView';

function App() {
  return (
    <Switch>
      <Route path="/app" component={DashboardView} />
      <Route exact path="/" component={LandingPageView} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}

export default App;

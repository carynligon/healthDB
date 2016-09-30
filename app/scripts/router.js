import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import App from './Components/Pages/App';
import Water from './Components/Pages/Water';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/water" component={Water}/>
  </Router>
);

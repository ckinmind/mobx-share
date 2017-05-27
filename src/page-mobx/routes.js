import React from 'react';
import { Route, Router, hashHistory, IndexRoute} from 'react-router';


import Aside from './components/aside/aside-v3-pptshare';

import P0  from './components/pptshare/p0';
import P1  from './components/pptshare/p1';
import P2  from './components/pptshare/p2';
import P3  from './components/pptshare/p3';
import P4  from './components/pptshare/p4';
import P5  from './components/pptshare/p5';
import P6  from './components/pptshare/p6';
import P7  from './components/pptshare/p7';
import P8  from './components/pptshare/p8';
import P9  from './components/pptshare/p9';




import Q1  from './components/pptshare/Q/q1';
import Q2  from './components/pptshare/Q/q2';
import Q3  from './components/pptshare/Q/q3';
import Q4  from './components/pptshare/Q/q4';


import D1  from './components/pptshare/D/d1';
import D2  from './components/pptshare/D/d2';




const App = ({ children }) => (
  <div className="app-wrap">
      <Aside />
      <div className="app-content">
          {children}
      </div>
  </div>
);


export default () => (
  <Router history={hashHistory}>
      <Route path="/" component={App}>
          <Route path="ppt/p0" component={P0}/>
          <Route path="ppt/p1" component={P1} />
          <Route path="ppt/p2" component={P2} />
          <Route path="ppt/p3" component={P3} />
          <Route path="ppt/p4" component={P4} />
          <Route path="ppt/p5" component={P5} />
          <Route path="ppt/p6" component={P6} />
          <Route path="ppt/p7" component={P7} />
          <Route path="ppt/p8" component={P8} />
          <Route path="ppt/p9" component={P9} />

          <Route path="ppt/q1" component={Q1} />
          <Route path="ppt/q2" component={Q2} />
          <Route path="ppt/q3" component={Q3} />
          <Route path="ppt/q4" component={Q4} />

          <Route path="ppt/d1" component={D1} />
          <Route path="ppt/d2" component={D2} />
      </Route>
  </Router>
);
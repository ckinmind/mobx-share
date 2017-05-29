import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'


import Aside from './aside';

import P0  from './p0';
// import P1  from './p1';
import P2  from './p2';
import P3  from './p3';
import P4  from './p4';
import P5  from './p5';
import P6  from './p6';
import P7  from './p7';
import P8  from './p8';
import P9  from './p9';

import Q1  from './Q/q1';
import Q2  from './Q/q2';
import Q3  from './Q/q3';
import Q4  from './Q/q4';


// import D1  from './D/d1';
// import D2  from './D/d2';


export default  () => (
  <Router>
    <div className="app-wrap">
      <Aside />
      <div className="app-content">
        <Switch>
          <Route exact path="/ppt/p0" component={P0}/>
          {/*<Route path="ppt/p1" component={P1} />*/}
          <Route exact path="/ppt/p2" component={P2} />
          <Route exact path="/ppt/p3" component={P3} />
          <Route exact path="/ppt/p4" component={P4} />
          <Route exact path="/ppt/p5" component={P5} />
          <Route exact path="/ppt/p6" component={P6} />
          <Route exact path="/ppt/p7" component={P7} />
          <Route exact path="/ppt/p8" component={P8} />
          <Route exact path="/ppt/p9" component={P9} />

          <Route exact path="/ppt/q1" component={Q1} />
          <Route exact path="/ppt/q2" component={Q2} />
          <Route exact path="/ppt/q3" component={Q3} />
          <Route exact path="/ppt/q4" component={Q4} />

          {/*<Route path="ppt/d1" component={D1} />*/}
          {/*<Route path="ppt/d2" component={D2} />*/}
        </Switch>
      </div>
    </div>
  </Router>
);


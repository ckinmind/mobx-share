import React from 'react';
import { NavLink } from 'react-router-dom';

class Aside extends React.Component {

  render() {
    return (
      <aside className="app-sidebar">
        <nav>
          <NavLink to="/c0"  activeClassName="active">Cluster集群图</NavLink>
          <NavLink to="/c1"  activeClassName="active">C1</NavLink>
          <NavLink to="/c2"  activeClassName="active">C2</NavLink>
        </nav>
      </aside>
    )
  }
}

export default Aside;

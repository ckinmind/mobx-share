import React from 'react';
import { NavLink } from 'react-router-dom';

class Aside extends React.Component {

  render() {
    return (
      <aside className="app-sidebar">

        <nav>
          <NavLink to="/p0"  activeClassName="active">开始</NavLink>
          <NavLink to="/p1"  activeClassName="active">Mobx知识结构</NavLink>
        </nav>

        <nav>
          <NavLink to="/p2"  activeClassName="active">autorun / when</NavLink>
          <NavLink to="/p3"  activeClassName="active">@computed</NavLink>
          <NavLink to="/p9"  activeClassName="active">intercept & observe</NavLink>
          <NavLink to="/p7"  activeClassName="active">Observer</NavLink>
          <NavLink to="/p8"  activeClassName="active">Provider and inject</NavLink>
        </nav>

        <nav>
          <NavLink to="/p4"  activeClassName="active">object</NavLink>
          <NavLink to="/p5"  activeClassName="active">arrays</NavLink>
          <NavLink to="/p6"  activeClassName="active">maps</NavLink>
        </nav>

        <nav>
          <NavLink to="/q1"  activeClassName="active">Q1</NavLink>
          <NavLink to="/q2"  activeClassName="active">Q2</NavLink>
          <NavLink to="/q3"  activeClassName="active">Q3</NavLink>
          <NavLink to="/q4"  activeClassName="active">Q4</NavLink>
        </nav>

      </aside>
    )
  }
}

export default Aside;

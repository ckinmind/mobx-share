import React from 'react';
import { NavLink } from 'react-router-dom';

class Aside extends React.Component {

  render() {
    return (
      <aside className="app-sidebar">
        <nav>
          <NavLink to="/ppt/p0"  activeClassName="active">开始</NavLink>
          <NavLink to="/ppt/p1"  activeClassName="active">Mobx知识结构</NavLink>
          <NavLink to="/ppt/p2"  activeClassName="active">autorun / when</NavLink>
          <NavLink to="/ppt/p3"  activeClassName="active">@computed</NavLink>
          <NavLink to="/ppt/p9"  activeClassName="active">intercept & observe</NavLink>

          <NavLink to="/ppt/p7"  activeClassName="active">Observer</NavLink>
          <NavLink to="/ppt/p8"  activeClassName="active">Provider and inject</NavLink>


          <NavLink to="/ppt/p4"  activeClassName="active">object</NavLink>
          <NavLink to="/ppt/p5"  activeClassName="active">arrays</NavLink>
          <NavLink to="/ppt/p6"  activeClassName="active">maps</NavLink>

        </nav>

        <nav>
          <NavLink to="/ppt/q1"  activeClassName="active">Q1</NavLink>
          <NavLink to="/ppt/q2"  activeClassName="active">Q2</NavLink>
          <NavLink to="/ppt/q3"  activeClassName="active">Q3</NavLink>
          <NavLink to="/ppt/q4"  activeClassName="active">Q4</NavLink>
        </nav>

        <nav>
          <NavLink to="/ppt/d1"  activeClassName="active">D1</NavLink>
          <NavLink to="/ppt/d2"  activeClassName="active">D2</NavLink>
        </nav>
      </aside>
    )
  }
}

export default Aside;

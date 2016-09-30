import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="side-panel">
      <div className="user-sidebar">
        <div className="user-icon"><i className="fa fa-user" aria-hidden="true"></i></div>
        <p>User Whoever</p>
      </div>
      <ul className="panel-navigation">
        <Link to="/water"><li className="water-li">Water</li></Link>
        <li className="food-li">Food</li>
        <li className="sleep-li">Sleep</li>
        <li className="exercise-li">Exercise</li>
      </ul>
      </div>
    )
  }
});

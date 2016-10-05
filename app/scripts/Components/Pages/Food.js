import React from 'react';
import {Link} from 'react-router';

import Sidebar from '../Sidebar';
import FoodSearch from '../FoodSearch';

export default React.createClass({
  render() {
    return (
      <main>
        <Sidebar/>
        <div className="page-wrapper">
          <header>
            <Link to="/"><i className="fa fa-arrow-left" aria-hidden="true"></i> back</Link>
            <h2>Food</h2>
          </header>
          <FoodSearch/>
        </div>
      </main>
    )
  }
});

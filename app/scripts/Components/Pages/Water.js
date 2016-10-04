import React from 'react';
import {Link} from 'react-router';

import Sidebar from '../Sidebar';
import WaterBar from '../WaterBar';
import WaterPie from '../WaterPie';

export default React.createClass({
  data: [56, 75, 80, 46, 26, 75, 21, 59],
  render() {
    return (
      <main>
        <Sidebar/>
        <div className="page-wrapper">
          <header>
            <Link to="/"><i className="fa fa-arrow-left" aria-hidden="true"></i> back</Link>
            <h2>Water</h2>
          </header>
          <WaterBar data={this.data}/>
          <WaterPie data={this.data}/>
        </div>
      </main>
    )
  }
});

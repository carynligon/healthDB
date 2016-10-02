import React from 'react';

import Sidebar from '../Sidebar';
import WaterData from '../WaterData';

export default React.createClass({
  data: [56, 75, 80, 46],
  render() {
    return (
      <main>
        <Sidebar/>
        <div className="page-wrapper">
          <header>
            <h2>Water</h2>
          </header>
          <WaterData data={this.data}/>
        </div>
      </main>
    )
  }
});

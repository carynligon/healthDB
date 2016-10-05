import React from 'react';
import {Link} from 'react-router';

import Sidebar from '../Sidebar';
import WaterBar from '../WaterBar';
import WaterLine from '../WaterLine';

export default React.createClass({
  data: [56, 75, 80, 46, 26, 75, 21, 59],
  lineData: [
    {day: 1, volume: 43},
    {day: 2, volume: 23},
    {day: 3, volume: 66},
    {day: 4, volume: 54},
    {day: 5, volume: 78},
    {day: 6, volume: 80},
    {day: 7, volume: 32},
    {day: 8, volume: 47},
    {day: 9, volume: 54},
    {day: 10, volume: 78},
  ],
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
          <WaterLine data={this.lineData}/>
        </div>
      </main>
    )
  }
});

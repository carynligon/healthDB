import React from 'react';
import {Link} from 'react-router';

import Sidebar from '../Sidebar';
import WaterBar from '../WaterBar';
import WaterLine from '../WaterLine';

export default React.createClass({
  data: [56, 75, 80, 46, 26, 75, 21, 59],
  lineData: [
    {day: 1, voume: 43},
    {day: 2, voume: 23},
    {day: 3, voume: 66},
    {day: 4, voume: 54},
    {day: 5, voume: 78},
    {day: 6, voume: 80},
    {day: 7, voume: 32},
    {day: 8, voume: 47},
    {day: 9, voume: 54},
    {day: 10, voume: 78},
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

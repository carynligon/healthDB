import React from 'react';

import Sidebar from '../Sidebar';

export default React.createClass({
  render() {
    return (
      <main>
        <Sidebar/>
        <div className="page-wrapper">
          <header>
            <h2>Water</h2>
          </header>
        </div>
      </main>
    )
  }
});

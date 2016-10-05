import React from 'react';
import Faux from 'react-faux-dom/lib/ReactFauxDOM';
var d3 = require('d3');

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    return {}
  },
  render: function () {
    console.log(this.state);
    return <div className="line-chart">
      <h3>Testing</h3>
      {this.state.chart}
    </div>
  },
  componentDidMount: function () {
    let faux2 = this.connectFauxDOM('div', 'chart');
    let	margin = {top: 30, right: 20, bottom: 30, left: 50};
    let width = 600 - margin.left - margin.right;
    let height = 270 - margin.top - margin.bottom;

// Parse the date / time
// console.log(d3.timeFormat("%d-%b-%y"));
//     let	parseDate = d3.timeFormat("%d-%b-%y");

    let	x = d3.scaleTime().range([0, width]);
    let	y = d3.scaleLinear().range([height, 0]);

    let	xAxis = d3.axisBottom().scale(x)
    	.ticks(5);

    let	yAxis = d3.axisLeft().scale(y)
    	.ticks(5);

    let	valueline = d3.line()
    	.x(function(d) { return x(d.day); })
    	.y(function(d) { return y(d.volume); });

    let	svg = d3.select("faux2")
    	.append("svg")
    		.attr("width", 500)
    		.attr("height", 500)
      	.append("g")
      		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    	this.props.data.forEach(function(d) {
        console.log(d);
    		d.day = d.day;
    		d.volume = +d.volume;
    	});

    	// x.domain(d3.extent(this.props.data, function(d) { return d.day; }));
    	// y.domain([0, d3.max(this.props.data, function(d) { return d.volume; })]);

    	svg.append("path")
    		.attr("class", "line")
    		.attr("d", valueline(this.props.data));

    	svg.append("g")
    		.attr("class", "x axis")
    		.attr("transform", "translate(0," + height + ")")
    		.call(xAxis);

    	svg.append("g")
    		.attr("class", "y axis")
    		.call(yAxis);

      d3.select('main').append('faux2')
  }
});

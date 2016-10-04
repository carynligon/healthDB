import React from 'react';
import Faux from 'react-faux-dom/lib/ReactFauxDOM';
var d3 = require('d3');

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    console.log(d3);
    return { look: 'stacked' }
  },
  render: function () {
    return <div>
      <h3>Water Consumption (Oz.)</h3>
      {this.state.chart}
    </div>
  },
  componentDidMount: function () {
    let faux = this.connectFauxDOM('div', 'chart')
    let margin = {top: 40, right: 10, bottom: 20, left: 10};
    let width = 960 - margin.left - margin.right;
    let height = 350 - margin.top - margin.bottom;

    let x = d3.scaleOrdinal()
        .domain([0,10])
        .range([0, width]);

    let y = d3.scaleLinear()
        .domain([0, 80])
        .range([height, 0]);

    let color = d3.scaleOrdinal()
      .range(['#34eadc', '#fb054f', '#2ecc23']);

    let svg = d3.select(faux).append('svg')
        .attr('class', 'water-bar')
        .attr('width', 500)
        .attr('height', 350)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let group = svg.append('g')
      .attr('transform', 'translate(300,200)');

    let arc = d3.arc()
      .innerRadius(200)
      .outerRadius(r);

    let pie = d3.pie()
      .value(function(d) { return d; });

    let arcs = group.selectAll('.arc')
      .data(pie(this.props.data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', function(d) {
        return color(d)
      });

    let r = 300;
    let p = Math.PI * 2;
  }
});

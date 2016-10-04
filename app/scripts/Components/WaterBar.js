import React from 'react';
import Faux from 'react-faux-dom/lib/ReactFauxDOM';
var d3 = require('d3');

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
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

    let color = d3.scaleLinear()
        .domain([0, 40])
        .range(['white', '#00A1E4'])

    let xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(1)
        .ticks(7)
        .tickPadding(6);

    let yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(1)
        .tickPadding(6);

    let heightScale = d3.scaleLinear()
        .domain([0,80])
        .range([0, height]);

    let svg = d3.select(faux).append('svg')
        .attr('class', 'water-bar')
        .attr('width', 500)
        .attr('height', 350)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let rect = svg.selectAll('rect')
        .data(this.props.data)
        .enter().append('rect')
          .attr('width', 40)
          .attr('height', 0)
          .attr('fill', function(d) {
            return color(d);
          })
          .attr('transform', function(d) {
            let moveY = height-heightScale(d);
            return 'translate(0,' + moveY + ')';
          })
          .attr('x', function(d,i) {
            return i * 67;
          });

    rect.transition()
        .delay(function (d, i) { return i * 10 })
        .duration(500)
        .attr('height', function(d) {
          return heightScale(d);
        });

    this.animateFauxDOM(800)

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
  }
});

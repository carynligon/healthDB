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
      {this.state.chart}
    </div>
  },
  toggle: function () {
    if (this.state.look === 'stacked') {
      this.setState({ look: 'grouped' })
      this.transitionGrouped()
    } else {
      this.setState({ look: 'stacked' })
      this.transitionStacked()
    }
  },
  componentDidMount: function () {
    var faux = this.connectFauxDOM('div', 'chart')

    var component = this;

    let n = 4 // number of layers
    let m = 58 // number of samples per layer
    let stack = d3.stack();
    let margin = {top: 40, right: 10, bottom: 20, left: 10};
    let width = 960 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

console.dir(d3.scaleOrdinal());
    let x = d3.scaleOrdinal()
        .domain([0,60])
        .range([0, width])

    let y = d3.scaleLinear()
        .domain([0, 80])
        .range([height, 0])

    let color = d3.scaleLinear()
        .domain([0, 40])
        .range(['white', '#00A1E4'])

    let xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(1)
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
        .attr('height', 500)
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
          .attr('x', function(d,i) {
            return i * 67;
          });

    rect.transition()
        .delay(function (d, i) { return i * 10 })
        .attr('height', function(d) {
          console.log(d);
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

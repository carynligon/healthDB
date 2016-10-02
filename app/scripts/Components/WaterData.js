import React from 'react';
import * as d3 from "d3";
import createFragment from 'react-addons-create-fragment';
import ReactFauxDOM from 'react-faux-dom';

export default React.createClass({
  mixins: [ReactFauxDOM.mixins.core, ReactFauxDOM.mixins.anim],
  getInitialState() {
    return {};
  },
  render() {
    console.log(ReactFauxDOM);
    console.log(this);
    console.log(this.state);

    return (
      <div className="chart-wrapper">
        {this.state.chart}
      </div>
    )
  },
  componentDidMount() {
    let faux = this.connectFauxDOM('div', 'chart');
    console.log(faux);
    let component = this;
    let width = 500;
    let height = 500;

    let el = ReactFauxDOM.createElement('div')

    let widthScale = d3.scaleLinear()
      .domain([0, 80])
      .range([0, width]);

    let radiusScale = d3.scaleLinear()
        .domain([0, 80])
        .range([0, width]);

    let color = d3.scaleLinear()
      .domain([0, 80])
      .range(['white', '#00A1E4']);

    let axis = d3.axisBottom()
      .scale(widthScale)
      .ticks(5);

    let canvas = d3.select('faux')
        .append('svg')
        .attr('class', 'water-bar')
        .attr('width', width)
        .attr('height', height);

    canvas.append('g')
      .attr('transform', 'translate(0,400)')
      .call(axis);

      console.log(canvas);
    let bars = canvas.selectAll('rect')
      .data(this.props.data)
      .enter()
        .append('rect')
        .attr('width', 0)
        .attr('height', 50)
        .attr('fill', function(d) {
          return color(d);
        })
        .attr('y', function(d,i) {
          return i * 67;
        });

    bars.transition()
      .duration(1500)
      .attr('width', function(d) {
        return widthScale(d);
      });
  }
})

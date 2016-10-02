import React from 'react';
// import d3 from 'd3';

export default React.createClass({
  render() {
    console.log(d3);
    let width = 500;
    let height = 500;

    let widthScale = d3.scaleLinear()
      .domain([0, 80])
      .range([0, width]);

    let radiusScale = d3.scaleLinear()
        .domain([0, 80])
        .range([0, width]);

    let color = d3.scaleLinear()
      .domain([0, 60])
      .range(['red', 'blue']);

    let axis = d3.axisBottom()
      .scale(widthScale)
      .ticks(5);

    let canvas = d3.select('body')
        .append('svg')
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
          return color(d.age);
        })
        .attr('y', function(d,i) {
          return i * 67;
        });

    bars.transition()
      .duration(1500)
      .attr('width', function(d) {
        console.log(d);
        console.log(widthScale);
        return widthScale(d);
      });

    return (
      <div className="chart-wrapper">
        {canvas}
      </div>
    )
  }
})

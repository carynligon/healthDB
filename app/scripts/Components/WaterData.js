
var React = require('react')
var ReactDOM = require('react-dom')
var Faux = require('react-faux-dom/lib/ReactFauxDOM')
var d3 = require('d3')

export default React.createClass({
  mixins: [Faux.mixins.core, Faux.mixins.anim],
  getInitialState: function () {
    console.log(d3);
    return { look: 'stacked' }
  },
  render: function () {
    return <div>
      <button onClick={this.toggle}>Toggle</button>
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
    // This will create a faux div and store its virtual DOM
    // in state.chart
    var faux = this.connectFauxDOM('div', 'chart')

    var component = this

    /*
       D3 code below by Mike Bostock, https://bl.ocks.org/mbostock/3943967
       The only changes made for this example are...
       1) feeding D3 the faux node created above
       2) calling this.animateFauxDOM(duration) after each animation kickoff
       3) attaching the radio button callbacks to the component
       4) deleting the radio button (as we do the toggling through the react button)
    */

    var n = 4 // number of layers
    var m = 58 // number of samples per layer
    var stack = d3.stack()
    var layers = stack(d3.range(n).map(function () { return bumpLayer(m, 0.1) }))
    var yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y }) })
    var yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d.y0 + d.y }) })

    var margin = {top: 40, right: 10, bottom: 20, left: 10}
    var width = 960 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom

console.dir(d3.scaleOrdinal());
    var x = d3.scaleOrdinal()
        .domain(d3.range(m))
        .range([0, width], 0.08)

    var y = d3.scaleLinear()
        .domain([0, yStackMax])
        .range([height, 0])

    var color = d3.scaleLinear()
        .domain([0, n - 1])
        .range(['#aad', '#556'])

    var xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(0)
        .tickPadding(6);

    var svg = d3.select(faux).append('svg')
        .attr('width', 500)
        .attr('height', 500)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var rect = svg.selectAll('rect')
        .data(this.props.data)
      .enter().append('rect')
        .attr('width', 20)
        .attr('height', 0)
        .attr('x', function(d,i) {
          return i * 67;
        });

    rect.transition()
        .delay(function (d, i) { return i * 10 })
        .attr('height', function(d) {
          return d
        })

    this.animateFauxDOM(800)

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

    // Inspired by Lee Byron's test data generator.
    function bumpLayer (n, o) {
      function bump (a) {
        var x = 1 / (0.1 + Math.random())
        var y = 2 * Math.random() - 0.5
        var z = 10 / (0.1 + Math.random())
        for (var i = 0; i < n; i++) {
          var w = (i / n - y) * z
          a[i] += x * Math.exp(-w * w)
        }
      }

      var a = []
      var i
      for (i = 0; i < n; ++i) a[i] = o + o * Math.random()
      for (i = 0; i < 5; ++i) bump(a)
      return a.map(function (d, i) { return {x: i, y: Math.max(0, d)} })
    }
  }
})




// import React from 'react';
// import * as d3 from "d3";
// import createFragment from 'react-addons-create-fragment';
// import ReactFauxDOM from 'react-faux-dom';
//
// export default React.createClass({
//   mixins: [ReactFauxDOM.mixins.core, ReactFauxDOM.mixins.anim],
//   getInitialState() {
//     return {};
//   },
//   render() {
//     console.log(this.state);
//     console.log(this.props);
//     return (
//       <div>
//         {this.state.chart}
//       </div>
//     )
//   },
//   componentDidMount() {
//     let faux = this.connectFauxDOM('div', 'chart');
//     let component = this;
//     let width = 500;
//     let height = 500;
//
//     let el = ReactFauxDOM.createElement('div')
//
//     let widthScale = d3.scaleLinear()
//       .domain([0, 80])
//       .range([0, width]);
//
//     let radiusScale = d3.scaleLinear()
//         .domain([0, 80])
//         .range([0, width]);
//
//     let color = d3.scaleLinear()
//       .domain([0, 80])
//       .range(['white', '#00A1E4']);
//
//     let axis = d3.axisBottom()
//       .scale(widthScale)
//       .ticks(5);
//
//     let canvas = d3.select('faux')
//         .append('svg')
//         .attr('class', 'water-bar')
//         .attr('width', width)
//         .attr('height', height);
//
//     canvas.append('g')
//       .attr('transform', 'translate(0,400)')
//       .call(axis);
//
//       console.log(canvas);
//     let bars = canvas.selectAll('rect')
//       .data(this.props.data)
//       .enter()
//         .append('rect')
//         .attr('width', 0)
//         .attr('height', 50)
//         .attr('fill', function(d) {
//           return color(d);
//         })
//         .attr('y', function(d,i) {
//           return i * 67;
//         });
//
//     bars.transition()
//       .duration(1500)
//       .attr('width', function(d) {
//         return widthScale(d);
//       });
//
//   }
// })

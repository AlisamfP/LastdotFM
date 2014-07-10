function generateChart(info){
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  var artists = info.map(function(n){ return n[0]; });
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)
  //linear scaling variable.
    // domain == range of data.
    // range == desired height/width of chart.
  var y = d3.scale.linear()
    .range([height, 0]);
  //set the y axis to the left side
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

  var chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(info.map(function(n){ return n[0];}))
  y.domain([0, d3.max(info.map(function(n){ return n[1];}))])

 chart.selectAll('.bar')
  .data(info)
  .enter()
    .append('rect')
        .attr('class', 'bar')
        .attr('z-index', 1)
        .attr('x', function(d){ return x(d[0]); })
        .attr('y', function(d){ return y(d[1]); })
        .attr('height', function(d){ return height - y(d[1]); })
        .attr('width', x.rangeBand());

  chart.append('text')
     .attr('text-anchor', 'end')
     .attr('dy', '.35em')
     .attr('z-index', 500)
      .text(function(d){
        console.log();
        return d;
      });
// DONTUSETHIS

  chart.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

};
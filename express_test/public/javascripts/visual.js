function update(data){
  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .2);
  var yScale = d3.scale.linear()
    .range([height, 0]);
  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');
  xScale.domain(data.map(function(n){ return n[0]; });
  yScale.domain([0, d3.max(data.map(function(n){ return n[1];}))]);
  var bars = chart.selectAll('.bar')
            .data(data)
              .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('id', function(d,i){return i;})
                .attr('x', function(d){ return xScale(d[0]); })
                .attr('y', function(d){ return yScale(d[1]); })
                .attr('height', function(d){ return height - yScale(d[1]); })
                .attr('width', xScale.rangeBand());


  bars.select('text')
    .data(data)
        .enter()
          .append('text')
          .attr('class', function(d,i){ return 'barText' + i; })
          .attr('transform', 'rotate(-90)')
          .attr('y', function(d) { return xScale(d[0]); })
          .attr('x', function(d) { return -height; })
          .attr('height', function(d){ return height - yScale(d[1]); })
          .attr('width', xScale.rangeBand())
          .attr('dy', xScale.rangeBand()/2)
          .attr('dx', 5)
          .attr('text-anchor', 'left')
          .attr('visibility', 'hidden')
            .text(function(d){
              return d[0];
            });
  chart.append('g').attr('class', 'y axis').call(yAxis);
};
function init(data){
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width  = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var chart = d3.select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
  chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // .attr('class', 'y axis')
    // .call(yAxis);
    update(data);
}
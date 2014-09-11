function update(dataset){
  var xScale = d3.scale.ordinal()
      .domain(dataset.map(function(n){ return n.name; }))
      .rangeRoundBands([0, width], .2);
  var yScale = d3.scale.linear()
      .domain([0, d3.max(dataset.map(function(n){ return n.playcount;}))])
      .range([height, 0]);
  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');
  var chart = d3.select('#musicChart');
  var bars = chart.selectAll('rect.bar')
      .data(dataset, key);
  var barText = chart.selectAll('text.barText')
      .data(dataset, key);

  bars
    .attr('fill', '#4682b4')

  bars
    .enter()
      .append('svg:rect')
      .attr('class', 'bar')
      .attr('id', function(d,i){return i;});

  bars.exit()
    .transition(300)
    .ease('exp')
      .attr('width', 0)
      .remove();

  bars
    .transition()
    .ease('quad')
      .attr('x', function(d){ return xScale(d.name); })
      .attr('y', function(d){ return yScale(d.playcount); })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d){ return height - yScale(d.playcount); });

                
  chart.attr('class', 'y axis').call(yAxis);

  barText
    .enter()
      .append('text')
      .attr('class', 'barText')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'left');


  barText
    .transition(300)
    .ease('quad')
      .text(function(d){
        return d.name;
      })
      .attr('x', function(d) { return -height; })
      .attr('y', function(d) { return xScale(d.name); })
      .attr('height', function(d){ return height - yScale(d.playcount); })
      .attr('width', xScale.rangeBand())
      .attr('dx', 5)
      .attr('dy', xScale.rangeBand()/2);
  
  barText.exit()
    .transition(300)
    .ease('exp')
      .attr('opacity', 0)
      .remove();
};

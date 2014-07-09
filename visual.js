function generateChart(info){
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)

  //linear scaling variable.
    // domain == range of data.
    // range == desired height/width of chart.
  var y = d3.scale.linear()
    .range([height, 0]);

  //set the x axis to the bottom of the screen
  // var xAxis = d3.svg.axis()
  //   .scale(x)
  //   .orient("bottom");

  //set the y axis to the left side
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");


  var chart = d3.select(".chart")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

  x.domain(info.map(function(n){ return n[0];}));
  y.domain([0, d3.max(info.map(function(n){ return n[1];}))])
// create variable for selecting the bars in the chart 
 chart.selectAll(".bar")
  .data(info)
  .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return x(d[0]); })
        .attr("y", function(d){ return y(d[1]); })
        .attr("height", function(d){ return height - y(d[1]); })
        .attr("width", x.rangeBand());

  // chart.append('g')
  //   .attr("class", "x axis")
  //   .attr('trasform', 'translate(0,'+ height +")")
  //   .call(xAxis);

  chart.append('g')
    .attr("class", "y axis")
    .call(yAxis);

// // write text on the bar of the graph
  chart.selectAll(".bar")
  .append("text")
  .attr('transform', "rotate(-90)" )
  .attr('x', width/2)
  .attr("y", height/2 )
  .attr('dy', '.75em')
	.text(function(d){ return d[0]; });
};

function generateChart(info){
//https://github.com/mbostock/d3/wiki/Quantitative-Scales
var margin = {top: 20, right: 30, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right, 
  height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1)
  .domain(info.map(function(n){ return n[0];}));

//linear scaling variable.
  // domain == range of data.
  // range == desired height/width of chart.

var y = d3.scale.linear()
  .domain([0, d3.max(info.map(function(n){ return n[1];}))])
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var chart = d3.select(".chart")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

  chart.append('g')
    .attr("class", "x axis")
    .attr('trasform', 'translate(0,'+ height +")")
    .call(xAxis);

  chart.append('g')
    .attr("class", "y axis")
    .call(yAxis);
// create variable for selecting the bars in the chart 
 chart.selectAll(".bar")
	.data(info)
	.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return x(d[0]); })
        .attr("y", function(d){ return y(d[1]); })
        .attr("height", function(d){ return height - y(d[1]); })
        .attr("width", x.rangeBand());

// //set the attributes for the rectangles of the chart
// bar.append("rect")
//   .attr("y", function(d) { return y(d[1]); })
// 	.attr('height', function(d){ return height - y(d[1]); })
// 	.attr('width', x.rangeBand());

// // write text on the bar of the graph
// bar.append("text")
// 	.attr('x', x.rangeBand() / 2)
// 	.attr("y", function(d){ return y(d[1]) + 3; })
// 	.attr('dy', '.75em')
// 	.text(function(d){ return d[0]+"\n"+d[1]; });
};

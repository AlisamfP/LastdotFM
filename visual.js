// http://bost.ocks.org/mike/bar/3/#margins <<< To resume tutorial and add margins


function generateChart(info){
	//https://github.com/mbostock/d3/wiki/Quantitative-Scales
	var width = 960, height = 500;


	var x = d3.scale.ordinal()
    .domain(info.map(function(n){ return n[0];}))
    .rangeRoundBands([0, width], .1);
  
  //linear scaling variable.
    // domain == range of data.
    // range == desired height/width of chart.
  var y = d3.scale.linear()
		.domain([0, d3.max(info.map(function(n){ return n[1];}))])
		.range([height, 0]);
	
  var chart = d3.select(".chart")
    .attr('width', width)
    .attr('height', height);

  // create variable for selecting the bars in the chart 
  var bar = chart.selectAll("g")
  	.data(info)
  	.enter().append("g")
    	.attr('transform', function(d){
  	    	return "translate(" + x(d[0]) + ",0)";
  	});
  
  //set the attributes for the rectangles of the chart
  bar.append("rect")
    .attr("y", function(d) { return y(d[1]); })
  	.attr('height', function(d){ return height - y(d[1]); })
  	.attr('width', x.rangeBand());
  
  // write text on the bar of the graph
  bar.append("text")
  	.attr('x', x.rangeBand() / 2)
  	.attr("y", function(d){ return y(d[1]) + 15; })
  	.attr('dy', '.75em')
  	.text(function(d){ return d[0]; });
};

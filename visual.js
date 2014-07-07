function generateChart(info){
	//https://github.com/mbostock/d3/wiki/Quantitative-Scales
	var dataLength = info.map(function(n){
			return n[1];
		});
  console.log(dataLength);
	var width = 960, height = 500;
	var y = d3.scale.linear()
		.domain([0, d3.max(dataLength)])
		.range([height, 0]);
	var chart = d3.select(".chart")
    .attr('width', width)
    .attr('height', height);
  var barWidth = width / info.length
  var bar = chart.selectAll("g")
  	.data(info)
  	.enter().append("g")
    	.attr('transform', function(d, i){
  	    	return "translate(" + i * barWidth + ",0)";
  	});
  bar.append("rect")
    .attr("y", function(d) { return y(d[1]); })
  	.attr('height', function(d){return height - y(d[1]);})
  	.attr('width', barWidth - 1);
  bar.append("text")
  	.attr('x', barWidth/2)
  	.attr("y", function(d){ return y(d[1]); })
  	.attr('dy', '.75em')
  	.text(function(d){return d[0]});
};

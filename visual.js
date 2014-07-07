function generateChart(info){
	//https://github.com/mbostock/d3/wiki/Quantitative-Scales
	var dataLength = info.map(function(n){
			return n[1];
		});
	var barHeight = 20;
	var x = d3.scale.linear()
		.domain([0, d3.max(dataLength)])
		.range([0, 800]);
	var chart = d3.select(".chart")
			.attr('width', 800)
    	.attr('height', barHeight * dataLength.length);
  var	bar = chart.selectAll("g")
  		  .data(info)
  		.enter().append("g")
  			.attr('transform', function(d, i){
  				return "translate(0," + i * barHeight + ")";
  			});
  	bar.append("rect")
  		.attr('width', function(d){return x(d[1]);})
  		.attr('height', barHeight - 1);
  	bar.append("text")
  		.attr('x', function(d){return x(d[1])-3;})
  		.attr("y", barHeight / 2)
  		.attr('dy', '.35em')
  		.text(function(d){return d[0]});
}

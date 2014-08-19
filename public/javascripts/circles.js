function createCircles(info){
	var margin = {top: 20, right: 30, bottom: 30, left: 60},
    	width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;
	var x = d3.scale.ordinal()
		.domain(info.map(function(n){ return n[0]; }))
		.rangeRoundBands([0,width], .1);
	var circleScale = d3.scale.linear()
		.domain([0,d3.max(info.map(function(n){ return n[1]; }))])
		.range([0,width/info.length]);
	var svg = d3.select('svg')
				.attr('width', width)
				.attr('height', height);
	var circles = svg.selectAll('circle')
		.data(info)
		.enter()
		.append('circle')
		.attr('class', 'circle')
		.attr('r', function(d){
			return (circleScale(d[1]));
		})
		.attr('cx', function(d){
			console.log(x(d[0]));
			return(2*margin.left + x(d[0]));
		})
		.attr('cy', 150);
	var circle_text = circles.select('text')
		.data(info)
		.enter()
		.append('text')
		.attr('x', function(d){ return (1.75*margin.left + x(d[0])); })
		.attr('y', 150)
		.attr('color', 'black')
		.attr('font-size', '30px')
		.text(function(d){ return d[0]; });
};

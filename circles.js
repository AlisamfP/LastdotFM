function createCircles(info){
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
    	width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.domain([d3.max(info.map(function(n){ return n[1]; })),0])
		.range([0,width]);

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
		.attr('r', function(d){
			return (circleScale(d[1]));
		})
		.attr('cx', function(d){
			return(50 + x(d[1]));
		})
		.attr('cy', 150);

	circles
		.attr('fill', 'red')
		.attr('border', '3px solid black');


	var circle_text = circles.select('text')
		.data(info)
		.enter()
		.append('text')
		.attr('x', function(d){ return 50 + (x(d[1])); })
		.attr('y', 150)
		.attr('color', 'black')
		.attr('font-size', '30px')
		.text(function(d){ return d[1]; });
};
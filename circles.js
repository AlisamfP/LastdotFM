function createCircles(info){
	// var x = d3.scale.linear()
			// .domain(info.map(function(n){ return n[1];}))
			// .range([500,0]);

	var svg = d3.select('svg')
				.attr('width', 700)
				.attr('height', 500);

	var circles = svg.selectAll('circle')
		.data(info)
		.enter()
		.append('circle')
		.attr('r', function(d){
			return (d[1]/d.length);
		})
		.attr('cx', function(d, i){return i * 100 + 90;})
		.attr('cy', 150);

	circles
		.attr('fill', 'red')
		.attr('border', '3px solid black');


	var circle_text = circles.select('text')
		.data(info)
		.enter()
		.append('text')
		.attr('x', function(d, i){return i*100 +70;})
		.attr('y', 150)
		.attr('color', 'black')
		.attr('font-size', '30px')
		.text(function(d){return d[1];});
};
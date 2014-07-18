var test_info = [1,3,9,27,81];

var svg = d3.select('svg')
			.attr('width', 700)
			.attr('height', 500);

var circles = svg.selectAll('circle')
	.data(test_info)
	.enter()
	.append('circle')
	.attr('fill', 'red')
	.attr('r', function(d){
		console.log(d);
		return d;
	})
	.attr('cx', function(d, i){return i * 100 + 30;})
	.attr('cy', 150);

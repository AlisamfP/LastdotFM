var test_info = [1,3,9,27,81];

var svg = d3.select('svg')
			.attr('width', 700)
			.attr('height', 500);

var circles = svg.selectAll('circle')
	.data(test_info)
	.enter()
	.append('circle')
	.attr('r', function(d){
		return d;
	})
	.attr('cx', function(d, i){return i * 100 + 30;})
	.attr('cy', 150);

circles
	.attr('fill', 'red');


var circle_text = circles.select('text')
	.data(test_info)
	.enter()
	.append('text')
	.attr('x', function(d, i){return i*100 +30;})
	.attr('y', 150)
	.attr('color', 'black')
	.attr('font-size', '30px')
	.text(function(d){return d;});
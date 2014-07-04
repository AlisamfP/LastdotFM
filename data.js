var data = function makeRequest(apiUrl){
	$.ajax({
		url: apiUrl,
	})
	.done(function(res) {
		console.log("success");
		console.log(res);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}



var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select(".chart")
  .selectAll("div")
    .data(data('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json'))
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
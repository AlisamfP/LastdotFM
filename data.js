var lastFMurl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&limit=10';

var data = function makeRequest(apiUrl){
	$.ajax({
		url: apiUrl,
	})
	.done(function(res) {
		console.log("success");
		return playCountData(res['topartists']['artist']);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
}

function playCountData(array){
	for (item in array){
		console.log(array[item]['name'] + " : " + array[item]['playcount']);
		// return (array[item]['playcount']);
		// return (data[item]['playcount'])
	}
}


// var data = [1, 2, 99, 32, 42, 100];
// var x = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([0, 420]);

d3.select(".chart")
  .selectAll("div")
    .data(data(lastFMurl))
  .enter().append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });

var lastFMurl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&limit=10';
function makeRequest(apiUrl){
	$.ajax({
		url: apiUrl,
	})
	.done(function(res) {
		d3.select(".chart")
  			.selectAll("div")
    		.data(playCountData(res['topartists']['artist']))
  		.enter().append("div")
    		.style("width", function(d) { return d[1] + "px"; })
    		.text(function(d) { return d[0]+" : "+d[1]; });
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
}

function playCountData(array){
	var x = [];
	for (item in array){
		x.push([array[item]['name'], parseInt(array[item]['playcount'])]);
		// console.log(array[item]['name'] + " : " + array[item]['playcount']);
	}
	console.log(x);
	return x;
}

makeRequest(lastFMurl);

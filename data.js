$('button').click(function(event) {
	$('div').empty();
	makeURL((document.getElementById('period').value), (document.getElementById('limit').value));
});

function makeURL(period, limit){
	limit = (limit != undefined) ? limit : '10';
	makeRequest('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&period='+period+'&limit='+limit);
}

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
	}
	return x;
}

makeURL('alisatrocity');

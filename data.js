$('document').ready(function(){
$('button').click(function(event) {
	//clear chart before making new one
	$('div').empty();
	makeURL((document.getElementById('user').value),
		(document.getElementById('period').value), 
		(document.getElementById('limit').value));
});

function makeURL(user, period, limit){
	limit = (isNaN(limit) != true) ? limit : 10;
	url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=';
	api_key = '8148fb40ef9511752203d2c4591e63d0';
	makeRequest(url+user+'&api_key='+api_key+'&format=json&period='+period+'&limit='+limit);
}

function makeRequest(apiUrl){
	$.ajax({
		url: apiUrl,
	})
	.done(function(res) {
		playCountData(res['topartists']['artist']);
	})
	.fail(function(err) {
		console.log("error: ", err);
	})
	.always(function() {
		console.log("complete");
	});	
}

function playCountData(array){
	var artists = [];
	for (item in array){
		artists.push([array[item]['name'], parseInt(array[item]['playcount'])]);
	}
	console.log(artists);
	return goD3go(artists);
}
});

function goD3go(info){
	//https://github.com/mbostock/d3/wiki/Quantitative-Scales
	var x = d3.scale.linear()
		.domain([0, d3.max(info.map(function(n){
			return n[1];
		}))])
		.range([0, document.body.clientWidth-300]);
	d3.select(".chart")
  			.selectAll("div")
    		.data(info)
  		.enter().append("div")
    		.style("width", function(d) { return x(d[1]) + "px"; })
    		.text(function(d) { return d[0]+" : "+d[1]; });
}
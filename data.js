$('document').ready(function(){
$('button').click(function() {
	//clear chart before making new one
	$('svg').empty();
	return makeURL((document.getElementById('user').value),
		(document.getElementById('period').value),
		(document.getElementById('limit').value));
});

function makeURL(user, period, limit){
	limit = (isNaN(limit) !== true) ? parseInt(limit) : 10;
	url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=';
	api_key = '8148fb40ef9511752203d2c4591e63d0';
	makeRequest(url+user
		+'&api_key='+api_key+
		'&format=json&period='+period+
		'&limit='+limit);
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
	return generateChart(artists);
}
});
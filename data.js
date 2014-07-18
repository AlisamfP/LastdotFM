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
		baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=';
		apiKey = '8148fb40ef9511752203d2c4591e63d0';
		makeRequest(baseUrl+user
			+'&api_key='+apiKey+
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
			console.log('error: ', err);
		})
		.always(function() {
			console.log('complete');
			// $('.bar').click(function(){
			// 	var active = '.barText' + this.id.toString();
			// 	$(active).removeAttr('visibility');
			// });
		});
	}

	function playCountData(array){
		var artists = [];
		for (item in array){
			artists.push([array[item]['name'], parseInt(array[item]['playcount'])]);
		}
		// return generateChart(artists);
		return createCircles(artists);
	}
});

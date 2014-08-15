function bars(data){
  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .2);
  var yScale = d3.scale.linear()
    .range([height, 0]);
  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');
  xScale.domain(data.map(function(n){ return n[0]; });
  yScale.domain([0, d3.max(data.map(function(n){ return n[1];}))]);
  var bars = chart.selectAll('.bar')
            .data(data)
              .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('id', function(d,i){return i;})
                .attr('x', function(d){ return xScale(d[0]); })
                .attr('y', function(d){ return yScale(d[1]); })
                .attr('height', function(d){ return height - yScale(d[1]); })
                .attr('width', xScale.rangeBand());


  bars.select('text')
    .data(data)
        .enter()
          .append('text')
          .attr('class', function(d,i){ return 'barText' + i; })
          .attr('transform', 'rotate(-90)')
          .attr('y', function(d) { return xScale(d[0]); })
          .attr('x', function(d) { return -height; })
          .attr('height', function(d){ return height - yScale(d[1]); })
          .attr('width', xScale.rangeBand())
          .attr('dy', xScale.rangeBand()/2)
          .attr('dx', 5)
          .attr('text-anchor', 'left')
          .attr('visibility', 'hidden')
            .text(function(d){
              return d[0];
            });
  chart.append('g').attr('class', 'y axis').call(yAxis);
};

function init(data){
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width  = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var chart = d3.select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
  chart.append('svg:rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('stroke', '#4682b4')
    .attr('fill', 'none');

  chart.append('g')
    .attr('id', 'barchart')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // .attr('class', 'y axis')
    // .call(yAxis);
  d3.select('#button')
    .on('click', function(d){
      user = document.getElementById('user').value;
      period = document.getElementById('period').value;
      limit = document.getElementById('limit').value;
      bars(makeUrl(user, period, limit));
  d3.select('.bar')
    .on('click', function(d,i){
      var active = '.barText' + this.id.toString();
      d3.select(active).attr('visibility', 'visible');
    });
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
    $.ajax({ url: apiUrl,
    }).done(function(res) {
      playCountData(res['topartists']['artist']);
    }).fail(function(err) {
      console.log('error: ', err);
    }).always(function() {
      console.log('complete');
    });
  }

  function playCountData(array){
    var artists = [];
    for (item in array){
      artists.push([array[item]['name'], parseInt(array[item]['playcount'])]);
    }
    return artists;
    // return createCircles(artists);
  }
});

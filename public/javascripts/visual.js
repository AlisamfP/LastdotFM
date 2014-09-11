var margin = {top: 20, right: 30, bottom: 30, left: 40}
var width  = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var key = function(d){
  return d.key ;
}
function init(){
  var chart = d3.select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

  chart.append('svg:rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'none');

  chart.append('g')
    .attr('id', 'barchart')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.select('#period')
      .on('input', makeURL);

    d3.select('#nLimit')
      .on('mouseup', makeURL);

};

function bars(dataset){
  var xScale = d3.scale.ordinal()
      .domain(dataset.map(function(n){ return n.name; }))
      .rangeRoundBands([0, width], .2);
  var yScale = d3.scale.linear()
      .domain([0, d3.max(dataset.map(function(n){ return n.playcount;}))])
      .range([height, 0]);
  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');
  var chart = d3.select('#barchart');
  var bars = chart.selectAll('rect.bar')
      .data(dataset, key);
  var barText = chart.selectAll('text.barText')
      .data(dataset, key);

  bars
    .attr('fill', '#4682b4')

  bars
    .enter()
      .append('svg:rect')
      .attr('class', 'bar')
      .attr('id', function(d,i){return i;});

  bars.exit()
    .transition(300)
    .ease('exp')
      .attr('width', 0)
      .remove();

  bars
    .transition()
    .ease('quad')
      .attr('x', function(d){ return xScale(d.name); })
      .attr('y', function(d){ return yScale(d.playcount); })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d){ return height - yScale(d.playcount); });

                
  chart.attr('class', 'y axis').call(yAxis);

  barText
    .enter()
      .append('text')
      .attr('class', 'barText')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'left');


  barText
    .transition(300)
    .ease('quad')
      .text(function(d){
        return d.name;
      })
      .attr('x', function(d) { return -height; })
      .attr('y', function(d) { return xScale(d.name); })
      .attr('height', function(d){ return height - yScale(d.playcount); })
      .attr('width', xScale.rangeBand())
      .attr('dx', 5)
      .attr('dy', xScale.rangeBand()/2);
  
  barText.exit()
    .transition(300)
    .ease('exp')
      .attr('opacity', 0)
      .remove();
};


function makeURL(){
  user = d3.select('#user').property('value');
  period = d3.select('#period').property('value');
  limit = d3.select('#nLimit').property('value');
  baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=';
  apiKey = '8148fb40ef9511752203d2c4591e63d0';
  d3.json(baseUrl+user
    +'&api_key='+apiKey+
    '&format=json&period='+period+
    '&limit='+limit, function(error, json) {
      if (error) return console.warn(error);
      return filter(json['topartists']['artist']);
    });
};

function filter(array){
  var result = [];
  for (item in array){
    result.push({key: item, name: array[item]['name'], playcount: parseInt(array[item]['playcount'])});
  }
  return bars(result);
}

init();
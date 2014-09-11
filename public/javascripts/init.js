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
    .attr('id', 'musicChart')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.select('#period')
      .on('input', getData);

    d3.select('#nLimit')
      .on('mouseup', getData);

};

function getData(){
  user = d3.select('#user').property('value');
  period = d3.select('#period').property('value');
  limit = d3.select('#nLimit').property('value');
  baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=';
  apiKey = '8148fb40ef9511752203d2c4591e63d0';
  console.log(user, period, limit);
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
  return update(result);
}
// authenticate();
init();
var margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

$('.user').text(localStorage.user);
$('#nLimit').on('input', function() {
  $('#limitValue').text($('#nLimit').val());
});

var key = function(d) {
  return d.key;
};

function init() {
  var chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  chart.append('svg:rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'none');

  chart.append('g')
    .attr('id', 'chart')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.select('#period')
    .on('input', getData);

  d3.select('#nLimit')
    .on('mouseup', getData);

  d3.select('#generate')
    .on('click', function() {
      d3.select('svg').remove();
      return getData();
    });

}

function getData() {
  var user = '&user=' + localStorage.user;
  var period = '&period=' + d3.select('#period').property('value');
  var limit = '&limit=' + d3.select('#nLimit').property('value');
  var baseUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&format=json&api_key=8148fb40ef9511752203d2c4591e63d0';
  d3.json(baseUrl + user + period + limit, function(error, json) {
      if (error) return console.warn(error);
      return filter(json['topartists']['artist']);
    });
}

init();
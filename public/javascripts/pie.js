var api_url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&period=overall&limit=5';

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.playcount; });

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

function filter(array){
  var result = [];
  for (item in array){
    result.push({key: item, name: array[item]['name'], playcount: parseInt(array[item]['playcount'])});
  }
  console.log(result);
  return result;
}

d3.json(api_url, function(error, data) {
  console.log(data);
  data = filter(data['topartists']['artist']);

  var g = svg.datum(data).selectAll('.arc')
      .data(pie)
    .enter().append('g')
      .attr('class', 'arc');

  g.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return color(d.data.name); });

  g.append('text')
      .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .text(function(d) { return d.data.name; });

  d3.selectAll('.arc').on('mouseover', function (d) {
    var selection = d3.select(this);
    selection.select('text')
    .style('font-size', '2em')
    .text(function (d){ return d.data.playcount; })
  })
  .on('mouseout', function (d){
    var selection = d3.select(this);
    selection.select('text')
    .style('font-size', '1em')
    .text(function (d){ return d.data.name; });
  })

});

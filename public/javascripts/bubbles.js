var diameter = window.innerHeight - 100,
  format = d3.format(',d'),
  color = d3.scale.category20c();

var bubble = d3.layout.pack()
  .sort(null)
  .size([diameter, diameter])
  .padding(1.5)
  .value(function(d) {
    return d.value;
  });

function filter(info) {
  var array = [];
  for (var item in info) {
    array.push({
      key: item,
      name: info[item]['name'],
      value: parseInt(info[item]['playcount'])
    });
  }
  update({children: array});
}

function update(dataset) {
  var svg = d3.select('body').append('svg')
    .attr('width', diameter)
    .attr('height', diameter)
    .attr('class', 'bubble')
    .style('padding', '50px');

  var node = d3.select('.bubble')
    .selectAll('.node')
    .data(bubble.nodes(dataset)
      .filter(function(d) {
        return !d.children;
      }));

  node
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });

  node.append('circle')
    .attr('class', 'circle')
    .attr('r', function(d) {
      return d.r;
    })
    .style('fill', '#4682b4');

  node.append('text')
    .attr('class', 'artist')
    .attr('dy', '.1em')
    .style('text-anchor', 'middle')
    .style('fill', 'white')
    .text(function(d) {
      return d.name
    });

  node.append('text')
    .attr('class', 'playcount')
    .attr('id', function(d) {
      return d.key;
    })
    .attr('dy', '1.5em')
    .style('text-anchor', 'middle')
    .style('fill', 'none')
    .text(function(d) {
      return d.value
    });

  d3.selectAll('.node')
    .on('mouseover', function(d) {
      var node = d3.select(this).style('fill', '#a52a2a');
      node.select('text.playcount').style('fill', 'white');
    })
    .on('mouseout', function(d) {
      var node = d3.select(this);
      node.select('text.playcount').style('fill', 'none');
    });

};
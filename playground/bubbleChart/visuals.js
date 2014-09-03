
var diameter = 700,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&period=7day&limit=5';

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.json(url, function(error, root) {
  console.log(root);
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root['topartists']['artist']))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.name + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name; });
});

//Returns a flattened hierarchy containing all leaf nodes under the root.
// function classes(root) {
//   var classes = [];

//   function recurse(name, node) {
//     console.log(node);
//     if (node.artist) node.artist.forEach(function(child) { recurse(node.name, child); });
//     else classes.push({name: node.name, playcount: node.playcount});
//   }

//   recurse(null, root);
//   return {artist: classes};
// }

function classes(info){
  var classes = [];
  for (item in info){
    console.log(info[item]['name']);
    classes.push({key: item, name: info[item]['name'], value: parseInt(info[item]['playcount'])});
  }
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
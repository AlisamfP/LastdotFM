var diameter = 500,
    format = d3.format(",d"),
    dataSource = 2;
var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
    .value(function(d) { return d.size; });
var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter);

var data = getData();

var vis = svg.selectAll(".node")
    .data(pack.nodes).filter(function(d) { return !d.children; })
   .enter()
    .append("g");

var titles = vis.append("title")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .text(function(d) { return d.name +
        (d.children ? "" : ": " + format(d.value)); });

var circles = vis.append("circle")
    .attr("stroke", "black")
    .style("fill", 'blue')
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; });

updateVis();

function updateVis() {
    var data1 = pack.nodes(data);

    titles.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .text(function(d) { return d.name +
            (d.children ? "" : ": " + format(d.value)); });

    circles.transition()
        .duration(5000)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; });
};
function classes(info){
  var array = [];
  for (item in info){
    array.push({key: item, name: info[item]['name'], value: parseInt(info[item]['playcount'])});
  }
  console.log(array);
  return {children: array};
}

function getData() {
  d3.json('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&period=overall&limit=5',
    function(error, json) {
      if (error) return console.warn(error);
      dataset = classes(json['topartists']['artist']);
      return dataset;
    })
};
// d3.select(self.frameElement).style("height", diameter + "px");
var diameter = 600,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5)
    .value(function(d){ return d.value; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");


function init(){
    d3.select('#generate')
      .on('click', getData);

};

function getData(){
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
      dataset = classes(json['topartists']['artist']);
      return update(dataset);
    });
};

function classes(info){
  var array = [];
  for (item in info){
    array.push({key: item, name: info[item]['name'], value: parseInt(info[item]['playcount'])});
  }
  return {children: array};
}

function update(dataset){
  var node = svg.selectAll('.node')
  .data(bubble.nodes(dataset)
  .filter(function(d) { return !d.children; }));

  node
  .enter().append('g')
  .attr('class', 'node')
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
    .attr('r', function(d){ return d.r; })
    .style("fill", '#4682b4');
    
  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name  });
};


init();
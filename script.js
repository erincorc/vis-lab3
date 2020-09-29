//load data initially
let content;

d3.csv('cities.csv').then(data => {
    console.log('cities ', data);
  }) 
  
  // correct datatype
  d3.csv('cities.csv', d=>{
    return {
      ...d, // spread operator
      eu: d.eu==='true', // convert to boolean
      population: +d.population,
      x: +d.x,
      y: +d.y,
    }
  }).then(data=>{
      console.log('cities', data);
      content=data;
  })


let euro;
let circ;
let bigCities;
let text;
const width = 700;
const height = 550; 
d3.csv('cities.csv').then(function(data) {
    euro = content.filter(c => c.eu == true); //filter out any non-EU countries
    console.log(euro);
}).then(function(d) {
  d3.select('.city-count').text('Number of European cities: ' + 28);
 // const width = 700;
 // const height = 550;
  const svg = d3.select('.population-plot')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
circ = svg.selectAll("population-plot")
      .data(euro)
      .enter()
      .append("circle")
      .attr('cx', euro=>{
        return euro.x;
      })
      .attr('cy', euro=> {
        return euro.y;
      })
      .attr('r', euro => {
        if (euro.population < 1000000) return 4;
        else return 8;
      });
bigCities = euro.filter(e => (e.eu == true && e.population >= 1000000));

// maybe add tooltip?

// city labels 
text = circ.select("text")
      .data(bigCities)
      .enter()
      .append("text")
      .attr('x', bigCities => bigCities.x)
      .attr('y', bigCities => bigCities.y-10)
      .text( bigCities =>bigCities.city)
      .attr('font-size', "11px")
      .attr('text-anchor', 'middle')
      .attr('fill', 'red');   
});

// now bar chart:

//load data
let buildings;
d3.csv('buildings.csv').then(b => {
  buildings = b;
  console.log('building info ', b);
}).then(b =>{ //sort data
  buildings.sort(function(a,b){
    return b.height_m - a.height_m;
  })
  console.log('buildings', buildings);
});








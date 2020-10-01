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
      })
      .attr("fill", euro=> {
        if (euro.population >= 1000000) return "blue";
        else return "gray";
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
      .attr('font-size', "11.5px")
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('fill', 'red');   
});

// now bar chart:

//load data
let buildings;
let bars;
let bartext;
let heighttext;
let labeltext;
let interact;
const barheight = 500;
const barwidth = 500;

d3.csv('buildings.csv').then(b => {
  buildings = b;
  console.log('building info ', b);
}).then(b =>{ //sort data
  buildings.sort(function(a,b){
    return b.height_m - a.height_m;
  })
  console.log('buildings', buildings);
}).then(b => {
  d3.select('.buildings-intro').text('Here are the tallest buildings in the world!'); // add some text to break up page
  const svg2 = d3.select('.building-height')
      .append('svg')
      .attr('width', barwidth)
      .attr('height', barheight)
  bars = svg2.selectAll('.bar')
  //bars = svg2.selectAll('building-height')
      .data(buildings)
      .enter()
      .append("rect")
      .attr("width", buildings=>buildings.height_px)
      .attr("height", 40)
      .attr("x", 250)
      .attr("y", function(buildings,i){
        return 45*(i+1);
      })
      .attr("fill", "green")
      //.append('rect')
      .attr('class', 'bar')
      .on("click", (b) => {
        console.log(b);
        let build = b.path[0].__data__;
        console.log(build);
        d3.select(".image")
          .attr('src', (b,i) => {
            return 'img/'+build.image});
        d3.select(".building-name")
          .text(b => build.building)
          .attr('text-anchor', 'middle');
        d3.select(".height")
          .text(b=>build.height_ft);
        d3.select(".city")
          .text(b=>build.city);
        d3.select(".country")
          .text(b=>build.country);
        d3.select(".floors")
          .text(b=>build.floors);
        d3.select(".completed")
          .text(b=>build.completed);
      }) ;

bartext = bars.select("text")
      .data(buildings)
      .enter()
      .append("text")
      .attr('x', 240)
      .attr('y', function(buildings,i){
        return 45*(i+1)+22.5;
      })
      .attr('text-anchor', 'end')
      .attr('fill', 'gray')
      .text(buildings => buildings.building);

heighttext = bars.select("text")
      .data(buildings)
      .enter()
      .append("text")
      .attr('x', 340)
      .attr('y', function(buildings,i){
        return 45*(i+1)+22.5;
      })
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .text(buildings=> {
        return buildings.height_ft + " ft"
      });
    
    });
  



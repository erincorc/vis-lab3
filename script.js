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
d3.csv('cities.csv', function(error, d){
    euro = content.filter(c => c.eu == true); //filter out any non-EU countries
    console.log(euro);
}).then(function(d) {
  d3.select('.city-count').text('Number of cities: ').text(28);
  const width = 700;
  const height = 550;
  const svg = d3.select('.population-plot')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
let circ = svg.selectAll("population-plot")
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

})






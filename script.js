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
d3.csv('cities.csv', d=>{
  euro = content.filter(c => c.eu == true); //filter out any non-EU countries
}).then(function(d) {
  console.log(euro);
})

d3.select('.city-count').text(28);
const width = 700;
const height = 550;
const svg = d3.select('.population-plot')
		.append('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll()




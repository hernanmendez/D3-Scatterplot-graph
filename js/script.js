function callback(Data){
    Data=Data.data;
    d3.select('#app')
      .append('svg')
        .attr('width',1000)
        .attr('height',500)
      .append('g')
        .attr('width',800)
        .attr('height',400)
        .attr('transform','translate(100,50)')
        .attr('class','graph');
    
    d3.select('svg')
      .append('g')
        .attr('class','axes');

    var graph = d3.select('.graph');
    var height = 400;
    var width = 800;
    var axes = d3.select('axes');
    var tooltip = document.getElementById('tooltip');

    
}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(callback)
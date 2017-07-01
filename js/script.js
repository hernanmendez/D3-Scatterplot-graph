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
    var axes = d3.select('.axes');
    var tooltip = document.getElementById('tooltip');

    var scaleY = d3.scaleLinear()
        .domain([0,35])
        .range([0,height])
    
    
    var dataTime = Data.map(function(info){return (parseInt(info.Time.slice(0,2))*60 + parseInt(info.Time[3]+info.Time[4]))});
    
    var scaleX = d3.scaleLinear()
        .domain([d3.max(dataTime),d3.min(dataTime)])
        .range([0,width])
        
    d3.select('.graph')
        .selectAll('circle')
        .data(Data)
      .enter().append('circle')
        .attr('cy',function(d){return scaleY(d.Place)})
        .attr('cx',function(d,i){return scaleX(dataTime[i])})
        .attr('r',7)
        .on('mouseover',function(d,i){

            tooltip.style.display="block";

            tooltip.innerHTML=d.Name + ' : '+d.Nationality+"<br/><p>"+d.Doping+'</p>';

            tooltip.style.top=65+parseInt(scaleY(d.Place),10) + 'px';
            if(window.innerWidth>1000) tooltip.style.left=50+parseInt(scaleX(dataTime[i]),10)+ (window.innerWidth-1000)/2 + 'px';
            else tooltip.style.left=50+parseInt(scaleX(dataTime[i]),10) + 'px';

        })
        .on('mouseout',function(){
            tooltip.style.display='none';
        })
        .style('fill',function(d){if(d.Doping)return 'red'; return 'grey'})
}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(callback)
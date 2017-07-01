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
        .attr('class','axes')
      .append('line')
        .attr('x1',99)
        .attr('x2',99)
        .attr('y1',49)
        .attr('y2',450);
    
    d3.select('.axes')
      .append('line')
        .attr('x1',99)
        .attr('x2',906)
        .attr('y1',450)
        .attr('y2',450);
    
    d3.select('.axes')
      .append('g')
        .attr('id','g1')

    d3.select('.axes')
      .append('g')
        .attr('id','g2')

    var graph = d3.select('.graph');
    var height = 400;
    var width = 800;
    var axes = d3.select('.axes');
    var tooltip = document.getElementById('tooltip');

    var scaleY = d3.scaleLinear()
        .domain([1,35])
        .range([0,height-10])
    
    
    var dataTime = Data.map(function(info){return (parseInt(info.Time.slice(0,2))*60 + parseInt(info.Time[3]+info.Time[4]))});
    
    var scaleX = d3.scaleLinear()
        .domain([d3.max(dataTime)+60,d3.min(dataTime)])
        .range([10,width])
        
    d3.select('.graph')
        .selectAll('circle')
        .data(Data)
      .enter().append('circle')
        .attr('cy',function(d){return scaleY(d.Place)})
        .attr('cx',function(d,i){return scaleX(dataTime[i])})
        .attr('r',7)
        .on('mouseover',function(d,i){

            tooltip.style.display="block";
            if(d.Doping) tooltip.innerHTML=d.Name + ' : '+d.Nationality+"<br/>Doping: True"+"<br/>Time: "+d.Time+"<p>"+d.Doping+'</p>';
            else tooltip.innerHTML=d.Name + ' : '+d.Nationality+"<br/>Doping: False"+"<br/>Time: "+d.Time;

            tooltip.style.top=65+parseInt(scaleY(d.Place),10) + 'px';
            if(window.innerWidth>1000) tooltip.style.left=50+parseInt(scaleX(dataTime[i]),10)+ (window.innerWidth-1000)/2 + 'px';
            else tooltip.style.left=50+parseInt(scaleX(dataTime[i]),10) + 'px';

        })
        .on('mouseout',function(){
            tooltip.style.display='none';
        })
        .style('fill',function(d){if(d.Doping)return 'red'; return 'grey'});

    var nums=[1,5,10,15,20,25,30,35];

    axes
        .select('#g1')
        .selectAll('g')
        .data(nums)
      .enter().append('g')
      .append('text')
        .text(function(d){return d})
        .attr('x',92)
        .attr('y',function(d){return parseInt(scaleY(d),10)+54;});

    axes
        .select('#g1')
        .selectAll('g')
        .selectAll('line')
        .data(nums)
      .enter().append('line')
        .attr('x1','92')
        .attr('x2','97')
        .attr('y1',function(d){return parseInt(scaleY(d),10)+50;})
        .attr('y2',function(d){return parseInt(scaleY(d),10)+50;});

    axes
        .select('#g2')
        .selectAll('g')
        .data(['4:00','3:00','2:00','1:00','0:00'])
      .enter().append('g')
      .append('text')
        .style('text-anchor','middle')
        .text(function(d){return d})
        .attr('x',function(d){return parseInt(scaleX(dataTime[0]+parseInt(d[0],10)*60),10)+104;})
        .attr('y',470);
    
    axes
        .select('#g2')
        .selectAll('g')
        .selectAll('line')
        .data(['4:00','3:00','2:00','1:00','0:00'])
      .enter().append('line')
        .attr('x1',function(d){return parseInt(scaleX(dataTime[0]+parseInt(d[0],10)*60),10)+104;})
        .attr('x2',function(d){return parseInt(scaleX(dataTime[0]+parseInt(d[0],10)*60),10)+104;})
        .attr('y1',452)
        .attr('y2',460);
    
    axes
      .append('text')
        .text('Minutes Behind Fastest Time')
        .style('text-anchor','middle')
        .attr('x',500)
        .attr('y',486)

    axes
      .append('text')
        .text('Ranking')
        .style('text-anchor','middle')
        .style('writing-mode','tb')
        .attr('x',110)
        .attr('y',90)

    axes
      .append('text')
        .text("Doping in Professional Bicycle Racing - 35 Fastest times up Alpe d'Huez")
        .style('text-anchor','middle')
        .attr('x',500)
        .attr('y',30)
}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(callback)
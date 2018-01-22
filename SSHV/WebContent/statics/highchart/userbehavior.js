$(document).ready(function() {  
   var chart = {
       plotBackgroundColor: null,
       plotBorderWidth: null,
       plotShadow: false,
       options3d: {
         enabled: true,
         alpha: 45,
         beta: 0,
      }
   };
   var title = {
      text: '根据用户uerid得到用户行为分析图'   
   };  
    var subtitle = {
        text: '用户兴趣图谱挖掘'
   }
   var tooltip = {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   };
   var plotOptions = {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            style: {
               color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
         }
      }
   };
   var series= [{
      type: 'pie',
      name: '用户行为权重分析比例',
      data: [
         ['社会热点',   45.0],
         ['教育',       26.8],
         {
            name: '冒险旅游',
            y: 12.8,
            sliced: true,
            selected: true
         },
         ['经济金融',    8.5],
         ['电影',     6.2],
         ['小品',   0.7]
      ]
   }];     
     
   var json = {};   
   json.chart = chart; 
   json.title = title;  
   json.subtitle=subtitle;
   json.tooltip = tooltip;  
   json.series = series;
   json.plotOptions = plotOptions;
   $('#container').highcharts(json);  
});
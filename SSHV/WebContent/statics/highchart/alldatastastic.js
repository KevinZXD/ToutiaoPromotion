	$(document).ready(function() {  
   var chart = {
      type: 'column'
   };
   var title = {
      text: '最近这个星期的数据搜集量统计'   
   };
   var subtitle = {
      text: '今日头条数据群量分析'  
   };
   var xAxis = {
      categories: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
      crosshair: true
   };
   var yAxis = {
      min: 0,
      title: {
         text: '数据记录条数(单位/10条)'         
      }      
   };
   var tooltip = {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
         '<td style="padding:0"><b>{point.y:.1f} 单位数量</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
   };
   var plotOptions = {
      column: {
         pointPadding: 0.2,
         borderWidth: 0
      }
   };  
   var credits = {
      enabled: false
   };
   
   var series= [{
        name: '短视频',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
        }, {
            name: '热点资讯',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]
        }, {
            name: '今日美图',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0]
        }];     
      
   var json = {};   
   json.chart = chart; 
   json.title = title;   
   json.subtitle = subtitle; 
   json.tooltip = tooltip;
   json.xAxis = xAxis;
   json.yAxis = yAxis;  
   json.series = series;
   json.plotOptions = plotOptions;  
   json.credits = credits;
   $('#container').highcharts(json);
  
});
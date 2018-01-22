$(document).ready(function() {
   var title = {
       text: '最近十二天的自动化信息群搜集展示'   
   };
   var subtitle = {
        text: '信息群数据量统计'
   };
  var xAxis = {
   categories: ['一号', '二号', '三号', '四号', '五号', '六号'
      ,'七号', '八号', '九号', '十号', '十一号', '十二号']
};
   var yAxis = {
      title: {
         text: '数据记录条数（单位/10条）'
      },
      plotLines: [{
         value: 0,
         width: 2,
         color: '#808080'
      }]
   };   

   var tooltip = {
      valueSuffix: '单位数目'
   }

   var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
   };

   var series =  [
      {
         name: '短视频',
         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
            26.5, 23.3, 18.3, 13.9, 9.6]
      }, 
      {
         name: '热点资讯',
         data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
            24.1, 20.1, 14.1, 8.6, 2.5]
      }, 
      {
         name: '今日美图',
         data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6,
            17.9, 14.3, 9.0, 3.9, 1.0]
      }, 
      
   ];

   var json = {};

   json.title = title;
   json.subtitle = subtitle;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.tooltip = tooltip;
   json.legend = legend;
   json.series = series;
    

   $('#container').highcharts(json);
});
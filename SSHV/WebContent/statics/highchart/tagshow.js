$(document).ready(function() {    

    var data = {
		"头条推荐系统算法标签库展示": {
			"短视频": {
				"TagName": "75.5",
					"TagKeys": "289.0",
					"TagID": "301.2"
			},
				"社会": {
				"TagKeys": "248.9",
					"TagID": "64.0",
					"TagName": "234.6"
			},
				"娱乐": {
				"TagName": "116.4",
					"TagKeys": "302.0",
					"TagID": "108.7"
			},
				"科技": {
				"TagKeys": "135.0",
					"TagID": "32",
					"TagName": "59.2"
			},
				"汽车": {
				"TagKeys": "191.9",
					"TagID": "251.4",
					"TagName": "117.3"
			},
				"体育": {
				"TagKeys": "312",
					"TagID": "272.8",
					"TagName": "186.9"
			},
				"经济": {
				"TagKeys": "272.8",
					"TagName": "123.3",
					"TagID": "149.1"
			},
				"军事": {
				"TagID": "278.1",
					"TagKeys": "388.7",
					"TagName": "251.8"
			},
				"国际": {
				"TagKeys": "269.2",
					"TagID": "170.5",
					"TagName": "343.5"
			},
				"片段插曲": {
				"TagName": "253.0",
					"TagKeys": "215.9",
					"TagID": "182.3"
			},
				"搞笑段子": {
				"TagKeys": "249.3",
					"TagID": "180.1",
					"TagName": "162.4"
			},
					"健康": {
				"TagKeys": "149.3",
					"TagID": "180.1",
					"TagName": "162.4"
			}
					,
					"短视频": {
				"TagKeys": "249.3",
					"TagID": "80.1",
					"TagName": "162.4"
			},
					"动物": {
				"TagKeys": "149.3",
					"TagID": "180.1",
					"TagName": "162.4"
			},
					"教育": {
				"TagKeys": "149.3",
					"TagID": "80.1",
					"TagName": "162.4"
			},
					"购物": {
				"TagKeys": "249.3",
					"TagID": "180.1",
					"TagName": "162.4"
			},
					"音乐": {
				"TagKeys": "249.3",
					"TagID": "80.1",
					"TagName": "162.4"
			}
		
	
		}
	};
	var points = [],
		region_p,
		region_val,
		region_i,
		country_p,
		country_i,
		cause_p,
		cause_i,
		cause_name = [];
	cause_name['TagID'] = 'TagID';
	cause_name['TagName'] = 'TagName';
	cause_name['TagKeys'] = 'TagKeys';
	region_i = 0;
	for (var region in data) {
		region_val = 0;
		region_p = {
			id: "id_" + region_i,
			name: region,
			color: Highcharts.getOptions().colors[region_i]
		};
		country_i = 0;
		for (var country in data[region]) {
			country_p = {
				id: region_p.id + "_" + country_i,
				name: country,
				parent: region_p.id
			};
			points.push(country_p);
			cause_i = 0;
			for (var cause in data[region][country]) {
				cause_p = {
					id: country_p.id + "_" + cause_i,
					name: cause_name[cause],
					parent: country_p.id,
					value: Math.round(+data[region][country][cause])
				};
				region_val += cause_p.value;
				points.push(cause_p);
				cause_i++;
			}
			country_i++;
		}
		region_p.value = Math.round(region_val / country_i);
		points.push(region_p);
		region_i++;
	}
   var chart = {
      renderTo: 'container'
   };

   var title = {
      text: '标签库匹配说明'   
   };        
   
   var subtitle = {
      text: '通过点击钻入，获取更详细数据说明'
   };
   
   var series = [{
      type: "treemap",
      layoutAlgorithm: 'squarified',
      allowDrillToNode: true,
      dataLabels: {
         enabled: false
      },
      levelIsConstant: false,
      levels: [{
         level: 1,
         dataLabels: {
            enabled: true
         },
      borderWidth: 3
      }],
      data: points
   }]; 
      
   var json = {};     
   json.title = title;    
   json.subtitle = subtitle;     
   json.series = series;       
   
   $('#container').highcharts(json);
});
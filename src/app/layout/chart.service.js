(function() {
  'use strict';

  angular
    .module('app.layout')
    .factory('chartService', chartService);

  chartService.$inject = ['$filter'];

  function chartService($filter) {
    var service = {
      getChartData: getChartData
    };

    return service;

    function getForecastData(forecasts) {
      var days = [];
      var minTemp = [];
      var maxTemp = [];
      var data = [];

      for (var i = 0; i < forecasts.length; i++) {
        days.push($filter('date')(new Date(forecasts[i].date * 1000), 'EEE'));
        minTemp.push(forecasts[i].tempMin);
        maxTemp.push(forecasts[i].tempMax);
      }
      data = [{
        days: days,
        minTemp: minTemp,
        maxTemp: maxTemp
      }];
      return data;
    }

    function getChartData(forecasts) {
      var chartData = [];
      var chartOptions = [];
      var areaChartCanvas = $('#temperature-chart').get(0).getContext('2d');
      var areaChart = new Chart(areaChartCanvas);
      var data = getForecastData(forecasts);

      chartData = {
        labels: data[0].days,
        datasets: [
          {
            label: 'Temperatura máxima',
            fillColor: "#dd4b39",
            strokeColor: "rgba(210, 214, 222, 1)",
            pointColor: "rgba(210, 214, 222, 1)",
            pointStrokeColor: "#c1c7d1",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data[0].maxTemp
          },
          {
            label: 'Temperatura mínima',
            fillColor: "#3c8dbc",
            strokeColor: "rgba(60,141,188,0.8)",
            pointColor: "rgba(210, 214, 222, 1)",
            pointStrokeColor: "rgba(60,141,188,1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(60,141,188,1)",
            data: data[0].minTemp
          }
        ]
      };

      chartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve: true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        //Boolean - Whether to show a dot for each point
        pointDot: true,
        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        //Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        //String - A legend template
        legendTemplate: "<ul class='chart-legend'><li><span style='background-color: #c1c7d1'></span>label1</li><li><span style='background-color: #3b8bba'></span>label1</li></ul>",
        //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true
      };
      areaChart.Line(chartData, chartOptions);
    }

  }
})();

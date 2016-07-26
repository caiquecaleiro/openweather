(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('temperatureChart', temperatureChart);

  function temperatureChart() {
    return {
      templateUrl: 'app/layout/chart.html',
      restrict: 'E',
      controller: TemperatureChartController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        loading: '='
      },
    };
  }

  function TemperatureChartController() {
    var vm = this;
  }
})();

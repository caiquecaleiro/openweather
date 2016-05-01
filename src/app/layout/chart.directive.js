(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('temperatureChart', temperatureChart);

  function temperatureChart() {
    return {
      templateUrl: 'app/layout/chart.html',
      restrict: 'E',
      scope: {},
      controller: ChartController,
      controllerAs: 'vm'
    }

    function ChartController() {

    }
  }
})();

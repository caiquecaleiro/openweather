(function() {
  'use strict';

  angular
    .module('app.weather')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider
      .when('/weather', {
        templateUrl: 'app/weather/weather.html',
        controller: 'WeatherController',
        controllerAs: 'vm'
      });
  }
})();

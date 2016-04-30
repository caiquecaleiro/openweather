(function() {
  'use strict';

  angular
    .module('app.weather')
    .controller('WeatherController', WeatherController);

  WeatherController.$inject = ['weatherService'];

  function WeatherController(weatherService) {
    var vm = this;
    vm.city = 'Blumenau';
    vm.state = 'SC';
    vm.getWeatherData = getWeatherData;
    vm.recommendation = false;
    vm.forecasts = [];

    function getWeatherData(city) {
      weatherService.getWeatherData(city)
        .success(function(data) {
          buildForecasts(data);
        });
    }

    function buildForecasts(data) {
      weatherService.buildForecasts(vm.forecasts, data);
    }
  }
})();

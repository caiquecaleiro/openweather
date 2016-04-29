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
    vm.recomendation
    vm.forecasts = [];
    vm.tempMin = 0;
    vm.tempMax = 0;
    vm.tempDay = 0;

    function getWeatherData(city, state) {
      weatherService.getWeatherData(city, state)
        .success(function(data) {
          buildForecasts(data);
        });
    }

    function buildForecasts(data) {
      weatherService.buildForecasts(vm.forecasts, data);
    }
  }
})();

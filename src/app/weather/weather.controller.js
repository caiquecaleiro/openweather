(function() {
  'use strict';

  angular
    .module('app.weather')
    .controller('WeatherController', WeatherController);

  WeatherController.$inject = ['weatherService'];

  function WeatherController(weatherService) {
    var vm = this;
  }
})();

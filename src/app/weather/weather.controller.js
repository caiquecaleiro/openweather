(function() {
  'use strict';

  angular
    .module('app.weather')
    .controller('WeatherController', WeatherController);

  WeatherController.$inject = ['weatherService', 'locationService', 'initialData'];

  function WeatherController(weatherService, locationService, initialData) {
    var vm = this;
    vm.states = locationService.getStates();
    vm.cities = locationService.getCities();
    vm.saveFavourite = saveFavourite;
    vm.getWeatherData = getWeatherData;
    vm.recommendation = false;
    vm.forecasts = [];
    checkLocalStorage();
    getWeatherData(vm.selectedCity);

    function getWeatherData(city) {
      weatherService.getWeatherData(city.name)
        .success(function(data) {
          buildForecasts(data);
        });
    }

    function buildForecasts(data) {
      vm.forecasts = weatherService.buildForecasts(vm.forecasts, data);
    }

    /**
     * Checks whether there is data available in cache and use it to select the
     * state and the city. Otherwise, it will use the default values from the
     * initialData constant.
     */
    function checkLocalStorage() {
      if (angular.isUndefined(localStorage.state) && angular.isUndefined(localStorage.city)) {
        vm.selectedState = initialData.SANTA_CATARINA;
        vm.selectedCity = initialData.BLUMENAU;
      } else {
        vm.selectedState = vm.states[localStorage.state];
        vm.selectedCity = vm.cities[localStorage.city];
      }
    }

    /**
     * Whether the state and city are selected, it stores both in cache.
     * Otherwise, it shows a message for the user.
     */
    function saveFavourite(state, city) {
      if (angular.isUndefined(state) && angular.isUndefined(city)) {
        // define some error
      } else {
        localStorage.state = vm.states.indexOf(vm.selectedState);
        localStorage.city = vm.cities.indexOf(vm.selectedCity);
      }
    }
  }
})();

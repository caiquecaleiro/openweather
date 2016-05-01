(function() {
  'use strict';

  angular
    .module('app.weather')
    .controller('WeatherController', WeatherController);

  WeatherController.$inject = ['weatherService', 'locationService', 'chartService', 'initialData'];

  function WeatherController(weatherService, locationService, chartService, initialData) {
    var vm = this;
    vm.states = locationService.getStates();
    vm.cities = locationService.getCities();
    vm.tempMax = 0;
    vm.tempMin = 0;
    vm.dateMax;
    vm.dateMin;
    vm.saveFavourite = saveFavourite;
    vm.getWeatherData = getWeatherData;
    vm.changeState = changeState;
    vm.recommendation = false;
    vm.recommendationText = '';
    vm.loadingData = true;
    vm.forecasts = [];

    checkLocalStorage();
    getWeatherData();

    /**
     * Checks if both state and city are selected and then it requests the weatherService
     * data from service.
     */
    function getWeatherData() {
      if (vm.selectedCity && vm.selectedState) {
        vm.loadingData = true;
        weatherService.getWeatherData(vm.selectedCity.name)
          .success(function(data) {
            buildForecasts(data);
            vm.loadingData = false;
          });
      }
    }

    /**
     *
     * @param {object} data - The weather data.
     */
    function buildForecasts(data) {
      vm.forecasts = weatherService.buildForecasts(vm.forecasts, data);
      showAdditionalData(vm.forecasts);
    }

    /**
     * Checks the maximum and minimum temperature between the forecasts, then
     * updates these data for the user.
     * @param {object} forecasts - The forecasts array.
     */
    function showAdditionalData(forecasts) {
      var weatherData = weatherService.getAdditionalData(forecasts)[0];
      vm.tempMax = weatherData.tempMax;
      vm.tempMin = weatherData.tempMin;
      vm.dateMax = weatherData.dateMax;
      vm.dateMin = weatherData.dateMin;
      vm.recommendation = weatherData.recommendation;
      vm.recommendationText = weatherData.recommendationText;
      chartService.getChartData(forecasts);
    }

    /**
     * Checks whether there is data available in cache and use it to select the
     * state and the city. Otherwise, it will use the default values from the
     * initialData constant.
     */
    function checkLocalStorage() {
      if (angular.isUndefined(localStorage.state) && angular.isUndefined(localStorage.city)) {
        vm.selectedState = vm.states[initialData.SANTA_CATARINA];
        vm.selectedCity = vm.cities[initialData.BLUMENAU];
      } else {
        vm.selectedState = vm.states[localStorage.state];
        vm.selectedCity = vm.cities[localStorage.city];
      }
    }

    /**
     * Stores the selected state and selected city as favourite in cache.
     */
    function saveFavourite() {
      if (vm.selectedState && vm.selectedCity) {
        localStorage.state = vm.states.indexOf(vm.selectedState);
        localStorage.city = vm.cities.indexOf(vm.selectedCity);
      }
    }

    // TODO: Check the states and cities filters.
    function changeState() {
      if (!vm.selectedState) {
        vm.selectedCity = '';
      }
    }
  }
})();

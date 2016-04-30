(function() {
  'use strict';

  angular
    .module('app.weather')
    .factory('weatherService', weatherService);

  weatherService.$inject = ['$http'];

  function weatherService($http) {
    var service = {
      getWeatherData: getWeatherData,
      buildForecasts: buildForecasts
    };

    return service;

    /**
    * Returns the forecast data of today and the next 6 days.
    * @param {string} city - The city name.
    * @returns {json} The forecast data as json
    */
    function getWeatherData(city) {
      var apiKey = '&APPID=0e6bfb61dab954b920834902e14fa852';
      var units = '&units=metric';
      var mode = '&mode=json';
      var callback = '&callback=JSON_CALLBACK';
      var days = '&cnt=7';
      var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',br'
        + mode + units + days + apiKey + callback;

      return $http.jsonp(url);
    }

    /**
     * Checks all the forecasts data and creates new Forecast object that is added
     * to the forecasts object.
     * @param {object} forecasts - The forecasts object.
     * @param {object} data - The forecast data.
     */
    function buildForecasts(forecasts, data) {
      if (forecasts.length > 0) {
        forecasts = [];
      }

      for (var i = 0; i < data.list.length; i++) {
        var forecastData = data.list[i].temp;
        forecasts.push(new Forecast(forecastData.min,
          forecastData.max,
          forecastData.day
        ));
      }
      // add method for weekends temperature??
    }

    /**
     * Converts timestamp to date.
     * @param {number} date - The Unix timestamp value.
     * @returns {Date}
     */
    function timestampToDate(date) {
      return new Date(date * 1000);
    }

    /**
     * Represents a forecast
     * @constructor
     * @param {number} tempMin - The minimum temperature.
     * @param {number} tempMax - The maximum temperature.
     * @param {number} tempDay - The current temperature.
     */
    function Forecast(tempMin, tempMax, tempDay) {
      this.tempMin = tempMin;
      this.tempMax = tempMax;
      this.tempDay = tempDay;
    }
  }
})();

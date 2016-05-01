(function() {
  'use strict';

  angular
    .module('app.weather')
    .factory('weatherService', weatherService);

  weatherService.$inject = ['$http'];

  function weatherService($http) {
    var service = {
      getWeatherData: getWeatherData,
      buildForecasts: buildForecasts,
      getHighestLowestTempData: getHighestLowestTempData
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
      var lang = "&lang=pt";
      var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',br'
        + mode + units + days + lang + apiKey + callback;

      return $http.jsonp(url);
    }

    /**
     * Checks all the forecasts data and creates new Forecast object that is added
     * to the forecasts object.
     * @param {object} forecasts - The forecasts object.
     * @param {object} data - The forecast data.
     * @returns {forecasts}
     */
    function buildForecasts(forecasts, data) {
      if (forecasts.length > 0) {
        forecasts = [];
      }

      for (var i = 0; i < data.list.length; i++) {
        var forecastData = data.list[i];
        forecasts.push(new Forecast(forecastData.temp.min,
          forecastData.temp.max,
          forecastData.dt
        ));
      }
      return forecasts;
      // add method for weekends temperature??
    }

    /**
     * Checks the maximum and minimum temperature between the forecasts.
     * @param {object} forecasts - The forecasts array.
     * @returns {object}
     */
    function getHighestLowestTempData(forecasts) {
      var temperatureData = [];
      var tempMin = 99;
      var tempMax = -99;
      var dateMin;
      var dateMax;

      for (var i = 0; i < forecasts.length; i++) {
        var forecast = forecasts[i];

        if (forecast.tempMin < tempMin) {
          tempMin = forecast.tempMin;
          dateMin = forecast.date;
        }

        if (forecast.tempMax > tempMax) {
          tempMax = forecast.tempMax;
          dateMax = forecast.date;
        }
      }
      temperatureData = [{tempMin: tempMin, dateMin, tempMax: tempMax, dateMax}];
      return temperatureData;
    }

    function weekendRecommendation(currentDate, currentForecast, recommendation) {
      recommendation = currentDate > 5 && (currentForecast.tempDay >= 25 || currentForecast.tempMax >= 25);
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
     * @param {number} date - The date.
     */
    function Forecast(tempMin, tempMax, date) {
      this.tempMin = tempMin;
      this.tempMax = tempMax;
      this.date = date;
    }
  }
})();

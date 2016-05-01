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
      getAdditionalData: getAdditionalData
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
    }

    /**
     * Checks the maximum and minimum temperature between the forecasts. Also,
     * checks if there is a good day to go to the beach (at least 25ºC).
     * @param {object} forecasts - The forecasts array.
     * @returns {object} tempMin, tempMax and recommendation.
     */
    function getAdditionalData(forecasts) {
      var temperatureData = [];
      var recommendation = false;
      var recommendationText = '';
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
      recommendation = tempMin >= 25 || tempMax >= 25;
      recommendationText = getRecommendationText(recommendation, tempMax);

      temperatureData = [{
        tempMin: tempMin, dateMin,
        tempMax: tempMax, dateMax,
        recommendation: recommendation,
        recommendationText: recommendationText
      }];
      return temperatureData;
    }

    /**
     * Checks whether the recommendation is positive for beach or not. Then,
     * returns the recommendation text.
     * @param {boolean} recommendation - The recommendation (go to the beach).
     * @param {number} tempMax - The maximum temperature between the forecasts.
     */
    function getRecommendationText(recommendation, tempMax) {
      var positive = 'É um ótimo dia para ir à praia. A temperatura máxima é de ' + tempMax + ' °C.';
      var negative = 'A temperatura máxima é de ' + tempMax + ' °C. Talvez não seja o melhor dia para ir à praia.';
      return recommendation ? positive : negative;
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

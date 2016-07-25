(function() {
  'use strict';

  angular
    .module('app.weather')
    .factory('weatherService', weatherService);

  weatherService.$inject = ['$http', 'weekendDays'];

  function weatherService($http, weekendDays) {
    var currentDay = '';
    var service = {
      getWeatherData: getWeatherData,
      buildForecasts: buildForecasts,
      getAdditionalData: getAdditionalData
    };

    return service;

    /**
    * Returns the forecast data of today and the next 6 days.
    * @param {string} city - The city name.
    * @returns {json} The forecast data as json.
    */
    function getWeatherData(city) {
      var apiKey = '&APPID=0e6bfb61dab954b920834902e14fa852';
      var units = '&units=metric';
      var mode = '&mode=json';
      var callback = '&callback=JSON_CALLBACK';
      var days = '&cnt=7';
      var lang = "&lang=pt";
      var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',br' +
        mode + units + days + lang + apiKey + callback;

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
          forecastData.dt,
          forecastData.weather[0].icon + '.png'
        ));
      }
      return forecasts;
    }

    /**
     * Checks the maximum and minimum temperature between the forecasts. Also,
     * checks if the weekend is good to go to the beach (at least 25ºC).
     * @param {object} forecasts - The forecasts array.
     * @returns {object} tempMin, tempMax, recommendation and recommendationText.
     */
    function getAdditionalData(forecasts) {
      var temperatureData = [];
      var saturdayData = [];
      var sundayData = [];
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

        if (isWeekend(forecast.date)) {
          if (currentDay == weekendDays.SATURDAY) {
            saturdayData.push({
              tempMax: forecast.tempMax,
              tempMin: forecast.tempMin
            });
          } else if (currentDay == weekendDays.SUNDAY) {
            sundayData.push({
              tempMax: forecast.tempMax,
              tempMin: forecast.tempMin
            });
          }
        }
      }
      recommendation = getRecommendation(saturdayData, sundayData);
      recommendationText = getRecommendationText(recommendation, tempMax);

      temperatureData = {
        tempMin: tempMin,
        dateMin: dateMin,
        tempMax: tempMax,
        dateMax: dateMax,
        recommendation: recommendation,
        recommendationText: recommendationText
      };
      return temperatureData;
    }

    /**
     * Checks whether the current date is Saturday or Sunday. If true, sets the
     * currentDay variable value.
     * @param {number} currentDate - The current date in Unix timestamp.
     * @returns {boolean}
     */
    function isWeekend(currentDate) {
      var date = new Date(currentDate * 1000);

      if (date.getDay() == weekendDays.SATURDAY || date.getDay() == weekendDays.SUNDAY) {
        currentDay = date.getDay();
        return true;
      }
      return false;
    }

    /**
     * Checks whether the minimum or maximum temperature from Saturday and Sunday
     * are above 25°C.
     * @param {object} saturdayData - The saturdayData object, with the maximum and
     * minimum temperatures.
     * @param {object} sundayData - The sundayData object, with the maximum and
     * minimum temperatures.
     * @returns {boolean}
     */
    function getRecommendation(saturdayData, sundayData) {
      if ((saturdayData[0].tempMin > 25 || saturdayData[0].tempMax > 25) &&
        (sundayData[0].tempMin > 25 || sundayData[0].tempMax > 25)) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * Checks whether the recommendation is positive for beach or not. Then,
     * returns the recommendation text.
     * @param {boolean} recommendation - The recommendation.
     * @returns {string}
     */
    function getRecommendationText(recommendation) {
      var positive = 'O fim de semana vai ter temperaturas acima de 25 °C.';
      var negative = 'As temperaturas no fim de semana não são as melhores.';
      return recommendation ? positive : negative;
    }

    /**
     * Represents a forecast.
     * @constructor
     * @param {number} tempMin - The minimum temperature.
     * @param {number} tempMax - The maximum temperature.
     * @param {number} date - The date.
     * @param {string} icon - The icon.
     */
    function Forecast(tempMin, tempMax, date, icon) {
      this.tempMin = tempMin;
      this.tempMax = tempMax;
      this.date = date;
      this.icon = icon;
    }
  }
})();

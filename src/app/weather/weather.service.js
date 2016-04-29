(function() {
  'use strict';

  angular
    .module('app.weather')
    .factory('weatherService', weatherService);

  weatherService.$inject = ['$http'];

  function weatherService($http) {
    var service = {};

    return service;
  }
})();

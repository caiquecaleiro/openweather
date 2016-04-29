(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'app.weather'
    ])
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/weather'
      });
  }
})();

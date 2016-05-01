(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'app.weather',
      'app.layout'
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

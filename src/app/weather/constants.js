(function() {
    'use strict';

    angular
        .module('app.weather')
        .constant('initialData', {
          BLUMENAU: 0,
          SANTA_CATARINA: 22
        })
        .constant('weekendDays', {
          SATURDAY: 6,
          SUNDAY: 0
        });
})();

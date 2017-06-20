(function() {
  'use strict';

  angular.module('jtAngularPlayground').config(Config);

  function Config($httpProvider, $logProvider) {
    $httpProvider.defaults.withCredentials = true;
    $logProvider.debugEnabled(true);
  }

  Config.$inject = ['$httpProvider', '$logProvider'];
}());

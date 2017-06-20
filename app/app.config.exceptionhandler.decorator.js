(function () {
  'use strict';

  function ExceptionHandler($delegate, $injector) {
    return function meh(exception, cause) {
      var $rootScope = $injector.get('$rootScope');
      var errors = $injector.get('errors');

      errors.trackError(exception);
      // $delegate(exception, cause);
    }
  }

  function ExceptionHandlerProvider($provide) {
    $provide.decorator('$exceptionHandler', ExceptionHandler);
  }

  ExceptionHandlerProvider.$inject = ['$provide'];
  ExceptionHandler.$inject = ['$delegate', '$injector'];

  angular.module('jtAngularPlayground').config(ExceptionHandlerProvider);
}());
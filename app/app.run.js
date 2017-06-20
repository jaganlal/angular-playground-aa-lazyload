(function() {
  'use strict';

  function Run($log, $rootScope, $http, $httpBackend) {
    $rootScope.$on('$stateChangeError', function(evt, toState, toParams, fromState, fromParams, erros) {
      if (error && error.data && error.data.status_msg) {
        $log.error(error.data.status_msg);
      }
    });

    $rootScope.$on('$viewContentLoaded', function () {
      $log.log('$viewContentLoaded called');
    });
  }

  Run.$inject = ['$log', '$rootScope', '$http', '$httpBackend'];

  angular.module('jtAngularPlayground').run(Run);

}());

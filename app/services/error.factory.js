(function() {
  'use strict';

  function ErrorFactory($rootScope, $log) {
    return {
      catch: function(message) {
        return function(reason) {
          $rootScope.addError({message: message, reason: reason});
        }
      }, 
      trackError: function(exception) {
        $log.error(exception);
      }
    }
  }

  ErrorFactory.$inject = ['$rootScope', '$log'];

  angular.module('jtAngularPlayground').factory('errors', ErrorFactory);
}());
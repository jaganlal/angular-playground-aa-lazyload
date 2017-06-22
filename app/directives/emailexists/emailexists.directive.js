 //https://www.algotech.solutions/blog/javascript/how-to-create-custom-validator-directives-with-angularjs/

(function() {
  'use strict';

  angular.module('jtAngularPlayground').directive('emailExists', IsEmailExists);
  function IsEmailExists ($resource, $q, $timeout) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelController) {
        ngModelController.$asyncValidators.emailAlreadyExists = function(modelValue, viewValue) {
          var deferred = $q.defer();
          ngModelController.$setValidity('isEmailExistsCheck', false);

          $timeout(function() {
            var emailIds = ['a@a.com', 'b@a.com', 'c@a.com'];
            ngModelController.$setValidity('isEmailExistsCheck', true);
            if(!emailIds.includes(viewValue)) {
              deferred.resolve();
            }
            else {
              deferred.reject();
            }
          }, 750);

          return deferred.promise;
        };
      }
    }
  }
  IsEmailExists.$inject = ['$resource', '$q', '$timeout'];
}());
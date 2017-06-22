(function() {
  'use strict';

  angular.module('jtAngularPlayground').directive('zipValidator', zipValidator)

  function zipValidator() {
    return {
      restrict: 'A', 
      require: 'ngModel', 
      link: function(scope, elem, attr, ngModelController) {
        var view_value;
        ngModelController.$validators.zip = function(value) {
          var isValid = true;
          if(value && value.length > 5) {
            isValid = false;
            value = view_value;
          }
          else if(value && parseInt(value, 10)) {
            view_value = parseInt(value, 10);
            isValid = true;
            ngModelController.$viewValue = view_value;
            ngModelController.$render();
          }
          else if(value && value.length) {
            isValid = false;
          }

          return isValid;
        }
      }
    }
  }
}())
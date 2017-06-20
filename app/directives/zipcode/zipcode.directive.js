(function() {
  'use strict';

  angular.module('jtAngularPlayground').directive('zipcode', isZipCodeValid)

  function isZipCodeValid () {
    return {
      restrict: 'A', 
      require: 'ngModel', 
      link: function(scope, elem, attr, ngModel){
        var view_value;
        ngModel.$parsers.push(function(value) {
          var return_value;

          if(value.length > 5) {
            return_value = view_value;
            ngModel.$setViewValue(view_value);
            ngModel.$render();
            ngModel.$setValidity('is_valid', false);
          }
          else if(parseInt(value, 10)) {
            var originalValue = value;
            value = parseInt(value, 10);
            return_value = value+'';
            view_value = return_value;
            ngModel.$setValidity('is_valid', true);

            if(originalValue != value) {
              ngModel.$setViewValue(view_value);
              ngModel.$render();
            }
          }
          else if(value.length) {
            return_value = view_value;
            ngModel.$setViewValue(view_value);
            ngModel.$render();
            ngModel.$setValidity('is_valid', false);
          }
          else {
            return_value = value;
            view_value = return_value;
          }

          return return_value;
        });

        ngModel.$formatters.push(function(value) {
          var return_value;
          if(value && value.length) {
            value = value.substr(0, 5);
            return_value = Number(value)+'';
          }
          else if(parseInt(value, 10)) {
            var s = String(value).substr(0, 5);
            return_value = Number(s)+'';
          }

          view_value = return_value;

          return return_value;
        });
      }
    }
  }  

}());
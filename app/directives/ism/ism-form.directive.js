(function() {
  'use strict';

  angular.module('jtAngularPlayground.ISM').directive('ismForm', IsmForm);
  function IsmForm () {
    return {
      restrict: 'A',
      require: "form", 
      link: function (scope, element, attrs, form) {
        console.log(form);
      }
    }
  }
}());
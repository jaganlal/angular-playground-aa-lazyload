(function() {
  'use strict';

  angular.module('jtAngularPlayground').directive('ism', Ism);
  function Ism () {
    return {
      restrict: 'A',
      require: "form", 
      link: function (scope, element, attrs, form) {
        var f = form;
        element.on("change", function(e) {
          console.log('change');
        }.bind(form));
      }
    }
  }
}());
(function() {
  'use strict';

  function Form3ContentController($log) {
    this.model = {};
    this.model.zip = '';
  }

  Form3ContentController.$inject = ['$log'];
  angular.module('jtAngularPlayground.Form3ContentController', [])
  .controller('Form3ContentController', Form3ContentController);
}());
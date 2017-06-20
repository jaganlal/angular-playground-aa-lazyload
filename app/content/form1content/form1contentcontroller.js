(function() {
  'use strict';

  function Form1ContentController($log, $state, aaNotify) {
    this.model = {};

    this.formconfig = {
      validations: {
        model: {
          email: {
            required: true, 
            'ng-pattern': '/^[a-zA-Z](\s?[a-zA-Z]){10,30}$/',
            'ng-pattern-msg': 'Hey! check the email format'
          }, 
          firstname: {
            required: true
          },
          lastname: {
            required: true,
            'ng-pattern': '/^[a-zA-Z](\s?[a-zA-Z]){1,30}$/',
            'ng-pattern-msg': 'Lastname invalid, please check the pattern'
          },
          age: {
            required: true, 
            'ng-pattern': '/\[0-9]/g'
          }
        }
      }
    };

    this.submit = function() {
      aaNotify.success('Form successfully submitted');
    };
  }

  Form1ContentController.$inject = ['$log', '$state', 'aaNotify'];
  angular.module('jtAngularPlayground.Form1ContentController', [])
    .controller('Form1ContentController', Form1ContentController);
}());

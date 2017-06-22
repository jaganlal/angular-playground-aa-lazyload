(function() {
  'use strict';

  function Form2ContentController($log, aaNotify) {
    this.model = {};
    this.formconfig = {
        validations: {
          model: {
            email: {
              required: true, 
              'ng-pattern': '/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/',
              'ng-pattern-msg': 'oops!!! check the email format',
              'isEmailExistsCheck': 'Checking if user already exists', 
              'emailAlreadyExists': 'The specified email address is already in use, please choose different email address'
            },
            age: {
              required: true
            }
          }
        }
    };

    this.submit = function () {
      aaNotify.success('Form successfully submitted');
    };
  }

  Form2ContentController.$inject = ['$log', 'aaNotify'];
  angular.module('jtAngularPlayground.Form2ContentController', [])
  .controller('Form2ContentController', Form2ContentController);
}());
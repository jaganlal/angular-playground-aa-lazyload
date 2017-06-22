(function() {
  'use strict';

  angular.module('jtAngularPlayground').controller('MainContentController', MainContentController);

  function MainContentController($log) {

    this.$onInit = function() {
      this.validations = {
        email: {
          required: true, 
          pattern: {
            expression: '/^[a-zA-Z](\s?[a-zA-Z]){10,30}$/',
            message: 'Hey! check the email format'
          },
          isEmailExistsCheck: 'Checking if user already exists', 
          emailAlreadyExists: 'The specified email address is already in use, please choose different email address'
        }, 
        zip: {
          required: {
            message: 'We need zipcode, please enter it'
          }, 
          zip: 'Invalid zipcode, please check Zip format'
        }
      };
    }
  }

  MainContentController.$inject = ['$log'];
}());
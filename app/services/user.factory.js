(function() {
  'use strict';
  
  angular.module('jtAngularPlayground').factory('User', UserResource);

  function UserResource($resource) {
    // 'ngInject';
    return $resource('http://localhost:3000/users/:id/:controller', {id: '@_id'}, {
      changePassword: {
        method: 'PUT', 
        params: {
          controller: 'password'
        }
      }, 
      get: {
        method: 'GET', 
        params: {
          id: 'me'
        }
      }
    });
  }

  UserResource.$inject = ['$resource'];

}());
(function() {
  'use strict';

  angular.module('jtAngularPlayground').service('HttpInterceptor', HttpInterceptor);

  function HttpInterceptor($q, $log, $cookies, $window) {
    var interceptor = {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          // config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          config.headers.Authorization = $window.sessionStorage.token;
        }
        return config;
      }, 

      requestError: function(rejection) {
        $log.log("HttpInterceptor::requestError");

        return $q.reject(rejection);
      },

      response: function(response) {
        $log.log("Response Token: "+$cookies.get('token'));

        return response;
      }, 

      responseError: function(rejection) {
        $log.log("HttpInterceptor::responseError");

        return $q.reject(rejection);
      }
    }

    return interceptor;
  }

  HttpInterceptor.$inject = ['$q', '$log', '$cookies', '$window'];

}());
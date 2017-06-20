(function() {
  'use strict';

  angular
    .module('jtAngularPlayground', [
      'ngMessages',
      'ngCookies',
      'ngSanitize',
      'ngResource',
      'ui.router',
      'aa.formExtensions',
      'aa.formExternalConfiguration',
      'aa.notify',
      'aa.select2',
      // 'jtAngularPlayground.Form1ContentController',
      // 'jtAngularPlayground.Form2ContentController', 
      'oc.lazyLoad'
    ]);
}());

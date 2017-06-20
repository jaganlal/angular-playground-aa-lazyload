(function() {
  'use strict';

  angular.module('jtAngularPlayground').factory('TimingFactory', Timing);

  function Timing() {
    return function TimingObject() {
      this.timing = '';
      this.status = 'Schedule';
    }
  }
}());
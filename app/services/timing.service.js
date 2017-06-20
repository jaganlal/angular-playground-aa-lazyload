(function() {
  'use strict';

  angular.module('jtAngularPlayground').service('TimingService', Timing);

  function Timing() {
    this.timing = '',
    this.status = 'Schedule'
  }
}());
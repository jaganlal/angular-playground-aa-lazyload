(function() {
  'use strict';

  function timingsController($log) {
    $log.log(this.today);

    this.toggleStatus = function(element, index, item) {
      if (item.status === 'Schedule') {
        item.status = "Scheduled";
        element.style.backgroundColor = '#3E7E00';
      }
      else if (item.status === 'Scheduled') {
        item.status = "Schedule";
        element.style.backgroundColor = 'darkslategrey';
      }
    },

    this.showPopover = function($event, index, item) {
      var element = $event.currentTarget;
      this.toggleStatus(element, index, item);
    }, 

    this.removeTime = function($event, index, item) {
      this.classTimings.splice(index, 1);
    }
  }

  let timings = {
    templateUrl: 'app/components/timings/timings.html', 
    bindings: {
      today: '<', 
      classTimings: '<'
    } 
    // controller: timingsController
  }

  timingsController.$inject = ['$log'];
  angular.module('jtAngularPlayground').component('timings', timings);
}());
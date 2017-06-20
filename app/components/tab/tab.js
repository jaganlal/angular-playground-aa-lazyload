(function() {
  'use strict';

  function tabController($log) {
    this.$onInit = function() {
      this.tab = {
        label: this.label, 
        selected: false
      };

      this.tabs.addTab(this.tab);
    }
  }

  let tab = {
    bindings: {
      label: '@'
    }, 
    require: {
      tabs: '^^'
    }, 
    transclude: true, 
    // templateUrl: 'app/components/tab/tab.html', 
    template: `
      <div class="tabs__content" ng-if="$ctrl.tab.selected">
        <div ng-transclude></div>
      </div>
    `,
    controller: tabController
  }

  tabController.$inject = ['$log'];

  function tabsController($log) {
    this.$onInit = function() {
      this.tabs = [];
    };

    this.addTab = function addTab(t) {
      this.tabs.push(t);
    };

    this.selectTab = function selectTab(index) {
      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].selected = false;
      }
      this.tabs[index].selected = true;
    };

    this.$postLink = function () {
      this.selectTab(this.selected);
      $log.log(this.selected);
    }
  }

  let tabs = {
    bindings: {
      selected: '@'
    }, 
    transclude: true, 
    templateUrl: 'app/components/tab/tabs.html', 
    controller: tabsController
  }

  tabsController.$inject = ['$log'];

  angular.module('jtAngularPlayground')
  .component('tab', tab)
  .component('tabs', tabs);

}());
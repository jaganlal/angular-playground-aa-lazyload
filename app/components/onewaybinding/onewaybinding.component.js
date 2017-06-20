/*
* @Author: Jaganlal Thoppe
* @Date:   2017-03-16 09:32:06
* @Last Modified by:   Jaganlal Thoppe
* @Last Modified time: 2017-03-17 13:09:01
* @Inspired from: https://toddmotto.com/angular-1-5-lifecycle-hooks#one-way-dataflow--events
*/

(function() {
  'use strict'

  let parentComponent = {
    template: `
      <div>
        <pre> Parent Object: {{$ctrl.user | json}} </pre>
        <a href="" ng-click="$ctrl.changeUser();">
          Change User (this'll call $onChanges of childComponent)
        </a>
        <child-component
          user="$ctrl.user" 
          on-update="$ctrl.updateUser($event);">
        </child-component>
      </div>
    `,
    controller: parentController
  };

  let childComponent = {
    bindings: {
      user: '<',
      onUpdate: '&'
    }, 
    template: `
      <div>
        <input type='text' ng-model="$ctrl.user.name">
        <a href="" ng-click="$ctrl.notifyChange()">Notify</a>
      </div>
    `,
    controller: childController
  };

  function parentController() {
    this.$onInit = function() {
      this.user = {
        name: 'Jaganlal Thoppe', 
        location: 'Princeton, US'
      };
    };

    this.changeUser = function() {
      this.user = {
        name: 'T.S. JAGAN', 
        location: 'Robbinsville'
      };
    };

    this.updateUser = function(event) {
      if(event && event.user) {
        this.user = event.user;
      }
    }
  };

  function childController() {
    this.$onChanges = function(changes) {
      if(changes.isFirstChange()) {
        console.log('First Change: '+JSON.stringify(changes));
        return;
      }

      this.user = angular.copy(changes.user.currentValue);
    };

    this.notifyChange = function() {
      this.onUpdate({
        $event: {
          user: this.user
        }
      })
    }
  };

  angular.module('jtAngularPlayground')
  .component('parentComponent', parentComponent)
  .component('childComponent', childComponent);

}());


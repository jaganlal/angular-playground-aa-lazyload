(function() {
  'use strict';

  angular.module('jtAngularPlayground').config(RouteConfig);

  function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/main');

    //Config For ocLazyLoading
    $ocLazyLoadProvider.config({
      'debug': true,
      'events': true,
      'modules': [{ // Set modules initially
        name : 'form1', // Form1 module
        files: ['app/content/form1content/form1-content.css', 'app/content/form1content/form1contentcontroller.js']
      },{
        name : 'form2', // Form2 module
        files: ['app/content/form2content/form2-content.css', 'app/content/form2content/form2contentcontroller.js']
      },{
        name : 'form3', // Form3 module
        files: ['app/content/form3content/form3-content.css', 'app/content/form3content/form3contentcontroller.js']
      }]
    });

    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        views: {
          'nav': {
            templateUrl: './app/nav/nav.html'
          },
          'footer': {
            templateUrl: './app/footer/footer.html'
          }
        }
      })
      .state('home.main', {
        url: 'main',
        views: {
          '@': {
            templateUrl: './app/content/maincontent/main-content.html',
            controller: 'MainContentController',
            controllerAs: 'vm'
          }
        }
      })
      .state('home.form1', {
        url: 'form1',
        views: {
          '@': {
            templateUrl: './app/content/form1content/form1-content.html',
            controller: 'Form1ContentController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('form1'); // Resolve promise and load before view 
          }]
        }
      })
      .state('home.form2', {
        url: 'form2',
        views: {
          '@': {
            templateUrl: './app/content/form2content/form2-content.html',
            controller: 'Form2ContentController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('form2'); // Resolve promise and load before view 
          }]
        }
      })
      .state('home.form3', {
        url: 'form3',
        views: {
          '@': {
            templateUrl: './app/content/form3content/form3-content.html',
            controller: 'Form3ContentController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('form3'); // Resolve promise and load before view 
          }]
        }
      });
  }

  RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider'];

}());

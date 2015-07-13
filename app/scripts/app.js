'use strict';

/**
 * @ngdoc overview
 * @name productApp
 * @description
 * # productApp
 *
 * Main module of the productAppapplication.
 */

var app = angular.module('productApp', ['ngRoute']);
  
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).otherwise({
        redirectTo: '/main'
      });
  }]);
  
app.directive("homeFormTemplate", function () {
    return {
        templateUrl: 'views/formTemplate.html',
        scope: false,
        restrict: 'E'
    };
});

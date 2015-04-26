'use strict';

/**
 * @ngdoc overview
 * @name housingApp
 * @description
 * # housingApp
 *
 * Main module of the application.
 */
angular
  .module('housingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMdIcons',
    'ngTagsInput',
    'ngMap'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('yellow')
    .accentPalette('red');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  var PhoneGapInit = function () {
   this.boot = function () {
     angular.bootstrap(document, ['housingApp']);
   };

   if (window.phonegap !== undefined) {
     document.addEventListener('deviceready', function () {
       this.boot();
     });
   } else {
     console.log('PhoneGap not found, booting Angular manually');
     this.boot();
   }
 };

 angular.element(document).ready(function () {
   new PhoneGapInit();
 });

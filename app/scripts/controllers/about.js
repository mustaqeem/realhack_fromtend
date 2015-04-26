'use strict';

/**
 * @ngdoc function
 * @name housingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the housingApp
 */
angular.module('housingApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

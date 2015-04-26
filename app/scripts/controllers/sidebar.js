'use strict';

/**
 * @ngdoc function
 * @name demouiApp.controller:SidebarCtrl
 * @description
 * # HeaderCtrl
 * Controller of the demouiApp
 */
angular.module('housingApp')
.controller('SidebarCtrl', function ($scope, $mdSidenav) {
  $scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Friends',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];
  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    },
    {
      link : 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    }
  ];
});
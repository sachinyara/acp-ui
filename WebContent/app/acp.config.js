'use strict';

angular.
  module('acp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/userauthorization', {
          template: '<user-authorization></user-authorization>'
        }).
        when('/datascope', {
            template: '<scope></scope>'
          }).
        when('/rolemanagement', {
          template: '<role-management></role-management>'
        }).
        otherwise('/userauthorization');
    }
  ]);

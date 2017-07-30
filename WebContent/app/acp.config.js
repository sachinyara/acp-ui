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
        otherwise('/userauthorization');
    }
  ]);

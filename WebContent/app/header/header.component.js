'use strict';

// Register 'acpHeader' component, along with its associated controller and template
angular.
  module('acpHeader').
  component('acpHeader', {
    templateUrl: 'header/header.html',
    controller:
      function headerController() {
        this.userName = 'Sachin Kumar';
       
      }
  });

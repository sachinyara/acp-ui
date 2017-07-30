'use strict';

// Register 'datascope' component, along with its associated controller and template
angular.
	module('dataScope').
	component('scope', {
		templateUrl: 'data-scope/data-scope.template.html',
		controller:
		function dataScopeController($scope, dataScopeService) {
			$scope.fillCustomerSite = function () {
				$scope.customerSites = dataScopeService.getAllProductData("Customer Site");
			};
			$scope.fillCustomerSite();

			$scope.fillRoles = function () {
				$scope.roles = dataScopeService.filterFromPrdMap("Customer Site", $scope.selectedCustomerSite, "Roles");
			};
			$scope.fillUserGroup = function () {
				$scope.userGroups = dataScopeService.filterFromPrdMap("Roles", $scope.selectedRole, "User Group");
			};
			$scope.dimensions = ["Geography", "Product", "Measure"];
			$scope.scopeStatus = ["Full Access", "Scoped"];
			$scope.selectedScopeStatus = $scope.scopeStatus[0];
			$scope.IsScoped = false;
			$scope.OnScopeChange = function (selectedScope) {
				if (selectedScope == "Scoped") {
					var x = document.getElementById('scopeddiv1');
					if (x.style.display === 'none') {
						x.style.display = 'block';
					}
				}
				else {
					var x = document.getElementById('scopeddiv1');
					if (x.style.display === 'block') {
						x.style.display = 'none';
					}

				}
			};
			$scope.markedChecked = function () {

				if ($scope.selectedDimension == $scope.dimensions[0])
					$scope.selectedGeography = true;
				else if ($scope.selectedDimension == $scope.dimensions[1])
					$scope.selectedProduct = true;
				else if ($scope.selectedDimension == $scope.dimensions[2])
					$scope.selectedMeasure = true;
			};
			$scope.my_treedata = [{
				label: 'Languages',
				children: ['Jade', 'Less', 'Coffeescript']
			}];


			// $scope.loadTree = function () {

			// 	$("#tree1").jstree({
			// 		"checkbox": {
			// 			"keep_selected_style": false
			// 		},
			// 		"plugins": ["checkbox"]
			// 	});
			// 	$("#tree1").bind("changed.jstree",
			// 		function (e, data) {
			// 			//alert("Checked: " + data.node.id);
			// 			// alert("Parent: " + data.node.parent); 
			// 			//alert(JSON.stringify(data));
			// 		});


			// };
			// $scope.loadTree();



		}
	});

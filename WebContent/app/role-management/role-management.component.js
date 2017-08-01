'use strict';

// Register 'roleManagement' component, along with its associated controller and template
angular.module('roleManagement').
component('roleManagement', {
	templateUrl: 'role-management/role-management.template.html',
	controller:	function($scope) {
        $scope.roles = [
        	{
        		id: 1,
        		name:  "PTAAdmin",
        		description: "Administrator role",
        		isActive: "Yes",
        		moduleFeatureMapping: "Pricing Simulator",
        		creationTime: "2017-07-31",
        		lastModifiedTime: "2017-07-31",
        		lastModifiedBy: "Sachin"
        	}
        	];
        var createNewRole = function () {
            return {
                id: $scope.roles.length + 1,
        		name:  null,
        		description: null,
        		isActive: false,
        		moduleFeatureMapping: null,
        		creationTime: null,
        		lastModifiedTime: null,
        		lastModifiedBy: null
            };
        };

        $scope.newRole = createNewRole();

        $scope.deleteRole = function (index) {
            $scope.roles.splice(index, 1);
        };

        $scope.addRole = function () {
           
            $scope.roles.add($scope.newRole);

            $scope.newRole = createNewRole();
        };

        $scope.gridOptions = {
            dataSource: $scope.roles,
            width: "100%",
            height: "400px",
            primaryKey: "id",
            autoCommit: true,
            autoGenerateColumns: false,
            columns: [
                   { "headerText": "ID", "key": "id", "dataType": "number", "width": "50px" },
                   { "headerText": "Name", "key": "name", "dataType": "string", "width": "50px" },
                   { "headerText": "Description", "key": "description", "dataType": "string", "width": "250px" },
                   { "headerText": "Is Active", "key": "isActive", "dataType": "boolean", "width": "200px" },
                   { "headerText": "Module Feature Mapping", "key": "moduleFeatureMapping", "dataType": "string", "width": "100px" },
                   { "headerText": "Create Time", "key": "creationTime", "dataType": "string", "width": "100px" },
                   { "headerText": "Last Modified Time", "key": "lastModifiedTime", "dataType": "string", "width": "100px" },
                   { "headerText": "Last Modified By", "key": "lastModifiedBy", "dataType": "string", "width": "100px" }
            ],
            features: [{
                name: "Updating",
                columnSettings: [{
                    columnKey: "id",
                    readOnly: true
                }]
            }, {
                name: "Paging",
                pageSize: 10
            }, {
                name: "Filtering"
            }, {
                name: "Sorting"
            }]
        };
	}
	});

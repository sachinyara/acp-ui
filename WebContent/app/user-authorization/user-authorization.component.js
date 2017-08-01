'use strict';

// Register 'userAuthorization' component, along with its associated controller and template
angular.module('userAuthorization').
		component('userAuthorization', {
			templateUrl: 'user-authorization/user-authorization.template.html',
			controller:
			function headerController($scope, rawDataService, mappingDataService) {
				$scope.filterCriteria2Flag = true;
		
		  /////////////////////////////////////////////////
		  $scope.selectedAuthCriteria2Data =[];
		  $scope.selectedAuthCriteria3Data =[];
		  $scope.selectedAuthCriteriaData11 = [];
		  $scope.OnAuthcriteria2Chbx = function(selected,indexval){
			  var val = $scope.authCriteria2Data[indexval];
			  if(selected==true){ 
				  	if($scope.selectedAuthCriteria2Data.indexOf(val)<0)
				  		$scope.selectedAuthCriteria2Data.push(val);
		        }
		        else{
		            $scope.selectedAuthCriteria2Data.splice($scope.selectedAuthCriteria2Data.indexOf(val),1);
		        }
		    }
		        
		    $scope.OnAuthcriteria3Chbx =function(selected,indexval){
		    	 var val = $scope.authCriteria3Data[indexval];
				  if(selected==true){ 
					  	if($scope.selectedAuthCriteria3Data.indexOf(val)<0)
					  		$scope.selectedAuthCriteria3Data.push(val);
			        }
			        else{
			            $scope.selectedAuthCriteria3Data.splice($scope.selectedAuthCriteria3Data.indexOf(val),1);
			        }
		    }
		    $scope.selectedAuthCriteria4Data = [];
		    $scope.OnAuthcriteria4Chbx =function(selected,indexval){
		    	 var val = $scope.authCriteria4Data[indexval];
				  if(selected==true){ 
					  	if($scope.selectedAuthCriteria4Data.indexOf(val)<0)
					  		$scope.selectedAuthCriteria4Data.push(val);
			        }
			        else{
			            $scope.selectedAuthCriteria4Data.splice($scope.selectedAuthCriteria4Data.indexOf(val),1);
			        }
		    }
		   $scope.popSelectedAuthCriteria1Data=[];
		   $scope.onPopAuthCriteria1Data = function(selected,indexval){
			   var val = $scope.popAuthCriteria1Data[indexval];
			   if(selected==true){ 
				  	if($scope.popSelectedAuthCriteria1Data.indexOf(val)<0)
				  		$scope.popSelectedAuthCriteria1Data.push(val);
		        }
		        else{
		            $scope.popSelectedAuthCriteria1Data.splice($scope.popSelectedAuthCriteria1Data.indexOf(val),1);
		        }
		   };
		   /************Advanced User Authorization Dialog POP UPs-start*************/
		   $scope.removePopUpTabelData = function (id) {
			   for (var i = 0; i < $scope.popUpselelectionTable.length; i++) {
				   if (id == $scope.popUpselelectionTable[i].id) {
					   $scope.popUpselelectionTable.splice(i, 1);
					   break;
				   }
			   }
		   };
		   $scope.addNewTable = function () {
			   $scope.advanceUserNewtabel = rawDataService.preparePopUpMapping($scope.popUpselelectionTable,$scope.selectedAuthCriteria1,$scope.selectedAuthCriteria2,$scope.authCriteria3[0],$scope.popSelectedAuthCriteria1,$scope.popSelectedAuthCriteria1Data);
			   $scope.popUpselelectionTable = $scope.advanceUserNewtabel;
			   $scope.popSelectedAuthCriteria1Data=[];
		   };
		   /**Advanced User Authorization Dialog POP UPs -end**/
		   // related to Pop Ups
		   $scope.onPopAuthCriteria1Change = function () {
			   $scope.popAuthCriteria1Data = rawDataService.getAllProductData($scope.popSelectedAuthCriteria1);
		   };
		   
		   $scope.clearSelect = function () {
			   $scope.popAuthCriteria1Data = null;
			   $scope.popSelectedAuthCriteria1 = null;
		   }
		////////////////////////////////////////////////////////////////

			//1st drop-down:Start
			$scope.fillCriteria1Options = function () {
				$scope.authCriteria1 = rawDataService.getAllProducts();
				// related to Pop Ups
				$scope.popAuthCriteria1 = rawDataService.getAllProducts();
				$scope.selectedAuthCriteria1 = null;
				$scope.popSelectedAuthCriteria1 = null;
			};
			$scope.fillCriteria1Options();
			//on change of 1st drop-down
			$scope.onAuthCriteria1Change = function () {
				$scope.authCriteria1Data = rawDataService.getAllProductData($scope.selectedAuthCriteria1);
				$scope.authCriteria4Data = [];//Erasing 4th drop-down
				$scope.selectedAuthCriteria1Data = null;
				$scope.fillCriteria2Options();
			};
			//1st dropdown:end

			//2nd drop-down:start
			$scope.fillCriteria2Options = function () {
				$scope.authCriteria2 = $scope.authCriteria1.slice();
				var index = $scope.authCriteria2.indexOf($scope.selectedAuthCriteria1);
				$scope.authCriteria2.splice(index, 1);
				$scope.selectedAuthCriteria2 = null;
				$scope.onAuthCriteria2Change();
			};
			
			//on change of 2nd drop-down
			$scope.onAuthCriteria2Change = function () {
				$scope.authCriteria2Data = rawDataService.filterFromPrdMap($scope.selectedAuthCriteria1, $scope.selectedAuthCriteria1Data, $scope.selectedAuthCriteria2);
				$scope.selectedAuthCriteria2Data = [];
				$scope.authCriteria4Data = [];//Erase 4th drop-down  
				$scope.fillCriteria3Options();
				$scope.fillCriteria4MappedOptions();
			};
			//2nd drop-down:end

			//3rd drop-down:start
			$scope.fillCriteria3Options = function () {
				$scope.authCriteria3Data = [];
				if ($scope.selectedAuthCriteria2) {
					$scope.authCriteria3 = $scope.authCriteria2.slice();
					var index = $scope.authCriteria3.indexOf($scope.selectedAuthCriteria2);
					$scope.authCriteria3.splice(index, 1);
					$scope.authCriteria3Data = rawDataService.getAllProductData($scope.authCriteria3[0]);
					$scope.selectedAuthCriteria3Data = [];
				}
			};
			$scope.fillCriteria4MappedOptions = function () {
				$scope.authCriteria4Data = rawDataService.filterFromPrdMap($scope.selectedAuthCriteria1, $scope.selectedAuthCriteria1Data, $scope.authCriteria3);
				$scope.authCriteria4Data.forEach(function(value){
					$scope.authCriteria3Data.splice($scope.authCriteria3Data.indexOf(value),1);
				});
			};
			$scope.$watch('selectedAuthCriteria1Data', function(newNames, oldNames) {
				$scope.onChangeOfSelection();
			});
			$scope.$watchCollection('selectedAuthCriteria2Data', function(newNames, oldNames) {
				$scope.onChangeOfSelection();
			});
			$scope.$watch('authCriteria2Seach', function(newNames, oldNames) {
				$scope.selectedAuthCriteria2Data=$scope.selectedAuthCriteria2Data.filter(function(val){
					return val.indexOf($scope.authCriteria2Seach)>-1
					});
			});
			$scope.$watchCollection('authCriteria4Data', function(newNames, oldNames) {
				$scope.onChangeOfSelection();
			});
			//3rd drop-down:end
			
			$scope.moveRight = function () {
				var tempArr = [];
				$scope.selectedAuthCriteria3Data.forEach(function(value,index){
					if($scope.authCriteria4Data.indexOf(value) < 0){
						tempArr.push(value);
						$scope.authCriteria4Data.push(value);
						$scope.authCriteria3Data.splice($scope.authCriteria3Data.indexOf(value),1);
					}
				});
				tempArr.forEach(function(value){
					$scope.selectedAuthCriteria3Data.splice($scope.selectedAuthCriteria3Data.indexOf(value),1);
				});
			};
			
			$scope.moveLeft = function () {
					var tempArr = [];
					$scope.selectedAuthCriteria4Data.forEach(function(value,index){
						if($scope.authCriteria3Data.indexOf(value) < 0){
							tempArr.push(value);
							$scope.authCriteria3Data.push(value);
							$scope.authCriteria4Data.splice($scope.authCriteria4Data.indexOf(value),1);
						}
					});
					tempArr.forEach(function(value){
						$scope.selectedAuthCriteria4Data.splice($scope.selectedAuthCriteria4Data.indexOf(value),1);
					});
			};
			
			$scope.toggleFilterCriteria2 = function () {
				if ($scope.filterCriteria2Flag) {
					$scope.authCriteria2Data = rawDataService.getAllProductData($scope.selectedAuthCriteria2);
					$scope.filterCriteria2Flag = false;
				}
				else {
					$scope.authCriteria2Data = rawDataService.filterFromPrdMap($scope.selectedAuthCriteria1, $scope.selectedAuthCriteria1Data, $scope.selectedAuthCriteria2);
					$scope.filterCriteria2Flag = true;
				}
			};
			
			$scope.onChangeOfSelection = function () {
				$scope.selelectionTable = rawDataService.prepareMapping($scope.selectedAuthCriteria1Data, $scope.selectedAuthCriteria2Data, $scope.authCriteria4Data);
				$scope.popUpselelectionTable = rawDataService.prepareMapping($scope.selectedAuthCriteria1Data, $scope.selectedAuthCriteria2Data, $scope.authCriteria4Data);
			};

			$scope.removeTabelData = function (id) {
				for (var i = 0; i < $scope.selelectionTable.length; i++) {
					if (id == $scope.selelectionTable[i].id) {
						$scope.selelectionTable.splice(i, 1);
						$scope.popUpselelectionTable.splice(i, 1);
						break;
					}
				}
			};
			/*************show the hidden table************/
			$scope.showTable = function () {
				var x = document.getElementById('myDIV');
				var x1 = document.getElementById('myDIV1');
				if (x.style.display === 'none') {
					x.style.display = 'block';
				}
				if (x1.style.display === 'none') {
					x1.style.display = 'block';
				}
			};

			$scope.loadMappingData = function () {
				var mappedData = mappingDataService.producedFilterData();
			};

			$scope.loadMappingData();

		}
	});

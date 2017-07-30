var dataScope =angular.module("dataScope");

dataScope.factory('dataScopeService',function(){
 return{
	 
		 getAllProductData : function(key){
	     	var masterData =  [
	 		  {name:"Customer Site",values:["Congra","Pepsi","Smuckers","Bayer","AirWick"]},    		  
	 		  {name:"Roles",values:["PTAAdmin","PTAUser","BVDAdmin","MFAdmin","MFUser"]},    		  
	 		  {name:"User Group",values:["UserGrp1","UserGrp2","UserGrp3","UserGrp4","UserGrp5"]}
	 		  ];
	     	for(var i=0; i<masterData.length; i++){
		       	 if(key == masterData[i].name)
		            return masterData[i].values;
	     	}
	     },
        filterFromPrdMap: function (key, value, returnType) {
            var productMapping = [
                { customerSite: "Congra", role: "PTAAdmin", userGroup: "UserGrp1" },
                { customerSite: "Congra", role: "BVDAdmin", userGroup: "UserGrp1" },
                { customerSite: "Pepsi", role: "PTAUser", userGroup: "UserGrp2" },
                { customerSite: "Pepsi", role: "PTAAdmin", userGroup: "UserGrp3" },
                { customerSite: "Smuckers", role: "PTAAdmin", userGroup: "UserGrp1" }
            ];

            var filetrData = [];

            if (key == "Customer Site") {

                for (var j = 0; j < productMapping.length; j++) {
                    if (productMapping[j].customerSite == value) {
                        if (returnType == "Roles") {
                            filetrData.push(productMapping[j].role);
                        } else {
                            filetrData.push(productMapping[j].userGroup);
                        }

                    }
                }
            }
            else if (key == "Roles") {

                for (var j = 0; j < productMapping.length; j++) {
                    if (productMapping[j].role == value) {
                        if (returnType == "Customer Site") {
                            filetrData.push(productMapping[j].customerSite);
                        } else {
                            filetrData.push(productMapping[j].userGroup);
                        }

                    }
                }

            }
            else {

                for (var j = 0; j < productMapping.length; j++) {
                    if (productMapping[j].userGroup == value) {
                        if (returnType == "Roles") {
                            filetrData.push(productMapping[j].role);
                        } else {
                            filetrData.push(productMapping[j].customerSite);
                        }

                    }
                }

            }
            
            var result = [];
            filetrData.forEach(function(item) {
                 if(result.indexOf(item) < 0) {
                     result.push(item);
                 }
            });

            return result;
        }
 }
});
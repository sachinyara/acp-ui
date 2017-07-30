var acp = angular.module("acp");

acp.factory('rawDataService', function () {
    return {
        getAllProducts: function () {
            return ["Customer Site", "Roles", "User Group"];
        },
        getAllProductData: function (key) {
            var masterData = [
                { name: "Customer Site", values: ["Congra", "Pepsi", "Smuckers", "Bayer", "AirWick"] },
                { name: "Roles", values: ["PTAAdmin", "PTAUser", "BVDAdmin", "MFAdmin", "MFUser"] },
                { name: "User Group", values: ["UserGrp1", "UserGrp2", "UserGrp3", "UserGrp4", "UserGrp5"] }
            ];
            for (var i = 0; i < masterData.length; i++) {
                if (key == masterData[i].name)
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

            var result = [];
            filetrData.forEach(function (item) {
                if (result.indexOf(item) < 0) {
                    result.push(item);
                }
            });

            return result;
        },
        prepareMapping: function (textBox1, textBox2, textBox3) {
            var tableDatas = [];
            var fulltableDatas = [];
            var k = 1;
            for (var i = 0; i < textBox2.length; i++) {
                var textBox2Item = textBox2[i];
                for (var j = 0; j < textBox3.length; j++) {
                    var tabelPrd = { id: k++, customerSite: textBox1, role: textBox2Item, userGroup: textBox3[j] };
                    tableDatas.push(tabelPrd);
                }
            }
            return tableDatas;


        },
        preparePopUpMapping: function (textBox1, header1, header2, header3, selecedOptions, selectedItems) {
            var tableDataNew = [];
             var tableDataNew2 = [];
             var duplicateFlag = false;

            for (var j = 0; j < textBox1.length; j++) {

                tableDataNew.push(textBox1[j]);

            }
            
            if (selecedOptions == header1) {
                var index = textBox1.length + 1;
                for (var i = 0; i < textBox1.length; i++) {
                    for (var j = 0; j < selectedItems.length; j++) {
                        var tabelPrd = { id: index++, customerSite: selectedItems[j], role: textBox1[i].role, userGroup: textBox1[i].userGroup };
                        tableDataNew.push(tabelPrd);

                    }
                }

            }
            else if (selecedOptions == header2) {
                var index = textBox1.length + 1;
                var header3Items = [];
                var header1Items = [];
                var header2Items = [];
                for (var i = 0; i < textBox1.length; i++) {

                    header1Items.push(textBox1[i].customerSite);
                    header2Items.push(textBox1[i].role);
                    header3Items.push(textBox1[i].userGroup);
                }

                var uniqueHeader1Items = header1Items.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })

                var uniqueHeader2Items = header2Items.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })

                var uniqueHeader3Items = header3Items.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })
                for (var i = 0; i < uniqueHeader1Items.length; i++) {
                    for (var j = 0; j < selectedItems.length; j++) {
                         for (var k = 0; k < uniqueHeader3Items.length; k++) {
                          var tabelPrd = { id: index++, customerSite: uniqueHeader1Items[i], role: selectedItems[j], userGroup: uniqueHeader3Items[k] };
                          tableDataNew.push(tabelPrd);
                    }
                   }
                }
            }
            else {

                var index = textBox1.length + 1;
                var header3Items = [];
                var header1Items = [];
                var header2Items = [];

                 for (var i = 0; i < textBox1.length; i++) {

                    header1Items.push(textBox1[i].customerSite);
                    header2Items.push(textBox1[i].role);
                    header3Items.push(textBox1[i].userGroup);
                }

               var uniqueHeader1Items = header1Items.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })

                var uniqueHeader2Items = header2Items.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })

                var uniqueHeader3Items = header3Items.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                })

                 for (var i = 0; i < uniqueHeader1Items.length; i++) {
                    for (var j = 0; j < uniqueHeader2Items.length; j++) {
                         for (var k = 0; k < selectedItems.length; k++) {
                          var tabelPrd = { id: index++, customerSite: uniqueHeader1Items[i], role:uniqueHeader2Items[j], userGroup:  selectedItems[k] };
                          tableDataNew.push(tabelPrd);
                    }
                   }
                }
            }
            var uniqueTableDataNew = [];
            var validationArray = [];
            tableDataNew.forEach(function(row){
            	if(validationArray.indexOf(row.customerSite+row.role+row.userGroup) < 0){
            		validationArray.push(row.customerSite+row.role+row.userGroup);
            		uniqueTableDataNew.push(row);
            	}
            });
            return uniqueTableDataNew;
        }
    };
});

//  producedFilterData: function (key1, Value1, key2, Value2, returnType)

acp.factory('mappingDataService', function () {
    return {
        producedFilterData: function () {
            var productMapping = [
                { customerSite: "Congra", role: "PTAAdmin", userGroup: "UserGrp1" },
                { customerSite: "Congra", role: "BVDAdmin", userGroup: "UserGrp1" },
                { customerSite: "Pepsi", role: "PTAUser", userGroup: "UserGrp2" },
                { customerSite: "Pepsi", role: "PTAUser", userGroup: "UserGrp3" },
                { customerSite: "Smuckers", role: "PTAAdmin", userGroup: "UserGrp1" }
            ];

            key1 = "Customer Site";
            Value1 = "Pepsi";
            key2 = "User Group";
            Value2 = ["UserGrp1", "UserGrp2"];
            returnType = "Roles";

            var matchedData = [];
            if (key1 == "Customer Site") {

                for (var j = 0; j < productMapping.length; j++) {
                    if (productMapping[j].customerSite == Value1) {
                        if (returnType == "Roles") {
                            for (var i = 0; i < Value2.length; i++) {
                                if (productMapping[j].userGroup == Value2[i]) {
                                    matchedData.push(productMapping[j].role);
                                }
                            }
                        } else {

                            for (var i = 0; i < Value2.length; i++) {
                                if (productMapping[j].role == Value2[i]) {
                                    matchedData.push(productMapping[j].userGroup);
                                }
                            }
                        }

                    }
                }
            }
            else if (key1 == "Roles") {

                for (var j = 0; j < productMapping.length; j++) {
                    if (productMapping[j].role == Value1) {
                        if (returnType == "Customer Site") {
                            for (var i = 0; i < Value2.length; i++) {
                                if (productMapping[j].userGroup == Value2[i]) {
                                    matchedData.push(productMapping[j].customerSite);
                                }
                            }
                        } else {

                            for (var i = 0; i < Value2.length; i++) {
                                if (productMapping[j].customerSite == Value2[i]) {
                                    matchedData.push(productMapping[j].userGroup);
                                }
                            }
                        }

                    }
                }
            }
            else {


                for (var j = 0; j < productMapping.length; j++) {
                    if (productMapping[j].userGroup == Value1) {
                        if (returnType == "Roles") {
                            for (var i = 0; i < Value2.length; i++) {
                                if (productMapping[j].customerSite == Value2[i]) {
                                    matchedData.push(productMapping[j].role);
                                }
                            }
                        } else {

                            for (var i = 0; i < Value2.length; i++) {
                                if (productMapping[j].role == Value2[i]) {
                                    matchedData.push(productMapping[j].customerSite);
                                }
                            }
                        }

                    }
                }

            }


            return matchedData;
        }

    };

});


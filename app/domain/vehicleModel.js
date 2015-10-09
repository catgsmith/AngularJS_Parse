(function() {

    angular.module('myApp').factory('vehicleModel', vehicleModel);

    function vehicleModel($http, $q, dataService) {   

            var allVehicles = [];
            var taskVehicles = [];
            var aVehicle = {}; 

            return {
                getAllVehiclesData: function() {
                   var defer = $q.defer();

                   dataService.getAllVehiclesData().then(function (response) {
                        vehicles = JSON.parse(JSON.stringify(response));
                        defer.resolve(vehicles);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getAllActiveTaskVehiclesData: function() {
                   var defer = $q.defer();

                    dataService.getAllActiveTaskVehicles().then(function (response) {
                        taskVehicles = response;  
                        defer.resolve(taskVehicles);
                    }, function(error) {
                        console.log("Parse error: " + error.message); 
                        defer.reject(error);      
                    });          
                   return defer.promise;
                },
                getDefectVehicleforFleetNo: function(fleetNo) {  
                    ///console.log("~vehicleModel task: " +  JSON.stringify(taskVehicles));                
                    indexes = $.map(taskVehicles, function(obj, index) {
                        // FleetNo has # subscript
                        if (obj.fleetNo == fleetNo) {
                            return index;
                        }
                    });
                    var first = indexes[0];
                    aVehicle = taskVehicles[first];
                    return aVehicle;
                },
                getAllVehicles: function() {
                   return vehicles;
                },
                getAllActiveTaskVehicles: function() {
                   return taskVehicles;
                }
            };
    }  		
})();
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
                getVehicleforFleetNo: function(fleetNo) {
                    indexes = $.map(vehicles, function(obj, index) {
                        // FleetNo has # subscript
                        if (obj.fleetNo == "#" + fleetNo) {
                            aVehicle = vehicles[index];
                            return aVehicle;
                        }
                    });
                    return aVehicle;
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
                getAllVehicles: function() {
                   return vehicles;
                },
                getAllActiveTaskVehicles: function() {
                   return taskVehicles;
                }
            };
    }  		
})();